import {  useNotifValue } from "../NotificationContext";

const Notification = () => {
  const notif = useNotifValue()

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notif === '' ? '' : 'none'
  };

  return <div style={style}>{notif}</div>;
};

export default Notification;
