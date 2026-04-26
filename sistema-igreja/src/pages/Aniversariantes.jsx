import './Aniversariantes.css'
import { useEffect, useState } from 'react'
import { getMembros } from '../services/membrosService'

function Aniversariantes() {
  const [membros, setMembros] = useState([])

  useEffect(() => {
    carregarMembros()
  }, [])

  async function carregarMembros() {
    const { data } = await getMembros()
    if (formatarData.falecido == "sim"){} 
    if (data) setMembros(data)
  }

  const hoje = new Date()
  const mesAtual = hoje.getMonth() + 1
  const diaAtual = hoje.getDate()

  const aniversariantes = membros
  .filter(m => {
    if (!m.data_nascimento) return false

    if (m.falecido === 'Sim') return false

    const mes = new Date(m.data_nascimento).getMonth() + 1
    return mes === mesAtual
  })

  function formatarData(data) {
    if (!data) return ''
    return new Date(data).toLocaleDateString('pt-BR')
  }

  function calcularIdade(data) {
    const hoje = new Date()
    const nascimento = new Date(data)
    return hoje.getFullYear() - nascimento.getFullYear()
  }

  function isHoje(data) {
    const d = new Date(data)
    return d.getDate() === diaAtual
  }

  function formatarTelefone(telefone) {
    if (!telefone) return ''
  
    const tel = telefone.replace(/\D/g, '')
  
    if (tel.length === 11) {
      return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
  
    if (tel.length === 10) {
      return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
  
    return telefone
  }

  return (
    <div className="page-aniversariantes">
      <h2>🎂 Aniversariantes do mês</h2>

      <div className="aniversariantes-grid">
        {aniversariantes.length === 0 && (
          <p className="sem-dados">Nenhum aniversariante este mês</p>
        )}

        {aniversariantes.map(m => (
          <div
            key={m.id}
            className={`card-aniversariante ${isHoje(m.data_nascimento) ? 'hoje' : ''}`}
          >
            <div className="avatar">
              {m.nome.charAt(0)}
            </div>

            <div className="info">
              <h3>{m.nome}</h3>
              <p>{formatarData(m.data_nascimento)}</p>
              <p>📞 {formatarTelefone(m.telefone)}</p>
              <span>🎉 {calcularIdade(m.data_nascimento)} anos</span>
            </div>

            {isHoje(m.data_nascimento) && (
              <div className="badge">HOJE</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Aniversariantes