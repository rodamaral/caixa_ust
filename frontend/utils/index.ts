export function getCookie(name: string) {
  const escape = (s: string) => s.replace(/([.*+?^$(){}|[\]/\\])/g, '\\$1')
  const match = document.cookie.match(
    RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)')
  )
  return match ? match[1] : null
}
