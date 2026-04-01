const loadUsers = async () => {
    try {
        toggleLoader();
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            showError(`Помилка: ${response.status}`);
            return [];
        }
        const users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
        return users;
    } catch (error) {
        showError(`Помилка: ${error}`);
        return [];
    } finally {
        toggleLoader();
    }
}

const showError = (text) => {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = text;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
    return true;
}

const toggleLoader = () => {
    const loader = document.querySelector('.loader');
    loader.classList.contains('show') ? loader.classList.remove('show') : loader.classList.add('show');
}

const renderUsers = async (users) => {
    const existingUsers = document.querySelectorAll('.user-item');
    existingUsers.forEach(element => element.remove());
    const usersList = document.querySelector('.users-list');
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');
        userItem.id = user.id;
        userItem.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Телефон:</strong> ${user.phone}</p>
            <p><strong>Назва компанії:</strong> ${user?.company?.name}</p>
            <p><strong>Адреса:</strong> ${user?.address?.city}</p>
        `;
        usersList.appendChild(userItem);
    });
}

const loadUserPosts = async (userId) => {
    try {
        toggleLoader();
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        if (!response.ok) {
            showError(`Помилка: ${response.status}`);
            return [];
        }
        return await response.json();
    } catch (error) {
        showError(`Помилка: ${error}`);
        return [];
    } finally {
        toggleLoader();
    }
}

const renderPosts = (userId, posts) => {
    const existingPostElements = document.querySelectorAll('.post-items');
    existingPostElements.forEach(element => element.remove());
    const postItems = document.createElement('div');
    postItems.classList.add('post-items');
    const userItem = document.getElementById(userId);
    userItem.appendChild(postItems);
    (posts || []).forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        postItem.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.body.slice(0, 100)}</p>
        `;
        postItems.appendChild(postItem);
    });
}

const filterUsers = (searchTerm) => {
   const users = JSON.parse(localStorage.getItem('users')) || [];
   const filtered = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
   renderUsers(filtered).catch(console.error);
   filtered.forEach(user => {
       renderPosts(user.id, user.posts);
   });
}

(async () => {
    const users = await loadUsers() || [];
    renderUsers(users).catch(console.error);
    const userList = document.querySelector('.users-list');
    userList.addEventListener('click', (event) => {
        if (!event.target.closest('.user-item')) return;
        const userItem = event.target.closest('.user-item');
        if (userItem) {
            loadUserPosts(userItem.id).then(posts => {
                renderPosts(userItem.id, posts || []);
            }).catch(console.error);
        }
    });

    document.getElementById('search').addEventListener('keyup', (event) => {
        filterUsers(event.target.value);
    });
})();
