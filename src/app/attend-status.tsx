import styles from './attend-status.module.css';
import { FaRegCircle } from 'react-icons/fa';
import { IoTriangleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

interface AttendanceProps {
    attendanceCount: number;
    tardinessCount: number;
    absenceCount: number;
}

export default function AttendStatus(props: AttendanceProps) {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
                <FaRegCircle className={styles.icon} />
            </div>
            <div className={styles.gridItem}>出席</div>
            <div className={styles.gridItem}>{props.attendanceCount}回</div>

            <div className={styles.gridItem}>
                <IoTriangleOutline className={styles.icon} />
            </div>
            <div className={styles.gridItem}>遅刻</div>
            <div className={styles.gridItem}>{props.tardinessCount}回</div>

            <div className={styles.gridItem}>
                <RxCross1 className={styles.icon} />
            </div>
            <div className={styles.gridItem}>欠席</div>
            <div className={styles.gridItem}>{props.absenceCount}回</div>
        </div>
    );
}
