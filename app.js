const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
};

// Add task to the DOM
const addTaskToDOM = (task) => {
  const li = document.createElement('li');
  li.textContent = task;
  li.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });
  taskList.appendChild(li);
};

// Save tasks to localStorage
const saveTasks = () => {
  const tasks = Array.from(taskList.children).map(li => li.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add task event listener
addTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    addTaskToDOM(task);
    saveTasks();
    taskInput.value = '';
  }
});

// Initial load
loadTasks();
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registered:', reg))
        .catch(err => console.log('Service Worker registration failed:', err));
    });
  }
  