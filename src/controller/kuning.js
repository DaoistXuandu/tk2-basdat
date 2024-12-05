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

async function updateUser(id, role, name, sex, number, date, address, bank, noRek, npwp, link) {
    try {
        let updateDate = date + "T00:00:00Z"
        let cur_number = number + (number.length > 2 && number[number.length - 2] != '.' ? '.0' : '')

        if (cur_number[0] == '0') {
            cur_number = cur_number.substring(1, cur_number.length)
        }

        const response = await fetch('http://127.0.0.1:8080/updateUser', {
            method: 'PATCH',
            body: JSON.stringify({
                user: id,
                role: role,
                name: name,
                sex: sex,
                number: cur_number,
                date: updateDate,
                address: address,
                bank: bank,
                noRek: noRek,
                npwp: npwp,
                link: link
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

async function getUser(userId, role) {
    try {
        const response = await fetch('http://127.0.0.1:8080/getUser', {
            method: 'PATCH',
            body: JSON.stringify({
                user: userId,
                role: role
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


export { login, register, uploadImage, getUser, updateUser }
