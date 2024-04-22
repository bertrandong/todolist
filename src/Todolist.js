import React, { useEffect, useState } from 'react';
import './Todolist.css';

function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [filterText, setFilterText] = useState('Showing all tasks');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    updateFilterText();
  }, [filter]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    const taskToAdd = { id: Date.now(), text: newTask, completed: false };
    if (newTask.trim() !== '') {
      setTasks([...tasks, taskToAdd]);
      setNewTask('');
      localStorage.setItem('tasks', JSON.stringify([...tasks, taskToAdd]));
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'active':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const updateFilterText = () => {
    switch (filter) {
      case 'completed':
        setFilterText('Showing completed tasks');
        break;
      case 'active':
        setFilterText('Showing active tasks');
        break;
      default:
        setFilterText('Showing all tasks');
        break;
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="Todolist">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add new task"
        />
        <button className="add-button" onClick={handleAddTask}>Add</button>
      </div>
      <div className="task-list">
        {filteredTasks().length === 0 ? (
          <div>You have no tasks at the moment</div>
        ) : (
          filteredTasks().map((task) => (
            <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <span>{task.text}</span>
            </div>
          ))
        )}
      </div>
      <div className="filters">
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('active')}>Active</button>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
      </div>
      <div className="clear-button">
        <button onClick={clearCompletedTasks}>Clear Completed Tasks</button>
      </div>
      <div>{filterText}</div>
    </div>
  );
}

export default Todolist;
