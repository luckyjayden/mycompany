import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function LoginCompletePage() {
  const navigate = useNavigate()
  const [count, setCount] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-success" />
      </div>
      <h1 className="text-2xl font-bold text-ink mb-3">로그인이 완료되었습니다</h1>
      <p className="text-ink-subtle mb-8">
        환영합니다! {count}초 후 홈으로 이동합니다.
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
