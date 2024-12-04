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

async function register(role, name, sex, number, password, date, address, bank, noRek, npwp, link, rating, amount) {
    try {
        console.log(role + " " + name + " " + sex + " " + number + " " + password + " " + date + " " + address + " " + bank + " " + noRek + " " + npwp + " " + link + " " + rating + " " + amount)
        const response = await fetch('http://127.0.0.1:8080/register', {
            method: 'POST',
            body: JSON.stringify({
                role: role,
                name: name,
                sex: sex,
                number: number,
                password: password,
                date: date,
                address: address,
                bank: bank,
                noRek: noRek,
                npwp: npwp,
                link: link,
                rating: rating,
                amount: amount
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
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function uploadImage(image) {
    const formData = new FormData();
    formData.append('image', image);

    try {
        const response = await fetch('https://api.imgbb.com/1/upload?key=3e25e69a2bf1d53895c57f57bfc30378', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error uploading image:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
export { fetchData, getCookie, login, register, uploadImage }
