import notificationReducer from "./reducers/notificationReducer";
import classReducer from "./reducers/classReducer";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    className: classReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});
