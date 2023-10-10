const taskAssignments = [];

function showAddUserForm() {
  document.getElementById('addUserForm').style.display = 'block';
  document.getElementById('assignTaskForm').style.display = 'none';
  document.getElementById('taskStatusForm').style.display = 'none';
}

function showAssignTaskForm() {
  document.getElementById('addUserForm').style.display = 'none';
  document.getElementById('assignTaskForm').style.display = 'block';
  document.getElementById('taskStatusForm').style.display = 'none';
  
  // Show the task list when assigning a task
  document.getElementById('taskListContainer').style.display = 'block';
}

function addUser() {
  const uid = document.getElementById('uidInput').value.trim();
  const userName = document.getElementById('userNameInput').value.trim();
  // Implement adding user functionality based on the UID
  console.log('User added with UID:', uid, 'and Name:', userName);
}

function assignTask() {
  const taskInput = document.getElementById('taskInput').value.trim();
  const assignedUser = document.getElementById('assignedUserInput').value.trim();

  if (taskInput === '' || assignedUser === '') {
    alert('Please enter both a task and the assigned user.');
    return;
  }

  let taskAssignment = {
    user: assignedUser,
    task: taskInput,
    status: 'In Progress',
  };

  taskAssignments.push(taskAssignment);
  displayTasks();
  document.getElementById('taskInput').value = '';
  document.getElementById('assignedUserInput').value = '';
}

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  for (const [index, assignment] of taskAssignments.entries()) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `<span class="userName">${assignment.user}:</span> ${assignment.task} <span class="taskStatus">${assignment.status}</span> <button onclick="showTaskStatusButtons(${index})">Update Status</button>`;
    taskList.appendChild(taskItem);
  }
}

function showTaskStatusButtons(index) {
  const taskStatusForm = document.getElementById('taskStatusForm');
  taskStatusForm.style.display = 'block';
  taskStatusForm.dataset.taskIndex = index;
}

function updateTaskStatus(status) {
  const index = parseInt(document.getElementById('taskStatusForm').dataset.taskIndex);

  if (!isNaN(index) && index >= 0 && index < taskAssignments.length) {
    taskAssignments[index].status = status;
    displayTasks();
    hideTaskStatusForm();
  } else {
    alert('Invalid task index.');
  }
}

function hideTaskStatusForm() {
  document.getElementById('taskStatusForm').style.display = 'none';
  document.getElementById('taskStatusForm').dataset.taskIndex = '';
}

// Initial display of tasks
displayTasks();
