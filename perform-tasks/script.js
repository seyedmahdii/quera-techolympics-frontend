document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  let tasks = [];

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    addTask();
  });

  function addTask() {
    const taskName = form.querySelector("#taskName").value;
    const taskTime = form.querySelector("#taskTime").value;
    const taskDuration = form.querySelector("#taskDuration").value;
    const taskDependency = form.querySelector("#taskDependency").value;
    const newTask = {
      name: taskName,
      time: taskTime,
      status: "Scheduled",
      duration: taskDuration,
      dependency: taskDependency,
    };

    const now = new Date().getTime();
    const taskTimeNumber = new Date(taskTime).getTime();

    if (taskTimeNumber < now) {
      showNotification(`Task start time cannot be in the past.`);
      return;
    }

    saveTaskToLocalStorage(newTask);
    form.querySelector("#taskName").value = "";
    form.querySelector("#taskTime").value = "";
    form.querySelector("#taskDuration").value = "";
    form.querySelector("#taskDependency").value = "";
    appendTaskToList(newTask);
  }

  function appendTaskToList(task) {
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.textContent = task.name;
    tr.appendChild(td);

    td = document.createElement("td");
    td.textContent = task.time;
    tr.appendChild(td);

    td = document.createElement("td");
    td.textContent = task.status;
    tr.appendChild(td);

    td = document.createElement("td");
    td.textContent = task.dependency;
    tr.appendChild(td);

    const deleteButton = document.createElement("button");
    deleteButton.style =
      "font-size:16px;background-color:#a83236;background-image:none;color:#fff;cursor:pointer";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      removeTask(
        tasks.findIndex((t) => t.name === task.name),
        task
      );
    };
    td = document.createElement("td");
    td.appendChild(deleteButton);
    tr.appendChild(td);

    taskList.appendChild(tr);
  }

  function updateTaskInDOMAndStorage(task) {}

  function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
  }

  function loadTasksFromLocalStorage() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, i) => {
      appendTaskToList(task);
    });
  }

  function removeTask(row, task) {
    console.log(row);
    console.log(task);
    // tasks = tasks.splice(row, 1);
    // localStorage.setItem("tasks", tasks);
  }

  function showNotificationApi(message) {
    if (Notification.permission === "granted") {
      new Notification(message, {
        body: message,
        icon: "./assets/icon.png",
      });
    }
  }

  function showNotification(message) {
    let container = document.getElementById("notifications-container");

    let notification = document.createElement("div");
    notification.className = "notification";

    let notificationImg = document.createElement("img");
    notificationImg.src = "./assets/icon.png";
    notification.appendChild(notificationImg);

    let notificationSpan = document.createElement("span");
    notificationSpan.innerText = message;
    notification.appendChild(notificationSpan);

    container.appendChild(notification);

    setTimeout(function () {
      container.removeChild(notification);
    }, 3000);
    showNotificationApi(message);
  }

  loadTasksFromLocalStorage();
});
