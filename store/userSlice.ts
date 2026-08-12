import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  password: string;
  isLoggedIn: boolean;
  loginMessage: string;
}

const initialState: UserState = {
  email: "",
  password: "",
  isLoggedIn: false,
  loginMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.loginMessage = "";
    },

    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.loginMessage = action.payload;
    },

    clearLoginMessage: (state) => {
      state.loginMessage = "";
    },

    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isLoggedIn = false;
      state.loginMessage = "";
    },
  },
});

export const {
  setEmail,
  setPassword,
  loginSuccess,
  loginFailed,
  clearLoginMessage,
  logout,
} = userSlice.actions;

export default userSlice.reducer;