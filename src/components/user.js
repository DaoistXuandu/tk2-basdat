import { useEffect, useState } from "react";

export default function User({ status, text, currentRole }) {
    const [role, setRole] = useState(currentRole)
    const input_element = [
        ["Register Sebagai", "option",
            [
                "Pengguna",
                "Pekerja",
            ]],
        ["Nama", "text"],
        ["Password", "password"],
        ["Jenis Kelamin", "radio", ["L", "P"]],
        ["No HP", "number"],
        ["Tanggal Lahir", "date"],
        ["Alamat", "text"],
        ["Nama Bank", "option",
            [
                "GoPay",
                "OVO",
                "Virtual Account BCA",
                "Virtual Account BNI",
                "Virtual Account Mandiri"]],
        ["No Rekening", "number"],
        ["NPWP", "text"],
        ["URL Foto", "file"]
    ]

    useEffect(() => {
        console.log("E", role)  
    }, [role])

    useEffect(() => {
        console.log("T", currentRole)
    }, [currentRole])

    function input_data({ type, index }) {
        if (type == "option") {
            return (
                <div className={`flex flex-col ${(index > 6 && !role) || (index == 0 && status == 'update') ? 'hidden' : ''}`}>
                    <label className="">{input_element[index][0]}:</label>
                    <select onChange={e => (index == 0 ? setRole(e.target.value == "Pekerja") : "")} className="border border-1 w-full rounded-lg p-1 text-sm">
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
                                    <input type="radio" id={`radio-${item}`} name={'sex'} />
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
                <div className={`w-full flex items-center ${(index > 6 && !role) || (status == "update" && (index == 2 || index == 0)) ? 'hidden' : ''}`}>
                    <label className="w-1/3">{input_element[index][0]}:</label>
                    <input className="w-2/3 border border-1 border-gray-200 p-1 pl-3 pr-3 rounded-lg" type={input_element[index][1]} name={input_element[index][0]} />
                </div>
            )
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-fit p-8 h-fit bg-white shadow-lg border border-1 rounded-lg flex flex-col gap-8">
                <h1 className="font-bold text-3xl">{text}</h1>
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
                <button className="hover:scale-95 rounded-lg bg-green-600 p-2 font-bold text-white text-xl">{text}</button>
            </div>
        </div>
    )
}