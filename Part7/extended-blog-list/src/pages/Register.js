import React from "react";
import { registerUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import isEmail from "validator/lib/isEmail";
import { createNotification } from "../reducers/notificationReducer";
import { createClass } from "../reducers/classReducer";

export default function Register() {
  const username = useField("text");
  const name = useField("text");
  const email = useField("text");
  const password = useField("password");

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (username.value.length < 3) {
      dispatch(createNotification("Username must be more than three chars", 5));
      dispatch(createClass("error", 5));
    } else if (!isEmail(email.value)) {
      dispatch(createNotification("Must provide Valid email", 5));
      dispatch(createClass("error", 5));
    } else if (password.value.length < 3) {
      dispatch(createNotification("Password must be more than three chars", 5));
      dispatch(createClass("error", 5));
    } else {
      dispatch(
        registerUser(name.value, username.value, email.value, password.value)
      );
    }
  };

  if (user) {
    navigate("/");
  }

  return (
    <div className='flex justify-center '>
      <div className='border-2 border-gray-400 p-12 w-7/12 pb-5 md:w-full '>
        <h2 className='text-center font-bold text-3xl mb-6 text-black '>
          Register
        </h2>
        <form onSubmit={(e) => handleSumbit(e)}>
          <div>
            <p className='mb-1 text-md text-black'>Name</p>
            <input
              {...name}
              className='py-1 px-2 w-full mb-6 text-black text-black p-2 border-2 border-gray-500'
            />
          </div>
          <div>
            <p className='mb-1 text-md text-black'>Username</p>
            <input
              id='username'
              className='py-1 px-2 w-full mb-6 text-black text-black p-2 border-2 border-gray-500'
              {...username}
            />
          </div>
          <div>
            <p className='mb-1 text-md text-black'>Email</p>
            <input
              className='py-1 px-2 w-full mb-6 text-black text-black p-2 border-2 border-gray-500'
              {...email}
            />
          </div>
          <div>
            <p className='mb-1 text-md text-black'>password</p>
            <input
              id='password'
              className='py-1 px-2 w-full mb-6 text-black text-black p-2 border-2 border-gray-500'
              {...password}
            />
          </div>
          <div className='flex mt-5'>
            <button
              className='py-2 px-10 bg-white text-blue-600 font-bold rounded mx-auto text-lg border-2 border-gray-300 p-2 text-black font-bold rounded-xl'
              type='submit'
            >
              Register
            </button>
          </div>
        </form>
        <p className='mt-8 text-sm text-black'>
          Alredy have an account ?
          <button
            className=' ml-1 text-blue-600'
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
