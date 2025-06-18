import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import MainForm from './components/MainForm.tsx'
import QuestionPage from './pages/QuestionPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
      </Routes>
    </Router>
  </StrictMode>
)
