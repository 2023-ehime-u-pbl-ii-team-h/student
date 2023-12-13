const BACKEND_LOGOUT_ENDPOINT = "https://backend.mikuroxina.workers.dev/logout";

export const logoutAndClearAuth = async () => {
  try {
    const response = await fetch(BACKEND_LOGOUT_ENDPOINT, {
      method: "POST",
      // これは異なるオリジンへのリクエストだが Cookie を送信してほしいので, include を設定
      credentials: "include",
    });

    if (response.ok) {
      window.location.reload();
    } else {
      response.text().then(console.error);
    }
  } catch (error) {
    console.error("An error occurred during logout", error);
  }
};
