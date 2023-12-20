// TopNavBar.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./top-navigation-bar.module.css";
import { MdMenu } from "react-icons/md";
import SideMenu, { SideMenuProps } from "../molecules/side-menu";
import AccountMenu from './account-menu';

const UserAvatar = ({ userInitial, onClick }: { userInitial?: string, onClick: () => void }) => (
  <div className={styles.avatar} onClick={onClick}>
    {userInitial ? userInitial : "👤"}
  </div>
);

const CurrentScreenLabel = ({ label }: { label: string }) => (
  <div className={styles.screenLabel}>{label}</div>
);

export type TopNavBarProps = {
  userInitial?: string;
  label?: string;
  subjects: SideMenuProps["subjects"];
  onLogout: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  userName: string;
  userIcon: string;
};

const DEFAULT_LABEL = "ホーム";

const TopNavBar = ({
  subjects,
  userInitial,
  label = DEFAULT_LABEL,
  onLogout, 
  onLogin, 
  isLoggedIn, 
  userName, 
  userIcon,
}: TopNavBarProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const toggleAccountMenu = () => setIsAccountMenuOpen(!isAccountMenuOpen);
  
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`${styles.topNavBar} surface on-surface-text`}>
        <MdMenu className={styles.menuButton} onClick={openSideMenu} />
        <CurrentScreenLabel label={label} />
        <UserAvatar userInitial={userInitial} onClick={toggleAccountMenu} />
      </div>
      {isSideMenuOpen && (
        <SideMenu
          isOpen={isSideMenuOpen}
          closeMenu={closeSideMenu}
          subjects={subjects}
        />
      )}
      {isAccountMenuOpen && (
        <AccountMenu
          ref={menuRef}
          isLoggedIn={isLoggedIn}
          userName={userName}
          userIcon={userIcon}
          onLogout={onLogout}
          onLogin={onLogin}
        />
      )}
    </>
  );
};

export default TopNavBar;