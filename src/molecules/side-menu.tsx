import { useSubjects } from "../queries/subjects";
import styles from "./side-menu.module.css";
import { StandardIconButton } from "../atoms/icon-button";
import { MdClose } from "react-icons/md";
import Link from "next/link";

export type SideMenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
};

const SideMenu = ({ isOpen, closeMenu }: SideMenuProps) => {
  const subjects = useSubjects();

  return (
    <>
      {isOpen && (
        <div className={`${styles.overlay} scrim`} onClick={closeMenu}></div>
      )}
      <div className={`${styles.sideMenu} surface`} data-open={isOpen}>
        <div className={`${styles.topBar} on-surface-text`}>
          <span className="title-small">出席確認システム</span>
          <StandardIconButton
            icon={<MdClose />}
            alt="メニューを閉じる"
            onClick={closeMenu}
          />
        </div>

        <Link
          href="/"
          className={`${styles.menuItemButton} on-background-text`}
        >
          <div className={styles.stateLayer}>ホーム</div>
        </Link>

        <div className={styles.subjectList}>
          {subjects &&
            subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/attendances?subject_id=${subject.id}`}
                className={styles.menuItemLink}
                onClick={closeMenu}
              >
                <div className={styles.stateLayer}>
                  <div className={styles.subjectName}>{subject.name}</div>
                  <div className={styles.lastDate}>{subject.lastDate}</div>
                </div>
              </Link>
            ))}
        </div>
        <Link
          href="/add-subject"
          className={`${styles.menuItemButton} on-background-text`}
        >
          <div className={styles.stateLayer}>科目を追加</div>
        </Link>
      </div>
    </>
  );
};

export default SideMenu;
