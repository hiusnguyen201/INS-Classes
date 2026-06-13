const ACCESS_KEY = 'ins.accessToken'
const REFRESH_KEY = 'ins.refreshToken'

/**
 * Token storage: localStorage when "remember me" is checked (survives browser
 * restart), sessionStorage otherwise (cleared when the tab closes).
 */
export const tokenStorage = {
  save(tokens: { accessToken: string; refreshToken: string }, remember: boolean) {
    this.clear()
    const store = remember ? localStorage : sessionStorage
    store.setItem(ACCESS_KEY, tokens.accessToken)
    store.setItem(REFRESH_KEY, tokens.refreshToken)
  },

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_KEY) ?? sessionStorage.getItem(ACCESS_KEY)
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY) ?? sessionStorage.getItem(REFRESH_KEY)
  },

  clear() {
    for (const store of [localStorage, sessionStorage]) {
      store.removeItem(ACCESS_KEY)
      store.removeItem(REFRESH_KEY)
    }
  },
}
