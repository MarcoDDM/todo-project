const addTask = (newTask, tasks, renderTasks, saveTasks) => {
  tasks.push(newTask);
  renderTasks();
  saveTasks();
};

const deleteTask = (taskToDelete, tasks, renderTasks, saveTasks) => {
  tasks.splice(tasks.indexOf(taskToDelete), 1);
  renderTasks();
  saveTasks();
};

const editTask = (taskToEdit, span, renderTasks, saveTasks) => {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = taskToEdit.description;
  span.replaceWith(input);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      taskToEdit.description = input.value.trim();
      input.replaceWith(span);
      renderTasks();
      saveTasks();
    }
  });
};

export { addTask, deleteTask, editTask };
