import { createSlice } from "@reduxjs/toolkit";

const classReducer = createSlice({
  name: "class",
  initialState: "",
  reducers: {
    setClass(state, action) {
      return action.payload;
    },
    removeClass(state, action) {
      return "";
    },
  },
});

export const { setClass, removeClass } = classReducer.actions;

export const createClass = (className, time) => {
  return async (dispatch) => {
    dispatch(setClass(className));
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
    dispatch(removeClass(className));
  };
};

export default classReducer.reducer;
