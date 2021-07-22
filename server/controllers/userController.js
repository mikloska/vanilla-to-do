const userController = {}
const User = require('../models/userModel')

userController.createUser = async(req,res,next) => {
  const {username, password} = req.body;
  try{
    const newUser = await User.create({username, password});
    res.locals.id = newUser._doc._id;
    next()
  } catch (err){
    
  }
}