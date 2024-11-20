// creating an empty array for storing todos
let demoarray = [];

// Function for rendering todo items from the array
function renderTodo(todo) {
  localStorage.setItem("demoarray", JSON.stringify(demoarray));

  const list = document.querySelector(".todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  // If item is marked for deletion, remove it from the list
  if (todo.deleted) {
    if (item) {
      item.remove();
    }
    return;
  }

  const isChecked = todo.checked ? "done" : "";

  // Create a new list item for the todo
  const newList = document.createElement("li");
  newList.setAttribute("class", `todo-item ${isChecked}`);
  newList.setAttribute("data-key", todo.id);
  newList.innerHTML = `
    <input id="checkbox-${todo.id}" type="checkbox" class="js-tick" ${todo.checked ? "checked" : ""}/>
    <label for="checkbox-${todo.id}" class="tick js-tick"></label>
    <span>${todo.x}</span>
    <button class="delete-todo js-delete-todo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
    </button>
  `;

  // If item exists, replace it; else append new item
  if (item) {
    list.replaceChild(newList, item);
  } else {
    list.append(newList);
  }
}

// Function for adding a new todo item
function myFunction(x) {
  const todoObject = {
    x,
    checked: false,
    id: Date.now(),
  };

  // Add the new todo to the array
  demoarray.push(todoObject);

  renderTodo(todoObject);
}

// Toggle the completion status of a todo
function toggleDone(todoId) {
  const index = demoarray.findIndex((todo) => todo.id === Number(todoId));
  if (index !== -1) {
    demoarray[index].checked = !demoarray[index].checked;
    renderTodo(demoarray[index]);
  }
}

// Delete a todo item from the array
function deleteTodo(todoId) {
  const index = demoarray.findIndex((todo) => todo.id === Number(todoId));
  if (index !== -1) {
    const deletedTodo = {
      deleted: true,
      ...demoarray[index],
    };
    demoarray = demoarray.filter((todo) => todo.id !== Number(todoId));
    renderTodo(deletedTodo);
  }
}

// Select form and add event listener for submitting new todos
const form = document.querySelector(".formselect");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".inputselect");
  const text = input.value.trim();

  if (text !== "") {
    myFunction(text); // Add new todo
    input.value = ""; // Clear input field
  }
});

// Select the entire list to handle dynamic actions (checkbox toggle and delete)
const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  const itemKey = event.target.closest("li")?.dataset.key;

  if (event.target.classList.contains("js-tick")) {
    toggleDone(itemKey); // Toggle todo completion
  }

  if (event.target.classList.contains("js-delete-todo")) {
    deleteTodo(itemKey); // Delete todo
  }
});

// Load todos from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = localStorage.getItem("demoarray");
  if (savedTodos) {
    demoarray = JSON.parse(savedTodos);
    demoarray.forEach((todo) => renderTodo(todo));
  }
});

// Theme Toggle (Light/Dark mode)
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

// Switch theme based on checkbox
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
