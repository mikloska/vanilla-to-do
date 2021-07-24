const connectDB =require('./config/db')
const express =require('express')
const dotenv =require('dotenv')
const path =require('path')
const todoRoutes = require('./routes/todoRoutes')
const secretRoute = require('./routes/secretRoute')
const app = express()
const cookieParser = require("cookie-parser");

//Needed to recognize requests objects as JSON
app.use(express.json());

app.use(cookieParser())
//First run config for 
dotenv.config()
connectDB();

//Bring in port from .env file
const PORT = process.env.PORT || 3000;

//Tell express to use static files in frontend; therefore their paths do not have to be referenced in index.html.
app.use(express.static('client/assets'))
//Have express serve index.html
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, '../client/views/index.html'))
})

// Send to auth router
app.use('/signin', secretRoute)
//Have express go to todo route
app.use('/api', todoRoutes)
//Start up server
app.get('/secret', (req,res)=>{
  res.sendFile(path.join(__dirname, '../client/views/secret.html'))
})
//Global error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
