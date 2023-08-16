import React from "react";
import { Link } from "react-router-dom";

export default function Users({ users }) {
  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <th>user</th>
          <th>blogs created</th>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td>
                  <Link to={`/user/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
