document.getElementById('userForm').addEventListener('submit', function(event) {
  // event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message)
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

document.getElementById('getUsers').addEventListener('click', function() {
  fetch('/users')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    data.users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
});