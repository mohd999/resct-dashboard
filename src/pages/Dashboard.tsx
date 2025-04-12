
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../services/authApi'

export default function Dashboard() {
  const { data: user, isLoading, error } = useGetUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{`Welcome ${user?.name}`}</Typography>
      <Button onClick={handleLogout} variant="outlined" sx={{ mt: 2 }}>Logout</Button>
    </Box>
  );
}
