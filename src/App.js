
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Header from './components/Header';
import Signup from './pages/Signup';
import Profileback from './pages/profile/Profileback';
import Home from './components/Home';



function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={<Profileback/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
