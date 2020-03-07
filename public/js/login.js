var form = document.getElementById('my_form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    var inputs = document.getElementsByClassName('form-item-input');
    let username = inputs[0].value;
    let password = inputs[1].value;

    login(username, password).then((data) => {
        if(!data.token) {
            window.location.replace('/login');
        } else {
            console.log(data.token);
            window.localStorage.setItem('token', data.token);
        }
    });
});

async function login(username, password) {
    let response = await fetch('/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    let data = await response.json();
    return data;
}