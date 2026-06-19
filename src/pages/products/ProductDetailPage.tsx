import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Package } from 'lucide-react'
import { getProductBySlug } from '../../features/products/api'
import { Badge } from '../../components/common/Badge'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-3 rounded w-1/3" />
          <div className="h-64 bg-surface-2 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 bg-surface-2 rounded w-full" />
            <div className="h-4 bg-surface-2 rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20">
        <Package className="w-16 h-16 mx-auto mb-4 text-ink-tertiary" />
        <p className="text-ink-subtle">제품을 찾을 수 없습니다.</p>
        <Link to="/products" className="mt-4 inline-block text-primary hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-sm text-ink-subtle hover:text-ink mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> 제품 목록
      </Link>

      <div className="bg-surface-1 rounded-xl border border-hairline overflow-hidden">
        <div className="aspect-video bg-surface-2 flex items-center justify-center">
          {product.image_url ? (
            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-20 h-20 text-ink-tertiary" />
          )}
        </div>
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {product.category && <Badge>{product.category}</Badge>}
            {product.is_featured && <Badge variant="info">추천 제품</Badge>}
          </div>
          <h1 className="text-2xl font-bold text-ink mb-3">{product.title}</h1>
          {product.summary && (
            <p className="text-ink-subtle text-lg mb-6">{product.summary}</p>
          )}
          {product.description && (
            <div
              className="prose prose-sm max-w-none text-ink-muted leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          <div className="mt-8 pt-6 border-t border-hairline flex flex-wrap gap-3">
            <Link
              to="/inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-hover transition-colors"
            >
              이 제품 문의하기
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface-2 px-6 py-3 text-base font-medium text-ink hover:bg-surface-3 transition-colors"
            >
              다른 제품 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
