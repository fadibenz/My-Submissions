import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const createNotification = (notif, time) => {
  console.log('notification', notif)
  return async (dispatch) => {
    dispatch(setNotification(notif));
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
    dispatch(removeNotification());
  };
};

export default notificationSlice.reducer;
