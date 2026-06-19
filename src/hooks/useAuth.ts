import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../stores/useAuthStore'
import type { Profile } from '../types'

export function useAuthInit() {
  const { setSession, setLoading, clear } = useAuthStore()

  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setSession(session.user, profile as Profile)
      }
      setLoading(false)
    }

    initSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          setSession(session.user, profile as Profile)
        } else {
          clear()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [setSession, setLoading, clear])
}
