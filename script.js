let todosCont = document.querySelector('.todosCont'); 
let submitTodo = document.querySelector('.submitTodo'); 
let todoInput = document.querySelector('.todoInput'); 
let removeTodo = document.querySelector('.removeTodo'); 
let reloadBtn = document.querySelector('.reloadBtn'); 
todoInput.select(); 

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoyYbhjc5WTIWEbdU7mb8PegxeOMdJAXE",
  authDomain: "todolistapp-31c64.firebaseapp.com",
  databaseURL: "https://todolistapp-31c64-default-rtdb.firebaseio.com",
  projectId: "todolistapp-31c64",
  storageBucket: "todolistapp-31c64.appspot.com",
  messagingSenderId: "615675702638",
  appId: "1:615675702638:web:0b180b07f55350c6db657f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(); 


let todoTextItem; 
let todoItem; 
function getData(todoItem) {
  const dbRef = ref(db); 
  
  get(child(dbRef, 'todo/')) 
  .then((todo_items) => {
    todo_items.forEach((todoNode) => {
      let todoArray = []; 
      todoArray.push(todoNode.val())
      todoItem = document.createElement('div'); 
      todoItem.classList.add('todoItem'); 
      todoTextItem = document.createElement('h1'); 
      todoTextItem.textContent = todoArray[0]; 
      todoItem.appendChild(todoTextItem)
      todosCont.appendChild(todoItem); 
      console.log(todoArray);  

    })
  })
}

function setData(todoItem) {
  set(ref(db, 'todo/' + todoInput.value), todoInput.value)
  .then(() => {
    todoItem = document.createElement('div'); 
    todoItem.classList.add('todoItem'); 
    todoTextItem = document.createElement('h1'); 
    todoTextItem.textContent = todoInput.value; 
    todosCont.appendChild(todoItem); 
    todoItem.appendChild(todoTextItem)
    todoInput.value = ''; 
    console.log('data added success')
  })
  .catch((err) => {
    console.log(err.message); 
  })
}
function selectData() {
  todoInput.value = todoTextItem.textContent; 
}

function removeData() {
  if (todoInput.value === '') {
    remove(ref(db, 'todo/'))
    .then(() => {
      location.reload(); 
      console.log('removed all data')
    })
    .catch((err) => {
      console.log(err.message); 
    })
    location.reload(); 
  } else {
    remove(ref(db, 'todo/' + todoInput.value))
    .then(() => {
      location.reload(); 
      console.log('success'); 
    })
    .catch((err) => {
      console.log(err.message); 
    })
  }
}

function reloadPage() {
  location.reload(); 
}
getData(); 

submitTodo.addEventListener('click', setData ); 
removeTodo.addEventListener('click', removeData); 
reloadBtn.addEventListener('click', reloadPage)
todoInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    // e.preventDefault(); 
    document.getElementById('submit').click(); 
  } else if (e.key === 'Escape') {
    document.getElementById('remove').click(); 
  }
})