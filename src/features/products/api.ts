import { supabase } from '../../lib/supabase'
import type { Product } from '../../types'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('order_index')
  if (error) throw error
  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data as Product
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('order_index')
    .limit(6)
  if (error) throw error
  return data as Product[]
}

export async function upsertProduct(product: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .upsert(product)
    .select()
    .single()
  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}
