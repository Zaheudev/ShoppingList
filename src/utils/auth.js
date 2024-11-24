export const getAuthToken = () => localStorage.getItem("authToken");

export const getUserId = () => localStorage.getItem("_id");

export const setAuthToken = (token, id) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("_id", id);
};

export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("_id");
};

export default { getAuthToken, setAuthToken, clearAuthToken };
