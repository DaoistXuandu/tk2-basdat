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
import Homepage from './BagianHijau/Homepage';
import TransaksiMyPay from './merah/TransaksiMyPay';
import MyPay from './merah/MyPay';
import PekerjaanJasa from './merah/PekerjaanJasa';
import StatusPekerjaanJasa from './merah/StatusPekerjaanJasa';

function App() {
  const role = ["Pekerja", "Pengguna"]
  const status = role[1]
  const name = "Andi"

  return (
    <BrowserRouter>
      < NavBar status={status} name={name} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={< LogIn />} />
        <Route path="register" element={< Register />} />
        <Route path="profile" element={<Profile role={status == "Pekerja"} />} />
        <Route path="homepage" element={<Homepage role={status}/>} />
        <Route path="*" element={<NoPage />} />
        <Route path="mypay" element={<MyPay />} />
        <Route
        path="transaksiMyPayPengguna"
        element={<TransaksiMyPay status= "Pengguna" role="Pengguna" />}
        />
        <Route
        path="transaksiMyPayPekerja"
        element={<TransaksiMyPay status= "Pekerja" role="Pekerja" />}
        />
        <Route path="statusPekerjaanJasa" element={<StatusPekerjaanJasa />} />
        <Route path="pekerjaanJasa" element={<PekerjaanJasa />} />


      </Routes>
    </BrowserRouter >
  );
}

export default App;
