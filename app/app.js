/******************************/
/***   GLOBAL VARIABLES     ***/
/******************************/

const form = document.getElementById('form');
const userInput = document.getElementById('todo-input');
const toDoContainer = document.querySelector('.todo-list');
const todo = document.querySelector('.todo');
const todos = document.querySelectorAll('.todo');
const todoLeft = document.querySelector('.todo-amount');
// const todoItemList2 = document.querySelectorAll('li');
const todoItemList = document.getElementsByTagName('li');
const clearCompleted = document.querySelector('.clear-btn');
const selection = document.querySelector('.selector');
const switchTabs = document.querySelectorAll('.switch');
const theme = document.querySelector('.night-day');
const body = document.querySelector('body');
const headImg = document.querySelector('.heading-background');
const forminput = document.querySelector('.form-input-container');
const todobackgeound = document.querySelector('.todo-conatiner');
const amount = document.querySelector('.data');
const circle = document.querySelector('.circle');
// const selectionTheme = document.querySelector('.style.selector');

const todoLS = JSON.parse(localStorage.getItem('todos'));

if (todoLS) {
  todoLS.forEach((todo) => {
    console.log(todo);
    let todoItem = `
    <div class="todo">
        <div class="circle"></div>
        <li class="todo-item">${todo.text}</li>
        <div class="remove hidden"><img src="./images/icon-cross.svg" alt=""></div>
    </div>
`;
    // Add new todo to DOM
    toDoContainer.insertAdjacentHTML('afterbegin', todoItem);
  });
}

/******************************/
/***       FUNCTION         ***/
/******************************/

function submitForm(e) {
  e.preventDefault();
  if (userInput.value.length > 0 && userInput.value !== '') {
    createToDo();
  }
}

function createToDo() {
  let todoItem = `
    <div class="todo">
        <div class="circle"></div>
        <li class="todo-item">${userInput.value}</li>
        <div class="remove hidden"><img src="./images/icon-cross.svg" alt=""></div>
    </div>
`;
  // Add new todo to DOM
  toDoContainer.insertAdjacentHTML('afterbegin', todoItem);

  // Clear user Input
  userInput.value = '';

  // updateLS();
  toDoCounter();
}

function addDelete(e) {
  let item = e.target;

  // Add and remove 'complete class'
  if (item.classList.contains('todo')) {
    item.classList.toggle('complete');
    item.firstElementChild.classList.toggle('complete');
    // updateLS();
  }
  // Remove Element form DOM
  if (item.classList.contains('remove')) {
    item.parentElement.remove();
    updateLS();
  }
  toDoCounter();
}

function toDoCounter() {
  // item left counter
  let itemsLeft = 0;
  let list = [];

  [].forEach.call(todoItemList, (child) => {
    list.push(child.parentElement);
  });

  // loop through list and skip any element with the class of complete
  for (const x of list) {
    if (x.classList.contains('complete')) continue;

    // add one for every element that is not skipped
    itemsLeft++;
  }

  todoLeft.innerHTML = `${itemsLeft} items left`;
}

function clearBtn() {
  //remove all completed item from DOM
  [...todoItemList].forEach((item) => {
    if (item.parentElement.classList.contains('complete')) {
      item.parentElement.remove();
    }
  });
  updateLS();
}

selection.addEventListener('click', function (e) {
  const clicked = e.target.closest('.switch');

  // remove active from each before adding to clicked emement
  switchTabs.forEach((switchTab) => {
    switchTab.classList.remove('active');
  });

  if (!clicked) return;

  clicked.classList.add('active');

  /*// OR
	if (clicked) {
		clicked.classList.add('active');
	}*/
});

function filterOption(e) {
  let selected = e.target.innerText;
  [...todoItemList].forEach((item) => {
    let todo = item.parentElement;
    switch (selected) {
      // Shaw all item
      case 'All':
        if (todo) {
          todo.style.display = 'flex';
        }
        break;
      // Show uncompleted Item
      case 'Active':
        if (todo.classList.contains('complete')) {
          todo.style.display = 'none';
        } else {
          todo.style.display = 'flex';
        }
        break;
      // Show Completed Item
      case 'Completed':
        if (todo.classList.contains('complete')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function updateLS() {
  const todosArr = [];
  todos.forEach((todo) => {
    todosArr.push({
      text: todo.innerText,
      completed: todo.classList.contains('complete'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(todosArr));
}

function themeSwitch() {
  body.classList.toggle('light-theme');
  theme.classList.toggle('light-theme');
  headImg.classList.toggle('light-theme');
  forminput.classList.toggle('light-theme');
  todobackgeound.classList.toggle('light-theme');
  amount.classList.toggle('light-theme');
  selection.classList.toggle('light-theme');
  circle.classList.toggle('light-theme');
}

/******************************/
/***    EVENTLISTENER       ***/
/******************************/

form.addEventListener('submit', submitForm);
toDoContainer.addEventListener('click', addDelete);
clearCompleted.addEventListener('click', clearBtn);
selection.addEventListener('click', filterOption);
theme.addEventListener('click', themeSwitch);
