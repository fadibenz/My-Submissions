import React from "react";
import { useSelector } from "react-redux";

export default function Notification() {
  const notif = useSelector((state) => state.Notification);
  const Class = useSelector((state) => state.className);
  return <div className={Class}>{notif}</div>;
}
