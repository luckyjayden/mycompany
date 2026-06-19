import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
  passwordConfirm: z.string(),
}).refine(d => d.password === d.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async ({ name, email, password }: FormData) => {
    setServerError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) {
      setServerError(error.message)
      return
    }
    navigate('/')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">J</span>
          </div>
          <h1 className="text-headline font-semibold text-ink">회원가입</h1>
          <p className="mt-1 text-body-sm text-ink-subtle">새 계정을 만드세요</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-1 border border-hairline rounded-xl p-8 space-y-4">
          <Input
            id="name"
            label="이름"
            placeholder="홍길동"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="email"
            label="이메일"
            type="email"
            placeholder="example@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="6자 이상"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
            error={errors.passwordConfirm?.message}
            {...register('passwordConfirm')}
          />
          {serverError && (
            <p className="text-body-sm text-red-400 bg-red-700/10 border border-red-700/20 rounded-md px-3 py-2">{serverError}</p>
          )}
          <Button type="submit" size="lg" loading={isSubmitting} className="w-full mt-2">
            회원가입
          </Button>
          <p className="text-center text-body-sm text-ink-subtle">
            이미 계정이 있으신가요?{' '}
            <Link to="/auth/login" className="text-primary hover:text-primary-hover font-medium transition-colors">로그인</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
