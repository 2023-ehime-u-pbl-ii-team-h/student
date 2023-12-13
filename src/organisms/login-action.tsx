export const navigateToLoginEndpoint = () => {
    // バックエンドのログインエンドポイント
    const loginEndpoint = "https://backend.mikuroxina.workers.dev/login";
  
    // ページを指定されたログインエンドポイントに遷移
    window.location.href = loginEndpoint;
  };
  