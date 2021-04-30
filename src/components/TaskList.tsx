import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    let id;

    if (tasks.length <= 0) {
      id = 0;
    } else {
      id = tasks[tasks.length - 1].id + 1;
    }

    if (!newTaskTitle) {
      return;
    }

    const task: Task = {
      id,
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks(previousTasks => [...previousTasks, task]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const previousTasks = tasks;
    const foundTaskIndex = tasks.findIndex(task => task.id === id);

    const task = previousTasks[foundTaskIndex];

    task.isComplete = !task.isComplete;

    previousTasks[foundTaskIndex] = task;

    setTasks([...previousTasks]);
  }

  function handleRemoveTask(id: number) {
    const previousTasks = tasks;
    const foundTaskIndex = previousTasks.findIndex(task => task.id === id);

    previousTasks.splice(foundTaskIndex, 1);

    setTasks([...previousTasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}