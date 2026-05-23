import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

const ALL_PERMISSIONS = {
  dashboard: true,
  membros: true,
  aniversariantes: true,
  entradas: true,
  ofertas: true,
  ofertas_especiais: true,
  relatorios: true,
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [igreja, setIgreja] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [permissoes, setPermissoes] = useState({})
  const [usuarioIgreja, setUsuarioIgreja] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mutex para evitar chamadas paralelas de carregarUsuario
  const carregandoRef = useRef(false)

  function limparEstado() {
    setSession(null)
    setIgreja(null)
    setIsAdmin(false)
    setIsOwner(false)
    setPermissoes({})
    setUsuarioIgreja(null)
  }

  async function carregarUsuario(userId) {
    if (carregandoRef.current) return
    carregandoRef.current = true

    try {
      const { data: igrejaData, error: erroIgreja } = await supabase
        .from('igrejas')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

      if (erroIgreja) throw erroIgreja

      if (igrejaData) {
        setIgreja(igrejaData)
        setIsOwner(true)
        setIsAdmin(true)
        setPermissoes(ALL_PERMISSIONS)
        setUsuarioIgreja(null)
        return
      }

      const { data: subUser, error: erroSubUser } = await supabase
        .from('usuarios_igreja')
        .select('*')
        .eq('auth_user_id', userId)
        .eq('ativo', true)
        .maybeSingle()

      if (erroSubUser) throw erroSubUser

      if (subUser) {
        const { data: igrejaDoSubUser } = await supabase
          .from('igrejas')
          .select('*')
          .eq('id', subUser.igreja_id)
          .maybeSingle()

        setIgreja(igrejaDoSubUser)
        setIsOwner(false)
        setIsAdmin(subUser.is_admin)
        setPermissoes(subUser.permissoes ?? {})
        setUsuarioIgreja(subUser)
        return
      }

      // Usuário autenticado mas sem vínculo com igreja
      setIgreja(null)
      setIsOwner(false)
      setIsAdmin(false)
      setPermissoes({})
      setUsuarioIgreja(null)
    } catch (error) {
      console.error('[AuthContext] Erro ao carregar usuário:', error)
      setIgreja(null)
      setIsOwner(false)
      setIsAdmin(false)
      setPermissoes({})
      setUsuarioIgreja(null)
    } finally {
      carregandoRef.current = false
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return

      // INITIAL_SESSION: estado inicial ao montar o app
      if (event === 'INITIAL_SESSION') {
        setSession(session)
        if (session) {
          carregarUsuario(session.user.id)
        } else {
          setLoading(false)
        }
        return
      }

      // SIGNED_IN: login efetuado
      if (event === 'SIGNED_IN') {
        setSession(session)
        setLoading(true)
        carregarUsuario(session.user.id)
        return
      }

      // SIGNED_OUT: logout ou sessão inválida
      if (event === 'SIGNED_OUT') {
        limparEstado()
        setLoading(false)
        return
      }

      // TOKEN_REFRESHED: só atualiza a sessão — não recarrega dados nem ativa loading
      // É isso que dispara ao voltar de outra aba com token expirado
      if (event === 'TOKEN_REFRESHED' && session) {
        setSession(session)
      }
    })

    // Safety net: se INITIAL_SESSION nunca disparar, libera o loading após 8s
    const timeout = setTimeout(() => {
      if (mounted) {
        setLoading(prev => {
          if (prev) console.warn('[AuthContext] Timeout de segurança ativado — INITIAL_SESSION não disparou')
          return false
        })
      }
    }, 8000)

    return () => {
      mounted = false
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user,
        igreja,
        isAdmin,
        isOwner,
        permissoes,
        usuarioIgreja,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
