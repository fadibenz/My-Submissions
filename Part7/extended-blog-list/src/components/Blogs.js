import React from "react";
import {  useSelector } from "react-redux";
import { compareFn } from "../util/helper";
import { Link } from "react-router-dom";

export default function Blogs() {
  const blogs = useSelector((state) => [...state.blogs].sort(compareFn));


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div id='blog'>
      {blogs.map((blog) => {
        return (
          <h3 className={blogStyle}>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </h3>
        );
      })}
    </div>
  );
}
