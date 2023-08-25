import Footer from "./Footer";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
