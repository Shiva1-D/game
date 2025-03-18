const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

// Serve static files from the "public" folder.
app.use(express.static(path.join(__dirname, 'public')));

// Bonus: Allow URLs like http://localhost:3000/unique_game_id
app.get('/:gameId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In‑memory store for game state per room.
let games = {};

io.on('connection', (socket) => {
  console.log("User connected:", socket.id);

  // When a client joins a game room.
  socket.on('joinGame', (data) => {
    const gameId = data.gameId || 'default';
    socket.join(gameId);
    console.log(`Socket ${socket.id} joined game ${gameId}`);

    // Initialize game state if needed.
    if (!games[gameId]) {
      games[gameId] = {
        level: 1,
        boardSize: 5,
        endPoint: 5 * 5 - 1,
        playerPositions: { player1: 0, player2: 0 },
        currentPlayer: 'player1',
        wins: { player1: 0, player2: 0 },
        levelActive: true,
        status: "Level 1: Player 1's Turn"
      };
    }
    // Send current game state to the joining client.
    socket.emit('gameState', games[gameId]);
  });

  // When a move occurs, update the game state and broadcast it.
  socket.on('move', (data) => {
    const gameId = data.gameId || 'default';
    if (games[gameId]) {
      games[gameId] = data.state;
      io.to(gameId).emit('gameState', games[gameId]);
    }
  });

  socket.on('disconnect', () => {
    console.log("User disconnected:", socket.id);
    // Optionally, remove players from game state.
  });
});

http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
