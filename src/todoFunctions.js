const addTask = (newTask, tasks, renderTasks, saveTasks) => {
  if (newTask.trim() !== "") {
    tasks.push(newTask);
    renderTasks();
    saveTasks();
  }
};

const deleteTask = (taskToDelete, tasks, renderTasks, saveTasks) => {
  const index = tasks.indexOf(taskToDelete);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
  }
};

const editTask = (taskToEdit, span, renderTasks, saveTasks) => {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = taskToEdit.description;
  span.replaceWith(input);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const newDescription = input.value.trim();
      if (newDescription !== "") {
        taskToEdit.description = newDescription;
        input.replaceWith(span);
        renderTasks();
        saveTasks();
      }
    }
  });
};

export { addTask, deleteTask, editTask };
