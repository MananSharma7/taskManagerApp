import React, { useState } from "react";
import { useGlobalContext } from "../globalContext.jsx";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { userSignUp } = useGlobalContext();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const userData = { name, email, password };
        console.log(userData);
        await userSignUp(userData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";

    if (!password) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password should be at least 7 characters long";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="container mx-auto size-96 my-10">
      <h2 className="text-2xl font-bold my-5">SignUp</h2>
      <form className="border rounded place-content-center px-6 py-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 
            placeholder-slate-400 focus:outline-none focus:border-sky-500 
            focus:ring-sky-500 block w-full rounded-full sm:text-sm focus:ring-1"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <div className="text-pink-600 text-sm">{errors.name}</div>
          )}
        </div>
        <div className="my-2">
          <label>Email</label>
          <input
            type="email"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 
            placeholder-slate-400 focus:outline-none focus:border-sky-500 
            focus:ring-sky-500 block w-full rounded-full sm:text-sm focus:ring-1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div class="text-pink-600 text-sm">{errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 
            placeholder-slate-400 focus:outline-none focus:border-sky-500 
            focus:ring-sky-500 block w-full rounded-full sm:text-sm focus:ring-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div class="text-pink-600 text-sm">{errors.password}</div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-sky-500 hover:bg-sky-700 px-10 py-1 text-white rounded-full 
            items-center font-bold"
            onClick={handleSignUp}
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
