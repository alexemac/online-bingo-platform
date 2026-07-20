import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore, useAuthStore } from '../store/authStore';

export default function GameLobby() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    // Mock rooms data
    setRooms([
      { id: 1, name: 'Classic 90-Ball Room', type: '90-ball', players: 12, maxPlayers: 50 },
      { id: 2, name: 'Speed 75-Ball', type: '75-ball', players: 8, maxPlayers: 30 },
      { id: 3, name: 'High Rollers', type: '90-ball', players: 5, maxPlayers: 20 },
    ]);
  }, []);

  const joinRoom = (roomId) => {
    navigate(`/game/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">🎰 Bingo Lobby</h1>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 mb-8 text-white">
          <p className="text-lg">Welcome, <span className="font-bold">{user?.username || 'Player'}</span>! 👋</p>
          <p className="text-sm">Balance: 💰 1,000 coins</p>
        </div>

        {/* Available Rooms */}
        <h2 className="text-2xl font-bold text-white mb-6">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{room.name}</h3>
              <p className="text-gray-600 mb-4">Type: {room.type}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-700">
                  👥 {room.players}/{room.maxPlayers} players
                </span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(room.players / room.maxPlayers) * 100}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => joinRoom(room.id)}
                disabled={room.players >= room.maxPlayers}
                className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {room.players >= room.maxPlayers ? 'Full' : 'Join Game'}
              </button>
            </div>
          ))}
        </div>

        {/* Create Room Button */}
        <div className="mt-8 text-center">
          <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition">
            ➕ Create New Room
          </button>
        </div>
      </div>
    </div>
  );
}
