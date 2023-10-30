import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>出席管理</h1>
      <h2>出席する授業を選択</h2>
      <h3>現在出席受付中の授業</h3>
      <div><a className={styles.attcon}>PBL演習Ⅱ：<button>出席する</button></a></div>
      <h3>出席受付時間外の授業</h3>
      <div><a className={styles.attcon}>ウェブプログラミング</a></div>

      <h2>出席状況</h2>

      {/* ここに出席情報を表示するコンテンツを追加 */}
      <div>
        <details className={styles.details}>
          <summary className={styles.summary}>PBL演習Ⅱ</summary>
          <p>出席：5回</p>
          <p>遅刻：1回</p>
          <p>欠席：0回</p>
        </details>

        <details className={styles.details}>
          <summary className={styles.summary}>ウェブプログラミング</summary>
          <p>出席：4回</p>
          <p>遅刻：5回</p>
          <p>欠席：1回</p>
        </details>
      </div>

      <h2>講義コード登録</h2>
      <div>
        <input type='text' />
        <button>登録</button>
      </div>

      <h2>時間割</h2>
      <div>
        {/* ここに時間割ページのコンテンツを追加 */}
        <table className={styles.timetable}>
          <tbody>
            <tr>
              <td></td>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
            </tr>
            <tr>
              <th>１</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>２</th>
              <td>PBL演習Ⅱ</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>３</th>
              <td></td>
              <td>ウェブプログラミング</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>４</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>５</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>６</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>７</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>R</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>集中等</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
