import _ from 'lodash';
import './style.css';

const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed');

let tasks = [
  {
    description: 'Task 1',
    completed: false,
    index: 1,
  },
  {
    description: 'Task 2',
    completed: false,
    index: 2,
  },
  {
    description: 'Task 3',
    completed: false,
    index: 3,
  },
];

function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.description}</span>
    `;
    taskItem.className = task.completed ? 'completed' : '';
    todoList.appendChild(taskItem);

    taskItem.querySelector('input[type="checkbox"]').addEventListener('click', () => {
      task.completed = !task.completed;
      taskItem.className = task.completed ? 'completed' : '';
    });
  });
}

renderTasks();
