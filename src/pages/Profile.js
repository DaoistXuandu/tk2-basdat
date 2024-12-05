import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import { getUser, updateUser, uploadImage } from "../controller/kuning";

export default function Profile({ role }) {
    const [cookies, setCookie] = useCookies(['userId', 'status', 'name'])

    const [update, setUpdate] = useState(false);

    const [name, setName] = useState("")
    const [sex, setSex] = useState("")
    const [number, setNumber] = useState("")
    const [date, setDate] = useState()
    const [address, setAddress] = useState("")
    const [bank, setBank] = useState("")
    const [rek, setRek] = useState("")
    const [npwp, setNpwp] = useState("")
    const [link, setLink] = useState("")
    const [level, setLevel] = useState()
    const [saldo, setSaldo] = useState()
    const [rating, setRating] = useState()
    const [amount, setAmount] = useState()
    const [category, setCategory] = useState([])

    const data = [
        ["Nama", name],
        ["Level", level],
        ["Jenis Kelamin", sex],
        ["No HP", number],
        ["Tanggal Lahir", date],
        ["Alamat", address],
        ["Saldo MyPay", saldo],
        ["Nama Bank", bank],
        ["Nomor Rekening", rek],
        ["NPWP", npwp],
        ["Rating", rating],
        ["Jumlah Pesanan Selesai", amount],
        ["Kategori Pekerjaan", category]
    ];

    const input_element = [
        ["Nama", "text", setName, name],
        ["Jenis Kelamin", "radio", ["L", "P"], setSex, sex],
        ["No HP", "number", setNumber, number],
        ["Tanggal Lahir", "date", setDate, date],
        ["Alamat", "text", setAddress, address],
        ["Nama Bank", "option",
            [
                "GoPay",
                "OVO",
                "Virtual Account BCA",
                "Virtual Account BNI",
                "Virtual Account Mandiri"], setBank, bank],
        ["No Rekening", "number", setRek, rek],
        ["NPWP", "text", setNpwp, npwp],
        ["URL Foto", "file"]
    ]

    async function handleUrl() {
        console.log("fxghjkl")
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

    function input_data({ type, index }) {
        if (type == "option") {
            return (
                <div className={`flex flex-col ${!role && 'hidden'}`}>
                    <label className="">{input_element[index][0]}:</label>
                    <select onChange={e => setBank(e.target.value)} className="border border-1 w-full rounded-lg p-1 text-sm">
                        {
                            input_element[index][2].map((item) => (
                                <option name={item} key={item} selected={item == bank}>
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
                                    <input onClick={e => input_element[index][input_element[index].length - 2](e.target.value)}
                                        type="radio" id={`radio-${item}`} name={'sex'} checked={sex == item} value={item} />
                                    <label>{item}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={`w-full flex items-center ${(index > 4 && !role) ? 'hidden' : ''}`}>
                    <label className="w-1/3">{input_element[index][0]}:</label>
                    <input className="w-2/3 border border-1 border-gray-200 p-1 pl-3 pr-3 rounded-lg"
                        type={input_element[index][1]}
                        name={input_element[index][0]}
                        id={input_element[index][1]}
                        onChange={e => (index == input_element.length - 1 ? handleUrl() : input_element[index][input_element[index].length - 2](e.target.value))}
                        value={index == input_element.length - 1 ? '' : input_element[index][input_element[index].length - 1]} />
                </div>
            )
        }
    }

    async function getProfile() {
        const data = await getUser(cookies.userId, cookies.status == "Pengguna" ? 0 : 1)
        setName(data.name)
        setSex(data.sex)
        setNumber('0' + data.number.substr(0, data.number.length - 2))
        setDate(data.date.split("T")[0])
        setAddress(data.address)
        setBank(data.bank)
        setRek(data.noRek)
        setNpwp(data.npwp)
        setLink(data.link)
        setLevel(data.level)
        setSaldo(data.saldo)
        setRating(data.rating)
        setAmount(data.amount)
        setCategory(["Cuci Apartement", "Cuci Sepatu"])
    }

    async function handleUpdate() {
        const role = (cookies.status == "Pekerja" ? 1 : 0)
        const data = await updateUser(
            cookies.userId,
            role,
            name,
            sex,
            number,
            date,
            address,
            bank,
            rek,
            npwp,
            link
        )

        if (data.status) {
            alert("User berhasil di update")
            setUpdate(update != true)
        }
        else {
            alert(data.message)
        }
    }


    useEffect(() => {
        getProfile()
    }, [cookies.userId])

    return (
        <div>
            <div className="mt-10 h-screen w-full flex justify-center items-center flex flex-row gap-3">
                <div className="bg-white shadow-lg p-10 border border-1 rounded-lg flex flex-col gap-3">
                    <div className="font-bold text-3xl">Profile</div>
                    <img src={link} className={`w-16 h-16 ${!role && 'hidden'}`} />
                    <div className="min-w-96 flex flex-col gap-2">
                        {
                            data.map((item, index) => (
                                <div className={`${((!role && index > 6) || (role && index == 1)) && 'hidden'}`}>
                                    <div className={`flex flex-row ${typeof item[1] == "object" ? 'hidden' : ''} `}>
                                        <div className="w-1/2">{item[0]}</div>
                                        <div className={`w-1/2 flex flex-row gap-2`}>
                                            <p>:</p>
                                            <p>{item[1]}</p>
                                        </div>
                                    </div>
                                    <div className={`${typeof item[1] == "object" ? '' : 'hidden'} flex flex-col`}>
                                        <div>{item[0]}:</div>
                                        <div className="ml-3">
                                            {
                                                typeof item[1] == "object" && item[1].map((item, index) => (
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
                    <div className="h-screen flex justify-center items-center">
                        <div className="w-fit p-8 h-fit bg-white shadow-lg border border-1 rounded-lg flex flex-col gap-8">
                            <h1 className="font-bold text-3xl">Update Profil</h1>
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
                            <button onClick={handleUpdate} className="hover:scale-95 rounded-lg bg-green-600 p-2 font-bold text-white text-xl">Update Profil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}