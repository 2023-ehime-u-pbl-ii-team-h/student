import AttendButton, { AttendButtonState, AttendButtonProps } from "../organisms/attend-button";
import { useAttendAction, AttendResult } from "../commands/attend-action";

function mapAttendResultToButtonState(attendResult: AttendResult): AttendButtonState {
  switch (attendResult.type) {
    case "READY":
      return "ENABLED";
    case "AWAITING":
      return "ENABLED"; // ローディング中でもボタンはENABLEDとして表示
    case "SUCCESS":
      return "DONE";
    case "FAILURE":
      return "OVERTIME";
    default:
      return "ENABLED";
  }
}

export default function attendApp() {
  // useAttendAction フックを使用して状態とアクションを管理
  const [attendResult, submitAttendAction] = useAttendAction();

  // ボタンの状態を AttendButtonState に基づいて決定
  const buttonState = mapAttendResultToButtonState(attendResult);

  // ボタンのプロパティを設定
  const buttonProps: AttendButtonProps = {
    state: buttonState,
    onClick: function () {
      // ボタンがクリックされたときに出席アクションを実行
      submitAttendAction();
    },
  };

  return (
    <div>
      {/* AttendButton コンポーネントを使用してボタンを表示 */}
      <AttendButton {...buttonProps} />

      {/* 結果の表示 */}
      <div>
        {attendResult.type === "AWAITING" && <p>出席処理中...</p>}
        {attendResult.type === "SUCCESS" && (
          <p>出席が成功しました</p>
        )}
        {attendResult.type === "FAILURE" && <p>出席が失敗しました。</p>}
      </div>
    </div>
  );
}

