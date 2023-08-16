import React from "react";
import { useState } from "react";
import { createNotification } from "../reducers/notificationReducer";

import { createClass } from "../reducers/classReducer";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";

export default function CreateBlog() {
  const dispatch = useDispatch();

  const [blogData, setBlogData] = useState({
    author: "",
    title: "",
    url: "",
  });

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      dispatch(addBlog(blogData));
      dispatch(createNotification("Blog created successfully", 5));
      dispatch(createClass("success", 5));
      setBlogData({
        author: "",
        title: "",
        url: "",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h2>Add New</h2>
      <form onSubmit={(e) => handlePost(e)}>
        <div>
          <p>author</p>
          <input
            id='author'
            type='text'
            placeholder='author'
            value={blogData.author}
            onChange={(e) => {
              setBlogData({ ...blogData, author: e.target.value });
            }}
          />
        </div>

        <div>
          <p>title</p>
          <input
            id='title'
            type='text'
            placeholder='title'
            value={blogData.title}
            onChange={(e) => {
              setBlogData({ ...blogData, title: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Url</p>
          <input
            id='url'
            type='text'
            placeholder='Url'
            value={blogData.url}
            onChange={(e) => setBlogData({ ...blogData, url: e.target.value })}
          />
        </div>
        <input type='submit' value='Create' />
      </form>
    </div>
  );
}
