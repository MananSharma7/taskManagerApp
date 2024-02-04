import React, { useState } from "react";
import { useGlobalContext } from "../globalContext";

const AddTask = ({ handleSubmit, handleAdd }) => {
  const { postTasks } = useGlobalContext();
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCheck = (e) => {
    setCompleted(e.target.checked);
  };

  const handleCancel = (e) => {
    handleAdd();
  };

  const handleSave = async () => {
    const isValid = validateForm();

    if (isValid) {
      await postTasks({ description, completed });
      handleSubmit();
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!description) errors.description = "Description is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="flex justify-centre items-center mb-5">
      <div className="w-6/12">
        <input
          type="text"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-600 
          placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 
          block w-full rounded-full sm:text-sm focus:ring-1"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        {errors.description && (
          <div className="text-pink-600 text-sm">{errors.description}</div>
        )}
      </div>
      <input
        type="checkbox"
        onChange={(e) => handleCheck(e)}
        className="ml-6 w-5 h-5 rounded text-blue-600 bg-gray-100 border-gray-300
        focus:ring-blue-500"
      />
      <label className="ms-2 text-sm text-gray-900">Completed</label>
      <button
        className="bg-blue-500 hover:bg-blue-800 text-white rounded-full py-1.5 ml-6 w-1/12"
        onClick={() => {
          handleSave();
        }}
      >
        Add
      </button>
      <button
        className="bg-red-500 hover:bg-red-800 text-white rounded-full py-1.5 ml-2 w-1/12"
        onClick={() => {
          handleCancel();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddTask;
