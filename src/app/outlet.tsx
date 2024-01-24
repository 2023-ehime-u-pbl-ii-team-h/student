"use client";

import AccountMenu from "@/molecules/account-menu";
import SideMenu from "@/molecules/side-menu";
import TopNavBar from "@/organisms/top-navigation-bar";
import { InteractionType } from "@azure/msal-browser";
import { useAccount, useMsal, useMsalAuthentication } from "@azure/msal-react";
import { ReactNode, useEffect, useRef, useState } from "react";

export function Outlet({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { login: reLogin } = useMsalAuthentication(InteractionType.Redirect, {
    scopes: ["User.Read"],
  });
  const { instance, accounts } = useMsal();
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
    await reLogin(InteractionType.Redirect, {
      scopes: ["User.Read"],
      prompt: "select_account",
      redirectUri: new URL("/", location.href).toString(),
    });
  };

  const logout = async () => {
    if (!account) {
      return;
    }
    await instance.logout();
  };

  return (
    <main>
      <TopNavBar
        label={title}
        user={user ?? undefined}
        onClickSideMenuIcon={() => setIsSideMenuOpen(true)}
        onClickAccountMenuIcon={() => setIsAccountMenuOpen(true)}
      />
      {children}
      <SideMenu
        isOpen={isSideMenuOpen}
        closeMenu={() => setIsSideMenuOpen(false)}
      />
      <AccountMenu
        isOpen={isAccountMenuOpen}
        ref={menuRef}
        user={user}
        onLogout={logout}
        onLogin={login}
      />
    </main>
  );
}
