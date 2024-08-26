import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import PacienteList from './Pages/Pacientes/PacienteList'


const App = () => {
  return (    
    <BrowserRouter>
    <div className='container'>
      <Routes>
          <Route path="/" element={<PacienteList/>}/>
          <Route path="/listar-pacientes" element={<PacienteList/>}/>        
      </Routes>    
    </div>    
    </BrowserRouter>    
    
  )
}

export default App