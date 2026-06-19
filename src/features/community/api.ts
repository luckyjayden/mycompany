import { supabase } from '../../lib/supabase'
import type { Post } from '../../types'

export async function getPosts(board: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(name, avatar_url)')
    .eq('board', board)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Post[]
}

export async function getPost(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(name, avatar_url)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Post
}

export async function createPost(post: Pick<Post, 'user_id' | 'board' | 'title' | 'content'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()
  if (error) throw error
  return data as Post
}

export async function updatePost(id: string, updates: Pick<Post, 'title' | 'content'>) {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Post
}

export async function deletePost(id: string) {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
}

export async function incrementViewCount(id: string) {
  await supabase.rpc('increment_view_count', { post_id: id })
}
