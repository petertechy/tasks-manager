        // Function to get tasks from local storage
        function getTasks() {
            return JSON.parse(localStorage.getItem('tasks')) || [];
        }

        // Function to save tasks to local storage
        function saveTasks(tasks) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Function to render tasks in the task list
        function renderTasks() {
            const tasks = getTasks();
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach((task, index) => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task-item');
                taskItem.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Due Date: ${task.dueDate}</p>
                    <p>Priority: ${task.priority}</p>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(taskItem);
            });
        }

        // Function to add a new task
        function addTask(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const dueDate = document.getElementById('dueDate').value;
            const priority = document.getElementById('priority').value;

            const tasks = getTasks();
            tasks.push({ title, description, dueDate, priority });
            saveTasks(tasks);
            renderTasks();
            document.getElementById('taskForm').reset();
        }

        // Function to delete a task
        function deleteTask(index) {
            const tasks = getTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        }

        // Function to edit a task
        function editTask(index) {
            const tasks = getTasks();
            const { title, description, dueDate, priority } = tasks[index];
            document.getElementById('title').value = title;
            document.getElementById('description').value = description;
            document.getElementById('dueDate').value = dueDate;
            document.getElementById('priority').value = priority;

            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        }

        // Render tasks on page load
        document.addEventListener('DOMContentLoaded', renderTasks);

        // Add event listener to the form
        document.getElementById('taskForm').addEventListener('submit', addTask);