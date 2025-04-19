import { Plus } from 'lucide-react';
import { useCallback, useState } from 'react';

const TaskForm = ({ onSubmit, initialData = {}, submitLabel = 'Create Task', setCreate, setEditing }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [effort, setEffort] = useState(initialData?.effort || '');
  const [due_date, setDueDate] = useState(initialData?.due_date || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !due_date) {
      alert('Title and Due Date are required');
      return;
    }

    onSubmit({ title, description, effort, due_date });
    onCancelClicked();
  };

  const onCancelClicked = useCallback(() => {
      setCreate(false);
      setEditing(null);
  }, [])

  return (
    <div className='items-center justify-center fixed inset-0 w-screen h-screen flex flex-col z-[10] bg-[#000]/35'>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 relative">
        <Plus className='absolute top-2 right-2 rotate-45 cursor-pointer' onClick={onCancelClicked}/>
        <h2 className="text-xl font-bold">{submitLabel}</h2>  

        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Effort to Complete (in days)"
          className="w-full border p-2 rounded"
          value={effort}
          onChange={(e) => setEffort(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={due_date}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
