import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listArticles, apiErrorMessage } from '../api/articles'
import Pagination from '../components/Pagination'
import StatusBadge from '../components/StatusBadge'
import { formatDate, truncate } from '../lib/format'

const LIMIT = 5

export default function Preview() {
  const [offset, setOffset] = useState(0)
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data, meta } = await listArticles({ limit: LIMIT, offset, status: 'publish' })
      setPosts(data)
      setTotal(meta.total)
    } catch (err) {
      setError(apiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [offset])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Blog</h1>

      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading && <p className="text-slate-400">Loading...</p>}

      {!loading && posts.length === 0 && !error && (
        <p className="text-slate-400">No published articles yet.</p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/preview/${post.id}`}
            className="block rounded border border-slate-200 bg-white p-5 hover:bg-slate-50"
          >
            <div className="mb-2 flex items-center gap-2">
              <StatusBadge status={post.status} />
              <span className="text-xs text-slate-400">{formatDate(post.created_date)}</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{post.category}</p>
            <p className="mt-2 text-sm text-slate-600">{truncate(post.content)}</p>
          </Link>
        ))}
      </div>

      <Pagination total={total} limit={LIMIT} offset={offset} onChange={setOffset} />
    </div>
  )
}
