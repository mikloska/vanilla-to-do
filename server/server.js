const connectDB =require('./config/db')
const express =require('express')
const dotenv =require('dotenv')
const path =require('path')
const todoRoutes = require('./routes/todoRoutes')
const app = express()
const Todo = require('./models/todoModel')

//Needed to recognize requests objects as JSON
app.use(express.json());

//First run config for 
dotenv.config()
connectDB();

//Bring in port from .env file
const PORT = process.env.PORT || 3000;

//Tell express to use static files in client; therefore their paths do not have to be referenced in index.html.
app.use(express.static(path.join(__dirname, '../client')))
//Have express serve index.html
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, '../client/index.html'))
})
//Have express go to todo route
app.use('/', todoRoutes)
//Start up server
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))