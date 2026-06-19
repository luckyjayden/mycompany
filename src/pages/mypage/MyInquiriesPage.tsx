import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../stores/useAuthStore'
import { getMyInquiries } from '../../features/inquiry/api'
import { formatDate } from '../../lib/utils'
import { Badge } from '../../components/common/Badge'
import { MessageSquare } from 'lucide-react'

const statusMap = {
  pending: { label: '대기중', variant: 'warning' as const },
  in_progress: { label: '처리중', variant: 'info' as const },
  resolved: { label: '완료', variant: 'success' as const },
}

export default function MyInquiriesPage() {
  const { user } = useAuthStore()
  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['my-inquiries', user?.id],
    queryFn: () => getMyInquiries(user!.id),
    enabled: !!user,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-ink mb-8">내 문의 내역</h1>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-surface-2 animate-pulse rounded-xl" />)}
        </div>
      ) : inquiries?.length === 0 ? (
        <div className="text-center py-20 text-ink-tertiary">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>문의 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries?.map(inquiry => {
            const status = statusMap[inquiry.status]
            return (
              <div key={inquiry.id} className="bg-surface-1 rounded-xl border border-hairline p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge>{inquiry.category}</Badge>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <span className="text-xs text-ink-tertiary">{formatDate(inquiry.created_at)}</span>
                </div>
                <p className="font-medium text-ink">{inquiry.title}</p>
                <p className="mt-1 text-sm text-ink-subtle line-clamp-2">{inquiry.content}</p>
                {inquiry.answer && (
                  <div className="mt-3 pt-3 border-t border-hairline bg-green-50 rounded-lg px-4 py-3">
                    <p className="text-xs font-medium text-green-700 mb-1">답변</p>
                    <p className="text-sm text-green-800">{inquiry.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
