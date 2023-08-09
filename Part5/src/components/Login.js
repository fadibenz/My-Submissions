import React from 'react'

export default function Login(password, setPassword, username, setUsername, setUser) {
  return (
    <div>
      <h2>Log in to application</h2>
      <form>
        <input type='text'>name</input>
        <input type='password'>password</input>
        <input type='submit'>login</input>
      </form>
    </div>
  );
}
