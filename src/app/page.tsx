import Image from "next/image";
import styles from "./page.module.css";
import AttendButton from "../organisms/attend-button";
import TopNavBar from "../molecules/top-navigation-bar";
import AttendStatus from "../organisms/attend-status";
import SideMenu from "../molecules/side-menu";
import { useAttendAction, AttendResult } from "../commands/attend-action";
import { AttendButtonState } from "../organisms/attend-button";

const BUTTON_STATE_MAP: Record<AttendResult["type"], AttendButtonState> = {
  READY: "ENABLED",
  AWAITING: "ENABLED", // FIXME: AttendButtonState に "DISABLED" を追加すべき
  SUCCESS: "DONE",
  FAILURE: "OVERTIME",
};
function attendApp() {
  // useAttendAction フックを使用して状態とアクションを管理
  const [attendResult, submitAttendAction] = useAttendAction();
  const buttonState = BUTTON_STATE_MAP[attendResult["type"]];

  return (
    <div>
      <AttendButton state={buttonState} onClick={submitAttendAction} />
    </div>
  );
}
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
