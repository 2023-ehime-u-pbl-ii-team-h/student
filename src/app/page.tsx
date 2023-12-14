import React, { useState } from 'react';

import Image from "next/image";
import styles from "./page.module.css";
import AttendButton from "../organisms/attend-button";
import TopNavBar from "../molecules/top-navigation-bar";
import AttendStatus from "../organisms/attend-status";
import SideMenu from "../molecules/side-menu";

export default function Home() {
  const attendState = "ENABLED";
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);

  return (
    <main className={styles.main}>
      <TopNavBar openSideMenu={openSideMenu} />
      <AttendButton state={attendState} />
      <AttendStatus attendanceCount={14} tardinessCount={13} absenceCount={2} />
      <SideMenu isOpen={isSideMenuOpen} closeMenu={closeSideMenu} />
    </main>
  );
}