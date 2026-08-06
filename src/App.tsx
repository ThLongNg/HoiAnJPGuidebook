import { useState, useEffect } from 'react'
import { Home, MessageCircle, UtensilsCrossed, AlertTriangle, Camera, Globe, Menu, X } from 'lucide-react'
import { type Tab, sky } from '@/types'
import HomePage    from '@/pages/HomePage'
import KaiwaPage   from '@/pages/KaiwaPage'
import GourmetPage from '@/pages/GourmetPage'
import SpotsPage   from '@/pages/SpotsPage'
import ChuiPage    from '@/pages/ChuiPage'
import GreenSMPage from '@/pages/GreenSMPage'

const navItems = [
  { id: 'home'    as Tab, icon: Home,            label: 'ホーム' },
  { id: 'kaiwa'  as Tab, icon: MessageCircle,   label: '会話' },
  { id: 'gourmet'as Tab, icon: UtensilsCrossed, label: 'グルメ' },
  { id: 'spots'  as Tab, icon: Camera,           label: '観光' },
  { id: 'chui'  as Tab,  icon: AlertTriangle,   label: '注意事項' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const current = navItems.find((n) => n.id === activeTab)!

  function handleNavigate(tab: Tab) {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  function NavLink({ item, mobile = false }: { item: typeof navItems[0]; mobile?: boolean }) {
    const active = activeTab === item.id
    const Icon = item.icon
    if (mobile) {
      return (
        <button
          onClick={() => handleNavigate(item.id)}
          className="flex flex-col items-center justify-center gap-1 flex-1 transition-colors py-2"
        >
          <Icon size={20} strokeWidth={active ? 2.5 : 1.8} style={{ color: active ? sky[500] : '#94a3b8' }} />
          <span className="text-[9px] font-medium" style={{ color: active ? sky[500] : '#94a3b8' }}>
            {item.label}
          </span>
        </button>
      )
    }
    return (
      <button
        onClick={() => handleNavigate(item.id)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
        style={
          active
            ? { background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})`, color: 'white', boxShadow: `0 4px 12px ${sky[200]}` }
            : { color: '#64748b', backgroundColor: 'transparent' }
        }
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = sky[50] }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
        {item.label}
      </button>
    )
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? 'p-4' : 'p-5'}`}>
      <div className="flex items-center gap-3 px-2 py-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl font-bold"
          style={{ background: `linear-gradient(135deg, ${sky[600]}, ${sky[400]})` }}
        >
          🇻🇳
        </div>
        <div>
          <div className="font-bold text-slate-800 text-sm leading-tight">ベトナム</div>
          <div className="text-xs text-slate-400">旅行ガイド</div>
        </div>
      </div>
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => <NavLink key={item.id} item={item} />)}
      </nav>
      <div className="mt-6 pt-4 border-t border-sky-100">
        <div className="px-4 py-2 text-xs text-slate-400 text-center">ホイアン・ダナン 完全ガイド</div>
      </div>
    </div>
  )

  const PageContent = () => (
    <>
      {activeTab === 'home'    && <HomePage onNavigate={handleNavigate} />}
      {activeTab === 'kaiwa'  && <KaiwaPage />}
      {activeTab === 'gourmet'&& <GourmetPage />}
      {activeTab === 'spots'  && <SpotsPage />}
      {activeTab === 'chui'   && <ChuiPage onNavigate={handleNavigate} />}
      {activeTab === 'greensm'&& <GreenSMPage onNavigate={handleNavigate} />}
    </>
  )

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Desktop */}
      <div className="hidden lg:flex min-h-dvh">
        <aside className="w-56 flex-shrink-0 bg-white/80 backdrop-blur-xl border-r border-sky-100 sticky top-0 h-dvh overflow-y-auto">
          <Sidebar />
        </aside>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white/70 backdrop-blur-xl border-b border-sky-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h1 className="font-bold text-slate-800 text-lg">{current.label}</h1>
              <p className="text-xs text-slate-400 mt-0.5">ベトナム旅行ガイド</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100">
              <Globe size={12} /> ホイアン・ダナン対応
            </div>
          </header>
          <main className="flex-1 p-8 max-w-6xl w-full mx-auto">
            <div className="anim-in" key={activeTab}>
              <PageContent />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="lg:hidden flex flex-col min-h-dvh">
        <header className="bg-white/80 backdrop-blur-xl border-b border-sky-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-sky-50 transition-colors md:hidden"
            >
              <Menu size={20} className="text-slate-600" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg">🇻🇳</span>
              <span className="font-bold text-slate-800 text-sm">ベトナム旅行ガイド</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 bg-sky-50 px-2 py-1 rounded-full border border-sky-100 hidden sm:block">
            ホイアン・ダナン
          </div>
        </header>

        {/* Tablet tab bar */}
        <div className="hidden md:flex border-b border-sky-100 bg-white/80 backdrop-blur-xl px-4 gap-1">
          {navItems.map((item) => {
            const active = activeTab === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all"
                style={{ borderBottomColor: active ? sky[500] : 'transparent', color: active ? sky[500] : '#64748b' }}
              >
                <Icon size={16} /> {item.label}
              </button>
            )
          })}
        </div>

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <div className="max-w-3xl mx-auto anim-in" key={activeTab}>
            <PageContent />
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-sky-100 flex z-30"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {navItems.map((item) => <NavLink key={item.id} item={item} mobile />)}
        </nav>
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 bg-white/95 h-full shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-slate-100"
            >
              <X size={16} className="text-slate-600" />
            </button>
            <Sidebar mobile />
          </div>
        </div>
      )}
    </div>
  )
}
