import styles from "./side-menu.module.css";
import Link from 'next/link';

export type SideMenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
  subjects: readonly {
    name: string;
    lastDate: string;
  }[];
};

const SideMenu = ({ isOpen, closeMenu, subjects }: SideMenuProps) => {
  return (
    <>
      {isOpen && (
        <div className={`${styles.overlay} scrim`} onClick={closeMenu}></div>
      )}
      <div className={`${styles.sideMenu} surface`} data-open={isOpen}>
        <div className={`${styles.topBar} on-surface-text`}>
          <span className="title-small">出席確認システム</span>
          <button className={styles.closeButton} onClick={closeMenu}>
            ×
          </button>
        </div>

        <button className={`${styles.menuItemButton} on-background-text`}>
          <div className={styles.stateLayer}>ホーム</div>
        </button>

        <div className={styles.subjectList}>
          {subjects &&
            subjects.map((subject) => (
              <Link key={subject.id} href={`/attendances/${subject.id}`}className={styles.menuItemLink} onClick={closeMenu}>
                  <div className={styles.stateLayer}>
                    <div className={styles.subjectName}>{subject.name}</div>
                    <div className={styles.lastDate}>{subject.lastDate}</div>
                  </div>
              </Link>
            ))
          }
        </div>

        <button className={`${styles.menuItemButton} on-background-text`}>
          <div className={styles.stateLayer}>科目を追加</div>
        </button>
      </div>
    </>
  );
};

export default SideMenu;
