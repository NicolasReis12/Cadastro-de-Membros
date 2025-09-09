import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";

function Aniversario() {
  const [usuarios, setUsuarios] = useState([]);
  const mesAtual = new Date().getMonth() + 1;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${API_URL}/usuarios/`);
        const data = await response.json();
        const aniversariantes = data.filter((u) => {
          const mes = new Date(u.nascimento).getMonth() + 1;
          return mes === mesAtual;
        });
        setUsuarios(aniversariantes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Aniversariantes do Mês</h2>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
            {user.name} - {user.endereco} - {user.nascimento}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Aniversario;
