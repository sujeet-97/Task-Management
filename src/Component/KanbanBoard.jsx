import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  console.log('tasks',tasks);
  
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo' });
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks from API (JSONPlaceholder)
  const fetchTasks = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    // Group tasks by their status based on 'completed' field
    const groupedTasks = {
      todo: data.filter(task => !task.completed),
      inProgress: [],  // We'll handle "In Progress" via the UI manually
      done: data.filter(task => task.completed),
    };
    setTasks(groupedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle task status update after drag and drop
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // If the task is moved to a new column, update its status
    const updatedTasks = { ...tasks };
    const task = updatedTasks[source.droppableId].find(task => task.id === parseInt(draggableId));

    // Update the task status based on where it was dropped
    if (destination.droppableId === 'done') {
      task.completed = true;  // Mark as completed
    } else if (destination.droppableId === 'todo') {
      task.completed = false;  // Mark as not completed
    }

    // Move task to the new column
    updatedTasks[destination.droppableId].push(task);
    updatedTasks[source.droppableId] = updatedTasks[source.droppableId].filter(task => task.id !== parseInt(draggableId));

    // Set state with the updated tasks
    setTasks(updatedTasks);

    // Simulate updating the task in the backend
    await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: task.completed }),
    });
  };

  // Handle adding a new task
  const handleAddTask = async () => {
    const newTaskObj = { ...newTask, id: Date.now(), completed: false };

    // Update state with the new task (simulating the POST request)
    setTasks(prevState => ({
      ...prevState,
      todo: [...prevState.todo, newTaskObj],
    }));

    setNewTask({ title: '', description: '', status: 'todo' });
    setShowModal(false); // Close the modal
  };

  return (
    <div className="kanban-board">
      <button className="add-task-btn" onClick={() => setShowModal(true)}>
        Add New Task
      </button>

      {showModal && (
        <div className="task-form-modal">
          <div className="task-form">
            {/* Modal Header with Cancel Icon */}
            <div className="modal-header">
              <h2>Create New Task</h2>
              {/* Cancel Icon */}
              <svg
                onClick={() => setShowModal(false)} // Close modal when clicked
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ cursor: 'pointer' }}
              >
                <path
                  fill="none"
                  d="M0 0h24v24H0z"
                />
                <path
                  d="M19.41 4.59L12 12l7.41 7.41-1.41 1.41L12 13.83l-7.41 7.41-1.41-1.41L10.59 12 3.18 4.59 4.59 3 12 10.41l7.41-7.41z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button onClick={handleAddTask}>Create Task</button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns">
          {['todo', 'inProgress', 'done'].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                  {tasks[status].map((task, index) => (
                    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h4>{task.title}</h4>
                          <p>{task.description || 'No description'}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
