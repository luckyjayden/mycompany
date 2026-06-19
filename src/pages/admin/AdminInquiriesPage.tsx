import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllInquiries, updateInquiryStatus } from '../../features/inquiry/api'
import { formatDate } from '../../lib/utils'
import { Badge } from '../../components/common/Badge'
import { Button } from '../../components/common/Button'
import { Modal } from '../../components/common/Modal'
import type { Inquiry } from '../../types'

const statusMap = {
  pending: { label: '대기중', variant: 'warning' as const },
  in_progress: { label: '처리중', variant: 'info' as const },
  resolved: { label: '완료', variant: 'success' as const },
}

export default function AdminInquiriesPage() {
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [answer, setAnswer] = useState('')
  const queryClient = useQueryClient()

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: getAllInquiries,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, status, answer }: { id: string; status: Inquiry['status']; answer?: string }) =>
      updateInquiryStatus(id, status, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] })
      setSelected(null)
    },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-ink mb-8">문의 관리</h1>
      <div className="bg-surface-1 rounded-xl border border-hairline overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-1/50 border-b border-hairline">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">유형</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">제목</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">작성자</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">상태</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">접수일</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}><td colSpan={6} className="px-4 py-3"><div className="h-4 bg-surface-2 animate-pulse rounded" /></td></tr>
              ))
            ) : inquiries?.map(inq => (
              <tr key={inq.id} className="hover:bg-surface-1/50">
                <td className="px-4 py-3"><Badge>{inq.category}</Badge></td>
                <td className="px-4 py-3 font-medium text-ink">{inq.title}</td>
                <td className="px-4 py-3 text-ink-subtle">{inq.name}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusMap[inq.status].variant}>{statusMap[inq.status].label}</Badge>
                </td>
                <td className="px-4 py-3 text-ink-tertiary">{formatDate(inq.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => { setSelected(inq); setAnswer(inq.answer ?? '') }}
                    className="text-xs text-primary hover:underline"
                  >
                    답변
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="문의 답변">
        {selected && (
          <div className="space-y-4">
            <div className="bg-surface-1/50 rounded-lg p-4 text-sm">
              <p className="font-medium text-ink mb-1">{selected.title}</p>
              <p className="text-ink-subtle whitespace-pre-wrap">{selected.content}</p>
            </div>
            <textarea
              rows={5}
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="답변을 입력해주세요"
              className="w-full rounded-md border border-hairline bg-surface-1 text-ink placeholder:text-ink-tertiary px-3 py-2 text-sm focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => updateMutation.mutate({ id: selected.id, status: 'in_progress' })}
                loading={updateMutation.isPending}
              >
                처리중으로
              </Button>
              <Button
                onClick={() => updateMutation.mutate({ id: selected.id, status: 'resolved', answer })}
                loading={updateMutation.isPending}
              >
                답변 완료
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
