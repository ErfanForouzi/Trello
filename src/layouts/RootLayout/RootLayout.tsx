import type { ReactNode } from "react";

import { Outlet } from "react-router";

import Footer from "@/components/Footer/Footer";

import styles from "./RootLayout.module.css";
import { BoardsProvider } from "@/providers/BoardsProvider";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout(): ReactNode {
  return (
    <BoardsProvider>
      <div className={styles["root-layout"]}>
        <main>
          <Outlet />
        </main>
        <Sidebar />
        <Footer />
      </div>
    </BoardsProvider>
  );
}
