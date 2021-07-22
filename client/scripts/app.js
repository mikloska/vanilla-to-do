const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterSelection = document.querySelector(".filter-todo");



const todosFromDB=[]
const getData = async () => {
  
  const response = await fetch('gettodos');
  const data = await response.json();
  data.forEach(element => {
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
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
    if(element.completed === true) todoDiv.classList.toggle('completed');
    //Add new item and button to existing list
    todoList.appendChild(todoDiv);
  })
}
getData()

const deleteTodo = async (index)=>{
  const toBeDeleted = {index: index}
  const response = await fetch('todos',{
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(toBeDeleted)
  });
  const data = await response.json();
  console.log(data);
}

const completeTodo = async (description)=>{
  const toBeCompleted = {description: description}
  const response = await fetch('todos',{
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

async function addTodo(event){
  //stop page from refreshing upon submission
  event.preventDefault();
  

  const inputData = {description: todoInput.value}
  try {
    const {data} = await axios.post('/todos', inputData);
    console.log(data)


  // const {data} = await fetch('/todos', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(inputData),
  //   })
  } catch (error) {
    console.log('error: ', error)
  }
  
  //Create new div to add todo
  const todoDiv = document.createElement('div');
  //Add it to class for styling
  todoDiv.classList.add('todo');
  //Create a list item
  const newTodo = document.createElement('li');
  //Make text of list item equal to what was typed in.
  newTodo.innerText=todoInput.value;
  //Add it to class for styling

  // newTodo.id = data._id
  newTodo.classList.add('todo-item');
  //adding the list item to the todo list created
  todoDiv.appendChild(newTodo);

  // console.log(todoList.childNodes.length)


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

}

function deleteComplete(e){
  const item=e.target;
  if(e.target.classList.contains("delete-button")){
    const todo = e.target.parentElement;
    let todoIndex;
    todo.parentElement.childNodes.forEach((node, index)=>{
      if(node === todo) todoIndex = index
    })
    console.log(todoIndex)
    const todoItem = todo.childNodes[0].innerHTML;
    // console.log('Deleted: ',todo.childNodes)
    deleteTodo(todoIndex)
    todo.remove();
    
  }
  if(item.classList[0]==="complete-button"){
    const todo =item.parentElement    ;
    todo.classList.toggle('completed');
    const todoItem = todo.childNodes[0].innerHTML;
    console.log('Complete: ',todoItem)
    completeTodo(todoItem)
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