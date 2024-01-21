"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./top-navigation-bar.module.css";
import { MdMenu, MdOutlinePerson, MdPerson } from "react-icons/md";
import SideMenu from "../molecules/side-menu";
import AccountMenu from "./account-menu";
import { StandardIconButton } from "../atoms/icon-button";
import { useLogin } from "@/queries/login";
import { navigateToLoginEndpoint } from "@/commands/login-action";
import { logoutAndReload } from "@/commands/logout-action";

const UserAvatar = ({ userInitial }: { userInitial: string }) =>
  userInitial ? (
    <div className={`label-large ${styles.avatar}`}>{userInitial}</div>
  ) : (
    <MdPerson />
  );

const CurrentScreenLabel = ({ label }: { label: string }) => (
  <div className={styles.screenLabel}>{label}</div>
);

export type TopNavBarProps = {
  label?: string;
};

const DEFAULT_LABEL = "ホーム";

const TopNavBar = ({ label = DEFAULT_LABEL }: TopNavBarProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const toggleAccountMenu = () => setIsAccountMenuOpen((flag) => !flag);

  const menuRef = useRef<HTMLDivElement>(null);
  const login = useLogin();
  const user: { name: string; initials: string } | null =
    login.type === "LOGGED_IN"
      ? {
          name: login.name,
          initials: login.name
            .split(" ")
            .map((word) => word.charAt(0))
            .join(""),
        }
      : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLElement)
      ) {
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
        <StandardIconButton
          alt="サイドメニューを開く"
          icon={<MdMenu />}
          onClick={openSideMenu}
        />
        <CurrentScreenLabel label={label} />
        <StandardIconButton
          alt=""
          icon={
            user ? (
              <UserAvatar userInitial={user.initials} />
            ) : (
              <MdOutlinePerson />
            )
          }
          onClick={toggleAccountMenu}
        />
      </div>
      {isSideMenuOpen && (
        <SideMenu isOpen={isSideMenuOpen} closeMenu={closeSideMenu} />
      )}
      {isAccountMenuOpen && (
        <AccountMenu
          ref={menuRef}
          user={user}
          onLogout={logoutAndReload}
          onLogin={navigateToLoginEndpoint}
        />
      )}
    </>
  );
};

export default TopNavBar;
