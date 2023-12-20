import styles from './account-menu.module.css';

import { forwardRef } from "react";

const AccountMenu = ({ isLoggedIn, userName, userIcon, onLogout, onLogin }, ref) => {
  if (isLoggedIn) {
    return (
      <div ref={ref} className={styles.accountMenu}>
        <div className={styles.accountInfo}>
          <img src={userIcon} alt="User icon" className={styles.userIcon} />
          <span className={styles.userName}>{userName}</span>
        </div>
        <button className={styles.menuItemButton} onClick={onLogout}>ログアウト</button>
      </div>
    );
  } else {
    return (
      <div ref={ref} className={styles.accountMenu}>
        <span className={styles.menuItemButton}>まだログインしていません</span>
        <button className={styles.menuItemButton} onClick={onLogin}>ログイン</button>
      </div>
    );
  }
};

export default forwardRef(AccountMenu);