import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { createNotification } from "./notificationReducer";
import { createClass } from "./classReducer";
const userSlice = createSlice({
  name: "User",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const logUser = (username, password) => {
  return async (dispatch) => {
    const user = await blogService.login(username, password);
    if (user.error) {
      dispatch(createNotification(user.error, 5));
      dispatch(createClass("error", 5));
    } else {
      dispatch(setUser(user));
    }
  };
};



export const registerUser = (name, username, email, pass) => {
    return async (dispatch) => {
      const res = await blogService.register(name, username, email, pass);
      if (res.error) {
        dispatch(createNotification(res.error, 5));
        dispatch(createClass("error", 5));
      } else {
        dispatch(setUser(res));
      }
    };
  };
export default userSlice.reducer;
