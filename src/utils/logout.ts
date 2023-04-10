export const logout = () => {
  sessionStorage.clear()
  window.dispatchEvent(new CustomEvent('logout'))
}
