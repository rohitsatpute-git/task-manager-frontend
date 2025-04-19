import { useCallback, useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TaskManager = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [create, setCreate] = useState(false);
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    console.log('user', user)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/?userId=${user.userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({...task, userId: user.userId})
    });
    if (res.ok) {
      fetchTasks();
    }
  };

  const handleUpdate = async (task) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${editing.id}/?userId=${user.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(task)
    });
    if (res.ok) {
      setEditing(null);
      fetchTasks();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}/?userId=${user.userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchTasks();
  };

  const handleExport = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/export/excel/`, "_blank");
  };
  
  const onLogOut = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/auth')
  },[])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button className='absolute top-2 left-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer' onClick={handleExport}>Export to excel</button>
      {(editing || create) &&
        <TaskForm
          onSubmit={editing ? handleUpdate : handleCreate}
          initialData={editing}
          submitLabel={editing ? 'Update Task' : 'Create Task'}
          setCreate={setCreate}
          setEditing={setEditing}
        />
      }
      <TaskList tasks={tasks} onEdit={setEditing} onDelete={handleDelete} />
      <button className='absolute top-16 left-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer' onClick={() => setCreate(true)}>Create</button>
      <button className='absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer' onClick={onLogOut}>Logout</button>
    </div>
  );
};

export default TaskManager;
