import { AttendOutlet } from "@/organisms/attend-outlet";
import { Content } from "./content";
import styles from "./page.module.css";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<AttendOutlet attendState="DISABLED" />}>
        <Content />
      </Suspense>
    </main>
  );
}
