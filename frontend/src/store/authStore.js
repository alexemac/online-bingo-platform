import create from 'zustand';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', loading: false });
    }
  },

  register: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }
}));

export const useGameStore = create((set) => ({
  rooms: [],
  currentRoom: null,
  players: [],
  gameState: 'waiting',
  calledNumbers: [],

  setCurrentRoom: (room) => set({ currentRoom: room }),
  setPlayers: (players) => set({ players }),
  updateGameState: (state) => set({ gameState: state }),
  addCalledNumber: (number) => set((state) => ({
    calledNumbers: [...state.calledNumbers, number]
  }))
}));
