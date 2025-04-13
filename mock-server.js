
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 4000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

let mockUser = {
  id: 1,
  email: 'mohd.ali@gmail.com',
  firstName: "Mohd",
  lastName:"Ali",
  refreshToken: 'mock-refresh-token',
};

let accessToken = 'mock-access-token';

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'mohd.ali@gmail.com' && password === '123') {
    return res.json({
      accessToken,
      refreshToken: mockUser.refreshToken,
      user: mockUser,
    });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/api/user', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token from header:', token);
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }
  return res.json({
    ...mockUser,
  });
});

app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
    res.json({ accessToken: accessToken,refreshToken:refreshToken });
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
