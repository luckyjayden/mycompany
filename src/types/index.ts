export interface Profile {
  id: string
  name: string
  email: string
  phone?: string
  role: 'user' | 'admin'
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  title: string
  slug: string
  summary?: string
  description?: string
  image_url?: string
  category?: string
  is_featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  user_id?: string
  name: string
  email: string
  phone?: string
  category: '제품문의' | '견적요청' | '기타'
  title: string
  content: string
  status: 'pending' | 'in_progress' | 'resolved'
  answer?: string
  answered_at?: string
  created_at: string
}

export interface Post {
  id: string
  user_id: string
  board: 'notice' | 'general' | 'qna'
  title: string
  content: string
  is_pinned: boolean
  view_count: number
  created_at: string
  updated_at: string
  profiles?: Pick<Profile, 'name' | 'avatar_url'>
}
