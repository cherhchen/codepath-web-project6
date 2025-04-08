import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.jsx'
import Sidebar from './routes/Sidebar.jsx'
import DetailView from './routes/DetailView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar/>}>
          <Route index={true} element={<App/>}/>
          <Route index={false} path="/detail/:id" element={<DetailView/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
