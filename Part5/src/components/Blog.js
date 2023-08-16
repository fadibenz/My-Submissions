import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Do you really want to remove this blog ?")) {
      try {
        console.log('blog', blog)
        deleteBlog(blog);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleClick = () => {
    try {
      const blogData = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };
      handleLike(blogData, blog.id);
    } catch (error) {
      console.log("error", error);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const display = {
    display: visible ? "" : "none",
  };
  return (
    <div style={blogStyle} data-testid={`${blog.author}-${blog.title}`} >
      <div className='visible'>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={display} className='notVisible'>
        <p>{blog.url}</p>
        <div>
          <p>Likes: {blog.likes}</p>
          <button onClick={handleClick}>Like Blog</button>
        </div>
        <p>{user.username}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
