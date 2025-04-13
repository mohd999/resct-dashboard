
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
}

const initialState: User = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profileImage: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },   
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
