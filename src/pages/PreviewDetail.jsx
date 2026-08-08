import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticle, apiErrorMessage } from '../api/articles'
import { formatDate } from '../lib/format'

export default function PreviewDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getArticle(id)
      .then((data) => {
        if (cancelled) return
        if (data.status !== 'publish') {
          setError('This article is not published.')
          return
        }
        setPost(data)
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/preview" className="mb-6 inline-block text-sm text-slate-500 hover:text-slate-700">
        &larr; Back to blog
      </Link>

      {loading && <p className="text-slate-400">Loading...</p>}

      {!loading && error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && post && (
        <article>
          <p className="text-sm text-slate-400">
            {post.category} &middot; {formatDate(post.created_date)}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">{post.title}</h1>
          <div className="prose mt-6 whitespace-pre-wrap text-slate-700">{post.content}</div>
        </article>
      )}
    </div>
  )
}
