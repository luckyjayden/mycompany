import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthInit } from './hooks/useAuth'
import { Layout } from './components/layout/Layout'
import { PrivateRoute, AdminRoute } from './components/layout/PrivateRoute'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/products/ProductsPage'
import ProductDetailPage from './pages/products/ProductDetailPage'
import InquiryPage from './pages/inquiry/InquiryPage'
import InquiryCompletePage from './pages/inquiry/InquiryCompletePage'
import CommunityPage from './pages/community/CommunityPage'
import PostDetailPage from './pages/community/PostDetailPage'
import PostWritePage from './pages/community/PostWritePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import MyPage from './pages/mypage/MyPage'
import MyInquiriesPage from './pages/mypage/MyInquiriesPage'
import AdminPage from './pages/admin/AdminPage'
import AdminMembersPage from './pages/admin/AdminMembersPage'
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1000 * 60 } },
})

function AppInner() {
  useAuthInit()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/inquiry/complete" element={<InquiryCompletePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/:board" element={<CommunityPage />} />
        <Route path="/community/:board/:id" element={<PostDetailPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/community/write" element={<PostWritePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/inquiries" element={<MyInquiriesPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/members" element={<AdminMembersPage />} />
          <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
