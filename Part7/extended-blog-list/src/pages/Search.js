import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useField } from "../hooks";

export default function Search() {
  const search = useField("text");
  const blogs = useSelector((state) => state.blogs);
  const [filterBlog, setFilterBlog] = useState([]);
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.keyCode === 27) {
      event.preventDefault();
      navigate(-1);
    }
  };

  useEffect(() => {
    const newData = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.value.toLowerCase())
    );
    setFilterBlog(newData);
  }, [search.value, blogs]);

  return (
    <div
      className='bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50'
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        inset: 0,
        padding: "14vh 16px 16px",
      }}
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <div
        className='w-full max-w-xl'
        style={{ opacity: 1, transform: "scale(0.99)", pointerEvents: "auto" }}
      >
        <div className='overflow-hidden rounded-2xl border  border-gray-800 bg-white'>
          <div className='flex items-center space-x-4 p-4'>
            <span className='block w-5 text-black'>
              <svg
                className='text-gray-300'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='black'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </span>
            <input
              className='h-8 w-full bg-transparent outline-none text-black placeholder-slate-700'
              autoComplete='off'
              role='combobox'
              spellCheck='false'
              aria-expanded='true'
              aria-controls='kbar-listbox'
              aria-activedescendant='kbar-listbox-item-1'
              placeholder='Type a command or search…'
              {...search}
            />
            <span className='inline-block whitespace-nowrap rounded border  px-1.5 align-middle font-medium leading-4 tracking-wide  [font-size:10px] border-slate-600 text-black'>
              ESC
            </span>
          </div>
          <div style={{ maxHeight: 400, position: "relative" }}>
            <div
              role='listbox'
              id='kbar-listbox'
              style={{ height: 722, width: "100%" }}
            >
              <div
                id='kbar-listbox-item-0'
                role='option'
                aria-selected='false'
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: "translateY(0px)",
                }}
              >
                <div>
                  <div className='pt-3'>
                    <div className='block px-4 pb-2 pt-6 text-xs font-semibold uppercase text-blue-600 border-gray-800'>
                      Content
                    </div>
                    {filterBlog.map((blog, index) => {
                      return (
                        <Link to={`/blog/${blog._id}`}>
                          <div
                            id='kbar-listbox-item-3'
                            role='option'
                            aria-selected='true'
            
                          >
                            <div>
                              <div className='block cursor-pointer px-4 py-2 bg-primary-600 text-gray-100 hover:bg-gray-200'>
                                <div className='text-gray-500 text-xs'>
                                  {blog.date}
                                </div>
                                <div className="text-black">{blog.title}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
