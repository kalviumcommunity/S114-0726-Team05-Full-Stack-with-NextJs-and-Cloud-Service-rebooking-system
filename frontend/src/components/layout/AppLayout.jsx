import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";

import AIAssistant from "../ai/AIAssistant";

export default function AppLayout() {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <TopNavbar />

        <main className="page-content">
          <Outlet />
        </main>

      </div>

      <BottomNavbar />

      <AIAssistant />

    </div>
  );
}