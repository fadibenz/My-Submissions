import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Blogs() {
  const blogs = useSelector((state) => [...state.blogs]);
  const navigate = useNavigate();

  return (
    <div id='blog' className='mt-11'>
      <div className='mb-8'>
        <h2 className='font-bold text-3xl mb-2 text-center'>
          Enjoy the most refreshing Read !
        </h2>
        <p className='text-gray-500 text-xl mb-4 text-center'>
          Leave a comment for us
        </p>
        <div class='inline-flex items-center justify-center w-full'>
          <hr class='w-4/12 h-0.5 my-6 bg-gray-400 border-0 rounded ' />
          <div class='absolute px-4 -translate-x-1/2 bg-white left-1/2 '>
            <svg
              class='w-4 h-4 text-gray-700'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 18 14'
            >
              <path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
            </svg>
          </div>
        </div>
      </div>
      {blogs?.map((blog) => {
        return (
          <div className='mb-8'>
            <div className=' justify-between'>
              <div className='mb-4 text-gray-500 '>{blog.date}</div>
              <div className=''>
                <h1 className='font-bold text-3xl mb-1 capitalize'>
                  {blog.title}
                </h1>
                <div className='flex text-sm uppercase text-blue-700 mb-8'>
                  {blog.tags?.map((tag) => {
                    return <p className='mr-3 font-medium'>{tag}</p>;
                  })}
                </div>
                <p className='text-gray-500 mb-5'>
                  {blog.content?.substring(0, 550)} .....
                </p>
                <button
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className='text-blue-700 font-bold ml'
                >
                  Read more →
                </button>
              </div>
            </div>
            <div class='inline-flex items-center justify-center w-full'>
              <hr class='w-4/12 h-0.5 my-6 bg-gray-400 border-0 rounded ' />
              <div class='absolute px-4 -translate-x-1/2 bg-white left-1/2 '>
                <svg
                  class='w-4 h-4 text-gray-700'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 14'
                >
                  <path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
