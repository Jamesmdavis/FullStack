var form = document.getElementById('my_form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    var inputs = document.getElementsByClassName('form-item-input');
    let username = inputs[0].value;
    let password = inputs[1].value;

    fetch('/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
    }).then((res) => {
        console.log(res.text());
    });
});