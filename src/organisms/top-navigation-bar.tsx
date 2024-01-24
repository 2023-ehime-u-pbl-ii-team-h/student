"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./top-navigation-bar.module.css";
import { MdMenu, MdOutlinePerson, MdPerson } from "react-icons/md";
import SideMenu from "../molecules/side-menu";
import AccountMenu from "../molecules/account-menu";
import { StandardIconButton } from "../atoms/icon-button";
import { logoutAndReload } from "../commands/logout-action";
import { useAccount, useMsal } from "@azure/msal-react";

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
  const { accounts, instance } = useMsal();
  const account = useAccount(accounts[0] ?? {});
  const user: { name: string; initials: string } | null = account
    ? {
        name: account.name ?? "",
        initials:
          account.name
            ?.split(" ")
            .map((word) => word.charAt(0))
            .join("") ?? "",
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

  const login = async () => {
    if (account) {
      return;
    }
    await instance.loginRedirect({
      scopes: ["User.Read"],
      prompt: "select_account",
      redirectUri: new URL("/", location.href).toString(),
    });
  };

  const logout = async () => {
    if (!account) {
      return;
    }
    const tokenRes = await instance.acquireTokenSilent({
      account,
      scopes: ["User.Read"],
    });
    if (!tokenRes) {
      return;
    }
    await logoutAndReload(tokenRes.accessToken);
  };

  return (
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
      <SideMenu isOpen={isSideMenuOpen} closeMenu={closeSideMenu} />
      <AccountMenu
        isOpen={isAccountMenuOpen}
        ref={menuRef}
        user={user}
        onLogout={logout}
        onLogin={login}
      />
    </div>
  );
};

export default TopNavBar;
