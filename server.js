const express = require('express');
const mongoose = require('mongoose');
const Task = require('./model'); // Import the model, not the schema
const cors=require('cors')

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
})) 

mongoose.connect('mongodb+srv://user:user@cluster0.pfionep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err)); 

app.post('/addtask', async (req, res) => {
  const { todo } = req.body;
  try {
    const newData = new Task({ todo });
    await newData.save();
    return res.json(await Task.find()); // Use Task instead of TaskSchema
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error adding task' }); // Return an error response
  }
});
app.get('/gettask', async(req, res) => {
    try{
return res.json(await Task.find())
    }catch(err){
console.log(err);
    }
  });
  
app.delete('/delete/:id',async(req,res)=>{
    try{
await Task.findByIdAndDelete(req.params.id)
return res.json(await Task.find())
    }catch(err){
       console.log(err)
    }
})
app.put('/updatetask/:id', async (req, res) => {
    const { todo } = req.body;
    try {
      await Task.findByIdAndUpdate(req.params.id, { todo });
      return res.json(await Task.find());
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error updating task' });
    }
  });
app.listen(5000, () => {
  console.log('server is running')
});