function getDataFromLocalStorage() {
    if (localStorage.getItem('New Tasks') === null) {
        var taskArr = [];
        return taskArr;
    }

    taskArr = JSON.parse(localStorage.getItem('Tasks'));
    return taskArr;
}

function saveDataToLocalStorage(taskName, duration) {
    task = {}
    task.id = Date.now();
    task.name = taskName;
    task.createdTime = duration;
    task.isDeleted = false;

    var taskArr = getDataFromLocalStorage();

    taskArr.push(task);
    localStorage.setItem('New Tasks', JSON.stringify(taskArr));
}

function deleteDataFromLocalStorage(taskName) {
    var taskArr = getDataFromLocalStorage();

    for (var i = 0; i < taskArr.length; i++) {
        if (taskArr[i].isDeleted == false && taskArr[i].name == taskName) {
            console.log(taskName);
            taskArr[i].isDeleted = true;
        }
    }

    localStorage.setItem('Tasks', JSON.stringify(taskArr));
}

function renderDOM(task, duration) {
    var ul = document.getElementById("taskLists");
    ul.classList.add("task");
    var list = document.createElement("li")
    list.innerText = task + "     ..." + duration;
    list.classList.add("task-name");
    ul.appendChild(list);

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = " - ";
    deleteBtn.classList.add("delbtn");
    ul.appendChild(deleteBtn);
    taskList.appendChild(ul);
}

function deleteElementData(element) {
    element.remove();
}

var taskListener = document.getElementById('taskInfo');
var taskList = document.getElementById('taskLists');
var delbtn = document.querySelectorAll('delbtn');

taskListener.addEventListener('keyup', addTask);
taskList.addEventListener('click', deleteTask);
document.addEventListener('DOMContentLoaded', loadDOM);


function addTask(e) {
    if (e.keyCode == '13') {
        e.preventDefault();

        if (taskListener.value != "") {
            var duration = moment.duration(1, 'seconds').humanize();
            renderDOM(taskListener.value, duration);
            saveDataToLocalStorage(taskListener.value, duration);
        }
        taskListener.value = "";
    }
}

function loadDOM() {
    var taskArr = getDataFromLocalStorage();

    for (var i = 0; i < taskArr.length; i++) {
        if (taskArr[i].isDeleted == false) {
            renderDOM(taskArr[i].name, task[i].createdTime);
        }
    }
}

function deleteTask(e) {
    var element = e.target;
    if (element.classList[0] == 'delbtn') {
        deleteElementData(element.parentElement);
        deleteDataFromLocalStorage(element.parentElement.children[0].innerText);
    }
}

