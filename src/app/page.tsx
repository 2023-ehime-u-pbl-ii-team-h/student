import { AttendOutlet } from "@/organisms/attend-outlet";
import styles from "./page.module.css";
import { Suspense } from "react";
import TopNavBar from "@/organisms/top-navigation-bar";

export default function Home() {
  return (
    <>
      <TopNavBar label="ホーム" />
      <main className={styles.main}>
        <Suspense>
          <AttendOutlet />
        </Suspense>
      </main>
    </>
  );
}
