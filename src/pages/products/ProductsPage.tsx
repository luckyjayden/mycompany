import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Package, ArrowRight } from 'lucide-react'
import { getProducts } from '../../features/products/api'
import { Badge } from '../../components/common/Badge'

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-ink">제품 소개</h1>
        <p className="mt-3 text-ink-subtle">최신 기술로 비즈니스를 혁신하는 솔루션을 만나보세요.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-surface-2 rounded-xl h-64" />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <div className="text-center py-20 text-ink-tertiary">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p>등록된 제품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className="group bg-surface-1 rounded-xl border border-hairline overflow-hidden hover: transition-shadow"
            >
              <div className="aspect-video bg-surface-2 flex items-center justify-center">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-12 h-12 text-ink-tertiary" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="font-semibold text-ink group-hover:text-primary transition-colors">
                    {product.title}
                  </h2>
                  {product.is_featured && <Badge variant="info">추천</Badge>}
                </div>
                {product.category && (
                  <Badge className="mb-2">{product.category}</Badge>
                )}
                <p className="text-sm text-ink-subtle line-clamp-2">{product.summary}</p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  자세히 보기 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
