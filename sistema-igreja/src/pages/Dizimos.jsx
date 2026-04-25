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
              <th>Nome do mombro</th>
              <th>Valor</th>
              <th>Data do dizimo</th>
              <th>Deu ou não</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
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