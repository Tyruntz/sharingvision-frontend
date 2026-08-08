import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { createArticle, apiErrorMessage } from '../api/articles'

const EMPTY = { title: '', content: '', category: '' }

export default function AddNew() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setError('')
    try {
      await createArticle(values)
      navigate('/posts')
    } catch (err) {
      setError(apiErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Add New Article</h1>
      <ArticleForm initialValues={EMPTY} onSubmit={handleSubmit} submitting={submitting} serverError={error} />
    </div>
  )
}
