import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>出席管理</h1>
      <div>
        <Link href="attend" className={styles.button}>
          出席する
        </Link>
        <Link href="attendStatus" className={styles.button}>
          出席状況
        </Link>
        <Link href="timetable" className={styles.button}>
          時間割
        </Link>
      </div>
    </main>
  )
}
