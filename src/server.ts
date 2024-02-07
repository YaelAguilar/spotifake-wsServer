import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'ws';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const server = createServer(app);

const wss = new Server({ server });

wss.on('connection', (ws) => {
  const getRandomPopularity = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const sendData = () => {
    const data = [
      { name: 'Rock', popularity: getRandomPopularity(30, 70), color: '#FF5733' },
      { name: 'Pop', popularity: getRandomPopularity(50, 90), color: '#FFC300' },
      { name: 'Hip Hop', popularity: getRandomPopularity(40, 80), color: '#900C3F' },
      { name: 'Electronic', popularity: getRandomPopularity(45, 85), color: '#3498DB' },
      { name: 'Jazz', popularity: getRandomPopularity(20, 60), color: '#C70039' },
      { name: 'Classical', popularity: getRandomPopularity(10, 50), color: '#7D3C98' },
    ];

    ws.send(JSON.stringify(data));
  };

  const interval = setInterval(sendData, 2000);

  ws.on('close', () => {
    clearInterval(interval);
  });
});

server.listen(3006, () => {
  console.log('Server running on port 3006');
});
