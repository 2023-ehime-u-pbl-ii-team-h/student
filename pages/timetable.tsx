import Image from 'next/image'
import styles from 'src/app/page.module.css'
import Link from 'next/link';


function Timetable() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <main className={styles.main}>
      <div>
        <h1>時間割</h1>
      </div>
      <div>
        {/* ここに時間割ページのコンテンツを追加 */}
        
      </div>
      <button onClick={goBack}>
        戻る
      </button>
    </main>
  );
}

export default Timetable;