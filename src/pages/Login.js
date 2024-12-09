import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie';
import { login } from "../controller/kuning";


export default function LogIn() {
    const [cookies, setCookie] = useCookies(['userId', 'status', 'name'])
    const [wait, setWait] = useState(false)
    const [message, setMessage] = useState(["Awal", "green"])
    const role = ["Pekerja", "Pengguna", ""]


    const [noHp, setNoHp] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        setWait(true)
        let pesan = ["Sedang dilakukan pemrosesan", 'green']
        setMessage(pesan)
        e.preventDefault()

        if (noHp == "" || password == "") {
            alert("No Hp atau Password tidak boleh kosong")
            setWait(false)
            return
        }

        let formatHp = noHp;
        if (formatHp[0] == '0') {
            formatHp = formatHp.substring(1, noHp.length)
        }
        formatHp += ".0"

        const response = await login(formatHp, password)
        if (response.status) {
            setCookie('userId', response.userId)
            setCookie('status', role[response.role])
            setCookie('name', response.name)

            window.location = "/homepage"
        }
        else {
            alert(response.message)
        }
        setWait(false)
    }

    return (
        <div className="flex h-screen justify-center items-center relative z-0">
            <div className={`fixed ${wait ? '' : 'hidden'} bottom-20 left-20 bg-green-600 z-200 p-3 pl-6 pr-6 text-left rounded-xl shadow-lg text-white w-fit`}>
                <h1 className="text-2xl font-bold">Pesan:</h1>
                {message[0]}
            </div>
            <form className="flex flex-col justify-center w-fit p-8 gap-12 bg-white shadow-lg border border-1 rounded-xl">
                <p className="font-bold text-3xl text-center">Log In</p>
                <div className="flex flex-col justify-center w-full gap-3">
                    <div className="flex flex-row items-center gap-8">
                        <div className="w-1/3">
                            <p>No HP:</p>
                        </div>
                        <div className="w-2/3">
                            <input value={noHp} onChange={e => setNoHp(e.target.value)} className="border border-1 border-gray-200 p-1 pl-3 pr-3 rounded-lg" type="number" />
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-8">
                        <div className="w-1/3">
                            <p>Password:</p>
                        </div>
                        <div className="w-2/3">
                            <input value={password} onChange={e => setPassword(e.target.value)} className="border border-1 border-gray-200 p-1 pl-3 pr-3 rounded-lg" type="password" />
                        </div>
                    </div>
                </div>

                <button disabled={wait} onClick={e => handleSubmit(e)} className={`p-3 rounded-lg text-white font-bold text-lg ${wait ? 'bg-gray-200' : 'bg-green-600'}`}>Masuk</button>
            </form>
        </div >

    )
}