import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export default function GameRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [gameState, setGameState] = useState('waiting');

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_WS_URL || 'http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to game room');
      newSocket.emit('join-room', roomId);
    });

    newSocket.on('number-update', (data) => {
      setCalledNumbers((prev) => [...new Set([...prev, data.number])]);
    });

    newSocket.on('new-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => newSocket.close();
  }, [roomId]);

  const sendMessage = () => {
    if (messageInput.trim() && socket) {
      socket.emit('chat-message', { roomId, message: messageInput });
      setMessageInput('');
    }
  };

  // Bingo card (5x5 grid for 75-ball)
  const bingoCard = [
    [5, 17, 28, 40, 54],
    [1, 22, 31, 45, 63],
    [8, 19, 'FREE', 42, 60],
    [2, 24, 36, 50, 65],
    [11, 16, 33, 48, 62]
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">🎰 Game Room {roomId}</h1>
          <button
            onClick={() => navigate('/lobby')}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600"
          >
            Exit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bingo Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Ticket</h2>
              <div className="grid grid-cols-5 gap-2">
                {bingoCard.map((row, rowIdx) =>
                  row.map((num, colIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className={`
                        w-16 h-16 flex items-center justify-center font-bold text-lg rounded-lg
                        ${num === 'FREE' ? 'bg-purple-500 text-white' : ''}
                        ${calledNumbers.includes(num) ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800'}
                      `}
                    >
                      {num === 'FREE' ? '✓' : num}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Called Numbers</h3>
                <div className="bg-gray-100 rounded-lg p-4 max-h-32 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {calledNumbers.map((num) => (
                      <span key={num} className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Chat</h2>
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
              {messages.map((msg, idx) => (
                <div key={idx} className="mb-2 text-sm">
                  <span className="font-bold text-blue-600">{msg.userId}:</span>
                  <span className="text-gray-700"> {msg.message}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Say something..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
