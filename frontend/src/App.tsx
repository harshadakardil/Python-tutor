import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { HomePage } from './pages/HomePage';
import { ConfigPage } from './pages/ConfigPage';
import { LessonPage } from './pages/LessonPage';
import MyPage from './pages/MyPage';
import { ThemeProvider } from './components/theme-provider';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/config" element={<ConfigPage />} />
              <Route path="/lesson-page" element={<LessonPage />} />
              <Route path="/my-page" element={<MyPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;