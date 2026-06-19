import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, Edit } from 'lucide-react'
import { getProducts, upsertProduct, deleteProduct } from '../../features/products/api'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Modal } from '../../components/common/Modal'
import { Badge } from '../../components/common/Badge'
import type { Product } from '../../types'

const schema = z.object({
  title: z.string().min(1, '제품명을 입력해주세요.'),
  slug: z.string().min(1, 'slug를 입력해주세요.').regex(/^[a-z0-9-]+$/, '영문 소문자, 숫자, 하이픈만 가능합니다.'),
  summary: z.string().optional(),
  category: z.string().optional(),
  is_featured: z.boolean().default(false),
})
type ResolvedFormData = { title: string; slug: string; summary?: string; category?: string; is_featured: boolean }

export default function AdminProductsPage() {
  const [modal, setModal] = useState<{ open: boolean; product?: Product }>({ open: false })
  const queryClient = useQueryClient()

  const { data: products, isLoading } = useQuery({ queryKey: ['products'], queryFn: getProducts })

  const saveMutation = useMutation({
    mutationFn: (data: Partial<Product>) => upsertProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setModal({ open: false })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ResolvedFormData>({
    resolver: zodResolver(schema) as never,
    defaultValues: modal.product ? {
      title: modal.product.title,
      slug: modal.product.slug,
      summary: modal.product.summary ?? '',
      category: modal.product.category ?? '',
      is_featured: modal.product.is_featured,
    } : { is_featured: false },
  })

  const openCreate = () => { reset({ is_featured: false }); setModal({ open: true }) }
  const openEdit = (p: Product) => { reset(p); setModal({ open: true, product: p }) }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-ink">제품 관리</h1>
        <Button size="sm" onClick={openCreate}><Plus className="w-4 h-4" /> 제품 추가</Button>
      </div>

      <div className="bg-surface-1 rounded-xl border border-hairline overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-1/50 border-b border-hairline">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">제품명</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">카테고리</th>
              <th className="text-left px-4 py-3 font-medium text-ink-subtle">추천</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {isLoading ? (
              [...Array(3)].map((_, i) => <tr key={i}><td colSpan={4} className="px-4 py-3"><div className="h-4 bg-surface-2 animate-pulse rounded" /></td></tr>)
            ) : products?.map(p => (
              <tr key={p.id} className="hover:bg-surface-1/50">
                <td className="px-4 py-3 font-medium text-ink">{p.title}</td>
                <td className="px-4 py-3"><Badge>{p.category ?? '—'}</Badge></td>
                <td className="px-4 py-3">{p.is_featured ? <Badge variant="info">추천</Badge> : '—'}</td>
                <td className="px-4 py-3 text-right flex justify-end gap-2">
                  <button onClick={() => openEdit(p)} className="p-1 text-ink-tertiary hover:text-primary"><Edit className="w-4 h-4" /></button>
                  <button
                    onClick={() => confirm('삭제하시겠습니까?') && deleteMutation.mutate(p.id)}
                    className="p-1 text-ink-tertiary hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.product ? '제품 수정' : '제품 추가'}
      >
        <form
          onSubmit={handleSubmit(data => saveMutation.mutate({ ...modal.product, ...data }))}
          className="space-y-4"
        >
          <Input id="title" label="제품명 *" error={errors.title?.message} {...register('title')} />
          <Input id="slug" label="Slug *" placeholder="product-name" error={errors.slug?.message} {...register('slug')} />
          <Input id="summary" label="요약" {...register('summary')} />
          <Input id="category" label="카테고리" {...register('category')} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('is_featured')} className="rounded" />
            추천 제품으로 설정
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => setModal({ open: false })}>취소</Button>
            <Button type="submit" loading={isSubmitting || saveMutation.isPending}>저장</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
