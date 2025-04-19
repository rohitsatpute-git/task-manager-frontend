import { Edit, Trash2 } from 'lucide-react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) return <p className="text-center mt-6 text-gray-500">No tasks yet.</p>;

  return (
    <div className="mt-6 space-y-4 max-w-2xl mx-auto">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Effort: {task.effort} day(s)</p>
            <p className="text-sm text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(task)} className="text-blue-600 hover:text-blue-800">
              <Edit size={18} />
            </button>
            <button onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-800">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
