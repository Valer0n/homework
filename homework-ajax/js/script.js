const URL = 'https://jsonplaceholder.typicode.com/posts';

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(event) {
    event.preventDefault();
    const newData = new FormData(event.target);
    const fromForm = Object.fromEntries(newData.entries());

    fetch(URL, {
            method: "POST",
            body: JSON.stringify(fromForm),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('ERROR =', error)
        });
};