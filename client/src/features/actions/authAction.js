import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";

export const fetchSinUp = createAsyncThunk(
  "signup/fetchSignup",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/signup", payload, {
        withCredentials: true,
      });
      console.log("fetch data:::", response);
      return response;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

//Generate SignUp Otp
export const generateSignupOTP = createAsyncThunk(
  "user/signOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await instance.post("/sendOtp", payload, {
        withCredentials: true,
      });
      if (data.success) {
        return data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
