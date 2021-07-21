const mongoose = require('mongoose')

const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.CONNECTION_URL,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
  })  
    console.log('Connected to MondoDB')
  }catch(err){
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

module.exports =  connectDB