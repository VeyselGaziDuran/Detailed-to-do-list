// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter");
const successAlert = document.querySelector(".alert-success");
const warningAlert = document.querySelector(".alert-warning");

// Events
document.addEventListener("DOMContentLoaded", function() {
  getTodos()
})
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("change", filterTodo);

// Functions
function addTodo(e) {
  e.preventDefault();

  const todoText = todoInput.value.trim();

  // alert todo
  if (todoText === "") {
    showAlert(warningAlert);
  } else {
    showAlert(successAlert);

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    savelocalTodos(todoInput.value);

    const newTodo = document.createElement("li");
    newTodo.innerText = todoText;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}


// delete todo
function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  if (item.classList.contains("complete-btn")) {
    todo.classList.toggle("completed");
  } else if (item.classList.contains("trash-btn")) {
    todo.classList.add("fall");
    removeLocalStorage(todo)
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
}


// filter todo
function filterTodo() {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (todoFilter.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function showAlert(alertDiv) {
  alertDiv.style.display = "block";
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 1500);
}


// Local Storage
function savelocalTodos(todo) {
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo)=>{
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    savelocalTodos(todoInput.value);

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
  })
}


function removeLocalStorage(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}

