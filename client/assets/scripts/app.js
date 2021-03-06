const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterSelection = document.querySelector(".filter-todo");

// const secretButtonc=document.getElementById('')



const getData = async () => {
  const response = await fetch('api');
  const data = await response.json();
  data.forEach(element => {
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.id=element._id
    const newTodo = document.createElement('li');
    newTodo.innerText=element.description;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
     //completed button
    const completeButton = document.createElement('button');
    completeButton.innerHTML="complete";
    completeButton.classList.add("complete-button")
    todoDiv.appendChild(completeButton);

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML="delete";
    deleteButton.classList.add("delete-button")
    todoDiv.appendChild(deleteButton);
    
    //Add new item and button to existing list
    todoList.appendChild(todoDiv);
    if(element.completed === true) todoDiv.classList.toggle('completed');
  })
}
getData()

const deleteTodo = async (id)=>{
  console.log('Look here! ', id)
  const toBeDeleted = {_id: id}
  const response = await fetch('api/todos',{
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(toBeDeleted)
  });
  const data = await response.json();
  console.log(data);
}

const completeTodo = async (id)=>{
  const toBeCompleted = {_id: id}
  const response = await fetch('api/todos',{
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(toBeCompleted)
  });
  const data = await response.json();
  console.log('The PUT response is: ', data);
}



todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteComplete);
filterSelection.addEventListener('click', filterTodo);

function addTodo(event){
  // setTimeout(()=>initialPopulate(todosFromDB), 5000)
  //stop page from refreshing upon submission
  event.preventDefault();
  // //Create new div to add todo
  const todoDiv = document.createElement('div');
  //Add it to class for styling
  todoDiv.classList.add('todo');
  //Create a list item
  const newTodo = document.createElement('li');
  //Make text of list item equal to what was typed in.
  newTodo.innerText=todoInput.value;
  //Add it to class for styling
  newTodo.classList.add('todo-item');
  //adding the list item to the todo list created
  todoDiv.appendChild(newTodo);

  const data = {description: newTodo.innerText}
  fetch('/api/todos', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);

  //Create new div to add todo
  // const todoDiv = document.createElement('div');
  //add id
  todoDiv.id = data._id
      //completed button
  const completeButton = document.createElement('button');
  completeButton.innerHTML="complete";
  completeButton.classList.add("complete-button")
  todoDiv.appendChild(completeButton);

  //delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML="delete";
  deleteButton.classList.add("delete-button")
  todoDiv.appendChild(deleteButton);

  //Add new item and button to existing list
  todoList.appendChild(todoDiv);
  //clear the input box
  todoInput.value="";




  })
  .catch((error) => {
    console.error('Error:', error);
  });

}

function deleteComplete(e){
  const item=e.target;
  if(item.classList[0]==="delete-button"){
    const todo =item.parentElement;
    const todoItemID = todo.id;
    console.log('Deleted: ',e.target.parentElement)
    // console.log(todoItem)
    deleteTodo(todoItemID)
    todo.remove();
    
  }
  if(item.classList[0]==="complete-button"){
    const todo =item.parentElement;
    todo.classList.toggle('completed');
    const todoItemID = todo.id;
    console.log('Complete: ',todoItemID)
    completeTodo(todoItemID)
  }
}

function  filterTodo(e){
  const todos=todoList.childNodes;
  console.log(todos)
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all" :
        todo.style.display="flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")) {
          todo.style.display="flex";
        }else{
          todo.style.display="none";
        }
        break;
      case "incomplete":
        if(!todo.classList.contains("completed")){
          todo.style.display="flex";
        }else {
          todo.style.display="none";
        }
        break;
    }
  })
  
}