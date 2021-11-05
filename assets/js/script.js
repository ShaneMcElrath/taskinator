
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


//Takes users input the form and stores it in an object called "taskDataObj"
//then calls createTaskEl(taskDataObj);.
var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //If form has an empty input or select return.
    if(!taskNameInput || !taskTypeInput) {
        alert("you need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
      } 
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
      
        createTaskEl(taskDataObj);
    }


    
}

//Creates task item and displayes it.
var createTaskEl = function(taskDataObj) {

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.appendChild(taskInfoEl);
    listItemEl.setAttribute("data-task-id", taskIdCounter);


    var taskActionsEl = createTaskActions(taskIdCounter);

    taskIdCounter++;

    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

}

var createTaskActions = function(taskId) {

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId)

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    actionContainerEl.appendChild(editButtonEl);
    actionContainerEl.appendChild(deleteButtonEl);
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        statusSelectEl.appendChild(statusOptionEl);
      }

    return actionContainerEl;
}

var taskButtonHandler = function(event) {

    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var deleteTask = function(taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

var editTask = function(taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}

var completeEditTask = function(taskName, taskType, taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var taskStatusChangeHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }
}



formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
