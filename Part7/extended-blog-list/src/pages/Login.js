import React from "react";
import { logUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

export default function Login() {
  const username = useField("text");
  const password = useField("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  const handleSumbit = async (e) => {
    e.preventDefault();
    dispatch(logUser(username.value, password.value));
  };

  if (user) {
    navigate("/");
  }

  return (
    <div>
      <div className='flex justify-center'>
        <div className='border-2 border-gray-400 p-12 w-7/12 pb-5 md:w-full md:mt-20'>
          <h2 className='text-center font-bold text-3xl mb-8 text-black'>
            Log in
          </h2>
          <form onSubmit={(e) => handleSumbit(e)}>
            <div>
              <p className='mb-1 text-md text-black'>Username</p>
              <input
                id='username'
                className='py-1 px-2 w-full mb-6 text-black text-black p-2 border-2 border-gray-500'
                {...username}
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
                Login
              </button>
            </div>
          </form>
          <p className='mt-8 text-sm text-gray-600'>
            Don't have an account ?{" "}
            <button
              className='text-blue-600'
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
