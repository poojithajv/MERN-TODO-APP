const express=require("express")
const apiRoute=require('./routes/api.js')
const mongoose=require('mongoose')
require("dotenv").config()
const PORT = process.env.PORT || 3001;
const app=express()

app.use(express.json())
app.get('/',(req,res)=>{
    res.json({
        msg:"Welcome To TODO App"
    })
})

app.use('/api',apiRoute)

mongoose.connect(process.env.MONGO_URI)
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