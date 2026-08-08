import client from './client'

export async function listArticles({ limit = 10, offset = 0, status } = {}) {
  const res = await client.get(`/article/${limit}/${offset}`, {
    params: status ? { status } : {},
  })
  return res.data
}

export async function getArticle(id) {
  const res = await client.get(`/article/${id}`)
  return res.data
}

export async function createArticle(payload) {
  const res = await client.post('/article/', payload)
  return res.data
}

export async function updateArticle(id, payload) {
  const res = await client.put(`/article/${id}`, payload)
  return res.data
}

export async function deleteArticle(id) {
  const res = await client.delete(`/article/${id}`)
  return res.data
}

// ambil pesan error yang enak dibaca dari response axios
export function apiErrorMessage(err) {
  const data = err?.response?.data
  if (data?.errors) {
    return Object.values(data.errors).join(', ')
  }
  if (data?.error) return data.error
  return err?.message || 'Something went wrong'
}

export function apiFieldErrors(err) {
  return err?.response?.data?.errors || null
}
