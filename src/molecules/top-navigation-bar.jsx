import styles from './top-navigation-bar.module.css';

  const HamburgerIcon = () => (
    <div className={styles.hamburger}>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </div>
  );

  const CurrentScreenLabel = ({ label }) => (
    <div className={styles.screenLabel}>{label}</div>
  );

  const UserAvatar = ({ isLoggedIn, userInitial }) => (
    <div className={styles.avatar}>
      {isLoggedIn ? userInitial : '👤'}
    </div>
  );

  const TopNavBar = ({ isLoggedIn, userInitial }) => {
  return (
    <div className={styles.topNavBar}>
      <HamburgerIcon />
      <CurrentScreenLabel label="ホーム" />
      <UserAvatar isLoggedIn={isLoggedIn} userInitial={userInitial} />
    </div>
  );
};

export default TopNavBar;