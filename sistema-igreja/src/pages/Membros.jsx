import { createMembro, getMembros } from '../services/membrosService';
import './Membros.css';
import { useState, useEffect } from 'react';

function Membros() {
  const [modalAberto, setModalAberto] = useState(false)
  const [membros, setMembros] = useState([])
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', cpf: '',
    data_nascimento: '', cep: '', logradouro: '',
    numero: '', complemento: '', bairro: '', cidade: '', uf: ''
  })

  useEffect(() => {
    carregarMembros()
  }, [])

  async function carregarMembros() {
    const { data } = await getMembros()
    if (data) setMembros(data)
  }

  async function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
      console.log("Deu certo!")
    const cepLimpo = e.target.value.replace(/\D/g, '')
    if (cepLimpo.length !== 8) return

    try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data = await response.json()

    if (!data.erro) {
      setForm(f => ({
        ...f,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf
      }))
    }
  } catch (error) {
    console.error('Erro:', 'CEP não encontrado')
  }
  }

 
  async function cadastrarMembro() {
    const { error } = await createMembro(form)
    if (error) {
      console.error('Erro ao cadastrar:', error.message)
      return
    }
    console.log("Cadastrado com sucesso")
    await carregarMembros()
    setModalAberto(false)
  } 

  return (
    <div className="page-membros">
      <div className="membros-header">
        <h2 className="text-cadastro">Cadastro de membros</h2>
        <button onClick={() => setModalAberto(true)} className="btn-cadastrar">
          Cadastrar membro
        </button>
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
              <th>Rua</th>
              <th>Número</th>
              <th>Complemento</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {membros.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.nome}</td>
                <td>{m.email}</td>
                <td>{m.telefone}</td>
                <td>{m.data_nascimento}</td>
                <td>{m.cpf}</td>
                <td>{m.cep}</td>
                <td>{m.logradouro}</td>
                <td>{m.numero}</td>
                <td>{m.complemento}</td>
                <td>{m.bairro}</td>
                <td>{m.cidade}</td>
                <td>{m.uf}</td>
                <td>
                  <div className="actions">
                    <button className="btn-editar">Editar</button>
                    <button className="btn-excluir">Excluir</button>
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
            <h3>Cadastrar membro</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Nome *</label>
                <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="email@exemplo.com" />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" />
              </div>
              <div className="form-group">
                <label>Data de nascimento</label>
                <input name="data_nascimento" type="date" value={form.data_nascimento} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>CEP</label>
                <input name="cep" value={form.cep} onChange={handleChange} maxlength="8" placeholder="00000-000" />
              </div>
              <div className="form-group full">
                <label>Logradouro</label>
                <input name="logradouro" value={form.logradouro} onChange={handleChange} placeholder="Rua, Avenida..." />
              </div>
              <div className="form-group">
                <label>Número</label>
                <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número da residencia" />
              </div>
              <div className="form-group">
                <label>Complemento</label>
                <input name="complemento" value={form.complemento} onChange={handleChange} placeholder="Apto, Bloco..." />
              </div>
              <div className="form-group">
                <label>Bairro</label>
                <input name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" />
              </div>
              <div className="form-group">
                <label>Cidade</label>
                <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" />
              </div>
              <div className="form-group">
                <label>UF</label>
                <input name="uf" value={form.uf} onChange={handleChange} placeholder="MG" maxLength={2} />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="btn-salvar" onClick={cadastrarMembro}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Membros;