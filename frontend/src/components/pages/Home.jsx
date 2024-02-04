import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../globalContext";
import Tasks from "../Items/Tasks";
import AddTask from "../Items/AddTask";
import { FaPlus } from "react-icons/fa6";

const Home = () => {
  const { users, tasks, getTasks } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getTasks();
  });

  const handleAdd = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async () => {
    setIsVisible(!isVisible);
    await getTasks();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-auto">
        <div
          className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800
              bg-blue-200 rounded-full animate-pulse"
        >
          Loading...
        </div>
      </div>
    );
  }

  if (!users) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-lg text-blue-500 lg:text-xl">
          Please
          <Link
            className="text-blue-500 hover:text-blue-700 hover:underline mx-1"
            to="/login"
          >
            Login
          </Link>
          or
          <Link
            className="text-blue-500 hover:text-blue-700 hover:underline ml-1"
            to="/signup"
          >
            SignUp
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto size-9/12 my-10">
      {isVisible && (
        <AddTask handleSubmit={handleSubmit} handleAdd={handleAdd} />
      )}
      {!isVisible && (
        <button
          className="bg-blue-500 hover:bg-blue-800 text-white rounded-full 
        mr-8 px-4 py-1.5 mb-7"
          onClick={() => handleAdd()}
        >
          <div className="flex justify-center items-center">
            <FaPlus className="mr-1" />
            Add Task
          </div>
        </button>
      )}
      {tasks && <Tasks tasks={tasks} />}
    </div>
  );
};

export default Home;
