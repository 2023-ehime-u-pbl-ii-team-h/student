import { AttendOutlet } from "@/organisms/attend-outlet";
import styles from "./page.module.css";
import { Suspense } from "react";
import { Outlet } from "./outlet";

export default function Home() {
  return (
    <Suspense>
      <Outlet title="ホーム">
        <div className={styles.main}>
          <AttendOutlet />
        </div>
      </Outlet>
    </Suspense>
  );
}
