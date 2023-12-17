import styles from './side-menu.module.css';

const SideMenu = ({ isOpen, closeMenu, subjects }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
      <div className={`${styles.sideMenu} surface`} data-open={isOpen ? 'true' : 'false'}>
        <div className={styles.topBar}>
          <span className="title-small">出席確認システム</span>
          <button className={styles.closeButton} onClick={closeMenu}>×</button>
        </div>
        <button className={styles.menuItemButton}>ホーム</button>
        <div className={styles.subjectList}>
          {subjects && subjects.map((subject, index) => (
            <button key={index} className={styles.menuItemButton}>
              <div className={styles.subjectName}>{subject.name}</div>
              <div className={styles.lastDate}>{subject.lastDate}</div>
            </button>
          ))}
        </div>
        <button className={styles.menuItemButton}>科目を追加</button>
      </div>
    </>
  );
};

export default SideMenu;