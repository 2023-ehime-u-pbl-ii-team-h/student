import Image from "next/image";
import styles from "./page.module.css";
import AttendButton from "../organisms/attend-button";
import TopNavBar from "../molecules/top-navigation-bar";
import AttendStatus from "../organisms/attend-status";

export default function Home() {
  const attendState = "ENABLED";
  return (
    <main className={styles.main}>
      <TopNavBar />

      <AttendButton state={attendState} />

      <AttendStatus attendanceCount={14} tardinessCount={13} absenceCount={2} />
    </main>
  );
}
