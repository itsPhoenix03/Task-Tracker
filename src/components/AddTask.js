import React, { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (!task) {
      alert("Enter Task Name!");
      return;
    }
    if (!date) {
      alert("Enter Date!");
      return;
    }
    if (!day) {
      alert("Enter Day!");
      return;
    }
    if (!time) {
      alert("Enter Time!");
      return;
    }

    onAdd({ task, date, day, time, reminder });

    //Set Form to Default
    setTask("");
    setDate("");
    setDay("");
    setTime("");
    setReminder(false);
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="task">Task</label>
        <input
          id="task"
          type="text"
          placeholder="Task Name"
          value={task}
          onChange={(ev) => setTask(ev.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="text"
          placeholder="(ex: 1st January)"
          value={date}
          onChange={(ev) => setDate(ev.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="day">Day</label>
        <input
          id="day"
          type="text"
          placeholder="Week Day"
          value={day}
          onChange={(ev) => setDay(ev.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="text"
          placeholder="24:00hr format"
          value={time}
          onChange={(ev) => setTime(ev.target.value)}
        />
      </div>
      <div className="form-control-check">
        <label htmlFor="reminder">Reminder</label>
        <input
          id="reminder"
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(ev) => setReminder(ev.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Add Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
