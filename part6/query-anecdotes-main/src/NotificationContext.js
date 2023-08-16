import { createContext, useReducer, useContext } from "react";

const notificationReducer = async (state, action) => {
  switch (action.type) {
    case "SET_NOTIF":
      return action.payload;
    case "REMOVE_NOTIF":
      return "";
    default:
      return state;
  }
};

export const NotifContext = createContext();

export const NotifContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotifContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotifContext.Provider>
  );
};




export const useNotif = () => {
  const [notification, dispatchNotification] = useContext(NotifContext);
  return dispatchNotification;
};

export const useNotifValue = () => {
  const notifAndDispatch = useContext(NotifContext);
  return notifAndDispatch[0];
};

export default NotifContext;
