import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Home, MessageCircle, UtensilsCrossed, AlertTriangle, Camera, Globe, X, Heart, Languages, Banknote, Sparkles, Gift } from 'lucide-react'
import { type Tab } from '@/types'
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
import MobileBottomNav from '@/components/MobileBottomNav'
import { useFavorites } from '@/hooks/useFavorites'

// ─── Background video config ───────────────────────────────────
const BG_VIDEO_URL = 'https://res.cloudinary.com/dbjejsbh7/video/upload/v1786176387/0808_1_jxq3gi.mp4'
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

const navItems = [
  { id: 'home' as Tab, icon: Home, label: 'ホーム' },
  { id: 'spots' as Tab, icon: Camera, label: '観光' },
  { id: 'gourmet' as Tab, icon: UtensilsCrossed, label: 'グルメ' },
  { id: 'omiyage' as Tab, icon: Gift, label: 'お土産' },
  { id: 'kaiwa' as Tab, icon: MessageCircle, label: '会話' },
  { id: 'chui' as Tab, icon: AlertTriangle, label: '注意事項' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
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
  }

  const PageContent = () => (
    <>
      {activeTab === 'kaiwa' && <KaiwaPage />}
      {activeTab === 'gourmet' && <GourmetPage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
      {activeTab === 'spots' && <SpotsPage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
      {activeTab === 'omiyage' && <OmiyagePage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
      {activeTab === 'chui' && <ChuiPage onNavigate={handleNavigate} />}
      {activeTab === 'greensm' && <GreenSMPage onNavigate={handleNavigate} />}
    </>
  )

  return (
    <div className="min-h-dvh flex flex-col bg-[#faf8f3] text-[#1a1208] relative z-[1]">
      {/* Background video overlay for subpages */}
      {activeTab !== 'home' && <BgVideo />}

      {/* ── Unified Desktop Header Navigation (Used across ALL pages including HomePage) ── */}
      <header className="hidden md:flex bg-[#faf8f3]/90 backdrop-blur-md border-b border-[#e8e0d0] px-8 py-4 items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div
          onClick={() => handleNavigate('home')}
          className="flex flex-col cursor-pointer group"
          title="ホームへ戻る"
        >
          <span className="font-serif text-sm font-normal text-[#c8741a] tracking-widest group-hover:text-[#a85e12] transition-colors">HOI AN</span>
          <span className="font-sans text-[11px] font-light text-[#7a6447] tracking-wider">旅行ガイド</span>
        </div>

        {/* Desktop Nav Items */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`font-sans text-xs tracking-wider transition-all cursor-pointer py-1 border-b-2 ${isActive
                  ? 'border-[#c8741a] text-[#c8741a] font-medium'
                  : 'border-transparent text-[#7a6447] hover:text-[#1a1208]'
                  }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Utility buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSecretOpen(true)}
            className="flex items-center gap-1 font-sans text-xs font-medium text-[#c8741a] hover:opacity-80 transition-opacity cursor-pointer px-2 py-1"
            title="これは何でしょう？ 🏮"
          >
            <span className="text-base animate-pulse">🏮</span>
            <span>これは何でしょう？</span>
          </button>
          <button
            onClick={() => setFavoritesOpen(true)}
            className="flex items-center gap-1.5 font-sans text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-3.5 py-1.5 rounded-full border border-rose-200 transition-colors cursor-pointer"
            title="お気に入りリストを見る"
          >
            <Heart size={14} className="fill-rose-500 text-rose-500" />
            お気に入り
            {favorites.length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-medium px-1.5 py-0.2 rounded-full">
                {favorites.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTranslatorOpen(true)}
            className="flex items-center gap-1.5 font-sans text-xs font-medium text-[#3d6b63] bg-[#f5f1ea] hover:bg-[#e8e0d0] px-3.5 py-1.5 rounded-full border border-[#e8e0d0] transition-colors cursor-pointer"
          >
            <Languages className="w-4 h-4 text-[#3d6b63]" /> リアルタイム翻訳
          </button>
          <button
            onClick={() => setConverterOpen(true)}
            className="flex items-center gap-1.5 font-sans text-xs font-medium text-[#c8741a] bg-[#f5f1ea] hover:bg-[#e8e0d0] px-3.5 py-1.5 rounded-full border border-[#e8e0d0] transition-colors cursor-pointer"
          >
            <Banknote className="w-4 h-4 text-[#c8741a]" /> 両替計算機
          </button>
        </div>
      </header>

      {/* ── Unified Mobile Header (Compact Bar with Secondary Utilities) ── */}
      <header className="md:hidden bg-[#faf8f3]/94 backdrop-blur-md border-b border-[#e8e0d0] px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSecretOpen(true)}
            className="text-lg animate-pulse cursor-pointer hover:scale-110 active:scale-95 transition-transform p-1"
            title="これは何でしょう？ 🏮"
          >
            🏮
          </button>
          <span
            onClick={() => handleNavigate('home')}
            className="font-serif text-sm font-normal text-[#1a1208] cursor-pointer"
          >
            ホイアン旅行ガイド
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFavoritesOpen(true)}
            className="flex items-center gap-1 font-sans text-[11px] font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 active:scale-95 cursor-pointer"
            title="お気に入りリスト"
          >
            <Heart size={12} className="fill-rose-500 text-rose-500" />
            <span>保存</span>
            {favorites.length > 0 && (
              <span className="bg-rose-500 text-white text-[9px] font-medium px-1 rounded-full">
                {favorites.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTranslatorOpen(true)}
            className="flex items-center gap-1 font-sans text-[11px] font-medium text-[#3d6b63] bg-[#f5f1ea] px-2.5 py-1 rounded-full border border-[#e8e0d0] active:scale-95 cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-[#3d6b63]" /> 翻訳
          </button>
          <button
            onClick={() => setConverterOpen(true)}
            className="flex items-center gap-1 font-sans text-[11px] font-medium text-[#c8741a] bg-[#f5f1ea] px-2.5 py-1 rounded-full border border-[#e8e0d0] active:scale-95 cursor-pointer"
          >
            <Banknote className="w-3.5 h-3.5 text-[#c8741a]" /> 両替
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto pb-[calc(76px+env(safe-area-inset-bottom,0px))] md:pb-8">
        {activeTab === 'home' ? (
          <HomePage
            onNavigate={handleNavigate}
            onOpenConverter={() => setConverterOpen(true)}
            onOpenTranslator={() => setTranslatorOpen(true)}
            onOpenFavorites={() => setFavoritesOpen(true)}
            onOpenSecret={() => setSecretOpen(true)}
          />
        ) : (
          <div className="p-4 md:p-8 max-w-6xl mx-auto anim-in" key={activeTab}>
            <PageContent />
          </div>
        )}
      </main>

      {/* ── Fixed Mobile Bottom Navigation Bar (Used across ALL pages on Mobile) ── */}
      <MobileBottomNav activeTab={activeTab} onNavigate={handleNavigate} />

      {/* ── Modals & Overlays ── */}
      <FavoritesModal
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onNavigate={handleNavigate}
      />

      {converterOpen && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#1a1208]/70 backdrop-blur-sm anim-in overscroll-none"
          onClick={() => setConverterOpen(false)}
        >
          <div
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CurrencyConverter onClose={() => setConverterOpen(false)} />
          </div>
        </div>,
        document.body
      )}

      {translatorOpen && <TranslatorModal onClose={() => setTranslatorOpen(false)} />}

      {secretOpen && (
        <SecretMessagePage
          onBack={() => setSecretOpen(false)}
        />
      )}
    </div>
  )
}
