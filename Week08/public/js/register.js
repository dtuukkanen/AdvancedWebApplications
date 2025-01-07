const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
        isAdmin: formData.get('isAdmin') === 'on',
    };

    const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        window.location.href = '/';
    } else {
        const error = await response.json();
        alert(error.message);
    }
});
