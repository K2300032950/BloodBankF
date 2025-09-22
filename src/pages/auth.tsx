// auth.ts

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem("isAdminLoggedIn") === "true";
}

export function setAdminLoggedIn(value: boolean): void {
  localStorage.setItem("isAdminLoggedIn", value ? "true" : "false");
}
