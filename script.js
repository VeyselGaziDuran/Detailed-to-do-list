//! Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter");

//! Alerts
const alertWarning = document.querySelector(".alert-warning");
const alertSuccess = document.querySelector(".alert-success");

//! Functions
function addTodo(e) {
    e.preventDefault();

    const isEmpty = str => !str.trim().length;

    if(isEmpty(todoInput.value)){
      alertWarning.style.display = "block";
      setTimeout(() => {
        alertWarning.style.display = "none";
      }, 1500);
    }else{
      alertSuccess.style.display = "block";
      setTimeout(() => {
        alertSuccess.style.display = "none";
      }, 1500);

      // clear todo input value
    todoInput.value = "";

      // creat todo div
    const todoDIv = document.createElement("div");
    todoDIv.classList.add("todo");

    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
    completedButton.classList.add("complete-btn");
    todoDIv.appendChild(completedButton);

    // creat todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDIv.appendChild(newTodo);

    //check trash button
    const trasButton = document.createElement("button");
    trasButton.innerHTML = "<i class='fa fa-minus-circle'></i>";
    trasButton.classList.add("tresh-btn");
    todoDIv.appendChild(trasButton);

    // append to list
    todoList.appendChild(todoDIv);

    // clear todo input value
    todoInput.value = "";

    }

    

  }

//! Events
todoButton.addEventListener("click", addTodo);




