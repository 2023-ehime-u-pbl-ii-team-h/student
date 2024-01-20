import { AttendOutlet } from "@/organisms/attend-outlet";
import { Content } from "./content";
import styles from "./page.module.css";
import { Suspense } from "react";
import TopNavBar from "@/molecules/top-navigation-bar";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main className={styles.main}>
        <Suspense fallback={<AttendOutlet attendState="DISABLED" />}>
          <Content />
        </Suspense>
      </main>
    </>
  );
}
