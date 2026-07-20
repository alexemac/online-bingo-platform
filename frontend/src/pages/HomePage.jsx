import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/lobby');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">🎰 BINGO</h1>
        <p className="text-2xl text-white mb-8">Play Real-Time Multiplayer Bingo</p>
        
        <div className="space-y-4">
          <Link to="/login">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
              Login
            </button>
          </Link>
          <br />
          <Link to="/register">
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition">
              Register
            </button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">🌍 Real-Time</h3>
            <p>Play with players worldwide instantly</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">💰 Win Rewards</h3>
            <p>Earn coins and climb the leaderboard</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">🎮 Multiple Modes</h3>
            <p>Classic 90-ball and Speed 75-ball</p>
          </div>
        </div>
      </div>
    </div>
  );
}
