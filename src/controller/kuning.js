async function fetchData() {
    try {
        const response = await fetch('http://127.0.0.1:8080/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json(); // Parse JSON response
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function getCookie(data) {
    const datas = document.cookie.split(";")
    let dict = {}
    for (let data of datas) {
        const current = data.trim().split("=")
        dict[current[0]] = current[1]
    }
    return dict[data]
}

async function login(NoHp, Pwd) {
    try {
        const response = await fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            body: JSON.stringify({
                NoHP: NoHp,
                Pwd: Pwd
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json(); // Parse JSON response
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export { fetchData, getCookie, login }

