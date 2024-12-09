import './App.css';
import NavBar from './components/navbar';
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
import DiscountPage from './components/Discounts/DiscountPage';
import ViewPemesananJasa from './BagianHijau/ViewPemesananJasa';
import WorkerProfile from './components/profile';
import FormTestimoni from './components/Testimoni/FormTestimoni';
import { useCookies } from 'react-cookie'
import Logout from './components/logout';
import SubCategoryDetail from './BagianHijau/SubCategoryDetail';

function App() {
  const role = ["Pekerja", "Pengguna", ""]
  const [cookies, setCookie] = useCookies(['userId', 'status', 'name'])

  return (
    <BrowserRouter>
      < NavBar status={cookies.status} name={cookies.name} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={< LogIn />} />
        <Route path="register" element={< Register />} />
        <Route path="profile" element={<Profile role={cookies.status == role[0]} />} />
        <Route path="logout" element={<Logout />} />

        <Route path="/homepage" element={<Homepage role={cookies.status} />} />
        <Route path="/homepage/:id" element={<SubCategoryDetail role={cookies.status}/>} />

        <Route path="homepage/:id/form" element={<BookingForm />} />

        <Route path="mypay" element={<MyPay />} />
        <Route path='mypay/transaksi' element={<TransaksiMyPay />} />

        <Route path="transaksiMyPayPengguna" element={<TransaksiMyPay status="Pengguna" role="Pengguna" />} />
        <Route path="transaksiMyPayPekerja" element={<TransaksiMyPay status="Pekerja" role="Pekerja" />} />

        <Route path="statusPekerjaanJasa" element={<StatusPekerjaanJasa />} />
        <Route path="pekerjaanJasa" element={<PekerjaanJasa />} />

        <Route path='diskon' element={<DiscountPage />} />
        <Route path='viewPemesananJasa' element={<ViewPemesananJasa />} />

        <Route path='pekerjaanSaya' element={<PekerjaanJasa />} />
        <Route path='statusPekerjaan' element={<StatusPekerjaanJasa />} />

        <Route path='testimoni' element={<FormTestimoni />} />
        <Route path='profilPekerja/:id' element={<WorkerProfile />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
