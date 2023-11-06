import React from 'react';
import styles from './TopNavBar.module.css'; // CSS Moduleを利用

const TopNavBar = ({ isLoggedIn, userInitial }) => {
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
      {isLoggedIn ? userInitial : '👤'} {/* ログイン中の場合イニシャル、それ以外はアイコン */}
    </div>
  );

  return (
    <div className={styles.topNavBar}>
      <HamburgerIcon />
      <CurrentScreenLabel label="ホーム" />
      <UserAvatar isLoggedIn={isLoggedIn} userInitial={userInitial} />
    </div>
  );
};

export default TopNavBar;