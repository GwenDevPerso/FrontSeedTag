const API_BASE = typeof import.meta.env.VITE_API_URL === "string"
  ? import.meta.env.VITE_API_URL.replace(/\/$/, "")
  : "http://localhost:3000";

export function getAttackUrl(): string {
  return `${API_BASE}/attack`;
}

export function getCannonsStatusWsUrl(): string {
  const base = API_BASE.replace(/^http/, "ws");
  return `${base}/cannons/status`;
}
