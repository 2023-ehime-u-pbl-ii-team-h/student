import Image from 'next/image'
import styles from 'src/app/page.module.css'
import Link from 'next/link';


function Attend() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <main className={styles.main}>
      <div>
        <h1>出席する</h1>
      </div>
      <div>
        {/* ここに出席するページのコンテンツを追加 */}
        <h2>出席する授業を選択</h2>
      </div>
      <div>
        <a className={styles.attcon}>PBL演習Ⅱ：<button>出席する</button></a>
        <a className={styles.attcon}>ウェブプログラミング：<button>出席する</button></a>
      </div>
      <button onClick={goBack}>
        戻る
      </button>
    </main>
  );
}

export default Attend;