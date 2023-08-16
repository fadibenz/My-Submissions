import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state) {
      return initialState;
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notif, time) => {
  return async (dispatch) => {
    dispatch(createNotification(notif));
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
    dispatch(removeNotification());
  };
};

export default notificationSlice.reducer;
