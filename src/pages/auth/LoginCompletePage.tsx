import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function LoginCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-success" />
      </div>
      <h1 className="text-2xl font-bold text-ink mb-3">로그인이 완료되었습니다</h1>
      <p className="text-ink-subtle mb-8">
        환영합니다! 서비스를 이용하실 수 있습니다.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
      >
        홈으로 이동
      </Link>
    </div>
  )
}
