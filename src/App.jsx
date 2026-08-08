import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AllPosts from './pages/AllPosts'
import AddNew from './pages/AddNew'
import EditArticle from './pages/EditArticle'
import Preview from './pages/Preview'
import PreviewDetail from './pages/PreviewDetail'

function App() {
  return (
    <div className="min-h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/new" element={<AddNew />} />
        <Route path="/posts/:id/edit" element={<EditArticle />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/preview/:id" element={<PreviewDetail />} />
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </div>
  )
}

export default App
