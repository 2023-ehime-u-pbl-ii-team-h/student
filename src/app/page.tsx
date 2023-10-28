import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.title}>出席管理</h1>
      </div>
      <Link href="attend" className={styles.button}>
        出席する
      </Link>
      <div>
        <h1>出席する</h1>
      </div>
      <div>
        {/* ここに出席するページのコンテンツを追加 */}
        <h2>出席する授業を選択</h2>
      </div>
      <div>
        <h3>現在出席受付中の授業</h3>
        <a className={styles.attcon}>PBL演習Ⅱ：<button>出席する</button></a>
        <h3>出席受付時間外の授業</h3>
        <a className={styles.attcon}>ウェブプログラミング：<button>出席する</button></a>
      </div>
      <Link href="src/app/attendStatus" className={styles.button}>
        出席状況
      </Link>
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
      <Link href="timetable" className={styles.button}>
        講義コード登録
      </Link>
      <div><h1>講義コード登録</h1></div>
      <div>
        <input type='text'/>
        <button>登録</button>
      </div>
      <Link href="timetable" className={styles.button}>
        時間割
      </Link>
      <div>
        <h1>時間割</h1>
      </div>
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
