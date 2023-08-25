import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";
import { createClass } from "../reducers/classReducer";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      dispatch(addComment(blog, comment));
    } else {
      dispatch(createNotification("Must be logged in to comment", 5));
      dispatch(createClass("error", 5));
    }
    setComment("");
  };

  if (!blog) {
    return null;
  }

  return (
    <div data-testid={`${blog.author}-${blog.title}`}>
      <div>
        <div className='text-center mb-6'>
          <p className='text-gray-500 font- text-xl '>{blog.date}</p>
          <h1 className='text-5xl mt-2 font-bold leading-tight md:text-2xl'>
            {blog.title}
          </h1>
          <div className='flex justify-center items-center gap-2 mt-6 hidden md:flex'>
            <img src='/logo192.png' className='w-11' alt='profile'></img>
            <div className='text-sm'>
              <a
                className='text-blue-600'
                href='https://portfolio-eh93.onrender.com/'
                target='_blank'
                rel='noreferrer'
              >
                @{blog.author}
              </a>
            </div>
          </div>
        </div>
        <hr className='mb-10 border-0 h-0.5 bg-blue-500'></hr>
        <div className='flex justify-between md:flex-col'>
          <div className='w-2/12 md:order-2 md:w-full'>
            <div className='flex items-center gap-3 md:hidden'>
              <img src='/logo192.png' className='w-11' alt="profile"></img>
              <div className='text-sm'>
                <p>{blog.author}</p>
                <a
                  className='text-blue-600'
                  href='https://portfolio-eh93.onrender.com/'
                  target='_blank'
                  rel='noreferrer'
                >
                  @{blog.author}
                </a>
              </div>
            </div>
            <hr className='my-8 border-0 h-0.5 bg-blue-500'></hr>
            <div>
              <p className=' font-bold text-sm text-gray-400'>Tags</p>
              <div className='flex flex-wrap uppercase  text-blue-600 mt-1   '>
                {blog.tags.map((tag) => {
                  return (
                    <p className='mr-2 font-medium text-blue-600 text-sm'>
                      {tag}
                    </p>
                  );
                })}
              </div>
            </div>
            <hr className='my-8 border-0 h-0.5 bg-blue-500'></hr>
            <Link to={"/"} className='font-bold text-blue-600'>
              {" "}
              ← Back to the blog
            </Link>
          </div>
          <div className='w-9/12 text-lg leading-8 text-gray-300 md:order-1 md:w-full'>
            <ReactMarkdown className='text-gray-700'>
              {blog.content}
            </ReactMarkdown>

            <hr className='my-8 border-0 h-0.5 bg-blue-500'></hr>
            <div>
              <h3 className='font-bold text-3xl text-black '>comments</h3>
              <p className='mb-6 text-gray-400 text-sm'>
                What do you think about this blog ?
              </p>
              <form
                onSubmit={handleSubmit}
                className='flex justify-between wrap rounded md:flex-col md:gap-8'
              >
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className='w-8/12 text-black p-2 border-2 placeholder-black md:w-full'
                  placeholder='Tell us what you think...'
                ></input>
                <button
                  type='submit'
                  className='border-2 border-gray-300 p-2 text-black font-bold rounded-xl'
                >
                  add comment
                </button>
              </form>
              <ul className='mt-12'>
                {blog.comments.map((comment) => {
                  return (
                    <div className='p-5 border-2 border-gray-400 mb-6'>
                      <div className='flex items-center gap-3 mb-3 '>
                        <img src='/logo192.png' className='w-7' alt="profile"></img>
                        <p className='text-blue-500 font-bold text-xs'>
                          {comment.user.username}
                        </p>
                      </div>
                      <li className='flex text-gray-700'>{comment.text}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
