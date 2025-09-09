import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar/Navbar.jsx";
import Caixa from "./components/Caixa/Caixa.jsx";
import Lista from "./components/Lista/Lista.jsx";
import Aniversario from "./pages/Aniversario/Aniversario.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Caixa />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/aniversario" element={<Aniversario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;