const STYLES = {
  publish: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  thrash: 'bg-red-100 text-red-800',
}

export default function StatusBadge({ status }) {
  const style = STYLES[status] || 'bg-gray-100 text-gray-800'
  return <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${style}`}>{status}</span>
}
