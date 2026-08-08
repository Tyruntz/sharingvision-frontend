export default function Pagination({ total, limit, offset, onChange }) {
  const currentPage = Math.floor(offset / limit) + 1
  const totalPages = Math.max(1, Math.ceil(total / limit))

  if (totalPages <= 1) return null

  const goTo = (page) => {
    const clamped = Math.min(Math.max(page, 1), totalPages)
    onChange((clamped - 1) * limit)
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <p className="text-sm text-slate-500">
        Page {currentPage} of {totalPages} &middot; {total} total
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100"
        >
          Next
        </button>
      </div>
    </div>
  )
}
