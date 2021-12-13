import React, { useState, useEffect } from "react";
// import { Container } from "rsuite";
import Task from "./components/Task";
import "../src/styles/main.scss";
import AddTask from "./components/AddTask";

function App() {
  const [onHide, setOnHide] = useState(true);
  const [task, setTask] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const serverTasks = await fetchTasks();

      setTask(serverTasks);
    };

    getTasks();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Adding Tasks
  const onAdd = async (addedTask) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(addedTask),
    });
    const data = await res.json();

    setTask([...task, data]);
  };

  // Deleting Tasks
  const onDelete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTask(task.filter((item) => item.id !== id));
  };

  // Setting a Reminder on a task
  const onReminder = async (id) => {
    const toggleTask = await fetchTask(id);
    const updatedTask = { ...toggleTask, reminder: !toggleTask.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();
    setTask(
      task.map((item) =>
        item.id === id ? { ...item, reminder: data.reminder } : item
      )
    );
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Task Traker</h1>
          <button
            type="button"
            className="btn"
            onClick={() => setOnHide(!onHide)}
          >
            {onHide ? "Add" : "Close"}
          </button>
        </div>
        {!onHide && <AddTask onAdd={onAdd} />}
        {task.length === 0 ? (
          <span>No Task to show</span>
        ) : (
          <Task task={task} onDelete={onDelete} onReminder={onReminder} />
        )}
      </div>
      <footer>Copyright &copy; 2021</footer>
    </>
  );
}

export default App;
