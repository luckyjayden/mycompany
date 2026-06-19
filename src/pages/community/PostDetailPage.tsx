import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Trash2, Edit } from 'lucide-react'
import { getPost, deletePost } from '../../features/community/api'
import { useAuthStore } from '../../stores/useAuthStore'
import { formatDateTime } from '../../lib/utils'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'

export default function PostDetailPage() {
  const { board = 'general', id } = useParams<{ board: string; id: string }>()
  const { user, isAdmin } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id!),
    enabled: !!id,
  })

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', board] })
      navigate(`/community/${board}`)
    },
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-3 rounded w-2/3" />
          <div className="h-4 bg-surface-2 rounded w-1/3" />
          <div className="h-64 bg-surface-2 rounded" />
        </div>
      </div>
    )
  }

  if (!post) return null

  const canEdit = user?.id === post.user_id || isAdmin

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to={`/community/${board}`}
        className="inline-flex items-center gap-1 text-sm text-ink-subtle hover:text-ink mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> 목록으로
      </Link>

      <div className="bg-surface-1 rounded-xl border border-hairline overflow-hidden">
        <div className="p-8 border-b border-hairline">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                {post.is_pinned && <Badge variant="info">공지</Badge>}
              </div>
              <h1 className="text-2xl font-bold text-ink">{post.title}</h1>
              <div className="mt-3 flex items-center gap-4 text-sm text-ink-tertiary">
                <span>{post.profiles?.name}</span>
                <span>{formatDateTime(post.created_at)}</span>
                <span>조회 {post.view_count}</span>
              </div>
            </div>
            {canEdit && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  to={`/community/write?id=${post.id}&board=${board}`}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-ink-muted hover:bg-surface-2 transition-colors"
                >
                  <Edit className="w-4 h-4" /> 수정
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  loading={deleteMutation.isPending}
                  onClick={() => {
                    if (confirm('게시글을 삭제하시겠습니까?')) deleteMutation.mutate()
                  }}
                >
                  <Trash2 className="w-4 h-4" /> 삭제
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="p-8">
          <div className="prose max-w-none text-ink-muted whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  )
}
