"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./top-navigation-bar.module.css";
import { MdMenu } from "react-icons/md";
import SideMenu, { SideMenuProps } from "../molecules/side-menu";
import AccountMenu from './account-menu';
import { FaUser } from 'react-icons/fa';


const UserAvatar = ({ userInitial, onClick }: { userInitial?: string, onClick: () => void }) => (
  <div className={styles.avatar} onClick={onClick}>
    {userInitial ? userInitial : <FaUser />}
  </div>
);


const CurrentScreenLabel = ({ label }: { label: string }) => (
  <div className={styles.screenLabel}>{label}</div>
);

export type TopNavBarProps = {
  userInitial?: string;
  label?: string;
  subjects: SideMenuProps["subjects"];
};

const DEFAULT_LABEL = "ホーム";

const TopNavBar = ({ userInitial, label = DEFAULT_LABEL, subjects }: TopNavBarProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const toggleAccountMenu = () => setIsAccountMenuOpen((flag) => !flag);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const user: { name: string; initials: string; } | null = null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement)) {
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
          user={user}
          onLogout={() => console.log('ログアウト処理')}
          onLogin={() => console.log('ログイン処理')}
        />
      </div>
      )}
    </>
  );
};

export default TopNavBar;