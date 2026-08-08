import axios from 'axios'

// default localhost, ganti VITE_API_URL kalau backend-nya beda alamat
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})

export default client
