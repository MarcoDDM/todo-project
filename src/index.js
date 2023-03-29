import _ from 'lodash';
import './style.css';

const tasks = [
  {
    description: 'Task 1',
    completed: false,
    index: 1
  },
  {
    description: 'Task 2',
    completed: true,
    index: 2
  },
  {
    description: 'Task 3',
    completed: false,
    index: 3
  }
];

function renderTasks() {
  const todoList = document.getElementById('todo-list');
  const items = tasks
    .sort((a, b) => a.index - b.index)
    .map(({description, completed}) => {
      const item = document.createElement('li');
      item.textContent = description;
      if (completed) {
        item.classList.add('completed');
      }
      return item;
    });
  todoList.append(...items);
}

renderTasks();
