import { createSlice, PayloadAction,} from "@reduxjs/toolkit";
import { loginUser, signupUser,} from "./userThunk";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  firstName: string;    
  lastName: string;
  email: string;
  password: string;
  token: string;
  isLoggedIn: boolean;
  loginMessage: string;
  authMode: "login" | "signup";
  user: User | null;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  token: "",
  isLoggedIn: false,
  loginMessage: "",
  authMode: "login",
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setFirstName: (
      state, action: PayloadAction<string> ) => {
      state.firstName = action.payload;
    },

    setLastName: (
      state, action: PayloadAction<string> ) => {
      state.lastName = action.payload;
    },

    setEmail: (
      state, action: PayloadAction<string> ) => {
      state.email = action.payload;
    },

    setPassword: (
      state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    setAuthMode: (
      state, action: PayloadAction<"login" | "signup"> ) => {
      state.authMode = action.payload;
    },

    clearLoginMessage: (state) => {
      state.loginMessage = "";
    },

    logout: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.password = "";
      state.token = "";
      state.isLoggedIn = false;
      state.loginMessage = "";
      state.authMode = "login";
      state.user = null;

      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN SUCCESS
      //Successful login ke baad Redux mein user + token + login status save karta hai.
      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.isLoggedIn = true;
          state.loginMessage = "";
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.firstName = action.payload.user.firstName;
          state.lastName = action.payload.user.lastName;
          state.email = action.payload.user.email;
          state.password = "";
        }
      )
      // LOGIN FAILED
      .addCase( loginUser.rejected,
        (state, action) => {
          state.isLoggedIn = false;
          state.token = "";
          state.loginMessage = (action.payload as string) || "Invalid email or password";
        }
      )
      // SIGNUP SUCCESS
      .addCase( signupUser.fulfilled,
        (state, action) => {
          state.user = action.payload;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.email = action.payload.email;
          state.password = "";
          state.loginMessage = "";
        }
      )
      // SIGNUP FAILED
      .addCase( signupUser.rejected, (state, action) => {
          state.loginMessage = (action.payload as string) ||"Registration failed";
        }
      );
  },
});

export const {setFirstName,setLastName,setEmail,setPassword,setAuthMode,clearLoginMessage,logout,
} = userSlice.actions;

export default userSlice.reducer;