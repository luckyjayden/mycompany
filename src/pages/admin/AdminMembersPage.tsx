import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { formatDate } from '../../lib/utils'
import { Badge } from '../../components/common/Badge'
import type { Profile } from '../../types'

export default function AdminMembersPage() {
  const queryClient = useQueryClient()

  const { data: members, isLoading } = useQuery({
    queryKey: ['admin-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as Profile[]
    },
  })

  const toggleRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const newRole = role === 'admin' ? 'user' : 'admin'
      const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-members'] }),
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-ink mb-8">회원 관리</h1>
      <div className="bg-surface-1 rounded-xl border border-hairline overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-1/50 border-b border-hairline">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">이름</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">이메일</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">연락처</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">권한</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">가입일</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}><td colSpan={6} className="px-4 py-3"><div className="h-4 bg-surface-2 animate-pulse rounded" /></td></tr>
              ))
            ) : members?.map(member => (
              <tr key={member.id} className="hover:bg-surface-1/50">
                <td className="px-4 py-3 font-medium text-ink">{member.name}</td>
                <td className="px-4 py-3 text-ink-subtle">{member.email}</td>
                <td className="px-4 py-3 text-ink-tertiary">{member.phone ?? '—'}</td>
                <td className="px-4 py-3">
                  <Badge variant={member.role === 'admin' ? 'danger' : 'default'}>
                    {member.role === 'admin' ? '관리자' : '회원'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-ink-tertiary">{formatDate(member.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => toggleRole.mutate({ id: member.id, role: member.role })}
                    className="text-xs text-primary hover:underline"
                  >
                    {member.role === 'admin' ? '일반으로' : '관리자로'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
