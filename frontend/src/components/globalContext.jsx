import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "./hooks/useLocalStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage("user", null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  if (users) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${users.token}`;
  }

  const userSignUp = async (user) => {
    const response = await axiosInstance
      .post(`${axiosInstance.defaults.baseURL}users`, user)
      .catch((err) => {
        setError(err.response.data.message);
      });
    setUsers(response.data);
  };

  const userLogin = async (user) => {
    const response = await axiosInstance
      .post(`${axiosInstance.defaults.baseURL}users/login`, user)
      .catch((err) => {
        setError(err.response.data.message);
      });
    setUsers(response.data);
  };

  const userLogout = async () => {
    await axiosInstance
      .post(`${axiosInstance.defaults.baseURL}users/logout`, users)
      .catch((err) => {
        setError(err.response.data.message);
      });
    setUsers(null);
  };

  const getTasks = async () => {
    const res = await axiosInstance
      .get(`${axiosInstance.defaults.baseURL}tasks`)
      .catch((err) => {
        setError(err.response.data.message);
      });
    setTasks(res.data);
  };

  const postTasks = async (task) => {
    await axiosInstance
      .post(`${axiosInstance.defaults.baseURL}tasks`, task)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getTasks();
  };

  const updateTasks = async (task) => {
    const postTask = {
      description: task.description,
      completed: task.completed,
    };
    await axiosInstance
      .patch(`${axiosInstance.defaults.baseURL}tasks/${task._id}`, postTask)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getTasks();
  };

  const deleteTasks = async (task) => {
    await axiosInstance
      .delete(`${axiosInstance.defaults.baseURL}tasks/${task._id}`)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getTasks();
  };

  return (
    <GlobalContext.Provider
      value={{
        userLogin,
        userLogout,
        userSignUp,
        getTasks,
        postTasks,
        updateTasks,
        deleteTasks,
        setError,
        users,
        tasks,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
