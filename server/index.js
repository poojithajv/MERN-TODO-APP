const express=require("express")
const apiRoute=require('./routes/api.js')
const mongoose=require('mongoose')
const cors=require('cors')
require("dotenv").config()
const PORT = process.env.PORT || 3001;
const app=express()

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.json({
        msg:"Welcome To TODO App"
    })
})

app.use('/api',apiRoute)

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 30000,  // 30 seconds
  })
.then(()=>{
    console.log('Database connected successfully')
})
.catch(err=>{
    console.log(err)
})

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server is listening at: ${PORT}`)
})