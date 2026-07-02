export const env = {
  /** BE base URL. In dev the Vite proxy (vite.config.ts) forwards /api to localhost:8080. */
  apiUrl: (import.meta.env.VITE_API_URL as string | undefined) ?? '/api',
}
