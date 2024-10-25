// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import TipoPersona from "./pages/TipoPersona"
import Cliente from "./pages/Cliente"
import Poliza from "./pages/Poliza"
import ReportePoliza from "./pages/ReportePoliza"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div style={{display: "flex"}}>
          <Sidebar />

          <div style={{flexGrow: 1, padding: '1.5rem'}}>
            <Routes>
              <Route path="/" element={<TipoPersona />} />
              <Route path="/cliente" element={<Cliente />} />
              <Route path="/poliza" element={<Poliza />} />
              <Route path="/poliza-reporte" element={<ReportePoliza />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
