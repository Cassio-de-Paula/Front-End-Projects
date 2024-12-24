// getting DOM elements
const mainContainer = document.querySelector("#main-container");
const container = document.querySelector(".container");
const toDoContainer = document.querySelector(".to-do-container");
const taskList = document.querySelector(".task-list");
const tasksContainer = document.querySelector(".tasks-container");
const editAreaContainer = document.querySelector(".edit-area-container");
const addTask = document
  .querySelector("#add-task")
  .addEventListener("submit", newTask);
const taskName = document.querySelector("#task-name");
const taskDate = document.querySelector("#task-date");
const listBtn = document
  .querySelector("#list-btn")
  .addEventListener("click", (ev) => {
    showTaskList(ev);
  });
const searchBar = document.querySelector(".search-input");
const searchResultScreen = document.querySelector(".search-result");
const searchResultContainer = document.querySelector(
  ".search-result-container"
);
const searchBtn = document
  .querySelector(".search-btn")
  .addEventListener("click", (ev) => {
    renderSearchList(ev);
  });

const taskArray = [];

class Task {
  constructor(taskName, taskDate) {
    this.taskName = taskName;
    this.taskDate = taskDate;
    this.taskStatus = "Em aberto";
  }
}

var task = new Task();

function newTask(ev) {
  ev.preventDefault();

  var today = new Date();
  var taskDateValue = new Date(taskDate.value);

  if (taskDateValue < today || taskDate.value == "" || taskName.value == "") {
    alert("Por favor, confira os campos e nome e data da tarefa.");
  } else {
    task = new Task(taskName.value, taskDate.value);
    taskArray.push(task);
  }

  taskName.value = "";
  taskDate.value = "";
  taskName.focus();

  console.log(taskArray);
}

function dateFormat(date) {
  let dateToString = date.toString();
  let formatedDate = dateToString.split("-");
  formatedDate.reverse();
  let newDate = formatedDate.join("/");

  return newDate;
}

function showTaskList(ev) {
  ev.preventDefault();

  taskList.classList.add("showing");
  taskList.classList.remove("hidden");

  const homeBtn = document.createElement("button");
  homeBtn.className = "home-btn";
  homeBtn.innerText = "VOLTAR Á TELA INICIAL";
  homeBtn.addEventListener("click", home);

  const btnContainer = document.createElement("div");
  btnContainer.className = "home-btn-container";

  taskArray.map(function (index, taskIndex) {
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-element";
    taskContainer.id = `task-${taskIndex}`;

    const taskTextContainer = document.createElement("div");
    taskTextContainer.className = "task-info";
    taskTextContainer.id = `info-${taskIndex}`;

    const taskTitle = document.createElement("span");
    taskTitle.className = "task-title";
    taskTitle.innerText = taskArray[taskIndex].taskName;

    const taskDateSpan = document.createElement("span");
    taskDateSpan.className = "task-date";
    taskDateSpan.innerText = dateFormat(taskArray[taskIndex].taskDate);

    const taskToolsContainer = document.createElement("div");
    taskToolsContainer.className = "btn-container";

    const checkTaskBtn = document.createElement("button");
    checkTaskBtn.addEventListener("click", checkTask);
    checkTaskBtn.className = "tool-btn check-task-btn";
    checkTaskBtn.id = `check-${taskIndex}`;
    const checkSign = document.createElement("i");
    checkSign.className = "fa-solid fa-check";
    checkSign.id = `check-sign-${taskIndex}`;
    checkTaskBtn.appendChild(checkSign);

    if (taskArray[taskIndex].taskStatus === "Concluída") {
      taskTextContainer.classList.add("done");
      checkTaskBtn.classList.add("checked");
    } else {
    }

    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.addEventListener("click", removeTask);
    removeTaskBtn.className = "tool-btn remove-task-btn";
    removeTaskBtn.id = `remove-${taskIndex}`;
    const removeSign = document.createElement("i");
    removeSign.className = "fa-solid fa-trash-can";
    removeSign.id = `remove-sign-${taskIndex}`;
    removeTaskBtn.appendChild(removeSign);

    const editTaskBtn = document.createElement("button");
    editTaskBtn.addEventListener("click", editTask);
    editTaskBtn.className = "tool-btn edit-task-btn";
    editTaskBtn.id = `edit-${taskIndex}`;
    const editSign = document.createElement("i");
    editSign.className = "fa-regular fa-pencil";
    editSign.id = `edit-sign-${taskIndex}`;
    editTaskBtn.appendChild(editSign);

    const hr = document.createElement("hr");
    hr.id = `hr-${taskIndex}`;
    hr.className = "task-hr";

    taskToolsContainer.append(checkTaskBtn, removeTaskBtn, editTaskBtn);
    taskTextContainer.append(taskTitle, taskDateSpan);
    taskContainer.append(taskTextContainer, taskToolsContainer);
    tasksContainer.appendChild(taskContainer);
    tasksContainer.appendChild(hr);
  });

  btnContainer.append(homeBtn);
  taskList.appendChild(tasksContainer);
  taskList.append(btnContainer);

  toDoContainer.classList.add("hidden");
  toDoContainer.classList.remove("showing");
}

function home() {
  if (taskList.classList.contains("showing")) {
    taskList.classList.add("hidden");
    taskList.classList.remove("showing");
    clearList();
  } else if (searchResultScreen.classList.contains("showing")) {
    searchResultScreen.classList.add("hidden");
    searchResultScreen.classList.remove("showing");
    clearList();
  }

  toDoContainer.classList.add("showing");
  toDoContainer.classList.remove("hidden");
}

function checkTask(ev) {
  ev.preventDefault();

  let task = ev.target;
  let taskId = task.id.toString();
  taskId = taskId.slice(-1);

  const selectedTaskInfo = document.querySelector(`#info-${taskId}`);
  const taskToolBtn = document.querySelector(`#check-${taskId}`);

  if (
    taskToolBtn.classList.contains("checked") &&
    selectedTaskInfo.classList.contains("done")
  ) {
    taskToolBtn.classList.remove("checked");
    selectedTaskInfo.classList.remove("done");
    taskArray[taskId].taskStatus = "";
    taskArray[taskId].taskStatus = "Em aberto";
  } else {
    taskToolBtn.classList.add("checked");
    selectedTaskInfo.classList.add("done");
    taskArray[taskId].taskStatus = "";
    taskArray[taskId].taskStatus = "Concluída";
  }
}

function removeTask(ev) {
  ev.preventDefault();

  let task = ev.target;

  let taskId = task.id.toString();

  taskId = taskId.slice(-1);

  taskArray.splice(taskId, 1);

  const selectedTask = document.querySelector(`#task-${taskId}`);
  const hr = document.querySelector(`#hr-${taskId}`);

  if(tasksContainer.contains(selectedTask)){
    tasksContainer.removeChild(selectedTask);
    tasksContainer.removeChild(hr);
  } else if (searchResultContainer.contains(selectedTask)){
    searchResultContainer.removeChild(selectedTask);
    searchResultContainer.removeChild(hr);
  }

  for (let i = 0; i < taskArray.length; i++) {
    let taskHrList = document.querySelectorAll(".task-hr");
    let taskList = document.querySelectorAll(".task-element");
    let taskInfoList = document.querySelectorAll(".task-info");
    let checkBtnList = document.querySelectorAll(".check-task-btn");
    let removeBtnList = document.querySelectorAll(".remove-task-btn");
    let editBtnList = document.querySelectorAll(".edit-task-btn");

    taskList[i].id = `task-${i}`;
    taskHrList[i].id = `hr-${i}`;
    taskInfoList[i].id = `info-${i}`;
    checkBtnList[i].id = `check-${i}`;
    removeBtnList[i].id = `remove-${i}`;
    editBtnList[i].id = `edit-${i}`;
  }

  console.log(taskArray);
}

function editTask(ev) {
  ev.preventDefault();

  let task = ev.target;

  let taskId = task.id.toString();

  taskId = taskId.slice(-1);

  editAreaContainer.classList.add("showing");
  editAreaContainer.classList.remove("hidden");

  if(taskList.classList.contains('showing')){
    taskList.classList.add("hidden");
    taskList.classList.remove("showing");
  } else if (searchResultScreen.classList.contains('showing')){
    searchResultScreen.classList.add("hidden");
    searchResultScreen.classList.remove("showing");
  }

  const listBtn = document
    .querySelector(".edit-to-list-btn")
    .addEventListener("click", function () {
      editAreaContainer.classList.add("hidden");
      editAreaContainer.classList.remove("showing");
      clearList(ev);
      showTaskList(ev);
    });

  const confirmEditBtn = document.querySelector(".confirm-edit-btn");
  confirmEditBtn.addEventListener("click", function (ev) {
    editAreaContainer.classList.add("hidden");
    editAreaContainer.classList.remove("showing");
    confirmTaskChanges(ev);
  });
  confirmEditBtn.id = `confirm-${taskId}`;

  console.log(task);
}

function confirmTaskChanges(ev) {
  ev.preventDefault();

  let task = ev.target;

  let taskId = task.id.toString();

  taskId = taskId.slice(-1);

  console.log(task);

  console.log(taskArray[taskId].taskName);
  console.log(taskArray[taskId].taskDate);

  const newTaskName = document.querySelector(".edit-name-input");
  const newTaskDate = document.querySelector(".edit-date-input");
  const editAreaContainer = document.querySelector(".edit-area-container");

  if (newTaskDate == "" || newTaskName == "") {
    alert("Selecione um nome e data válidos");
  } else {
    confirm("Deseja alterar os dados desta tarefa?");

    if (confirm) {
      taskArray[taskId].taskName = "";
      taskArray[taskId].taskDate = "";
      taskArray[taskId].taskName = newTaskName.value;
      taskArray[taskId].taskDate = newTaskDate.value;
    } else {
      return;
    }
  }

  editAreaContainer.classList.add("hidden");
  editAreaContainer.classList.remove("showing");

  clearList(ev);
  showTaskList(ev);
}

function clearList() {
    taskList.innerHTML = "";
    tasksContainer.innerHTML = ""
    
    searchResultScreen.innerHTML = "";
    searchResultContainer.innerHTML = "";

}

function searchTask(name) {
  const resultArray = taskArray.filter((task) => {
    return task.taskName === name;
  });

  console.log(resultArray);

  return resultArray;
}

function renderSearchList(ev) {
  ev.preventDefault();
  var taskName = searchBar.value;

  const searchResult = searchTask(taskName);

  console.log(searchResult)

  const btnContainer = document.createElement("div");
  btnContainer.className = "home-btn-container";

  const homeBtn = document.createElement("button");
  homeBtn.className = "home-btn";
  homeBtn.innerText = "VOLTAR Á TELA INICIAL";
  homeBtn.addEventListener("click", home);

  if (searchResult.length > 0) {
    taskArray.filter((task, index) => {
      if (taskArray[index].taskName === taskName) {
        const taskContainer = document.createElement("div");
        taskContainer.className = "task-element";
        taskContainer.id = `task-${index}`;

        var taskTitle = document.createElement("span");
        taskTitle.className = "task-title";

        var taskDateSpan = document.createElement("span");
        taskDateSpan.className = "task-date";

        const taskTextContainer = document.createElement("div");
        taskTextContainer.className = "task-info";
        taskTextContainer.id = `info-${index}`;

        const checkTaskBtn = document.createElement("button");
        checkTaskBtn.addEventListener("click", checkTask);
        checkTaskBtn.className = "tool-btn check-task-btn";
        checkTaskBtn.id = `check-${index}`;
        const checkSign = document.createElement("i");
        checkSign.className = "fa-solid fa-check";
        checkSign.id = `check-sign-${index}`;
        checkTaskBtn.appendChild(checkSign);

        if (taskArray[index].taskStatus === "Concluída") {
          taskTextContainer.classList.add("done");
          checkTaskBtn.classList.add("checked");
        }

        const taskToolsContainer = document.createElement("div");
        taskToolsContainer.className = "btn-container";

        const removeTaskBtn = document.createElement("button");
        removeTaskBtn.addEventListener("click", removeTask);
        removeTaskBtn.className = "tool-btn remove-task-btn";
        removeTaskBtn.id = `remove-${index}`;
        const removeSign = document.createElement("i");
        removeSign.className = "fa-solid fa-trash-can";
        removeSign.id = `remove-sign-${index}`;
        removeTaskBtn.appendChild(removeSign);

        const editTaskBtn = document.createElement("button");
        editTaskBtn.addEventListener("click", editTask);
        editTaskBtn.className = "tool-btn edit-task-btn";
        editTaskBtn.id = `edit-${index}`;
        const editSign = document.createElement("i");
        editSign.className = "fa-light fa-pencil";
        editSign.id = `edit-sign-${index}`;
        editTaskBtn.appendChild(editSign);

        const hr = document.createElement("hr");
        hr.id = `hr-${index}`;
        hr.className = "task-hr";

        taskToolsContainer.append(checkTaskBtn, removeTaskBtn, editTaskBtn);
        taskTextContainer.append(taskTitle, taskDateSpan);
        taskContainer.append(taskTextContainer, taskToolsContainer);
        searchResultContainer.append(taskContainer);
        searchResultContainer.appendChild(hr);
        btnContainer.appendChild(homeBtn);
        searchResultScreen.appendChild(searchResultContainer);
        searchResultScreen.append(btnContainer);
      }
    });


    searchResult.map(() => {
      const titleArray = document.querySelectorAll(".task-title");
      const dateArray = document.querySelectorAll(".task-date");

      console.log(titleArray)
      console.log(dateArray)
      for (let i = 0; i < titleArray.length; i++) {
        titleArray[i].innerText = searchResult[i].taskName;
      }
      for (let i = 0; i < titleArray.length; i++) {
        dateArray[i].innerText = dateFormat(searchResult[i].taskDate);
      }
    });

    toDoContainer.classList.add("hidden");
    toDoContainer.classList.remove("showing");
  } else {
    const notFoundMessage = document.createElement("div");
    notFoundMessage.className = "not-found-message";
    notFoundMessage.innerText = "Nenhuma tarefa corresponde a sua pesquisa.";

    btnContainer.appendChild(homeBtn);
    searchResultContainer.append(notFoundMessage);
    searchResultScreen.appendChild(searchResultContainer);
    searchResultScreen.append(btnContainer);

    toDoContainer.classList.add("hidden");
    toDoContainer.classList.remove("showing");
  }
  searchResultScreen.classList.remove("hidden");
  searchResultScreen.classList.add("showing");
  searchBar.value = "";

  console.log(taskArray);
}
