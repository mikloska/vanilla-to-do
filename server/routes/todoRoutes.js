const router = require('express').Router()
const Todo = require('../models/todoModel')
const todoController = require('../controllers/todoController')


router.get('/', 
  todoController.getAllToDos,
  (req,res) => {
    res.status(200) //.json(res.local.todos)  ?????Why can I not chain .send???
    res.send(res.locals.todos)
    // console.log('Response in router: ',res.locals.todos)
  }
)

//Prior to moving to controller
// router.post('/todos', (req,res)=> {
//   const description = req.body.description;
//   Todo.create({description}, (err, todo)=>{
//     return res.status(200).json(todo);
//   })

// })

router.post('/todos', 
  todoController.addTodo,
  (req, res)=> {
    console.log('Response in post todo router: ',res.locals.todo)
    return res.status(200).json(res.locals.todo);
  }
)
//Prior to moving to controller
// router.delete('/todos', (req,res)=> {
//   const {description: description} = req.body
//   Todo.findOneAndDelete({description}, (err,deletedTodo)=> {
//     return res.status(200).json(deletedTodo)
//   })  
// })
router.delete('/todos',
  todoController.removeTodo,
  (req,res)=> {
    console.log('Response in delete todo router: ',res.locals.todo)
    return res.status(200).json(res.locals.todo)
  }

)

//Prior to moving to controller
// router.put('/todos', (req,res)=> {
//   const filter = {description: req.body.description}
//   const update = {completed: true}
//   Todo.findOneAndUpdate(filter, update, (err,updatedTodo)=> {
//     return res.status(200).json(updatedTodo)
//   })  
// })
router.put('/todos', 
  todoController.updateTodo,
  (req, res)=> {
    console.log('Response in post put router: ',res.locals.todo)
    return res.status(200).json(res.locals.todo)
  }
)

//use post as opposed to get, bc we will be creating a new token upon login
router.post('/login', 
  todoController.login,
  (req, res)=> {
    console.log('Response in post login router: ',res.locals.todo)
    return res.status(200).json(res.locals.todo);
  }
)

module.exports=router