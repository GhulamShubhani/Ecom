import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/index";

const Profile1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 500px)");

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
    isLoggedIn,
    backgroundProfilePicture,
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

  // upload image on firebase ===================================
  const handleImage = async (e) => {
    const files = e.target.files;
    const file = files[0];
    try {
      const storageRef = ref(storage, `images/user/backgroung/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              dispatch(UserActions.backgroundProfilePicture(url));
              uploadBackGroundImageHandleClickOpen()
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("Upload error", err);
        });
    } catch (error) {
      console.log("Error occurred", error);
    }
  };
  // emd of upload image on firebase ----------------------------

  // upload background image dialog box and api ===================
  const [uploadBackGroundImageDialogBoxOpen, setuploadBackGroundImageDialogBoxOpen] = React.useState(false);

  const uploadBackGroundImageHandleClickOpen = () => {
    setuploadBackGroundImageDialogBoxOpen(true);
  };

  const uploadBackGroundImageHandleClose = () => {
    setuploadBackGroundImageDialogBoxOpen(false);
  };
  // end of delete back ground image ----------------------

  // delete background image dialog box and api ===================
  const [backGroundImageDialogBoxOpen, setbackGroundImageDialogBoxOpen] = React.useState(false);

  const handleClickOpen = () => {
    setbackGroundImageDialogBoxOpen(true);
  };

  const handleClose = () => {
    setbackGroundImageDialogBoxOpen(false);
  };
  // end of delete back ground image ----------------------

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const boxStyle1 = {
    margin: 2,
    height: "50px",
    width: "50px",
    borderRadius: "50%", // Make the box circular
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.3s ease", // Adding a smooth transition effect on hover
  };

  const boxStyle = {
    height: "400px",
    backgroundImage: `url(${backgroundProfilePicture !== null
        ? backgroundProfilePicture
        : "https://wallpaperaccess.com/full/1134533.jpg"
      })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <Container>
        <Box sx={boxStyle}>
          <Box
            sx={{
              width: isSmallScreen ? "100%" : "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // margin: "auto",
              // marginLeft: "25%",
            }}
          >
            <Box sx={{ ...boxStyle1, ":hover": { backgroundColor: "red" } }}>
              <Box
                onClick={() => {
                  document.getElementById("image-input").click();
                }}
              >
                <FileUploadIcon />

                <input
                  id="image-input"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImage}
                />
              </Box>
              <Dialog
                open={uploadBackGroundImageDialogBoxOpen}
                onClose={uploadBackGroundImageHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Back Ground Image Upload"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you Seur To upload 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={uploadBackGroundImageHandleClose}>Disagree</Button>
                  <Button onClick={uploadBackGroundImageHandleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
            <Box sx={{ ...boxStyle1, ":hover": { backgroundColor: "red" } }}>
              <DeleteIcon onClick={handleClickOpen} />
              <Dialog
                open={backGroundImageDialogBoxOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Back Ground Image Delete "}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>
        hdfs
      </Container>
    </>
  );
};

export default Profile1;
