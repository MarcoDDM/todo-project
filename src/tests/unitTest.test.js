
const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;

import { updateTaskStatus, clearCompletedTasks } from '../updateFunctions';
import { editTask } from '../todoFunctions';

describe('updateTaskStatus()', () => {
  test('should change task status to completed', () => {
    const task = { description: 'Task 1', completed: false };
    const tasks = [task];
    const renderTasks = jest.fn();
    const saveTasks = jest.fn();

    updateTaskStatus(task, tasks, renderTasks, saveTasks);

    expect(task.completed).toBe(true);
    expect(saveTasks).toHaveBeenCalled();
    expect(renderTasks).toHaveBeenCalled();
  });
});

describe('clearCompletedTasks()', () => {
  test('should remove all completed tasks', () => {
    const tasks = [    { id: 1, title: 'Task 1', completed: true },    { id: 2, title: 'Task 2', completed: false },    { id: 3, title: 'Task 3', completed: true },  ];
  
    const saveTasks = jest.fn();
    const renderTasks = jest.fn();
  
    clearCompletedTasks(tasks, renderTasks, saveTasks);
  
    expect(tasks.length).toBe(3);
    expect(saveTasks).toHaveBeenCalled();
    expect(renderTasks).toHaveBeenCalled();
  });  
});

describe('editTask()', () => {
  test('should update task title', () => {
    const taskToEdit = { description: 'Task 1', completed: false };
    const span = { replaceWith: jest.fn() };

    editTask(taskToEdit, span);

    expect(span.replaceWith).toHaveBeenCalled();
  });
});

