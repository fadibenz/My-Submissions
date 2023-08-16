import React from "react";
import Notification from "./Notification";
import { logUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSumbit = async (e) => {
    e.preventDefault();
    dispatch(logUser(username, password));
    setPassword("");
    setUsername("");
  };

  return (
    <div>
      <Notification />
      <h2>Log in to application</h2>
      <form onSubmit={(e) => handleSumbit(e)}>
        <div>
          <p>Username</p>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(e) => {
              console.log("e.taget.value", e.target.value);
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <p>password</p>
          <input
            id='password'
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type='submit' value='login' />
      </form>
    </div>
  );
}
