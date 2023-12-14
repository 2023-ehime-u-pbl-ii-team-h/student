import styles from "./top-navigation-bar.module.css";
import { MdMenu } from "react-icons/md";

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

const TopNavBar = ({ userInitial, label, openSideMenu }: TopNavBarProps) => {
  return (
    <div className={`${styles.topNavBar} surface on-surface-text`}>
      <MdMenu className={styles.menuButton} onClick={openSideMenu} />
      <CurrentScreenLabel label={label ?? "ホーム"} />
      <UserAvatar userInitial={userInitial} />
    </div>
  );
};

export default TopNavBar;
