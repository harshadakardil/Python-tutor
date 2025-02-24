const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Start Python Flask process
const startFlaskApp = () => {
  const flaskProcess = spawn('python', ['app.py'], {
    stdio: 'pipe'
  });

  flaskProcess.stdout.on('data', (data) => {
    console.log(`Flask stdout: ${data}`);
  });

  flaskProcess.stderr.on('data', (data) => {
    console.error(`Flask stderr: ${data}`);
  });

  flaskProcess.on('close', (code) => {
    console.log(`Flask process exited with code ${code}`);
    // Restart Flask if it crashes
    setTimeout(startFlaskApp, 5000);
  });

  return flaskProcess;
};

let flaskApp = startFlaskApp();

// Proxy all /api requests to Flask
app.use('/api', async (req, res) => {
  try {
    const response = await fetch(`http://localhost:5000${req.url}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error proxying request to Flask:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  if (flaskApp) {
    flaskApp.kill();
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  if (flaskApp) {
    flaskApp.kill();
  }
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Frontend served from ${path.join(__dirname, 'frontend/dist')}`);
});