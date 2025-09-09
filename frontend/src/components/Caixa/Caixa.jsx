import { useState } from "react";
import "./Caixa.css";

function Caixa() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    tell: "",
    endereco: "",
    cpf: "",
    nascimento: "",
  });

  // Atualiza valores do formulário
  const handleChangeValue = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  // Função para cadastrar usuário
  const handleClickButton = async () => {
    try {
      // Validação básica
      if (!values.name || !values.tell || !values.endereco || !values.nascimento) {
        alert("Por favor, preencha todos os campos obrigatórios (*)");
        return;
      }

      // Envia os dados para a API
      const response = await fetch("http://127.0.0.1:8000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Erro ao cadastrar membro");
      }

      const novoMembro = await response.json();
      alert(`Membro ${novoMembro.name} cadastrado com sucesso!`);

      // Limpa o formulário
      setValues({
        name: "",
        email: "",
        tell: "",
        endereco: "",
        cpf: "",
        nascimento: "",
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar membro: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="cx">
        <p>Cadastro de Membros</p>

        <label>Nome*:</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChangeValue}
          required
          placeholder="Nome Sobrenome"
          className="inp"
          type="text"
        />
        <br />

        <label>Email:</label>
        <input
          name="email"
          value={values.email}
          onChange={handleChangeValue}
          placeholder="nome@gmail.com"
          className="inp"
          type="text"
        />
        <br />

        <label>Telefone*:</label>
        <input
          name="tell"
          value={values.tell}
          onChange={handleChangeValue}
          required
          placeholder="3298888-8888"
          className="inp"
          type="text"
        />
        <br />

        <label>Endereço*:</label>
        <input
          name="endereco"
          value={values.endereco}
          onChange={handleChangeValue}
          required
          placeholder="Rua Rafael Zacarias 25"
          className="inp"
          type="text"
        />
        <br />

        <label>CPF:</label>
        <input
          name="cpf"
          value={values.cpf}
          onChange={handleChangeValue}
          placeholder="123.123.123-12"
          className="inp"
          type="text"
        />
        <br />

        <label>Data de Nascimento*:</label>
        <input
          name="nascimento"
          value={values.nascimento}
          onChange={handleChangeValue}
          required
          className="inp"
          type="date"
        />
        <br />
        <br />

        <button onClick={handleClickButton} className="btns">
          Salvar
        </button>
      </div>
    </div>
  );
}

export default Caixa;