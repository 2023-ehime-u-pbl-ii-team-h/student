import { API_ROOT } from "@/queries/config";

const BACKEND_LOGIN_ENDPOINT = `${API_ROOT}/login`;
export const navigateToLoginEndpoint = () => {
  window.location.href = BACKEND_LOGIN_ENDPOINT;
};
