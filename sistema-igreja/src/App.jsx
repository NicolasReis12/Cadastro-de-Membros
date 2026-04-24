import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Membros from './pages/Membros'
import Dizimos from './pages/Dizimos'
import Aniversariantes from './pages/Aniversariantes'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Membros />} />
        <Route path="/dizimos" element={<Dizimos />} />
        <Route path="/aniversariantes" element={<Aniversariantes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App