import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/gettask").then(
      res => setItems(res.data)
    ).catch(err => console.log(err));
  }, []);

  const changeHandler = e => {
    setTask(e.target.value);
  }

  const submitHandler = e => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:5000/updatetask/${currentTaskId}`, { todo: task }).then(
        res => setItems(res.data)
      ).catch(err => console.log(err));
      setIsEditing(false);
      setCurrentTaskId(null);
    } else {
      axios.post('http://localhost:5000/addtask', { todo: task }).then(
        res => setItems(res.data)
      ).catch(err => console.log(err));
    }
    setTask('');  // Clear the input field after submission
  }

  const deleteHandler = id => {
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      res => setItems(res.data)
    ).catch(err => console.log(err));
  }

  const editHandler = task => {
    setTask(task.todo);
    setIsEditing(true);
    setCurrentTaskId(task._id);
  }

  return (
    <div className="App">
      <center>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Enter your task" value={task} onChange={changeHandler} />
          <input type='submit' value={isEditing ? "Update" : "Add"} />
        </form>
        <div className="task-list">
          {
            items.map(task => (
              <div className="task" key={task._id}>
                <h1>{task.todo}</h1>
                <button className="edit-btn" onClick={() => editHandler(task)}>Edit</button>
                <button onClick={() => deleteHandler(task._id)}>Delete</button>
              </div>
            ))
          }
        </div>
      </center>
    </div>
  );
}

export default App;
