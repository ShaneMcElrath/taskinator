
//Creates task and puts in in Tasks To Do section.
var createTaskHandler = function(event) {
    event.preventDefault();

    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(taskItemEl);
}


var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


formEl.addEventListener("submit", createTaskHandler);
