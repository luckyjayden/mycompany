import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'

const navLinks = [
  { to: '/', label: '홈' },
  { to: '/products', label: '제품소개' },
  { to: '/inquiry', label: '온라인문의' },
  { to: '/community', label: '커뮤니티' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, profile, isAdmin } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-canvas border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-body text-ink">LuckyJayden</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-md text-body-sm font-medium transition-colors',
                    isActive
                      ? 'bg-surface-2 text-ink'
                      : 'text-ink-subtle hover:bg-surface-1 hover:text-ink'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* User area */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-body-sm text-ink-subtle hover:bg-surface-1 hover:text-ink transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-primary-hover" />
                  </div>
                  <span className="font-medium text-ink">{profile?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 rounded-lg bg-surface-2 border border-hairline py-1">
                    <Link
                      to="/mypage"
                      className="flex items-center gap-2 px-4 py-2 text-body-sm text-ink-muted hover:bg-surface-3 hover:text-ink transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" /> 마이페이지
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-body-sm text-ink-muted hover:bg-surface-3 hover:text-ink transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" /> 관리자
                      </Link>
                    )}
                    <hr className="my-1 border-hairline" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-body-sm text-red-400 hover:bg-surface-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> 로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-body-sm font-medium text-ink-subtle hover:text-ink transition-colors px-3 py-2"
                >
                  로그인
                </Link>
                <Link
                  to="/auth/register"
                  className="rounded-md bg-primary px-3.5 py-2 text-button font-medium text-white hover:bg-primary-hover transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-md p-2 text-ink-subtle hover:bg-surface-1 hover:text-ink transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-hairline bg-surface-1 px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 rounded-md text-body-sm font-medium transition-colors',
                    isActive ? 'bg-surface-2 text-ink' : 'text-ink-subtle hover:text-ink'
                  )
                }
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-hairline flex flex-col gap-1">
            {user ? (
              <>
                <Link to="/mypage" className="text-body-sm text-ink-muted px-3 py-2 hover:text-ink" onClick={() => setMobileOpen(false)}>
                  마이페이지
                </Link>
                <button onClick={handleLogout} className="text-left text-body-sm text-red-400 px-3 py-2">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="text-body-sm text-ink-subtle px-3 py-2" onClick={() => setMobileOpen(false)}>
                  로그인
                </Link>
                <Link to="/auth/register" className="text-body-sm text-primary font-medium px-3 py-2" onClick={() => setMobileOpen(false)}>
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
