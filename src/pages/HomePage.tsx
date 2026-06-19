import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Users, Package, MessageSquare } from 'lucide-react'

const features = [
  { icon: Package, title: '다양한 제품군', desc: '최신 기술을 적용한 다양한 제품을 제공합니다.' },
  { icon: Users, title: '전문 기술팀', desc: '10년 이상의 경험을 가진 전문가들이 지원합니다.' },
  { icon: MessageSquare, title: '빠른 고객지원', desc: '24시간 이내 신속한 답변을 보장합니다.' },
]

const stats = [
  { label: '고객사', value: '500+' },
  { label: '제품 수', value: '50+' },
  { label: '년 경력', value: '15+' },
  { label: '고객 만족도', value: '98%' },
]

export default function HomePage() {
  return (
    <div className="bg-canvas">
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-eyebrow text-primary uppercase tracking-[0.4px] mb-4">
            LuckyJayden Corp.
          </p>
          <h1 className="text-display-lg md:text-display-xl font-semibold text-ink leading-tight max-w-3xl">
            비즈니스 혁신을<br />함께 만들어갑니다
          </h1>
          <p className="mt-6 text-body-lg text-ink-muted max-w-xl leading-relaxed">
            최첨단 기술 솔루션으로 고객의 비즈니스를 한 단계 도약시키는
            신뢰할 수 있는 파트너입니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium text-button px-5 py-2.5 rounded-md transition-colors"
            >
              제품 보러가기 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 bg-surface-1 border border-hairline text-ink hover:bg-surface-2 font-medium text-button px-5 py-2.5 rounded-md transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-hairline bg-surface-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-display-md font-semibold text-ink">{value}</div>
                <div className="mt-1 text-body-sm text-ink-subtle">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-eyebrow text-primary uppercase tracking-[0.4px] mb-3">핵심 강점</p>
            <h2 className="text-display-md font-semibold text-ink">왜 LuckyJayden인가요?</h2>
            <p className="mt-4 text-body-lg text-ink-muted">고객 중심의 가치를 최우선으로 생각합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-surface-1 border border-hairline rounded-xl p-6 hover:bg-surface-2 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-hover" />
                </div>
                <h3 className="text-card-title font-medium text-ink mb-2">{title}</h3>
                <p className="text-body-sm text-ink-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-section border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-eyebrow text-primary uppercase tracking-[0.4px] mb-3">회사 소개</p>
              <h2 className="text-display-md font-semibold text-ink mb-6">15년의 기술 혁신</h2>
              <p className="text-body-lg text-ink-muted leading-relaxed mb-8">
                2010년 설립된 LuckyJayden은 15년간 기업 고객에게 최고 품질의 기술 솔루션을 제공해왔습니다.
                500개 이상의 고객사와 함께 성장하며, 지속적인 기술 혁신으로 업계를 선도하고 있습니다.
              </p>
              <ul className="space-y-3">
                {['ISO 9001 품질인증 획득', '글로벌 파트너십 네트워크', '연구개발 전문 인력 보유', '24/7 기술 지원 서비스'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-body-sm text-ink-muted">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-1 border border-hairline rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary-hover" />
                </div>
                <p className="text-body-sm text-ink-subtle font-medium">Team LuckyJayden</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-1 border border-hairline rounded-xl p-12 text-center">
            <h2 className="text-headline font-semibold text-ink mb-3">지금 바로 시작하세요</h2>
            <p className="text-body-lg text-ink-muted mb-8">전문 상담사가 최적의 솔루션을 안내해드립니다.</p>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium text-button px-6 py-2.5 rounded-md transition-colors"
            >
              무료 상담 신청 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
