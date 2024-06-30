const express=require('express')
const mongoose=require('mongoose');


const app=express()
mongoose.connect('mongodb+srv://user:user@cluster0.pfionep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=>console.log("DB Connected")
)

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.listen(5000,()=>{
    console.log('server is running')
})