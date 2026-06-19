import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../../stores/useAuthStore'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Badge } from '../../components/common/Badge'

const schema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  phone: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export default function MyPage() {
  const { profile, setSession, user } = useAuthStore()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: profile?.name ?? '', phone: profile?.phone ?? '' },
  })

  const onSubmit = async (data: FormData) => {
    const { data: updated, error } = await supabase
      .from('profiles')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', user!.id)
      .select()
      .single()
    if (!error && updated && user) {
      setSession(user, updated as typeof profile)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-ink mb-8">마이페이지</h1>

      <div className="bg-surface-1 rounded-xl border border-hairline p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-hairline">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {profile?.name?.[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">{profile?.name}</span>
              <Badge variant={profile?.role === 'admin' ? 'danger' : 'default'}>
                {profile?.role === 'admin' ? '관리자' : '회원'}
              </Badge>
            </div>
            <p className="text-sm text-ink-subtle mt-1">{profile?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="name"
            label="이름"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="phone"
            label="연락처"
            placeholder="010-0000-0000"
            {...register('phone')}
          />
          {success && (
            <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              프로필이 업데이트되었습니다.
            </p>
          )}
          <div className="flex justify-end pt-2">
            <Button type="submit" loading={isSubmitting}>저장</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
