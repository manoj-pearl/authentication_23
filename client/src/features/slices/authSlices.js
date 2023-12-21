import { createSlice } from "@reduxjs/toolkit";
import { fetchSinUp, generateSignupOTP } from "../actions/authAction";
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: "",
  isUserLoggedIn: false,
  loggedInUserData: {},
  userSignedSuccess: false,
  signOtpGenrated: false,
  isMailSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinUp.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.userSignedSuccess = false;
        state.isError = "";
      })
      .addCase(fetchSinUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userSignedSuccess = true;
        state.isError = "";
      })
      .addCase(fetchSinUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.userSignedSuccess = false;
        state.isError = "";
      })
      // SignOtp Generate
      .addCase(generateSignupOTP.pending, (state, action) => {
        state.isLoading = true;
        state.isError = "";
        state.signOtpGenrated = false;
        state.isMailSent = false;
      })
      .addCase(generateSignupOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signOtpGenrated = true;
        state.isMailSent = false;
      })
      .addCase(generateSignupOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.signOtpGenrated = false;
        state.isMailSent = false;
        toast.error(action.payload, { position: "top-center" });
      });
  },
});

const {} = authSlice.actions;

export default authSlice.reducer;
