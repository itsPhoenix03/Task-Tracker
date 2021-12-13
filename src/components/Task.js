import React from "react";

const Task = ({ task, onDelete, onReminder }) => {
  // console.log(task);
  return (
    <>
      {task.map((item) => {
        return (
          <div
            key={item.id}
            className={`task ${item.reminder ? "reminder" : ""}`}
            onDoubleClick={() => onReminder(item.id)}
          >
            <h3>
              {item.task}
              <span className="delete-btn" onClick={() => onDelete(item.id)}>
                X
              </span>
            </h3>
            <span>
              {item.date}, {item.day} | {item.time}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Task;
