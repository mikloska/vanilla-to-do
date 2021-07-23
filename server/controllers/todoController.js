const todoController = {}
const Todo = require('../models/todoModel')

todoController.getAllToDos = async (req,res,next)=>{
  try{
    res.locals.todos = await Todo.find({}, (err,todos)=>{
    })
    return next()
  }
  catch(err){
    return next({
      log: 'todoController.getAllToDos: ERROR: Error getting todos from the database',
      message: { err: `Error occurred in todoController.getAllToDos. err log: ${err}` },
    });
  }
}

todoController.addTodo = async (req,res,next)=>{
  console.log('in add controller. Req.body is: ', req.body)
  try{

    res.locals.todo = await Todo.create({description:req.body.description}

    )
    return next()
  }
  catch(err){
    return next({
      log: 'todoController.addTodo: ERROR: Error adding todo to the database',
      message: { err: `Error occurred in todoController.addTodo. err log: ${err}` },
    });
  }
}

todoController.removeTodo = (req,res,next)=>{
  console.log('in remove controller, req.body is: ',req.body)
  try{
    const {_id: _id} = req.body
    Todo.findOneAndDelete({_id}, (err,deletedTodo)=> {
      res.locals.todo = deletedTodo;
      return next()
    })  
  }
  catch(err){
    return next({
      log: 'todoController.addTodo: ERROR: Error removing todo from the database',
      message: { err: `Error occurred in todoController.addTodo. err log: ${err}` },
    });
  }
}


todoController.updateTodo = async (req,res,next)=>{
  console.log('in put controller, req.body is: ',req.body)
  try{
    const filter = {_id: req.body._id}
    const update = {completed: true}
    res.locals.todo = await Todo.findOneAndUpdate(filter, update, (err,updatedTodo)=> {
      
      // res.locals.todo = updatedTodo;
      
    })  
    return next()
  }
  catch(err){
    return next({
      log: 'todoController.addTodo: ERROR: Error updating todo from the database',
      message: { err: `Error occurred in todoController.addTodo. err log: ${err}` },
    });
  }
}

todoController.login = async (req,res,next)=>{
  console.log('in add controller. Req.body is: ', req.body)
  try{
    // const entry = new Todo({description: req.body.description})
    const {description: description} = req.body
    await Todo.create({description:req.body.description}, (err, todo)=>{
      
      res.locals.todo = todo;
      return next()
    })
  }
  catch(err){
    return next({
      log: 'todoController.addTodo: ERROR: Error adding todo to the database',
      message: { err: `Error occurred in todoController.addTodo. err log: ${err}` },
    });
  }
}


module.exports=todoController;