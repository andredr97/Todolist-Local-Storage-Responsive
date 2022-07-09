window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    const nameInput = document.getElementById('name');
    const newTodoForm = document.getElementById('new-todo-form');

    // mengambil value userName memasukan ke dalam local storage 
    const userName = localStorage.getItem('username') || '';

    nameInput.value = userName;





    // fungsi merubah value name yg ada di local storage
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        if (nameInput.value == '') {
            alert('Please enter your name');
            nameInput.focus();
            return;
        }

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createAt: new Date().getTime()
        }

        todos.push(todo);
        // memasukan value todo ke local storage dan di ubah dari object ke string
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        displayTodos();
    });
});

function displayTodos() {
    const todoList = document.getElementById('todo-list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;

        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        editBtn.classList.add('edit');
        deleteBtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        editBtn.innerHTML = 'Edit';
        deleteBtn.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            // fungsi mengetahui apakah todo sudah di checked
            todo.done = e.target.checked;
            // dan update ke local storage dengan set item
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            displayTodos();
        });

        editBtn.addEventListener('click', e => {
            const input = content.querySelector('input');
            span.style.display = 'none';
            editBtn.innerText = 'Save';
            input.value = '';
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            });
        });

        deleteBtn.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        });
    });
};