
import { useState } from 'react';
import { Box, Button, TextField, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useLoginMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Toaster from '../components/Toaster'; 

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [toast, setToast] = useState({ open: false, message: '', severity: 'error' });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const auth = await login(data).unwrap();
      if (auth.accessToken) { 
        Cookies.set('accessToken', auth.accessToken, { path: '/', expires: 1 / 96 });
        Cookies.set('refreshToken', auth.refreshToken, { path: '/', expires: 7 });  
      }
      dispatch(setCredentials(auth));
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
      const errorMsg = err?.data?.message || 'Login failed. Please try again.';
      setToast({ open: true, message: errorMsg, severity: 'error' });
    }
  };

  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Paper elevation={3} sx={{ width: 400, p: 4 }}>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
        <Button type="submit" variant="contained" fullWidth>Login</Button>
        </Paper>
    </Box>
    <Toaster
    open={toast.open}
    message={toast.message}
    severity={toast.severity as any}
    onClose={() => setToast({ ...toast, open: false })}
  />
    </>
  );
}
