import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Notiflix from 'notiflix';
// eslint-disable-next-line
import ReactDOM from 'react-dom';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = event => {
    setNewTask(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    } else {
      Notiflix.Report.failure(
        'Notiflix Failure',
        'Будь ласка, введіть текст для завдання',
        'Okay'
      );
      setNewTask('');
    }
  };

  const handleTaskCompletion = taskId => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleTaskDeletion = taskId => {
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div className="container">
      <h2>Список завдань</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Введіть завдання"
            className="form-control"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Додати
            </button>
          </div>
        </div>
      </form>
      {tasks.length > 0 ? (
        <ul className="list-group">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`list-group-item ${task.completed ? 'completed' : ''}`}
            >
              <span
                onClick={() => handleTaskCompletion(task.id)}
                className={`task-title ${
                  task.completed ? 'text-decoration-line-through' : ''
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => handleTaskDeletion(task.id)}
                className="btn btn-danger"
              >
                Видалити
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Список завдань порожній</p>
      )}
    </div>
  );
}

export default TodoList;
