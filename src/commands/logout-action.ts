import { API_ROOT } from "../queries/config";

const BACKEND_LOGOUT_ENDPOINT = `${API_ROOT}/logout`;

export const logoutAndReload = async (accessToken: string) => {
  try {
    const response = await fetch(BACKEND_LOGOUT_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
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
