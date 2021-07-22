const todoController = {}
const Todo = require('../models/todoModel')

todoController.getAllToDos = async (req,res,next)=>{
  try{
    res.locals.todos = await Todo.find()
    return next()
  }
  // try{
  //   Todo.find({}//, (err,todos)=>{
  //     // res.send(todos)
  //     //??? Why do I not need to parse thedata???
  //     // console.log('Todos: ',todos)

  //   // }
  //   )
  //   res.locals.todos = todos;
  //   //??Why does the return have to be in here?
  //   return next()
  // }
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
    Todo.create(req.body, (err, todo)=>{
      
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
    const {index} = req.body
    
    Todo.findOneAndDelete({index}, (err,deletedTodo)=> {

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
      

    })  
    res.locals.todo = updatedTodo;
    return next()
  }
  catch(err){
    return next({
      log: 'todoController.addTodo: ERROR: Error getting todos data from the database',
      message: { err: `Error occurred in todoController.addTodo. err log: ${err}` },
    });
  }
}


module.exports=todoController;