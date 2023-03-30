import './index.css';
import { addTask, deleteTask, editTask } from './todoFunctions.js';
import { updateTaskStatus, clearCompletedTasks } from './updateFunctions.js';


const taskInput1 = document.getElementById('task-input-1');
const taskInput2 = document.getElementById('task-input-2');
const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed');

let tasks = [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.description}</span>
      <span class="delete-icon" style="font-family: arial; float: right; cursor:pointer;"><b>x</b></span>
    `;
    taskItem.className = task.completed ? 'completed' : '';
    todoList.appendChild(taskItem);

    const span = taskItem.querySelector('span');
    span.addEventListener('dblclick', () => {
      editTask(task, span, renderTasks, saveTasks);
    });

    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('click', () => {
      task.completed = !task.completed;
      taskItem.className = task.completed ? 'completed' : '';
      saveTasks();
    });

    checkbox.addEventListener('change', () => {
  updateTaskStatus(task, tasks, renderTasks, saveTasks);
});


    const deleteIcon = taskItem.querySelector('.delete-icon');
    deleteIcon.addEventListener('click', () => {
      deleteTask(task, tasks, renderTasks, saveTasks);
    });
  });
}

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    const taskDescription = event.target.value.trim();

    if (taskDescription !== '' && taskDescription !== event.target.defaultValue) {
      const newTask = {
        description: taskDescription,
        completed: false,
        index: tasks.length + 1,
      };
      addTask(newTask, tasks, renderTasks, saveTasks);
      event.target.value = '';
    }
  }
}

taskInput1.addEventListener('keydown', handleKeyPress);
taskInput2.addEventListener('keydown', handleKeyPress);

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
  saveTasks();
}

clearCompletedButton.addEventListener('click', clearCompleted);
