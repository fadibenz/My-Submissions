import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reducers/userReducer";
import blogService from "../services/blogs";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(removeUser());
    blogService.setToken(null);
    window.localStorage.clear();
  };

  return (
    <div>
      <div className='flex justify-between    mt-10  border-2 px-4 py-2 rounded-xl mb-20 border-gray-300 lg:my-8 lg:mt-0'>
        <Link to={"/"}>
          <img src='/Logo.png' className='w-12' alt="logo" />
        </Link>
        <div className='flex items-center'>
          <button
            onClick={() => navigate("/")}
            className='font-bold px-5 sm:hidden'
          >
            Blogs
          </button>
          <button
            onClick={() => navigate("/search")}
            className='mr-7 sm:hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='text-gray-900  h-6 w-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              ></path>
            </svg>
          </button>
          <button
            aria-label='Toggle Menu'
            className='hidden sm:block'
            onClick={() => setToggle(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              class='text-gray-900 h-8 w-8'
            >
              <path
                fill-rule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </button>
          {user ? (
            <div className='flex justify-between items-center sm:hidden'>
              <p className='px-5 font-bold'>{user.username}</p>
              <button
                onClick={handleClick}
                className='font-bold py-2 px-2 bg-white text-blue-700 rounded'
              >
                log out
              </button>
            </div>
          ) : (
            <button
              className='font-bold py-2 px-2 bg-white text-blue-700 rounded sm:hidden'
              onClick={() => navigate("/login")}
            >
              Login/Register
            </button>
          )}
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform opacity-95  bg-white duration-300 ease-in-out sm:block ${
          toggle ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex justify-end'>
          <button
            className='mr-8 mt-11 h-8 w-8'
            aria-label='Toggle Menu'
            onClick={() => setToggle(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='text-gray-900'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
        <nav className='fixed mt-8 h-full'>
          <div className='px-12 py-4'>
            <button
              className='text-2xl font-bold tracking-widest text-gray-900 '
              onClick={() => {
                setToggle(false);
                navigate("/");
              }}
            >
              Home
            </button>
          </div>
          <div className='px-12 py-4'>
            <button
              className='text-2xl font-bold tracking-widest text-gray-900 '
              onClick={() => {
                setToggle(false);
                navigate("/");
              }}
            >
              Blog
            </button>
          </div>
          <div className='px-12 py-4'>
            <button
              className='text-2xl font-bold tracking-widest text-gray-900'
              onClick={() => {
                if (user) {
                  handleClick();
                  setToggle(false)
                } else {
                  navigate("/login");
                  setToggle(false)
                }
              }}
            >
              {user ? "log out" : "Login/Register"}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
