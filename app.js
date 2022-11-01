const newTaskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = (taskValue) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task-list__task");
    
    const checkBox = document.createElement("input");
    checkBox.classList.add("task-list__input-checkbox");
    checkBox.type="checkbox";
    
    const taskInput = document.createElement("input");
    taskInput.classList.add("task-list__input");
    taskInput.value = taskValue;
    taskInput.type="text";
    
    const editButton = document.createElement("button");
    editButton.classList.add("edit-task__button");
    editButton.classList.add("button");
    editButton.innerText="Edit";
    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task__button");
    deleteButton.classList.add("button");

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("button__img");
    deleteButtonImg.src="./remove.svg";
    deleteButtonImg.alt="delete";

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(taskInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}
const addTask = () => {
    if (!newTaskInput.value) return;
    let listItem = createNewTaskElement(newTaskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    newTaskInput.value="";
}
const editTask = function() {
    let listItem = this.parentNode;
    const editBtn = listItem.querySelector(".edit-task__button");
    const containsClass = listItem.classList.contains("task-list__task_editable");
    
    if(containsClass){
        editBtn.innerText = "Edit";
    }else{
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("task-list__task_editable");
};
const deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    
    ul.removeChild(listItem);
}
const taskCompleted = function() {
    let listItem = this.parentNode;
    listItem.classList.add("task-list__task_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
const taskIncomplete = function() {
    let listItem = this.parentNode;
    listItem.classList.remove("task-list__task_completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

const bindTaskEvents = (taskListItem,checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector(".task-list__input-checkbox");
    const editButton = taskListItem.querySelector(".edit-task__button");
    const deleteButton = taskListItem.querySelector(".delete-task__button");
    
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}
for (let i=0; i< incompleteTaskHolder.children.length; i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
for (let i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}