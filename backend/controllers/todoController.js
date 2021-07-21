const todoController = {}
const Todo = require('../models/todoModel')

todoController.getAllToDos = (req,res,next)=>{
  try{
    Todo.find({}, (err,todos)=>{
      // res.send(todos)
      //??? Why do I not need to parse the data???
      // console.log('Todos: ',todos)
      res.locals.todos = todos;
      return next()
    })
  }
  catch(err){
    return next({
      log: 'todoController.getAllToDos: ERROR: Error getting todos data from the database',
      message: { err: `Error occurred in todoController.getAllToDos. err log: ${err}` },
    });
  }
}

todoController.addTodo = (req,res,next)=>{
  console.log('in controller')
  try{
    const description = req.body.description;
    Todo.create({description}, (err, todo)=>{
      
      res.locals.todo = todo;
      return next()
    })
  }
  catch(err){
    return next({
      log: 'todoController.addTodo: ERROR: Error getting todos data from the database',
      message: { err: `Error occurred in todoController.addTodo. err log: ${err}` },
    });
  }
}

todoController.removeTodo = (req,res,next)=>{
  console.log('in put controller')
  try{
    const {description: description} = req.body
    Todo.findOneAndDelete({description}, (err,deletedTodo)=> {
      res.locals.todo = deletedTodo;
      return next()
    })  
  }
  catch(err){
    return next({
      log: 'todoController.addTodo: ERROR: Error getting todos data from the database',
      message: { err: `Error occurred in todoController.addTodo. err log: ${err}` },
    });
  }
}


todoController.updateTodo = (req,res,next)=>{
  console.log('in put controller')
  try{
    const filter = {description: req.body.description}
    const update = {completed: true}
    Todo.findOneAndUpdate(filter, update, (err,updatedTodo)=> {
      
      res.locals.todo = updatedTodo;
      return next()
    })  
  }
  catch(err){
    return next({
      log: 'todoController.addTodo: ERROR: Error getting todos data from the database',
      message: { err: `Error occurred in todoController.addTodo. err log: ${err}` },
    });
  }
}


module.exports=todoController;