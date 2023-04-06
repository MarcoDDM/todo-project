const { JSDOM } = require('jsdom');

const { document } = new JSDOM('<!doctype html><html><body></body></html>').window; const { addTask, deleteTask } = require('./todoFunctions.js');

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.document = document;
global.window = document.defaultView;

describe('addTask', () => {
  test('should add a task to the tasks array', () => {
    const tasks = [];
    const newTask = 'Do laundry';

    addTask(newTask, tasks, jest.fn(), jest.fn());

    expect(tasks).toContain(newTask);
  });

  test('should call the renderTasks and saveTasks functions', () => {
    const renderTasksMock = jest.fn();
    const saveTasksMock = jest.fn();
    addTask('Do laundry', [], renderTasksMock, saveTasksMock);

    expect(renderTasksMock).toHaveBeenCalled();
    expect(saveTasksMock).toHaveBeenCalled();
  });

  test('should not add a task to the tasks array when the new task is an empty string', () => {
    const tasks = [];
    const newTask = '';

    addTask(newTask, tasks, jest.fn(), jest.fn());

    expect(tasks).not.toContain(newTask);
    expect(tasks).toHaveLength(0);
  });
});

describe('deleteTask', () => {
  test('should remove a task from the tasks array', () => {
    const tasks = ['Do laundry', 'Buy groceries', 'Clean the house'];

    deleteTask('Buy groceries', tasks, jest.fn(), jest.fn());

    expect(tasks).not.toContain('Buy groceries');
    expect(tasks).toHaveLength(2);
  });

  test('should call the renderTasks and saveTasks functions', () => {
    const renderTasksMock = jest.fn();
    const saveTasksMock = jest.fn();
    deleteTask('Do laundry', ['Do laundry'], renderTasksMock, saveTasksMock);

    expect(renderTasksMock).toHaveBeenCalled();
    expect(saveTasksMock).toHaveBeenCalled();
  });

  test('should not remove a task from the tasks array when the task is not in the array', () => {
    const tasks = ['Do laundry', 'Buy groceries', 'Clean the house'];

    deleteTask('Wash dishes', tasks, jest.fn(), jest.fn());

    expect(tasks).toContain('Do laundry');
    expect(tasks).toContain('Buy groceries');
    expect(tasks).toContain('Clean the house');
    expect(tasks).toHaveLength(3);
  });
});