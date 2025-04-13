import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../services/userApi";
import { updateUser } from "@/features/auth/userSlice";

export default function Dashboard() {
  const { data: userData, isLoading, error } = useGetUserQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user  = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    dispatch(updateUser(userData));
  }, [userData]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{`Welcome ${user?.firstName}`}</Typography>
      <Button onClick={handleLogout} variant="outlined" sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
}
