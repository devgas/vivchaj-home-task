const tagsMapping = {work: 'Робота', home: 'Дім', learning: 'Навчання'};
const addNewTask = (taskText, dueDate, tags) => {
    const todo = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
        tags: tags || null
    };

    addTodo(todo);
    renderTodos();
}

const renderTodos = () => {
    const list = document.getElementById('todo-list');
    const filtered = getFilteredTodos();

    list.innerHTML = '';

    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        if (todo.dueDate && new Date(todo.dueDate) < new Date()) li.classList.add('overdue');
        li.dataset.id = todo.id;
        li.draggable = true;

        li.innerHTML = `
          <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
          <span class="todo-text">${todo.text}</span>
          <span class="todo-due-date">${todo.dueDate ? `До: ${new Date(todo.dueDate).toLocaleDateString()}` : ''}</span>
          <span class="todo-tag" data-tag="${todo.tags ? `${todo.tags}` : ''}">${todo.tags && tagsMapping[todo.tags] ? `${tagsMapping[todo.tags]}` : ''}</span>
          <button class="todo-delete">&times;</button>
        `;

        list.appendChild(li);
    });

    updateCounter();
}

const updateCounter = () => {
    const count = getAllTodos().filter(t => !t.completed).length;
    const counter = document.getElementById('todo-counter');
    const word = getTaskWord(count);
    counter.textContent = `${count} ${word} залишилось`;
}

const getTaskWord = (n) => {
    if (n === 1) return 'завдання';
    if (n >= 2 && n <= 4) return 'завдання';
    return 'завдань';
}

const addTodo = (todo) => {
    let todos = getAllTodos() || [];
    todos = [...todos, todo];
    saveTodos(todos);
}

let currentFilter = 'all';
let currentTagFilter = 'all';
const getFilteredTodos = () =>  {
    const todos = getAllTodos();
    if (currentFilter === 'all' && currentTagFilter === 'all') return todos;
    return todos.filter(todo => (currentFilter === 'active') ? !todo.completed : todo.completed)
        .filter(todo => (currentTagFilter === 'all') ? true : todo.tags === currentTagFilter);
}

const getAllTodos = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

const deleteTodo = (id) => {
    const todos = getAllTodos();
    const updated = todos.filter(todo => todo.id !== id);
    saveTodos(updated);
    renderTodos();
}

const toggleTodoCompletion = (id) => {
    const todos = getAllTodos();
    const updated = todos.map(todo => {
        if (todo.id === parseInt(id)) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos(updated);
}

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const clearCompleted = () => {
    const completed = getAllTodos().filter(t => !t.completed);
    saveTodos(completed);
    renderTodos();
}

const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const cleanTags = () => {
    document.querySelectorAll('.tag').forEach(tag => tag.classList.remove('active'));
}

const sortByDate = (newest) => {
    const todos = getAllTodos();
    return todos.sort((a, b) => {
        return newest
            ? new Date(b.dueDate) - new Date(a.dueDate)
            : new Date(a.dueDate) - new Date(b.dueDate);
    });
}

const filterByTag = () => {
    const todos = getAllTodos();
    if (currentTagFilter === 'all') return todos;
    return todos.filter(t => t.tags === currentTagFilter);
}

(() => {
    renderTodos();

    document.getElementById('todo-add').addEventListener('click', () => {
        const taskText = document.getElementById('todo-input').value.trim();
        const dueDate = document.getElementById('due-date').value;
        const tags = document.querySelector('.tags .tag-btn.active')?.dataset.tag ?? null;
        if (taskText) {
            addNewTask(taskText, dueDate, tags);
            document.getElementById('todo-input').value = '';
            cleanTags();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const taskText = document.getElementById('todo-input').value.trim();
            if (taskText) {
                const dueDate = document.getElementById('due-date').value;
                const tags = document.querySelector('.tags .tag-btn.active').data('tag');
                addNewTask(taskText, dueDate, tags);
                document.getElementById('todo-input').value = '';
            }
        }
    });

    const list = document.getElementById('todo-list');

    list.addEventListener('dblclick', (e) => {
        if (!e.target.classList.contains('todo-text')) return;

        const item = e.target.closest('.todo-item');
        const id = Number(item.dataset.id);
        const todo = getAllTodos().find(t => t.id === id);

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-edit';
        input.value = todo.text;

        e.target.replaceWith(input);
        input.focus();
        input.select();

        let saved = false;
        const save = () => {
            if (saved) return;
            saved = true;
            const newText = input.value.trim();
            if (newText) {
                const all = getAllTodos().map(t => t.id === id ? { ...t, text: newText } : t);
                saveTodos(all);
            } else {
                deleteTodo(id);
            }
            renderTodos();
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') renderTodos();
        });

        input.addEventListener('blur', save);
    });

    list.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;

        const id = Number(item.dataset.id);

        if (e.target.classList.contains('todo-checkbox') || e.target.classList.contains('todo-text')) {
            toggleTodoCompletion(id);
        }

        if (e.target.classList.contains('todo-delete')) {
            deleteTodo(id);
        }
    });

    document.querySelector('.todo-filters').addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        currentFilter = e.target.dataset.filter;

        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        renderTodos();
    });

    document.getElementById('clear-completed').addEventListener('click', () => {
        clearCompleted();
    });

    list.addEventListener('dragstart', (e) => {
        if (!e.target.classList.contains('todo-item')) return;
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
        e.target.classList.add('dragging');
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) {
            list.appendChild(dragging);
        } else {
            list.insertBefore(dragging, afterElement);
        }
    });

    list.addEventListener('dragend', () => {
        document.querySelectorAll('.todo-item').forEach(item => item.classList.remove('dragging'));
        const newOrder = Array.from(list.children).map(li => Number(li.dataset.id));
        const todos = getAllTodos();
        const sorted = newOrder.map(id => todos.find(t => t.id === id));
        saveTodos(sorted);
    });

    const inputTags = document.querySelector('.tags');
    inputTags.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tag-btn')) return;
        inputTags.querySelectorAll('.tag-btn').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
    });

    document.getElementById('sort-options').addEventListener('change', (event) => {
        const sorted = sortByDate(event.target.value === 'newest');
        saveTodos(sorted);
        renderTodos();
    });

    const filterTags = document.querySelector('.tag-filters');
    filterTags.addEventListener('click', (tag) => {
        if (!tag.target.classList.contains('tag-btn')) return;
        currentTagFilter = tag.target.dataset.tag;
        filterTags.querySelectorAll('.tag-btn').forEach(t => t.classList.remove('active'));
        tag.target.classList.add('active');
        renderTodos();
    });
})();
