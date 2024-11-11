import { useState } from "react"
import User from "../components/user";
import NavBar from "../components/navbar";

export default function Profile({ role }) {

    const [image, setImage] = useState("https://www.github.com/DaoistXuandu.png")
    const [update, setUpdate] = useState(false);
    const [profile, setProfile] = useState([
        "Andi",
        "0",
        "L",
        "08123456789",
        "12 Juli 2004",
        "Jl. Bandung No. 7",
        "200000",
        "GoPay",
        "08123456789",
        "45.23.23.23.21",
        "0",
        "12",
        ["Cuci Apartement", "Cuci Sepatu"]
    ]);

    const data = [
        "Nama",
        "Level",
        "Jenis Kelamin",
        "No HP",
        "Tanggal Lahir",
        "Alamat",
        "Saldo MyPay",
        "Nama Bank",
        "Nomor Rekening",
        "NPWP",
        "Rating",
        "Jumlah Pesanan Selesai",
        "Kategori Pekerjaan"
    ];

    return (
        <div>
            <NavBar status={"block"} />
            <div className="h-screen w-full flex justify-center items-center flex flex-row gap-3">
                <div className="bg-white shadow-lg p-10 border border-1 rounded-lg flex flex-col gap-3">
                    <div className="font-bold text-3xl">Profile</div>
                    <img src={image} className={`w-16 h-16 ${!role && 'hidden'}`} />
                    <div className="min-w-96 flex flex-col gap-2">
                        {
                            data.map((item, index) => (
                                <div className={`${!role && index > 6 && 'hidden'}`}>
                                    <div className={`flex flex-row ${typeof profile[index] == "object" ? 'hidden' : ''} `}>
                                        <div className="w-1/2">{item}</div>
                                        <div className={`w-1/2 flex flex-row gap-2`}>
                                            <p>:</p>
                                            <p>{profile[index]}</p>
                                        </div>
                                    </div>
                                    <div className={`${typeof profile[index] == "object" ? '' : 'hidden'} flex flex-col`}>
                                        <div>{item}:</div>
                                        <div className="ml-3">
                                            {
                                                typeof profile[index] == "object" && profile[index].map((item, index) => (
                                                    <div>{index + 1}. {item}</div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={e => setUpdate(update != true)} disabled={update} className={`p-3 rounded-lg font-bold text-white text-lg hover:scale-95 ${update ? 'bg-green-200' : 'bg-green-600'}`}>Update</button>
                </div>
                <div>{role}</div>
                <div className={`${update ? '' : 'hidden'}`}>
                    <User text={"Update Data"} status={"update"} currentRole={role} />
                </div>
            </div>
        </div>
    )
}