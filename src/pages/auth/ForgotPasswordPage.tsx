import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ink">비밀번호 재설정</h1>
          <p className="mt-1 text-sm text-ink-subtle">가입한 이메일을 입력해주세요</p>
        </div>
        {sent ? (
          <div className="bg-success/10 border border-success/20 rounded-xl p-8 text-center">
            <p className="text-success font-medium mb-2">이메일을 발송했습니다</p>
            <p className="text-sm text-ink-subtle">받은편지함을 확인하고 링크를 클릭해주세요.</p>
            <Link to="/auth/login" className="mt-4 inline-block text-primary text-sm">로그인으로 돌아가기</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-surface-1 rounded-xl border border-hairline p-8 space-y-4">
            <Input
              id="email"
              label="이메일"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Button type="submit" size="lg" loading={loading} className="w-full">
              재설정 메일 보내기
            </Button>
            <p className="text-center text-sm">
              <Link to="/auth/login" className="text-ink-tertiary hover:text-ink-muted">로그인으로 돌아가기</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
