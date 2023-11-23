import styles from "./top-navigation-bar.module.css";

const HamburgerIcon = () => (
  <div className={styles.hamburger}>
    <span className={styles.bar}></span>
    <span className={styles.bar}></span>
    <span className={styles.bar}></span>
  </div>
);

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
      <HamburgerIcon />
      <CurrentScreenLabel label={label ?? "ホーム"} />
      <UserAvatar userInitial={userInitial} />
    </div>
  );
};

export default TopNavBar;
