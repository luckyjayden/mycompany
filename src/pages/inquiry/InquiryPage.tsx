import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore'
import { createInquiry } from '../../features/inquiry/api'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'

const schema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  phone: z.string().optional(),
  category: z.enum(['제품문의', '견적요청', '기타']),
  title: z.string().min(2, '제목은 2자 이상이어야 합니다.'),
  content: z.string().min(10, '내용은 10자 이상이어야 합니다.'),
})

type FormData = z.infer<typeof schema>

export default function InquiryPage() {
  const { user, profile } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile?.name ?? '',
      email: profile?.email ?? '',
      phone: profile?.phone ?? '',
      category: '제품문의',
    },
  })

  const onSubmit = async (data: FormData) => {
    await createInquiry({ ...data, user_id: user?.id })
    navigate('/inquiry/complete')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-ink">온라인 문의</h1>
        <p className="mt-3 text-ink-subtle">궁금한 점을 남겨주시면 빠르게 답변드리겠습니다.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-1 rounded-xl border border-hairline p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="name"
            label="이름 *"
            placeholder="홍길동"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="email"
            label="이메일 *"
            type="email"
            placeholder="example@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <Input
          id="phone"
          label="연락처"
          placeholder="010-0000-0000"
          {...register('phone')}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-ink-muted">문의 유형 *</label>
          <select
            className="w-full rounded-md border border-hairline bg-surface-1 text-ink px-3 py-2 text-sm focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-primary/50"
            {...register('category')}
          >
            <option value="제품문의">제품문의</option>
            <option value="견적요청">견적요청</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <Input
          id="title"
          label="제목 *"
          placeholder="문의 제목을 입력해주세요"
          error={errors.title?.message}
          {...register('title')}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-ink-muted">내용 *</label>
          <textarea
            rows={6}
            placeholder="문의 내용을 자세히 작성해주세요"
            className="w-full rounded-md border border-hairline bg-surface-1 text-ink placeholder:text-ink-tertiary px-3 py-2 text-sm focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            {...register('content')}
          />
          {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        </div>

        <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
          문의 보내기
        </Button>
      </form>
    </div>
  )
}
