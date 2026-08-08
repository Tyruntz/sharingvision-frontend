import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { getArticle, updateArticle, apiErrorMessage } from '../api/articles'

export default function EditArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [values, setValues] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getArticle(id)
      .then((post) => {
        if (cancelled) return
        setValues({ title: post.title, content: post.content, category: post.category })
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [id])

  const handleSubmit = async (nextValues) => {
    setSubmitting(true)
    setError('')
    try {
      await updateArticle(id, nextValues)
      navigate('/posts')
    } catch (err) {
      setError(apiErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Edit Article</h1>

      {loading && <p className="text-slate-400">Loading...</p>}

      {!loading && error && !values && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && values && (
        <ArticleForm initialValues={values} onSubmit={handleSubmit} submitting={submitting} serverError={error} />
      )}
    </div>
  )
}
