import styles from './SideMenu.module.css';

const SideMenu = ({ isOpen, closeMenu, subjects }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.topBar}>
          <button className={styles.closeButton} onClick={closeMenu}>×</button>
        </div>
        <button className={styles.homeButton}>ホーム</button>
        <div className={styles.subjectList}>
          {subjects.map((subject, index) => (
              <div key={index} className={`${styles.subjectItem} ${subject.highlight ? styles.highlight : ''}`}>
              <div className={styles.subjectName}>{subject.name}</div>
              <div className={styles.lastDate}>{subject.lastDate}</div>
            </div>
          ))}
        </div>
        <button className={styles.addButton}>科目を追加</button>
      </div>
    </>
  );
};

export default SideMenu;