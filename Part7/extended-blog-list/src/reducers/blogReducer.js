import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { createNotification } from "./notificationReducer";
import { createClass } from "./classReducer";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    updateLike(state, action) {
      return state.map((f) =>
        f._id === action.payload._id ? action.payload : f
      );
    },
    updateBlogs(state, action) {
      return state.filter((f) => f._id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateLike, updateBlogs } =
  blogReducer.actions;

export const intializeBlogs = () => {
  return async (dispatch) => {
    const res = await blogService.getAll();
    if (res.message) {
      dispatch(createNotification(res.message, 5));
      dispatch(createClass("error", 5));
    } else {
      dispatch(setBlogs(res));
    }
  };
};

export const addBlog = (blogData) => {
  return async (dispatch) => {
    const newBlog = await blogService.Create(blogData);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.update(blog);
    dispatch(updateLike(newBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(updateBlogs(id));
  };
};

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const res = await blogService.updateComments(blog, comment);
    console.log("res", res);
    if (res.error) {
      dispatch(createNotification(res.error, 5));
      dispatch(createClass("error", 5));
    } else {
      dispatch(updateLike(res));
    }
  };
};

export default blogReducer.reducer;
