import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './home.jsx'
import Criar from './criar.jsx'
import Editar from './editar.jsx'


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar" element={<Criar />} />
        <Route path="/editar" element={<Editar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
