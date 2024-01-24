"use client";

import { logoutAndReload } from "@/commands/logout-action";
import AccountMenu from "@/molecules/account-menu";
import SideMenu from "@/molecules/side-menu";
import TopNavBar from "@/organisms/top-navigation-bar";
import { InteractionType } from "@azure/msal-browser";
import { useAccount, useMsalAuthentication } from "@azure/msal-react";
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

  const {
    result,
    login: reLogin,
    acquireToken,
  } = useMsalAuthentication(InteractionType.Redirect, {
    scopes: ["User.Read"],
  });
  const account = useAccount(result?.account ?? {});
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
    const tokenRes = await acquireToken(InteractionType.Redirect, {
      account,
      scopes: ["User.Read"],
    });
    if (!tokenRes) {
      return;
    }
    await logoutAndReload(tokenRes.accessToken);
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
