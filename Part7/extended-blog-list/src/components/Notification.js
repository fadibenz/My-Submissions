import React from "react";
import { useSelector } from "react-redux";
import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast();

export default function Notification() {
  const notif = useSelector((state) => state.notification);
  const Class = useSelector((state) => state.className);
  console.log("notif", notif);
  if (notif === "" || !notif) {
    return null;
  }

  toast({
    title: Class === "error" ? "An error occurred." : "Success",
    description: notif,
    status: Class,
    duration: 9000,
    isClosable: true,
  });

  return <ToastContainer />;
}
