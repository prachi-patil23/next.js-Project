import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, checkUserByEmail,signup,} from "../../services/users/user.service";

interface LoginData {email: string; password: string;}
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "user/loginUser",

  async ( { email, password }: LoginData, { rejectWithValue }) => {
    try {
      const data = await login( email, password );
     
      //Generated JWT ko browser ke localStorage mein save karta hai
      localStorage.setItem( "token", data.token );
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Invalid email or password"
      );
    }
  }
);
//Signup ke liye user.service.ts ka signup() call karta hai
export const signupUser = createAsyncThunk(
  "user/signupUser",

  async ( {firstName,lastName,email,password,}: SignupData,
    { rejectWithValue }
  ) => {
    try {
      const existingUsers = await checkUserByEmail(email);

      if (existingUsers.length > 0) {
        return rejectWithValue( "Email already registered" );
      }

      const newUser = await signup({ firstName, lastName, email, password, });

      return newUser;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unable to connect to server"
      );
    }
  }
);