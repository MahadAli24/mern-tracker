import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [stats, setStats] = useState([]);

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks');
    setTasks(data);
  };

  const fetchStats = async () => {
  const { data } = await API.get('/tasks/stats/summary');
  setStats(data);
 };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    await API.post('/tasks', { title });
    setTitle('');
    fetchTasks();
    fetchStats();
  };

  const toggleComplete = async (task) => {
    await API.put(`/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
    fetchStats();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
    fetchStats();
  };

  return (
    <div className="dashboard">
      <h2>My Tasks</h2>
        <div className="stats">
          {stats.map((s) => (
            <span key={s._id} className="stat-pill">
              {s._id}: {s.completed}/{s.total}
            </span>
        ))}
        </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <form onSubmit={addTask} className="add-form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" />
        <button type="submit">Add</button>
      </form>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t._id} className="task-item">
            <span className={t.completed ? 'task-title completed' : 'task-title'}>
              {t.title}
            </span>
            <div className="task-actions">
              <button onClick={() => toggleComplete(t)}>✓</button>
              <button onClick={() => deleteTask(t._id)} className="delete-btn">✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}