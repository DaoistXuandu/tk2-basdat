import { useCookies } from 'react-cookie'

export default function Home() {
    const [cookies, setCookie] = useCookies(['userId', 'status', 'name'])

    setCookie('status', '')
    setCookie('name', '')
    setCookie('userId', '')


    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col justify-center w-fit gap-8 p-16 bg-white shadow-lg border border-1 rounded-xl">
                <p className="font-bold text-3xl">Sijarta By nama kelompoknya apa bang terserah bang</p>
                <div className="flex flex-col justify-center gap-2">
                    <a href="/login" className="p-3 bg-green-600 font-bold text-white w-full text-center hover:scale-95 text-md">Login</a>
                    <a href="/register" className="p-3 border border-1 border-green-600 font-bold text-green-600 w-full text-center hover:scale-95 text-md">Register</a>
                </div>
            </div>
        </div>
    )
}