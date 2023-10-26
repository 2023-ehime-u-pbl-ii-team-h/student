import Image from 'next/image'
import styles from 'src/app/page.module.css'
import Link from 'next/link';


function AttendStatus() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <main className={styles.main}>
      <div>
        <h1>出席状況</h1>
      </div>
      <div>
        {/* ここに出席情報を表示するコンテンツを追加 */}
        <details className={styles.details}>
          <summary className={styles.summary}>PBL演習Ⅱ</summary>
          <table>
            <tbody>
              <tr>
                <th>授業回数</th>
                <th>出席状況</th>
              </tr>
              <tr>
                <td>第1回</td>
                <td>〇</td>
              </tr>
              <tr>
                <td>第2回</td>
                <td>△</td>
              </tr>
              <tr>
                <td>第3回</td>
                <td>✕</td>
              </tr>
              <tr>
                <td>第4回</td>
                <td>〇</td>
              </tr>
              <tr>
                <td>第5回</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </details>

        <details className={styles.details}>
          <summary className={styles.summary}>ウェブプログラミング</summary>
          <table>
            <tbody>
              <tr>
                <th>授業回数</th>
                <th>出席状況</th>
              </tr>
              <tr>
                <td>第1回</td>
                <td>〇</td>
              </tr>
              <tr>
                <td>第2回</td>
                <td>〇</td>
              </tr>
              <tr>
                <td>第3回</td>
                <td>〇</td>
              </tr>
              <tr>
                <td>第4回</td>
                <td>〇</td>
              </tr>
              <tr>
                <td>第5回</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </details>  
      </div>
      <button onClick={goBack}>
        戻る
      </button>
    </main>
  );
}

export default AttendStatus;