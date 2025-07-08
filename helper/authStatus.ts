export const handleSetStatus = (status: boolean) => {
  localStorage.setItem("authStatus", JSON.stringify(status));
}

export const handleGetAuthStatus = () => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const status = localStorage.getItem("authStatus");
    return status ? JSON.parse(status) : false;
  }
  return false; // Default fallback for SSR
};
