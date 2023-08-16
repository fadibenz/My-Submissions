import React from "react";

export default function User({ user }) {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <ul>
        {user.blogs.map((blog) => {
          return <li>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
}
