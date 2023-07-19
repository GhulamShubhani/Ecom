import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "user",
  email: "",
  firstName: "",
  lastName: "",
  countryNumberCode: "",
  phone: "",
  password: "",
  confirmPassword: "",
  gender: null,
  profilePicture: null,
  fcmToken: "123",
  deviceName: "",
  deviceCountryCode: "",
  deviceLanguageCode: "",
  deviceIdentifier: "",
};

export const signUpSlice = createSlice({
  name: "Signup",
  initialState,
  reducers: {
    type(state, action) {
      state.type = action.payload;
    },
    firstName(state, action) {
      state.firstName = action.payload;
    },
    lastName(state, action) {
      state.lastName = action.payload;
    },
    email(state, action) {
      state.email = action.payload;
    },
    password(state, action) {
      state.password = action.payload;
    },

    confirmPassword(state, action) {
      state.confirmPassword = action.payload;
    },
    countryNumberCode(state, action) {
      state.countryNumberCode = action.payload;
    },
    phone(state, action) {
      state.phone = action.payload;
    },
    gender(state, action) {
      state.gender = action.payload;
    },
    country(state, action) {
      state.country = action.payload;
    },
    profilePicture(state, action) {
      state.profilePicture = action.payload;
    },
    fcmToken(state, action) {
      state.fcmToken = action.payload;
    },
    deviceName(state, action) {
      state.deviceName = action.payload;
    },
    deviceCountryCode(state, action) {
      state.deviceCountryCode = action.payload;
    },
    deviceLanguageCode(state, action) {
      state.deviceLanguageCode = action.payload;
    },
    deviceIdentifier(state, action) {
      state.deviceIdentifier = action.payload;
    },

    clear(state) {
      state.type = "user";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
      state.countryNumberCode = "";
      state.phone = "";
      state.gender = false;
      state.country = false;
      state.profilePicture = "";
      state.fcmToken = "";
      state.deviceName = "";
      state.deviceCountryCode = "";
      state.deviceLanguageCode = "";
      state.deviceIdentifier = "";
    },
  },
});

export const SignupActions = signUpSlice.actions;

export default signUpSlice.reducer;
