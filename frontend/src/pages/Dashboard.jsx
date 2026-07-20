import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-blue-600 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">📊 Dashboard</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/lobby')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600"
            >
              Back to Lobby
            </button>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-bold text-sm mb-2">TOTAL BALANCE</h3>
            <p className="text-3xl font-bold text-teal-600">💰 5,250</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-bold text-sm mb-2">GAMES PLAYED</h3>
            <p className="text-3xl font-bold text-blue-600">🎮 47</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-bold text-sm mb-2">WINS</h3>
            <p className="text-3xl font-bold text-green-600">🏆 12</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-bold text-sm mb-2">WIN RATE</h3>
            <p className="text-3xl font-bold text-purple-600">📈 25.5%</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🏅 Top Players This Week</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Wins</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, username: 'BingoKing', wins: 45, earnings: 12500 },
                  { rank: 2, username: 'LuckyLady', wins: 38, earnings: 10200 },
                  { rank: 3, username: 'NumberNinja', wins: 32, earnings: 8900 },
                  { rank: 4, username: 'FastCaller', wins: 28, earnings: 7500 },
                  { rank: 5, username: user?.username || 'You', wins: 12, earnings: 5250 },
                ].map((player) => (
                  <tr key={player.rank} className={player.username === user?.username ? 'bg-yellow-100' : 'border-b border-gray-200'}>
                    <td className="py-3 px-4 font-bold text-gray-800">#{player.rank}</td>
                    <td className="py-3 px-4 text-gray-700">{player.username}</td>
                    <td className="py-3 px-4 text-gray-700">{player.wins}</td>
                    <td className="py-3 px-4 font-bold text-green-600">💰 {player.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
