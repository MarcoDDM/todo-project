import _ from 'lodash';
import './style.css';

const taskInput1 = document.getElementById('task-input-1');
const taskInput2 = document.getElementById('task-input-2');
const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed');

let tasks = [];

taskInput1.addEventListener("keydown", handleKeyPress);
taskInput2.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    const taskDescription = event.target.value.trim();

    if (taskDescription !== "" && taskDescription !== event.target.defaultValue) {
      const newTask = {
        description: taskDescription,
        completed: false,
        index: tasks.length + 1,
      };
      tasks.push(newTask);
      event.target.value = "";
      renderTasks();
    }
  }
}

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

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

clearCompletedButton.addEventListener('click', clearCompleted);
