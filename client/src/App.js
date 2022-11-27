import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import config from './config/main.js';
import './App.css';
import Item from './components/Item.js'

function App() {

  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  const fetchToDo = useCallback(() =>{
    axios.get(`https://localhost:${config.PORT}/get-todo`)
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchToDo();
  }, []);
  
  const addUpdateTodo = () => {

    if (isUpdating === "") {
      axios.post(`https://localhost:${config.PORT}/add-todo`, { text })
        .then((res) => {
          console.log(res.data);
          setText("");
          fetchToDo();
        })
        .catch((err) => console.log(err));
    }else{
      axios.post(`https://localhost:${config.PORT}/update-todo`, { _id: isUpdating, text })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
          fetchToDo();
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteTodo = (_id) => {
    axios.post(`https://localhost:${config.PORT}/delete-todo`, { _id })
      .then((res) =>{
        console.log(res.data)
        fetchToDo();
      })
      .catch((err) => console.log(err));
  }

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    setText(text);
    fetchToDo();
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder='Write Something...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <div className="add"
            onClick={addUpdateTodo}>{isUpdating ? "Update" : "Add"}</div>
        </div>

        <div className="list">
          {todo.map(item => <Item
            key={item._id}
            text={item.text}
            remove={() => deleteTodo(item._id)}
            update={() => updateTodo(item._id, item.text)} />)}
        </div>

      </div>
    </div>
  );
}

export default App;
