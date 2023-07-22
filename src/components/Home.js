import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import Header from "../components/UI/Header";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions.js";
import axios from "axios";
import { UserActions } from "../store/User.js";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const {
    type,
    email,
    firstName,
    lastName,
    countryNumberCode,
    phone,
    password,
    confirmPassword,
    gender,
    profilePicture,
    fcmToken,
    deviceLanguageCode,
    deviceCountryCode,
    deviceName,
    deviceIdentifier,
    isLoggedIn
  } = useSelector((state) => state.user);
  console.log("fghjk",firstName,email);
  return (
    <div>Home</div>
  )
}

export default Home