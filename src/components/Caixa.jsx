import "./caixa.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function Caixa() {
  const [setvalus, setValue] = useState();
  console.log(setvalus);
  const handlechangevalue = (value) => {
    setValue((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
    console.log(setvalus);
  };

  const handleclickbutton = () => {
    console.log(setvalus);
  };

  return (
    <div className="container">
      <div className="cx">
        <p>Cadasto de Membros</p>

        <label htmlFor=" adwd">Nome*:</label>
        <input
          name="name"
          onChange={handlechangevalue}
          required
          placeholder="Nome Sobrenome"
          className="inp"
          type="text"
        />
        <br />

        <label htmlFor="">Email:</label>
        <input
          name="email"
          onChange={handlechangevalue}
          placeholder="nome@gmail.com"
          className="inp"
          type="text"
        />
        <br />

        <label type="email" htmlFor="">
          Telefone*:
        </label>
        <input
          name="tell"
          onChange={handlechangevalue}
          required
          type="text"
          placeholder="3298888-8888"
          className="inp"
        />
        <br />

        <label htmlFor="">Endereço*:</label>
        <input
          name="endereco"
          onChange={handlechangevalue}
          required
          placeholder="Rua Rafael Zacarias 25"
          className="inp"
          type="text"
        />
        <br />

        <label htmlFor="">CPF:</label>
        <input
          name="cpf"
          onChange={handlechangevalue}
          placeholder="123.123.123-12"
          className="inp"
          type="text"
        />
        <br />

        <label htmlFor="">Data de Nascimento*:</label>
        <input
          name="nascimento"
          onChange={handlechangevalue}
          required
          placeholder="01/01/1001"
          className="inp"
          type="text"
        />

        <input type="image"></input>
        <br />
        <br />
        <button onClick={() => handleclickbutton} className="btns">
          Salvar
        </button>
      </div>
    </div>
  );
}

export default Caixa;
