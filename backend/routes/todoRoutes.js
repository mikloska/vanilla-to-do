const router = require('express').Router()
const Todo = require('../models/todoModel')
const path =require('path')


router.get('/gettodos', (req,res)=>{
  Todo.find({}, (err,todos)=>{
    res.send(todos)
    console.log(todos)
  })
})

router.post('/todos', (req,res)=> {
  const description = req.body.description;
  Todo.create({description}, (err, todo)=>{
    return res.status(200).json(todo);
  })

})

module.exports=router