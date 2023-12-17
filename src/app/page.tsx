import Image from "next/image";
import styles from "./page.module.css";
import AttendButton from "../organisms/attend-button";
import TopNavBar from "../molecules/top-navigation-bar";
import AttendStatus from "../organisms/attend-status";
import SideMenu from "../molecules/side-menu";

export default function Home() {
  const attendState = "ENABLED";

  const subjects = [
    { name: "PBL演習", lastDate: "2023-01-01" },
    { name: "サイバーセキュリティ", lastDate: "2023-01-02" },
    // その他の科目...
  ];

  return (
    <main className={styles.main}>
      <TopNavBar subjects={subjects} />
      <AttendButton state={attendState} />
      <AttendStatus attendanceCount={14} tardinessCount={13} absenceCount={2} />
    </main>
  );
}
