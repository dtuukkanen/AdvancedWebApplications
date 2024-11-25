// Submit the form to add a new todo
document.getElementById('todoForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await addTodo();
});

// Search for todos
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await handleSearchFormSubmit();
});

// Update possible todos
async function handleSearchFormSubmit() {
    const name = document.getElementById('searchInput').value;

    try {
        // Fetch the todos
        const response = await fetch(`/todos/${name}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = ''; // Clear the list
        if (Array.isArray(data)) {
            data.forEach(todo => {
                // Create elements
                const li = document.createElement('li');
                const label = document.createElement('label');
                const span = document.createElement('span');
                const checkbox = document.createElement('input');
                const a = document.createElement('a');

                // Set attributes for checkbox
                checkbox.type = 'checkbox';
                checkbox.className = 'checkBoxes';
                checkbox.id = 'myCheckbox';
                checkbox.checked = todo.checked;
                checkbox.addEventListener('change', async function(event) {
                    event.preventDefault();
                    await updateTodo(name, todo.todo, checkbox.checked);
                });

                // Set attributes for the todo
                a.textContent = todo.todo;
                a.href = '#';
                a.className = 'delete-task';
                a.addEventListener('click', async function(event) {
                    event.preventDefault();
                    await deleteTask(name, todo.todo);
                });

                // Append elements
                span.appendChild(a);
                label.appendChild(checkbox);
                label.appendChild(span);
                li.appendChild(label);
                todoList.appendChild(li);
            });
        } else {
            todoList.textContent = data.message; // Display error message
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
            body: JSON.stringify({ name, todo: todo }),
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

async function updateTodo(name, todo, checked) {
    try {
        const response = await fetch('/updateTodo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, todo, checked }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        document.getElementById('message').textContent = data.message;
        if (data.message === 'Todo updated successfully.') {
            await handleSearchFormSubmit(); // Refresh the list
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while updating the todo.';
    }
}