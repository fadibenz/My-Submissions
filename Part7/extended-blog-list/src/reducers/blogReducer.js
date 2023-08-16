import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

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
        f.id === action.payload.id ? action.payload : f
      );
    },
    updateBlogs(state, action) {
      return state.filter((f) => f.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateLike, updateBlogs } =
  blogReducer.actions;

export const intializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log("blogs", blogs);
    dispatch(setBlogs(blogs));
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

export const addComment = (blog, comment)=>{
  return async (dispatch) => {
    const newBlog = await blogService.updateComments(blog, comment);
    dispatch(updateLike(newBlog));
  };
}

export default blogReducer.reducer;
