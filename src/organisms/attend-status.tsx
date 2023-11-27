import styles from './attend-status.module.css';
import { FaRegCircle } from 'react-icons/fa';
import { IoTriangleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export interface AttendanceProps {
    attendanceCount: number;
    tardinessCount: number;
    absenceCount: number;
}

export default function AttendStatus(props: AttendanceProps) {
    return (
        <div className={styles.gridContainer}>
            <div>
                <FaRegCircle className={styles.icon} />
            </div>
            <div>出席</div>
            <div className={styles.times}>
                {props.attendanceCount}回
            </div>

            <div>
                <IoTriangleOutline className={styles.icon} />
            </div>
            <div>遅刻</div>
            <div className={styles.times}>
                {props.tardinessCount}回
            </div>

            <div>
                <RxCross1 className={styles.icon} />
            </div>
            <div>欠席</div>
            <div className={styles.times}>
                {props.absenceCount}回
            </div>
        </div>
    );
}
