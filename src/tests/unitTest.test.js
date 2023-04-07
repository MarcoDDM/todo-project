
import {updateTaskStatus, clearCompletedTasks} from '../tests/unitTest.test.js';

import { editTask, addTask } from '../todoFunctions.js';

const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;

describe('addTask', () => {
  test('should be defined', () => {
    expect(addTask).toBeDefined();
  });
});

describe('updateTaskStatus', () => {
  test('should update the completed status of a task to true', () => {
    const task = { id: 1, description: 'Task 1', completed: false };
    const updatedTask = updateTaskStatus(task, true);
    expect(updatedTask.completed).toBe(true);
  });
});

describe('editTask', () => {
  test('should throw an error when passed an invalid argument', () => {
    const task = { id: 1, description: 'Task 1', completed: false };
    const span = 'not an HTML element';
    expect(() => editTask(task, span)).toThrow('Invalid argument: span must be an HTML element');
  });
});
