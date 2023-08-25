import notificationReducer from "./notificationReducer";
import classReducer from "./classReducer";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    className: classReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});
