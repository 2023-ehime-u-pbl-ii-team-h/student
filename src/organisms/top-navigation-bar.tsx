"use client";

import styles from "./top-navigation-bar.module.css";
import { MdMenu, MdOutlinePerson, MdPerson } from "react-icons/md";
import { StandardIconButton } from "../atoms/icon-button";

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
  label: string;
  user?: { name: string; initials: string };
  onClickSideMenuIcon: () => void;
  onClickAccountMenuIcon: () => void;
};

const TopNavBar = ({
  label,
  user,
  onClickSideMenuIcon,
  onClickAccountMenuIcon,
}: TopNavBarProps) => {
  return (
    <div className={`${styles.topNavBar} surface on-surface-text`}>
      <StandardIconButton
        alt="サイドメニューを開く"
        icon={<MdMenu />}
        onClick={onClickSideMenuIcon}
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
        onClick={onClickAccountMenuIcon}
      />
    </div>
  );
};

export default TopNavBar;
