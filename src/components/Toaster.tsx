// components/Toast.tsx
import { Snackbar, Alert } from '@mui/material';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'error' | 'success' | 'info' | 'warning';
}

export default function Toaster({ open, onClose, message, severity = 'info' }: ToastProps) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
