import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { ConfigPage } from './pages/ConfigPage'
import { AppHeader } from './components/AppHeader'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/config" element={<ConfigPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;