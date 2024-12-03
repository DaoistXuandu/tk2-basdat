import { useCookies } from 'react-cookie'


export default function Logout() {
    const [cookies, setCookie] = useCookies(['userId', 'status', 'name'])

    setCookie('status', '')
    setCookie('name', '')
    setCookie('userId', '')

    window.location = '/'

    return (
        <div>

        </div>
    )
}

