import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '../types'

interface AuthStore {
  user: User | null
  profile: Profile | null
  isAdmin: boolean
  isLoading: boolean
  setSession: (user: User | null, profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  clear: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  isAdmin: false,
  isLoading: true,
  setSession: (user, profile) =>
    set({ user, profile, isAdmin: profile?.role === 'admin' }),
  setLoading: (isLoading) => set({ isLoading }),
  clear: () => set({ user: null, profile: null, isAdmin: false }),
}))
