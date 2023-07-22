import {
  Box,
  Button,
  Grid,
  TextField,
  CircularProgress,
  IconButton,
  InputAdornment,
  FormControl,
  Typography,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import Header from "../components/UI/Header";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions.js";
import axios from "axios";
import { UserActions } from "../store/User";

// import homelogo from "../assets/login/homeLogo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const getDeviceName = () => {
      if (navigator && navigator.userAgent) {
        const userAgent = navigator.userAgent;
        const regex = /\(([^)]+)\)/; // Extracts text inside parentheses
        const matches = regex.exec(userAgent);
        if (matches && matches.length >= 2) {
          const deviceInfo = matches[1];

          dispatch(UserActions.deviceName(deviceInfo.split(";")[0]));
        }
      }
    };

    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        dispatch(UserActions.fcmToken("123"));

        dispatch(UserActions.deviceCountryCode(data.country_code));
        dispatch(UserActions.deviceLanguageCode(data.languages[0]));
        dispatch(UserActions.deviceIdentifier(data.ip));
      } catch (error) {
        console.log("Error fetching location:", error);
      }
    };

    fetchLocation();
    getDeviceName();
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginHandler = async () => {
    console.log("click------");
    try {
      setIsLoading(true);
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emailRegex.test(email)) {
        console.log("pass");
        // const response = await axios.get(
        //   `https://vast-cyan-peacock-toga.cyclic.app/user/userexist`
        // );
        // console.log("response-----",response);

        // const exist = response.data.exist;
        const exist = true
        if (exist) {
          const tokenResponse = await axios.post(
            "https://vast-cyan-peacock-toga.cyclic.app/user/authtoken",
            { email, password }
          );
          console.log("token",tokenResponse);
          const token = tokenResponse.data.token;
          const tokenExpiration = new Date(
            tokenResponse.data.expireAt
          ).getTime();
          localStorage.setItem("token", token);
          localStorage.setItem("tokenExpiration", tokenExpiration);
          console.log( {
            email,
            password,
            device: {
              fcmToken,
              deviceLanguageCode,
              deviceCountryCode,
              deviceName,
              deviceIdentifier,
            },
          },"test123");

          const { data } = await axios.post(
            // "https://vast-cyan-peacock-toga.cyclic.app/user/login",
            "http://localhost:8000/user/login",
            {
              email,
              password,
              device: {
                fcmToken,
                deviceLanguageCode,
                deviceCountryCode,
                deviceName,
                deviceIdentifier,
              },
            }
          );
          if (data) {
            console.log("fata",data);
            localStorage.setItem("userId", data.id);
            toast.success("User registered successfully", toastOptions);

            dispatch(UserActions.isLoggedIn(true));
            dispatch(UserActions.email(data.user.email));
            dispatch(UserActions.firstName(data.user.firstName));
            dispatch(UserActions.lastName(data.user.lastName));
            dispatch(UserActions.gender(data.user.gender));
            dispatch(UserActions.phone(data.user.phone));
            dispatch(UserActions.profilePicture(data.user.profilePicture));
            dispatch(UserActions.type(data.user.type));
            dispatch(UserActions.password(data.user.password));
            dispatch(UserActions.id(data.user.id));
            dispatch(UserActions.backgroundProfilePicture(data.user.backgroundProfilePicture));

            // dispatch(UserActions.clear());
            navigate("/login");
            navigate("/");
          }
        } else {
          toast.error("User not found please Register", toastOptions);
        }
      } else {
        toast.error("Please enter valid email address", toastOptions);
      }
    } catch (error) {
      toast.error("Invalid credentials", toastOptions);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("gf",firstName,isLoggedIn);
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginY: 4,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <img src={"homelogo"} alt="roomy logo" width={"100px"} />
          </Box>
          <Paper
            elevation={18}
            sx={{
              px: 4,
              py: 3,

              borderRadius: "20px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "25px",
                textAlign: "center",
                color: "#81201F",
                mb: 5,
              }}
            >
              Login
            </Typography>

            <Box>
              <Typography sx={{ color: "#81201F" }}>Email</Typography>
              <TextField
                // label="Email"
                onChange={(e) => dispatch(UserActions.email(e.target.value))}
                fullWidth
                placeholder="Email address"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ width: "20px" }}>
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  focused: false,
                }}
                sx={{
                  bgcolor: "white",
                  borderRadius: "20px", // Add borderRadius explicitly
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px", // Add borderRadius explicitly
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#81201F" }}>Password</Typography>
              <FormControl
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  borderRadius: "20px", // Add borderRadius explicitly
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px", // Add borderRadius explicitly
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              >
                <TextField // label="Email"
                  onChange={(e) =>
                    dispatch(UserActions.password(e.target.value))
                  }
                  fullWidth
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          width: "20px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    focused: false,
                  }}
                  sx={{
                    bgcolor: "white",
                    borderRadius: "20px", // Add borderRadius explicitly
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px", // Add borderRadius explicitly
                      "&:hover fieldset": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "transparent",
                      },
                    },
                  }}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                px: { xs: 0, sm: 2 },
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label>
                <input type="checkbox" />
                <span style={{ color: "#81201F" }}>Remember me</span>
              </label>
              <Button
                sx={{ color: "#81201F" }}
                onClick={() => navigate("/forget-password")}
              >
                Forgot Password
              </Button>
            </Box>
            <Box
              sx={{
                mt: 2,
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: { md: "180px", xs: "120px" },
                  height: "60px",
                  borderTopRightRadius: "20px",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
                onClick={loginHandler}
                disabled={isLoading}
              >
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
                Login
              </Button>
            </Box>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                sx={{ fontWeight: "600", color: "#81201F" }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
              <Button
                sx={{ fontWeight: "600", color: "#81201F" }}
                onClick={() => navigate("/")}
              >
                Skip
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <ToastContainer />
    </div>
  );
};

export default Login;
