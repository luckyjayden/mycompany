import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Users, MessageSquare, Package, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [members, inquiries, products] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
      ])
      return {
        members: members.count ?? 0,
        inquiries: inquiries.count ?? 0,
        products: products.count ?? 0,
      }
    },
  })

  const cards = [
    { title: '회원 관리', icon: Users, count: stats?.members, to: '/admin/members', color: 'bg-primary/10 text-primary-hover' },
    { title: '문의 관리', icon: MessageSquare, count: stats?.inquiries, to: '/admin/inquiries', color: 'bg-yellow-500/10 text-yellow-400' },
    { title: '제품 관리', icon: Package, count: stats?.products, to: '/admin/products', color: 'bg-success/10 text-success' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-ink mb-8">관리자 대시보드</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map(({ title, icon: Icon, count, to, color }) => (
          <Link
            key={to}
            to={to}
            className="bg-surface-1 rounded-xl border border-hairline p-6 hover:shadow-md transition-shadow group"
          >
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-ink mb-1">{count ?? '—'}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-subtle">{title}</span>
              <ArrowRight className="w-4 h-4 text-ink-tertiary group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
