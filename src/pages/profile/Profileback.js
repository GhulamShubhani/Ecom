import React from 'react'
import {Box,Toolbar,AppBar,styled} from '@mui/material';
import Profilefront from './Profilefront';

const Header= styled(AppBar)`
height:220px;
background-color:#00bfa5;
box-shadow:none;
`
const Component = styled(Box)`
    background:red;
`

const Profileback = () => {
  return (
    <Component>
      <Header position="static">
        <Toolbar>
            
        </Toolbar>
      </Header>
      <Profilefront position="static"/>
    </Component>
  )
}

export default Profileback