export function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function truncate(text, max = 160) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max).trim()}…` : text
}
