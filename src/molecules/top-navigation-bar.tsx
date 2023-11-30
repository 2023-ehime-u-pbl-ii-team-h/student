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
};

const TopNavBar = ({ userInitial, label }: TopNavBarProps) => {
  return (
    <div className={`${styles.topNavBar} surface on-surface-text`}>
      <MdMenu className={styles.menuButton} />
      <CurrentScreenLabel label={label ?? "ホーム"} />
      <UserAvatar userInitial={userInitial} />
    </div>
  );
};

export default TopNavBar;
