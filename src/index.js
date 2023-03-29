import _ from 'lodash';
import './style.css';

const taskInput1 = document.getElementById('task-input-1');
const taskInput2 = document.getElementById('task-input-2');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

const tasks = [];

function addTask(event) {
  event.preventDefault();
  const activeTaskInput = document.activeElement;
  const taskInput = (activeTaskInput === taskInput1) ? taskInput1 : taskInput2;
  const newTaskDescription = taskInput.value.trim();
  if (newTaskDescription) {
    const newTask = {
      description: newTaskDescription,
      completed: false,
      index: tasks.length + 1
    };
    tasks.push(newTask);
    renderTasks(todoList, tasks);
    taskInput.value = '';
  }
}

addTaskBtn.addEventListener('click', addTask);

function renderTasks(container, tasks) {
  container.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      task.completed = this.checked;
      if (task.completed) {
        taskItem.classList.add('completed');
      } else {
        taskItem.classList.remove('completed');
      }
    });
    const description = document.createElement('span');
    description.innerText = task.description;
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function() {
      tasks.splice(i, 1);
      renderTasks(container, tasks);
    });
    taskItem.appendChild(checkbox);
    taskItem.appendChild(description);
    taskItem.appendChild(deleteButton);
    container.appendChild(taskItem);
  }
}
