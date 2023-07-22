import React from 'react'
import { Box, Avatar, Typography, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
  return (
        <Dialog open={true} PaperProps={{sx:dilogStyle}}>
        <Component>
            <Container>
                <Avatar
                alt="Remy Sharp"
                src="https://images.news18.com/ibnlive/uploads/2017/11/Shah-Rukh-Khan-at-the-Millennium-Dome-London.jpg?impolicy=website&width=0&height=0"
                sx={{ width: 56, height: 56 }}
                />
            </Container>
            <Container>
                <Typography gutterBottom variant="h3" component="div">
                    Your Name
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