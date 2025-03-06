document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setDarkMode();
});
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const existingTask = [...document.querySelectorAll("#taskList li")].map(
    (li) => li.firstChild.textContent
  );
  if (existingTask.includes(taskText)) {
    alert("task already exists!");
    return;
  }
  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);
  saveTask();
  taskInput.value = "";
}
addTaskButton.addEventListener("click", addTask);

function createTaskElement(text) {
  const li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTask();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      saveTask();
    }
  });
  li.appendChild(deleteBtn);
  return li;
}

function saveTask() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}
function setDarkMode() {
  const darkMode = document.getElementById("DarkMode");
  if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("darkmode");
    darkMode.textContent = "Light Mode";
  } else {
    document.text = "Dark Mode";
  }
  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");

    const isDarkMode = document.body.classList.contains("darkmode");
    localStorage.setItem("darkmode", isDarkMode);
    darkMode.textContent = isDarkMode ? "Light Mode" : "DarkMode";
  });
}
