import { supabase } from '../../lib/supabase'
import type { Inquiry } from '../../types'

export async function createInquiry(data: Omit<Inquiry, 'id' | 'status' | 'answer' | 'answered_at' | 'created_at'>) {
  const { error } = await supabase.from('inquiries').insert(data)
  if (error) throw error
}

export async function getMyInquiries(userId: string) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Inquiry[]
}

export async function getAllInquiries() {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Inquiry[]
}

export async function updateInquiryStatus(
  id: string,
  status: Inquiry['status'],
  answer?: string
) {
  const { error } = await supabase
    .from('inquiries')
    .update({ status, answer, answered_at: answer ? new Date().toISOString() : null })
    .eq('id', id)
  if (error) throw error
}
