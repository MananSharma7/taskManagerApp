import React, { useState } from "react";
import { useGlobalContext } from "../globalContext";

const Tasks = ({ tasks }) => {
  const { updateTasks, deleteTasks, getTasks } = useGlobalContext();
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editCompleted, setEditCompleted] = useState("");

  if (tasks.length === 0) {
    return (
      <div>
        <p className="text-lg font-normal text-gray-500 text-center">
          Please Add Tasks!
        </p>
      </div>
    );
  }

  const handleEdit = (task) => {
    setEditCompleted(task.completed);
    setEditDescription(task.description);
    setEditId(task._id);
  };
  const handleChange = (e) => {
    setEditDescription(e.target.value);
  };
  const handleCheck = (e) => {
    setEditCompleted(e.target.checked);
  };
  const handleCancel = () => {
    setEditId("");
  };

  const handleSave = async () => {
    await updateTasks({
      _id: editId,
      description: editDescription,
      completed: editCompleted,
    });
    await getTasks();
    handleCancel();
  };

  const handleDelete = async (e) => {
    await deleteTasks(e);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-blue-100">
            <tr>
              <th>
                <span className="sr-only w-1/12">Completed</span>
              </th>
              <th className="py-2 w-6/12">Description</th>
              <th className="py-2 w-2/12">Date</th>
              <th className="py-2 w-1/12">Time</th>
              <th className="py-2 w-2/12">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b hover:bg-gray-100">
                <td>
                  {editId === task._id ? (
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e)}
                      className="ml-9 w-5 h-5 rounded text-blue-600 bg-gray-100 border-gray-300
                    focus:ring-blue-500"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={task.completed === true}
                      readOnly
                      className="ml-9 w-5 h-5 rounded text-blue-600 bg-gray-100 border-gray-300
                    focus:ring-blue-500"
                    />
                  )}
                </td>
                <td>
                  {editId === task._id ? (
                    <input
                      type="text"
                      placeholder="Description"
                      defaultValue={task.description}
                      onChange={(e) => handleChange(e)}
                      className="border-2 border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:ring-1 focus:outline-none block w-11/12 p-1.5"
                    />
                  ) : (
                    <div className="py-2">{task.description}</div>
                  )}
                </td>
                <td>
                  <div>{task.createdAt.substring(0, 10)}</div>
                </td>
                <td>{task.createdAt.substring(11, 16)}</td>
                <td>
                  {editId === task._id ? (
                    <div>
                      <button
                        onClick={() => handleSave(task)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                      >
                        SAVE
                      </button>
                      <button
                        onClick={() => handleCancel()}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={() => handleDelete(task)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        DELETE
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      EDIT
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
