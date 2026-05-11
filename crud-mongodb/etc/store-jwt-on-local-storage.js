
const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'farhad@gmail.com', password: '123456' })
});

const data = await response.json();
localStorage.setItem('token', data.token);


const token = localStorage.getItem('token');

const res = await fetch('http://localhost:3000/api/auth/me', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});


localStorage.removeItem('token');