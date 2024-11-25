document.getElementById('todoForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await addTodo();
});

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await handleSearchFormSubmit();
});

async function handleSearchFormSubmit() {
    const name = document.getElementById('searchInput').value;

    try {
        const response = await fetch(`/todos/${name}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        if (Array.isArray(data)) {
            data.forEach(todo => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = todo;
                a.href = '#';
                a.className = 'delete-task';
                a.addEventListener('click', async function(event) {
                    event.preventDefault();
                    await deleteTask(name, todo);
                });
                li.appendChild(a);
                todoList.appendChild(li);
            });

            if (data.length > 0) {
                const deleteUserButton = document.createElement('button');
                deleteUserButton.id = 'deleteUser';
                deleteUserButton.textContent = 'Delete User';
                deleteUserButton.addEventListener('click', () => deleteUser(name));
                todoList.appendChild(deleteUserButton);
            }
        } else {
            todoList.textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while fetching the todos.';
    }
}


async function addTodo() {
    const name = document.getElementById('userInput').value;
    const todos = document.getElementById('todoInput').value;

    try {
        const response = await fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, todos }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        document.getElementById('message').textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while adding the todo.';
    }
}


async function deleteUser(name) {
    try {
        const response = await fetch(`/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        document.getElementById('message').textContent = data.message;
        if (data.message === 'User deleted successfully') {
            document.getElementById('todoList').innerHTML = '';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while deleting the user.';
    }
}

async function deleteTask(name, todo) {
    try {
        const response = await fetch('/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, todo }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        document.getElementById('message').textContent = data.message;
        if (data.message === 'Todo deleted successfully.') {
            await handleSearchFormSubmit(); // Refresh the list
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while deleting the todo.';
    }
}
