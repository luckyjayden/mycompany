import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async ({ email, password }: FormData) => {
    setServerError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setServerError('이메일 또는 비밀번호가 올바르지 않습니다.')
      return
    }
    navigate('/auth/login/complete')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">J</span>
          </div>
          <h1 className="text-headline font-semibold text-ink">로그인</h1>
          <p className="mt-1 text-body-sm text-ink-subtle">계정에 로그인하세요</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-1 border border-hairline rounded-xl p-8 space-y-4">
          <Input id="email" label="이메일" type="email" placeholder="example@email.com"
            error={errors.email?.message} {...register('email')} />
          <Input id="password" label="비밀번호" type="password" placeholder="••••••••"
            error={errors.password?.message} {...register('password')} />
          {serverError && (
            <p className="text-body-sm text-red-400 bg-red-700/10 border border-red-700/20 rounded-md px-3 py-2">{serverError}</p>
          )}
          <Button type="submit" size="lg" loading={isSubmitting} className="w-full mt-2">
            로그인
          </Button>
          <div className="flex items-center justify-between text-body-sm pt-1">
            <Link to="/auth/forgot-password" className="text-ink-tertiary hover:text-ink-subtle transition-colors">
              비밀번호 찾기
            </Link>
            <Link to="/auth/register" className="text-primary hover:text-primary-hover font-medium transition-colors">
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
