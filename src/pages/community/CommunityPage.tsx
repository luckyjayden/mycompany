import { useQuery } from '@tanstack/react-query'
import { Link, useParams, NavLink } from 'react-router-dom'
import { PenSquare, Pin, Eye } from 'lucide-react'
import { getPosts } from '../../features/community/api'
import { useAuthStore } from '../../stores/useAuthStore'
import { formatDate } from '../../lib/utils'
import { Badge } from '../../components/common/Badge'

const boards = [
  { id: 'notice', label: '공지사항' },
  { id: 'general', label: '자유게시판' },
  { id: 'qna', label: 'Q&A' },
]

export default function CommunityPage() {
  const { board = 'general' } = useParams<{ board?: string }>()
  const { user } = useAuthStore()

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', board],
    queryFn: () => getPosts(board),
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-ink">커뮤니티</h1>
        {user && (
          <Link
            to="/community/write"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          >
            <PenSquare className="w-4 h-4" /> 글쓰기
          </Link>
        )}
      </div>

      {/* Board tabs */}
      <div className="flex gap-1 mb-6 border-b border-hairline">
        {boards.map(({ id, label }) => (
          <NavLink
            key={id}
            to={`/community/${id}`}
            className={({ isActive }) =>
              `px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-primary-600 text-primary'
                  : 'border-transparent text-ink-subtle hover:text-ink'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-surface-1 rounded-xl border border-hairline overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-1/50 border-b border-hairline">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle w-12">번호</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">제목</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle w-24">작성자</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle w-24">날짜</th>
              <th className="text-right px-4 py-3 font-medium text-ink-subtle w-16">조회</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="px-4 py-3">
                    <div className="h-4 bg-surface-2 animate-pulse rounded" />
                  </td>
                </tr>
              ))
            ) : posts?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-ink-tertiary">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              posts?.map((post, index) => (
                <tr
                  key={post.id}
                  className={post.is_pinned ? 'bg-primary/10' : 'hover:bg-surface-1/50'}
                >
                  <td className="px-4 py-3 text-ink-tertiary">
                    {post.is_pinned ? <Pin className="w-4 h-4 text-primary-hover" /> : posts.length - index}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/community/${board}/${post.id}`}
                      className="flex items-center gap-2 font-medium text-ink hover:text-primary"
                    >
                      {post.is_pinned && <Badge variant="info">공지</Badge>}
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-subtle">{post.profiles?.name}</td>
                  <td className="px-4 py-3 text-ink-tertiary">{formatDate(post.created_at)}</td>
                  <td className="px-4 py-3 text-right text-ink-tertiary">
                    <span className="flex items-center justify-end gap-1">
                      <Eye className="w-3 h-3" /> {post.view_count}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {posts?.map((post) => (
          <Link
            key={post.id}
            to={`/community/${board}/${post.id}`}
            className={`block rounded-xl border p-4 ${post.is_pinned ? 'bg-primary/10 border-primary-200' : 'bg-surface-1 border-hairline'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              {post.is_pinned && <Badge variant="info">공지</Badge>}
              <span className="font-medium text-ink">{post.title}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-tertiary">
              <span>{post.profiles?.name}</span>
              <span>{formatDate(post.created_at)}</span>
              <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{post.view_count}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
