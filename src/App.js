import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Header from './pages/Header';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
