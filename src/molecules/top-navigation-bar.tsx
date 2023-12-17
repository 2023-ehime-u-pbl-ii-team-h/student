"use client";

import React, { useState } from 'react';
import styles from "./top-navigation-bar.module.css";
import { MdMenu } from "react-icons/md";
import SideMenu from "../molecules/side-menu";

const CurrentScreenLabel = ({ label }: { label: string }) => (
  <div className={styles.screenLabel}>{label}</div>
);

const UserAvatar = ({ userInitial }: { userInitial?: string }) => (
  <div className={styles.avatar}>{userInitial ? userInitial : "👤"}</div>
);

export type TopNavBarProps = {
  userInitial?: string;
  label?: string;
  openSideMenu: () => void;
};

const TopNavBar = ({ subjects, userInitial }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const defaultLabel = "ホーム";

  return (
    <>
      <div className={`${styles.topNavBar} surface on-surface-text`}>
        <MdMenu className={styles.menuButton} onClick={openSideMenu} />
        <CurrentScreenLabel label={defaultLabel} />
        <UserAvatar userInitial={userInitial} />
      </div>
      <SideMenu isOpen={isSideMenuOpen} closeMenu={closeSideMenu} subjects={subjects} />
    </>
  );
};

export default TopNavBar;
