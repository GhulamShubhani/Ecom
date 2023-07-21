
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Header from './components/Header';
import Signup from './pages/SignUp';


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
     
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
