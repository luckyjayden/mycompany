import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { createPost, updatePost, getPost } from '../../features/community/api'
import { useAuthStore } from '../../stores/useAuthStore'
import { Input } from '../../components/common/Input'
import { Button } from '../../components/common/Button'

const schema = z.object({
  board: z.enum(['notice', 'general', 'qna']),
  title: z.string().min(2, '제목은 2자 이상이어야 합니다.'),
  content: z.string().min(5, '내용은 5자 이상이어야 합니다.'),
})
type FormData = z.infer<typeof schema>

const boardLabels = { notice: '공지사항', general: '자유게시판', qna: 'Q&A' }

export default function PostWritePage() {
  const { user, isAdmin } = useAuthStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('id')
  const editBoard = searchParams.get('board') as FormData['board'] | null

  const { data: existingPost } = useQuery({
    queryKey: ['post', editId],
    queryFn: () => getPost(editId!),
    enabled: !!editId,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: existingPost
      ? { board: existingPost.board, title: existingPost.title, content: existingPost.content }
      : { board: editBoard ?? 'general', title: '', content: '' },
  })

  const onSubmit = async (data: FormData) => {
    if (editId) {
      await updatePost(editId, { title: data.title, content: data.content })
      navigate(`/community/${data.board}/${editId}`)
    } else {
      const post = await createPost({ ...data, user_id: user!.id })
      navigate(`/community/${data.board}/${post.id}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-ink mb-8">
        {editId ? '게시글 수정' : '게시글 작성'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-1 rounded-xl border border-hairline p-8 space-y-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-ink-muted">게시판 *</label>
          <select
            className="w-full rounded-md border border-hairline bg-surface-1 text-ink px-3 py-2 text-sm focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-primary/50"
            {...register('board')}
            disabled={!!editId}
          >
            {Object.entries(boardLabels).map(([value, label]) => (
              (value !== 'notice' || isAdmin) && (
                <option key={value} value={value}>{label}</option>
              )
            ))}
          </select>
        </div>

        <Input
          id="title"
          label="제목 *"
          placeholder="제목을 입력해주세요"
          error={errors.title?.message}
          {...register('title')}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-ink-muted">내용 *</label>
          <textarea
            rows={12}
            placeholder="내용을 입력해주세요"
            className="w-full rounded-md border border-hairline bg-surface-1 text-ink placeholder:text-ink-tertiary px-3 py-2 text-sm focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            {...register('content')}
          />
          {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            취소
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {editId ? '수정 완료' : '등록'}
          </Button>
        </div>
      </form>
    </div>
  )
}
