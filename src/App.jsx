import Navbars from './components/Navbar'; 
import Caixa from './components/Caixa';
import Lista from './components/lista.jsx';
import Aniversario from './components/aniversaio.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter> 
    <Navbars/>
    <Routes>
          <Route path="/" element={<Caixa/>} />
          <Route path="lista" element={  <Lista/>  } />
          <Route path="aniversario" element={  <Aniversario/>  } /> 
        </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
