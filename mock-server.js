
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 4000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

let mockUser = {
  id: 1,
  email: 'mohd.ali@incedoinc.com',
  name: 'Mohd Ali',
  refreshToken: 'mock-refresh-token',
};

let accessToken = 'mock-access-token';

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'mohd.ali@incedoinc.com' && password === '123456') {
    return res.json({
      accessToken,
      refreshToken: mockUser.refreshToken,
      user: mockUser,
    });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/api/auth/user', (req, res) => {
  return res.json({
    ...mockUser,
  });
});

app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  console.log(req.body)
  if (!refreshToken) return res.sendStatus(401);
    res.json({ accessToken: accessToken,refreshToken:refreshToken });
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
