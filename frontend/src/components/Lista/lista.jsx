import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";

function Lista() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${API_URL}/usuarios/`);
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Lista de Membros</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.tell}</td>
              <td>{user.endereco}</td>
              <td>{user.cpf}</td>
              <td>{user.nascimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lista;
