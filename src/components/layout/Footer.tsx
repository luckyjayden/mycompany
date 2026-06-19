import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline text-ink-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="font-bold text-body text-ink">LuckyJayden</span>
            </div>
            <p className="text-body-sm leading-relaxed">
              최고의 기술력으로 고객의 비즈니스를 혁신하는 파트너입니다.
            </p>
            <p className="mt-4 text-caption text-ink-tertiary">
              대표이사: 홍길동 | 사업자등록번호: 123-45-67890<br />
              서울특별시 강남구 테헤란로 123
            </p>
          </div>
          <div>
            <h3 className="text-body-sm font-semibold text-ink mb-4">서비스</h3>
            <ul className="space-y-2 text-body-sm">
              <li><Link to="/products" className="hover:text-ink transition-colors">제품소개</Link></li>
              <li><Link to="/inquiry" className="hover:text-ink transition-colors">온라인문의</Link></li>
              <li><Link to="/community" className="hover:text-ink transition-colors">커뮤니티</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-body-sm font-semibold text-ink mb-4">고객지원</h3>
            <ul className="space-y-2 text-body-sm">
              <li>Tel: 02-1234-5678</li>
              <li>Email: info@luckyjayden.com</li>
              <li>평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-hairline text-caption text-ink-tertiary text-center">
          © 2026 LuckyJayden Corp. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
