
import { Box, Avatar, Typography, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import Header from "../components/UI/Header";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../utils/ToastOptions.js";
import axios from "axios";
import { UserActions } from "../../store/User.js";

const Component = styled(Box)`
    display:flex;
`
const Container = styled(Box)`
    padding: 26px 10px 16px 36px;
`

const dilogStyle = {
    height:"80%",
    marginTop:"25%",
    width:"60%",
    maxWidth:"100%",
    maxHight:"100%",
    boxShadow:"none",
    overflow:"none"
}

const Profilefront = () => {
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
      backgroundProfilePicture,
    } = useSelector((state) => state.user);
    console.log("gd",firstName);
  return (
        <Dialog open={true} PaperProps={{sx:dilogStyle}}>
        <Component>
            <Container>
                <Avatar
                alt="Remy Sharp"
                src={profilePicture}
                sx={{ width: 56, height: 56 }}
                />
            </Container>
            <Container>
                <Typography gutterBottom variant="h3" component="div">
                    {firstName + " " + lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </Container>
            <Container>
                <EditIcon />
            </Container>
            <Container>
                <DeleteIcon />
            </Container>

        </Component>
        <Component sx={{ display: { xs: 'flex'} }}>
            <Container>
                <Typography gutterBottom variant="h4" component="div">
                    Platform Seting
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </Container>
            <Container>
                <Typography gutterBottom variant="h4" component="div">
                    Platform Seting
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </Container>
            </Component>
        </Dialog>
  )
}

export default Profilefront