# 🎰 Online Bingo Platform

A modern, full-stack, real-time multiplayer Bingo platform designed to bring the classic social gaming experience into the digital age. This project showcases scalable backend architecture, smooth real-time synchronization, and a highly responsive user experience.

---

## 🚀 Core Features

*   **Real-Time Multiplayer Rooms:** Supports synchronous gameplay across multiple room types (Classic 90-Ball, Speed 75-Ball) utilizing persistent network connections.
*   **Live Community Chat:** Integrated interactive chat system with automated side-games, custom emojis, and community moderation tools.
*   **Fair Play Engine:** Powered by a cryptographically secure Pseudo-Random Number Generator (PRNG) to ensure audited, unbiased card generation and ball draws.
*   **Cross-Platform UI/UX:** Fully responsive, mobile-first design with fluid animations for ticket marking (daubing) and win celebrations.
*   **Secure Economy:** Simulated wallet system with daily login rewards, secure mock checkouts, and loyalty tier tracking.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, HTML5 Canvas |
| **Backend** | Node.js (Express), WebSockets (Socket.io) |
| **Database** | MongoDB (User data & Sessions), Redis (Real-time states) |
| **DevOps** | Docker, GitHub Actions (CI/CD), Vercel / Heroku |

---

## 📈 Engineering Highlights

*   **Low Latency:** Optimized WebSocket payloads for sub-100ms game state updates.
*   **State Management:** Robust server-side game loop with instant "BINGO!" validation.
*   **Clean Codebase:** MVC architecture, ESLint guidelines, >85% test coverage.
*   **Security:** JWT authentication, encrypted wallet system, PRNG verification.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Docker & Docker Compose
- MongoDB Atlas account (or local MongoDB)
- Redis (or use Docker)

### Installation

```bash
# Clone repository
git clone https://github.com/alexemac/online-bingo-platform.git
cd online-bingo-platform

# Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Setup environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start with Docker
docker-compose up

# Or start manually
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start
```

### Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- WebSocket: ws://localhost:5000

---

## 📁 Project Structure

```
online-bingo-platform/
├── frontend/              # React application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/               # Node.js Express server
│   ├── src/
│   ├── tests/
│   └── package.json
│
├── docker-compose.yml
├── .github/workflows/
└── README.md
```

---

## 🎮 Game Rules

### Classic 90-Ball Bingo
- 90 numbers (1-90)
- 3 rows x 9 columns ticket
- Three patterns to win: Line, Two Lines, Full House

### Speed 75-Ball Bingo
- 75 numbers (1-75)
- 5x5 grid ticket
- Multiple win patterns

---

## 🔐 Security

- JWT-based authentication
- Bcrypt password hashing
- CSRF protection
- Rate limiting on all endpoints
- Server-side game validation
- Cryptographically secure PRNG

---

## 🧪 Testing

```bash
cd backend && npm test
cd frontend && npm test
```

---

## 📚 API Documentation

See `API.md` for detailed endpoint documentation.

---

## 📞 Support

For issues or suggestions, please open a GitHub issue.

**Happy Bingo! 🎰**
