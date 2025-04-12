import React from 'react';
import AppRoutes from './routes/AppRoutes'; // or wherever your routes live
import { useAuth } from './hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';
const App = () => {
    const initialized = useAuth(); // ✅ Get initialized status
    if (!initialized) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }    
  return <AppRoutes />;
};

export default App;