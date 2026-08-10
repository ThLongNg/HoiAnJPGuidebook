import { useState, useEffect } from 'react'
import { Home, MessageCircle, UtensilsCrossed, AlertTriangle, Camera, Globe, Menu, X, ArrowRightLeft, Coins, Gift, Heart, Languages, Banknote } from 'lucide-react'
import { type Tab, sky } from '@/types'
import HomePage from '@/pages/HomePage'
import KaiwaPage from '@/pages/KaiwaPage'
import GourmetPage from '@/pages/GourmetPage'
import SpotsPage from '@/pages/SpotsPage'
import ChuiPage from '@/pages/ChuiPage'
import GreenSMPage from '@/pages/GreenSMPage'
import OmiyagePage from '@/pages/OmiyagePage'
import CurrencyConverter from '@/components/CurrencyConverter'
import TranslatorModal from '@/components/TranslatorModal'
import SecretMessagePage from '@/components/SecretMessagePage'
import FavoritesModal from '@/components/FavoritesModal'
import { useFavorites } from '@/hooks/useFavorites'

// ─── Background video config ───────────────────────────────────
const BG_VIDEO_URL = 'https://res.cloudinary.com/dbjejsbh7/video/upload/v1786176387/0808_1_jxq3gi.mp4'

// Fallback image shown when video fails or URL is empty
const BG_FALLBACK_IMG = 'https://izitour.com/media/blog/hoi-an-itinerary.webp'

const BG_STYLE: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
  pointerEvents: 'none',
  opacity: 0.3,
}

// Global in-memory cache for video blob URL to prevent repeat HTTP Range requests on video loops
let globalVideoBlobUrl: string | null = null
let videoFetchPromise: Promise<string | null> | null = null

function fetchVideoBlob(url: string): Promise<string | null> {
  if (globalVideoBlobUrl) return Promise.resolve(globalVideoBlobUrl)
  if (videoFetchPromise) return videoFetchPromise

  videoFetchPromise = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Video fetch failed with status ${res.status}`)
      return res.blob()
    })
    .then((blob) => {
      globalVideoBlobUrl = URL.createObjectURL(blob)
      return globalVideoBlobUrl
    })
    .catch((err) => {
      console.warn('Could not load video blob, using direct URL / image fallback:', err)
      return null
    })

  return videoFetchPromise
}

function resolveVideoSrc(rawUrl: string): { type: 'mp4' | 'iframe'; src: string } {
  if (!rawUrl) return { type: 'mp4', src: '/bg.mp4' }

  // Automatically convert Cloudinary Player Embed link to direct .mp4 CDN URL
  if (rawUrl.includes('player.cloudinary.com/embed')) {
    try {
      const parsed = new URL(rawUrl)
      const cloudName = parsed.searchParams.get('cloud_name')
      const publicId = parsed.searchParams.get('public_id')
      if (cloudName && publicId) {
        return {
          type: 'mp4',
          src: `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`,
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // If iframe embed URL
  if (rawUrl.includes('/embed/') && !rawUrl.endsWith('.mp4')) {
    return { type: 'iframe', src: rawUrl }
  }

  return { type: 'mp4', src: rawUrl }
}

function BgVideo() {
  const [videoError, setVideoError] = useState(false)
  const [blobSrc, setBlobSrc] = useState<string | null>(globalVideoBlobUrl)
  const resolved = resolveVideoSrc(BG_VIDEO_URL)

  useEffect(() => {
    if (resolved.type === 'iframe' || !resolved.src) return

    if (!globalVideoBlobUrl) {
      let isSubscribed = true
      fetchVideoBlob(resolved.src).then((url) => {
        if (isSubscribed && url) {
          setBlobSrc(url)
        }
      })
      return () => {
        isSubscribed = false
      }
    }
  }, [resolved.src, resolved.type])

  if (videoError || !resolved.src) {
    return (
      <img
        src={BG_FALLBACK_IMG}
        alt=""
        aria-hidden="true"
        style={BG_STYLE}
      />
    )
  }

  if (resolved.type === 'iframe') {
    return (
      <iframe
        src={resolved.src}
        title="Background Video"
        aria-hidden="true"
        style={{
          ...BG_STYLE,
          border: 'none',
          transform: 'scale(1.3)',
        }}
      />
    )
  }

  const activeSrc = blobSrc || resolved.src

  return (
    <video
      key={activeSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      style={BG_STYLE}
      onError={() => setVideoError(true)}
    >
      <source src={activeSrc} type="video/mp4" />
    </video>
  )
}
// ──────────────────────────────────────────────────────────────


const navItems = [
  { id: 'home' as Tab, icon: Home, label: 'ホーム' },
  { id: 'kaiwa' as Tab, icon: MessageCircle, label: '会話' },
  { id: 'gourmet' as Tab, icon: UtensilsCrossed, label: 'グルメ' },
  { id: 'spots' as Tab, icon: Camera, label: '観光' },
  { id: 'omiyage' as Tab, icon: Gift, label: 'お土産' },
  { id: 'chui' as Tab, icon: AlertTriangle, label: '注意事項' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [converterOpen, setConverterOpen] = useState(false)
  const [translatorOpen, setTranslatorOpen] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)

  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites()

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const current = navItems.find((n) => n.id === activeTab) || {
    id: activeTab,
    icon: AlertTriangle,
    label: activeTab === 'greensm' ? 'GreenSMの使い方' : 'ガイド',
  }

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
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:scale-105 transition-transform"
          style={{ background: "url('https://www.freeiconspng.com/uploads/-earth-find-flight-fly-globe-map-travel-icon--icon-search-engine-4.png') no-repeat center center/cover" }}
          onClick={() => setSecretOpen(true)}
          title="秘密のページを開く"
        >

        </div>
        <div>
          <div className="font-bold text-slate-800 text-sm leading-tight">ベトナム</div>
          <div className="text-xs text-slate-400">旅行ガイド</div>
        </div>
      </div>
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => <NavLink key={item.id} item={item} />)}

        {/* Quick action buttons for Favorites, Currency & Translator */}
        <div className="pt-3 mt-2 border-t border-sky-100 space-y-2">
          <button
            onClick={() => { setFavoritesOpen(true); if (mobile) setSidebarOpen(false) }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: 'white' }}
          >
            <div className="flex items-center gap-2">
              <Heart size={15} className="fill-white" />
              お気に入りリスト
            </div>
            {favorites.length > 0 && (
              <span className="bg-white text-rose-600 px-2 py-0.5 rounded-full text-[10px] font-black">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setTranslatorOpen(true); if (mobile) setSidebarOpen(false) }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white' }}
          >
            <Languages className="w-4 h-4" />
            日越 リアルタイム翻訳
          </button>

          <button
            onClick={() => { setConverterOpen(true); if (mobile) setSidebarOpen(false) }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: 'white' }}
          >
            <Banknote className="w-4 h-4" />
            通貨両替計算機
          </button>
        </div>
      </nav>
      <div className="mt-6 pt-4 border-t border-sky-100">
        <div className="px-4 py-2 text-xs text-slate-400 text-center">ホイアン・ダナン 完全ガイド</div>
      </div>
      <div className="mt-4 pt-4 border-t border-sky-100">
        <button
          onClick={() => { setSecretOpen(true); if (mobile) setSidebarOpen(false) }}
          className="w-full px-4 py-2 text-xs text-slate-400 text-center hover:text-sky-600 transition-colors"
        >
          Powered by セイリュウ ✦
        </button>
      </div>
    </div>
  )

  const PageContent = () => (
    <>
      {activeTab === 'home' && <HomePage onNavigate={handleNavigate} />}
      {activeTab === 'kaiwa' && <KaiwaPage />}
      {activeTab === 'gourmet' && <GourmetPage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
      {activeTab === 'spots' && <SpotsPage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
      {activeTab === 'omiyage' && <OmiyagePage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
      {activeTab === 'chui' && <ChuiPage onNavigate={handleNavigate} />}
      {activeTab === 'greensm' && <GreenSMPage onNavigate={handleNavigate} />}
    </>
  )

  return (
    <div className="min-h-dvh flex flex-col">
      {/* ── Background video / image ── */}
      <BgVideo />

      {/* ── Desktop (z-[1] so content is above blobs) ── */}
      <div className="hidden lg:flex min-h-dvh relative z-[1]">
        <aside className="w-56 flex-shrink-0 bg-white/80 backdrop-blur-xl border-r border-sky-100 sticky top-0 h-dvh overflow-y-auto">
          <Sidebar />
        </aside>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white/70 backdrop-blur-xl border-b border-sky-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h1 className="font-bold text-slate-800 text-lg">{current.label}</h1>
              <p className="text-xs text-slate-400 mt-0.5">ホイアン旅行ガイド</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSecretOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200/80 transition-all hover:scale-105 active:scale-95 shadow-2xs group"
                title="秘密のメッセージ 🏮"
              >
                <span className="text-amber-500 animate-pulse text-sm">🏮</span> 秘密のメッセージ
              </button>
              <button
                onClick={() => setFavoritesOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full border border-rose-200 transition-all hover:scale-105 active:scale-95 shadow-2xs relative"
                title="お気に入りリストを見る"
              >
                <Heart size={14} className="fill-rose-500 text-rose-500" />
                お気に入り
                {favorites.length > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full ml-0.5">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setTranslatorOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full border border-amber-300 transition-colors shadow-2xs"
              >
                <Languages className="w-4 h-4 text-amber-600" /> リアルタイム翻訳
              </button>
              <button
                onClick={() => setConverterOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-full border border-sky-200 transition-colors shadow-2xs"
              >
                <Banknote className="w-4 h-4 text-sky-500" /> 通貨両替
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Globe className="w-4 h-4 text-sky-500" /> 日本語対応
              </div>
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
      <div className="lg:hidden flex flex-col min-h-dvh relative z-[1]">
        <header className="bg-white/80 backdrop-blur-xl border-b border-sky-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-sky-50 transition-colors md:hidden"
            >
              <Menu size={20} className="text-slate-600" />
            </button>
            <button
              onClick={() => setSecretOpen(true)}
              className="flex items-center gap-1.5 text-left group"
              title="秘密のメッセージ 🏮"
            >
              <span className="text-amber-500 animate-pulse text-base group-hover:scale-110 transition-transform">🏮</span>
              <span className="font-bold text-slate-800 text-sm">ベトナム旅行ガイド</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFavoritesOpen(true)}
              className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200 transition-colors relative"
              title="お気に入りリスト"
            >
              <Heart size={13} className="fill-rose-500 text-rose-500" />
              <span>保存</span>
              {favorites.length > 0 && (
                <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setTranslatorOpen(true)}
              className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-full border border-amber-300 transition-colors"
            >
              <Languages className="w-3.5 h-3.5 text-amber-700" /> 翻訳
            </button>
            <button
              onClick={() => setConverterOpen(true)}
              className="flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-full border border-sky-200 transition-colors"
            >
              <Banknote className="w-3.5 h-3.5 text-sky-500" /> 両替
            </button>
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
        <div className="lg:hidden fixed inset-0 z-[90] flex">
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

      {/* Favorites Modal Overlay */}
      <FavoritesModal
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onNavigate={handleNavigate}
      />

      {/* Currency Converter Modal Overlay */}
      {converterOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md anim-in overscroll-none"
          onClick={() => setConverterOpen(false)}
        >
          <div
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CurrencyConverter onClose={() => setConverterOpen(false)} />
          </div>
        </div>
      )}

      {/* Translator Modal */}
      {translatorOpen && <TranslatorModal onClose={() => setTranslatorOpen(false)} />}

      {/* Secret Message Page Overlay */}
      {secretOpen && (
        <SecretMessagePage
          onBack={() => setSecretOpen(false)}
        />
      )}
    </div>
  )
}
