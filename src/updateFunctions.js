function updateTaskStatus(task, tasks, renderTasks, saveTasks) {
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function clearCompletedTasks(tasks, renderTasks, saveTasks) {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}
