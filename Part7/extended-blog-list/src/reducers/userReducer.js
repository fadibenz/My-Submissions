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
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(createNotification("wrong password or username", 5));
      dispatch(createClass("error", 5));
    }
  };
};

export default userSlice.reducer;
