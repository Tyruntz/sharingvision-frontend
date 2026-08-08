import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listArticles, updateArticle, apiErrorMessage } from '../api/articles'
import Pagination from '../components/Pagination'
import { EditIcon, TrashIcon } from '../components/Icons'
import { formatDate } from '../lib/format'

const TABS = [
  { key: 'publish', label: 'Published' },
  { key: 'draft', label: 'Drafts' },
  { key: 'thrash', label: 'Trashed' },
]

const LIMIT = 10

export default function AllPosts() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('publish')
  const [offset, setOffset] = useState(0)
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data, meta } = await listArticles({ limit: LIMIT, offset, status: tab })
      setPosts(data)
      setTotal(meta.total)
    } catch (err) {
      setError(apiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [tab, offset])

  useEffect(() => {
    load()
  }, [load])

  const switchTab = (key) => {
    setTab(key)
    setOffset(0)
  }

  const moveToTrash = async (post) => {
    if (post.status === 'thrash') return
    setBusyId(post.id)
    try {
      await updateArticle(post.id, {
        title: post.title,
        content: post.content,
        category: post.category,
        status: 'thrash',
      })
      await load()
    } catch (err) {
      setError(apiErrorMessage(err))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">All Posts</h1>

      <div className="mb-4 flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => switchTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
              tab === t.key
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Title</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Category</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Updated</th>
              <th className="px-4 py-3 text-right font-medium text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  No articles here yet.
                </td>
              </tr>
            )}

            {!loading &&
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="max-w-xs truncate px-4 py-3 font-medium text-slate-800">{post.title}</td>
                  <td className="px-4 py-3 text-slate-600">{post.category}</td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(post.updated_date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => navigate(`/posts/${post.id}/edit`)}
                        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        title="Move to trash"
                        disabled={busyId === post.id}
                        onClick={() => moveToTrash(post)}
                        className="rounded-md p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination total={total} limit={LIMIT} offset={offset} onChange={setOffset} />
    </div>
  )
}
