import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog, addComment } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";
import { createClass } from "../reducers/classReducer";
import { useState } from "react";
const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleDelete = () => {
    if (window.confirm("Do you really want to remove this blog ?")) {
      try {
        dispatch(deleteBlog(blog.id));
      } catch (error) {
        dispatch(createNotification("can not delete this blog", 5));
        dispatch(createClass("error", 5));
      }
    }
  };

  const handleClick = () => {
    try {
      dispatch(likeBlog(blog));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addComment(blog, comment));
    setComment("");
  };

  if (!blog) {
    return null;
  }

  return (
    <div data-testid={`${blog.author}-${blog.title}`}>
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.url}</p>
        <div>
          <p>Likes: {blog.likes}</p>
          <button onClick={handleClick}>Like Blog</button>
        </div>
        <p>{user.username}</p>
        <button onClick={handleDelete}>Delete</button>
        <h3>comments</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => {
            return <li>{comment}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
