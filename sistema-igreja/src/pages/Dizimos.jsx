import './Dizimos.css';



function Dizimos() {

    function cadastrarDizimo(){
    return alert("Olá! Esta é uma mensagem de alerta.")

}
  return (
    <div className="page-dizimos">
      <div className="dizimos-header">
        <h2>Cadastro de dizimos</h2>
        <button onClick={cadastrarDizimo} className="btn-cadastrar">Cadastrar Dizimo</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data de nascimento</th>
              <th>CPF</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Número</th>
              <th>Complemento</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>
                <div className="actions">
                  <button className="btn-editar">Editar</button>
                  <button className="btn-excluir">Excluir</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dizimos;