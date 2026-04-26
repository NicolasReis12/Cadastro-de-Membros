import './Dizimos.css';
import { createDizimos, getDizimos, deleteDizimo } from '../services/dizimosService';
import { useState, useEffect } from 'react';

function Dizimos() {
  const [modalAberto, setModalAberto] = useState(false)
  const [dizimos, setDizimos] = useState([])

  const initialForm = {
    nome_membro: '',
    valor: '',
    data: '',
    status: ''
  }

  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    carregarDizimos()
  }, [])

  async function carregarDizimos() {
    const { data } = await getDizimos()
    if (data) setDizimos(data)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function abrirModal() {
    setForm(initialForm) // sempre limpa ao abrir
    setModalAberto(true)
  }

  async function cadastrarDizimos() {
    const { error } = await createDizimos(form)

    if (error) {
      console.error('Erro ao cadastrar:', error.message)
      return
    }

    console.log("Cadastrado com sucesso")

    await carregarDizimos()

    setForm(initialForm) // limpa depois de salvar
    setModalAberto(false)
  }

  async function excluirDizimo(id) {
    if (!window.confirm("Tem certeza que deseja excluir este dízimo?")) return

    const { error } = await deleteDizimo(id)

    if (error) {
      console.error('Erro ao deletar:', error.message)
      return
    }

    console.log("Deletado com sucesso")
    await carregarDizimos()
  }

  function formatarDataBR(data) {
    if (!data) return ''
    return new Date(data).toLocaleDateString('pt-BR')
  }

  function formatarValor(valor) {
    if (!valor) return 'R$ 0,00'
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <div className="page-dizimos">
      <div className="dizimos-header">
        <h2>Cadastro de dízimos</h2>
        <button onClick={abrirModal} className="btn-cadastrar">
          Cadastrar dízimo
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome do membro</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {dizimos.map(d => (
              <tr key={d.id}>
                <td>{d.nome_membro}</td>
                <td>{formatarValor(d.valor)}</td>
                <td>{formatarDataBR(d.data)}</td>
                <td>
                  <div className="actions">
                    <button className="btn-editar">Editar</button>
                    <button onClick={() => excluirDizimo(d.id)} className="btn-excluir">
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Cadastrar dízimo</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Nome do membro</label>
                <input
                  name="nome_membro"
                  value={form.nome_membro}
                  onChange={handleChange}
                  placeholder="Nome do membro"
                />
              </div>

              <div className="form-group">
                <label>Valor</label>
                <input
                  name="valor"
                  type="number"
                  value={form.valor}
                  onChange={handleChange}
                  placeholder="R$ 0,00"
                />
              </div>

              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="pago">Pago</option>
                  <option value="pendente">Pendente</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setModalAberto(false)}>
                Cancelar
              </button>
              <button className="btn-salvar" onClick={cadastrarDizimos}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dizimos;