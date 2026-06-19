import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function InquiryCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-success" />
      </div>
      <h1 className="text-2xl font-bold text-ink mb-3">문의가 접수되었습니다</h1>
      <p className="text-ink-subtle mb-8">
        빠른 시일 내에 입력하신 이메일로 답변드리겠습니다.<br />
        평균 답변 시간은 24시간 이내입니다.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-surface-2 px-4 py-2 text-sm font-medium text-ink hover:bg-surface-3 transition-colors"
        >
          홈으로
        </Link>
        <Link
          to="/inquiry"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          추가 문의
        </Link>
      </div>
    </div>
  )
}
