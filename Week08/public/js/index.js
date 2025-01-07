const registerButton = document.getElementById('registerButton');
const loginForm = document.getElementById('loginForm');

// Login
loginForm.onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.reload();
    } else {
        const error = await response.json();
        alert(error.message);
    }
}

registerButton.addEventListener('click', () => {
    window.location.href = '/register.html';
});

// Check if the user is logged in
const ifLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};

// Initialize the topic form
const initializeTopicForm = () => {
    const topicForm = document.getElementById('topicForm');
    topicForm.innerHTML = '';

    if (ifLoggedIn()) {
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" id="topicTitle">
                    <label for="topicTitle">Title</label>
                </div>
                <div class="input-field col s12">
                    <textarea id="topicText" class="materialize-textarea"></textarea>
                    <label for="topicText">Content</label>
                </div>
                <button type="submit" id="postTopic" class="btn waves-effect waves-light">
                    Post Topic
                </button>
            </div>
        `;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await createTopic();
        });

        topicForm.appendChild(form);
    }
}

// Create a post
const createTopic = async () => {
    const title = document.getElementById('topicTitle').value;
    const content = document.getElementById('topicText').value;

    try {
        const response = await fetch('/api/topic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ 
                title: title,
                content: content,
            })
        });

        if (response.ok) {
            // Clear the form
            document.getElementById('topicTitle').value = '';
            document.getElementById('topicText').value = '';

            // Refresh the topics
            await displayTopics();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        alert('Error creating topic');
        console.error(error);
    }
};


// Display topics
const displayTopics = async () => {
    const topicsDiv = document.getElementById('topics');
    topicsDiv.innerHTML = '';

    try {
        const response = await fetch('/api/topics');
        if (!response.ok) {
            throw new Error('Error fetching topics');
        }
        const topics = await response.json();

        topics.forEach(topic => {
            // Create a elements
            const topicDiv = document.createElement('div');
            const card = document.createElement('div');
            const cardAction = document.createElement('div');
            const title = document.createElement('span');
            const content = document.createElement('p');
            const usernameAndCreatedAt = document.createElement('p');
            const deleteButton = document.createElement('button');

            // Set the class names
            topicDiv.className = 'card z-depth-2 hoverable grey lighten-2';
            card.className = 'card-content';
            title.className = 'card-title';
            cardAction.className = 'card-action';
            usernameAndCreatedAt.className = 'grey-text text-darken-2';
            deleteButton.className = 'btn waves-effect waves-light';

            // Set the text content
            title.textContent = topic.title;
            content.textContent = topic.content;
            usernameAndCreatedAt.textContent = `${topic.username} ${new Date(topic.createdAt).toLocaleString()}`;
            deleteButton.textContent = 'Delete';

            // Set deleteButton id
            deleteButton.id = "deleteTopic";

            // Set deleteButton onclick event
            deleteButton.onclick = async () => {
                try {
                    const response = await fetch(`/api/topic/${topic._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    });

                    if (response.ok) {
                        topicDiv.remove();
                        await displayTopics();
                    } else {
                        const error = await response.json();
                        alert(error.message);
                    }
                } catch (error) {
                    alert('Error deleting topic');
                    console.error(error);
                }
            };

            // Append the elements to the topicDiv
            card.appendChild(title);
            card.appendChild(content);
            card.appendChild(usernameAndCreatedAt);
            cardAction.appendChild(deleteButton);
            card.appendChild(cardAction);
            topicDiv.appendChild(card);
            
            topicsDiv.appendChild(topicDiv);
        });
    } catch (error) {
        console.error(error);
    }
};


// Load topics when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayTopics();
    initializeTopicForm();
});