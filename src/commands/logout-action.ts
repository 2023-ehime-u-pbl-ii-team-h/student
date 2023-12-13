const BACKEND_LOGOUT_ENDPOINT = "https://backend.mikuroxina.workers.dev/logout";

export const logoutAndClearAuth = async () => {
  try {
    // ログアウトエンドポイントにアクセス
    const response = await fetch(BACKEND_LOGOUT_ENDPOINT, {
      method: "POST", // ログアウトエンドポイントによってはPOSTを使用
      credentials: "include", // クッキーを送信するためにcredentialsを設定
    });

    if (response.ok) {
      // ログアウトが成功したら、HttpOnlyのCookieをクリア
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // ページをリロードするか、リダイレクトするなどの処理を行う
      window.location.reload();
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("An error occurred during logout", error);
  }
};
