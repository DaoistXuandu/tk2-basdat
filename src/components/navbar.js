import MyPay from "../merah/MyPay";

export default function NavBar({ status, name }) {
    const anonym = ["Login", "Register"];
    const anonym_link = ["/login", "/register"];

    const info = [status, name]

    const user = ["Homepage", "MyPay", "Kelola Pesanan Saya", "Diskon", "Profile", "Logout"];
    const user_link = ["/homepage", "/mypay", "/viewPemesananJasa", "/diskon", "/profile", "/logout"];

    const worker = ["Homepage", "Kelola Pekerjaan Saya", "Kelola Status Pekerjaan", "MyPay", "Profile", "Logout"];
    const worker_link = ["/homepage", "/pekerjaanSaya", "/statusPekerjaan", "/mypay", "/profile", "/logout"];

    function data() {
        if (status == "Pekerja") {
            return (
                <div className="flex flex-row gap-8 items-center">
                    {worker.map((item, index) => (
                        <a key={index} className={`text-gray-600 text-md hover:scale-95 ${index != user.length - 1 ? 'hover:underline' : 'bg-green-600 text-white font-bold p-2 pl-4 pr-4 rounded-lg'}  hover:underline-offset-4`} href={worker_link[index]} >{item}</a>
                    ))}
                </div>
            )
        }
        else if (status == "Pengguna") {
            return (
                <div className="flex flex-row gap-8 items-center">
                    {user.map((item, index) => (
                        <a key={index} className={`text-gray-600 text-md hover:scale-95 ${index != user.length - 1 ? 'hover:underline' : 'bg-green-600 text-white font-bold p-2 pl-4 pr-4 rounded-lg'}  hover:underline-offset-4`} href={user_link[index]} >{item}</a>
                    ))
                    }
                </div >
            )
        }
        else {
            return (
                <div className="flex flex-row gap-8">
                    {anonym.map((item, index) => (
                        <a key={index} className="text-gray-600 text-md hover:scale-95 hover:underline hover:underline-offset-4" href={anonym_link[index]} >{item}</a>
                    ))}
                </div>
            )
        }
    }

    return (
        <div className={`${status == "block" ? "opacity-0" : 'fixed'} w-full top-0 h-fit flex flex-row p-4 pl-10 pr-10 bg-white shadow-lg`}>
            <div className={`${status == "" ? 'hidden' : ''} flex flex-row w-full`}>
                <span className="font-bold text-2xl flex flex-row gap-3 items-center">
                    <p>{status}{status == undefined ? "" : ","}</p>
                    <p className="text-green-600">{name}</p>
                </span>
            </div>
            <div className="w-full flex justify-end items-center">
                {data()}
            </div>
        </div>
    )
}