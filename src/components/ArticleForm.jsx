import { useEffect, useState } from 'react'

const RULES = {
  title: { min: 20, label: 'Title' },
  content: { min: 200, label: 'Content' },
  category: { min: 3, label: 'Category' },
}

function validate(values) {
  const errors = {}
  for (const [field, rule] of Object.entries(RULES)) {
    const value = (values[field] || '').trim()
    if (!value) {
      errors[field] = `${rule.label} is required`
    } else if (value.length < rule.min) {
      errors[field] = `${rule.label} must be at least ${rule.min} characters (currently ${value.length})`
    }
  }
  return errors
}

// form yang dipakai bareng di halaman Add New dan Edit Article
export default function ArticleForm({ initialValues, onSubmit, submitting, serverError }) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState(false)
  const [localErrors, setLocalErrors] = useState({})

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
  }

  const submit = (status) => {
    setTouched(true)
    const errors = validate(values)
    setLocalErrors(errors)
    if (Object.keys(errors).length > 0) return
    onSubmit({ ...values, status })
  }

  const errorFor = (field) => (touched ? localErrors[field] : undefined)

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={values.title}
          onChange={handleChange('title')}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          placeholder="At least 20 characters"
        />
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-rose-600">{errorFor('title')}</span>
          <span className="text-slate-400">{values.title.trim().length}/20 min</span>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={values.category}
          onChange={handleChange('category')}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          placeholder="At least 3 characters"
        />
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-rose-600">{errorFor('category')}</span>
          <span className="text-slate-400">{values.category.trim().length}/3 min</span>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          rows={10}
          value={values.content}
          onChange={handleChange('content')}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          placeholder="At least 200 characters"
        />
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-rose-600">{errorFor('content')}</span>
          <span className="text-slate-400">{values.content.trim().length}/200 min</span>
        </div>
      </div>

      {serverError && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          disabled={submitting}
          onClick={() => submit('publish')}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Publish
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={() => submit('draft')}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Draft
        </button>
      </div>
    </div>
  )
}
