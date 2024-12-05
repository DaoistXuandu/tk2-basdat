import NavBar from "../components/navbar";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie'
import { register, uploadImage } from "../controller/kuning";

export default function Register() {
    const [cookies, setCookie] = useCookies(['userId', 'status', 'name'])
    const [role, setRole] = useState(cookies.status == "Pekerja" ? 1 : 0)

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [sex, setSex] = useState("")
    const [number, setNumber] = useState("")
    const [date, setDate] = useState()
    const [address, setAdress] = useState("")
    const [bank, setBank] = useState("GoPay")
    const [rek, setRek] = useState("")
    const [npwp, setNpwp] = useState("")
    const [link, setLink] = useState("")
    const [foto, setFoto] = useState("")

    const input_element = [
        ["Register Sebagai", "option",
            [
                "Pengguna",
                "Pekerja",
            ]
        ],
        ["Nama", "text", setName, name],
        ["Password", "password", setPassword, password],
        ["Jenis Kelamin", "radio", ["L", "P"], setSex, sex],
        ["No HP", "number", setNumber, number],
        ["Tanggal Lahir", "date", setDate, date],
        ["Alamat", "text", setAdress, address],
        ["Nama Bank", "option",
            [
                "GoPay",
                "OVO",
                "Virtual Account BCA",
                "Virtual Account BNI",
                "Virtual Account Mandiri"],
            setBank, bank
        ],
        ["No Rekening", "number", setRek, rek],
        ["NPWP", "text", setNpwp, npwp],
        ["URL Foto", "file", handleUrl, foto]
    ]

    async function handleUrl() {
        var input = document.getElementById("file");
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = async function (event) {
            var data = event.target.result.split(",")
            const value = await uploadImage(data[data.length - 1])
            let current_link = value.data.display_url
            console.log(current_link)
            setLink(current_link)
        }
    }

    async function handleSubmit() {
        if (!number || !name || !sex || !number || !password || !date || !address) {
            alert("Input data tidak boleh kosong")
            return
        }

        if (role == 1 && (!bank || !rek || !npwp || !link)) {
            alert("Input data tidak boleh kosong")
            return
        }

        if (number[0] != '0') {
            alert("Nomor telepon harus valid")
            return;
        }

        let cur_number = number + (number.length > 2 && number[number.length - 2] != '.' ? '.0' : '')

        if (cur_number[0] == '0') {
            cur_number = cur_number.substring(1, cur_number.length)
        }

        const data = await register(
            role,
            name,
            sex,
            cur_number,
            password,
            date + "T00:00:00Z",
            address,
            bank,
            rek,
            npwp,
            link,
            0.0,
            0);

        if (data.status) {
            alert("User berhasil dibuat")
            window.location = "/login"
        }
        else {
            alert(data.message)
        }
    }

    function input_data({ type, index }) {
        if (type == "option") {
            return (
                <div className={`flex flex-col ${(index > 6 && !role) ? 'hidden' : ''}`}>
                    <label className="">{input_element[index][0]}:</label>
                    <select onChange={e => (index == 0 ? setRole(e.target.value == "Pekerja" ? 1 : 0) : setBank(e.target.value))} className="border border-1 w-full rounded-lg p-1 text-sm">
                        {
                            input_element[index][2].map((item) => (
                                <option name={item} key={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>
            )
        }
        else if (type == "radio") {
            return (
                <div className="flex flex-row w-full">
                    <label className="w-1/3">{input_element[index][0]}:</label>
                    <div className="flex flex-row w-2/3 gap-8">
                        {
                            input_element[index][2].map(item => (
                                <div className="flex flex-row gap-2">
                                    <input type="radio" id={`radio-${item}`} onClick={e => setSex(e.target.value)} name={'sex'} value={item} />
                                    <label for={`radio-${item}`} >{item}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={`w-full flex items-center ${(index > 6 && !role) ? 'hidden' : ''}`}>
                    <label className="w-1/3">{input_element[index][0]}:</label>
                    <input className="w-2/3 border border-1 border-gray-200 p-1 pl-3 pr-3 rounded-lg"
                        value={input_element[index][input_element[index].length - 1]}
                        onChange={e => {
                            (index == input_element.length - 1 ?
                                handleUrl()
                                :
                                input_element[index][input_element[index].length - 2](e.target.value))
                        }}
                        id={input_element[index][1]}
                        type={input_element[index][1]}
                        name={input_element[index][0]} />
                </div>
            )
        }
    }

    return (
        <div className="">
            <NavBar status={"block"} />
            <div className="h-screen flex justify-center items-center">
                <div className="w-fit p-8 h-fit bg-white shadow-lg border border-1 rounded-lg flex flex-col gap-8">
                    <h1 className="font-bold text-3xl">Register</h1>
                    <div className="min-w-96 flex flex-col gap-2">
                        {
                            input_element.map((item, index) => (
                                <div>
                                    {
                                        input_data({ type: item[1], index: index })
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={handleSubmit} className="hover:scale-95 rounded-lg bg-green-600 p-2 font-bold text-white text-xl">Register</button>
                </div>
            </div>
            <p>
                {link}
            </p>
            <img src={link} alt="sdfghjkl" />
        </div>
    )
}