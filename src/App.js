import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import LogIn from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookingForm from './BagianHijau/BookingForm';
import SubCategoryDetail from './BagianHijau/SubCategoryDetail';
import ServiceMarketplace from './BagianHijau/ServiceMarketplace';
import Homepage from './BagianHijau/Homepage';



function App() {
  const status = "Pengguna"
  return (
    <BrowserRouter>
      < NavBar status={status} name={"Andi"} />
      {/* < NavBar status={""} name={""} /> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={< LogIn />} />
        <Route path="register" element={< Register />} />
        <Route path="profile" element={<Profile role={status == "Pekerja"} />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
