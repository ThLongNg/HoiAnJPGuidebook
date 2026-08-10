import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Heart, X, Trash2, MapPin, ExternalLink, UtensilsCrossed, Camera, Gift, ChevronRight, Sparkles, Layers } from 'lucide-react'
import type { FavoriteItem, FavoriteType, Tab } from '@/types'

interface FavoritesModalProps {
  isOpen: boolean
  onClose: () => void
  favorites: FavoriteItem[]
  onRemoveFavorite: (id: string) => void
  onNavigate?: (tab: Tab) => void
}

export default function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onNavigate,
}: FavoritesModalProps) {
  const [filterType, setFilterType] = useState<FavoriteType | 'all'>('all')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const filtered = filterType === 'all'
    ? favorites
    : favorites.filter((item) => item.type === filterType)

  const foodCount = favorites.filter((i) => i.type === 'gourmet').length
  const spotCount = favorites.filter((i) => i.type === 'spots').length
  const omiyageCount = favorites.filter((i) => i.type === 'omiyage').length

  const getIconForType = (type: FavoriteType) => {
    switch (type) {
      case 'gourmet': return <UtensilsCrossed size={14} className="text-amber-500" />
      case 'spots': return <Camera size={14} className="text-sky-500" />
      case 'omiyage': return <Gift size={14} className="text-rose-500" />
    }
  }

  const getTypeName = (type: FavoriteType) => {
    switch (type) {
      case 'gourmet': return 'グルメ'
      case 'spots': return '観光'
      case 'omiyage': return 'お土産'
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto flex items-start justify-center">
      <div className="bg-white/95 backdrop-blur-2xl border border-sky-100 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden text-slate-800 relative my-4 sm:my-8">

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500 p-5 sm:p-6 flex items-start justify-between relative text-white border-b border-sky-100">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-100 mb-2 border border-white/20">
              <Heart size={14} className="fill-rose-400 text-rose-400" />
              MY FAVORITES / 保存済みリスト
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              💖 お気に入り保存リスト ({favorites.length})
            </h2>
            <p className="text-xs text-white/90 mt-1">
              気になったグルメ・観光スポット・お土産をいつでも振り返れます
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all border border-white/20 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-3 sm:p-4 bg-sky-50/60 border-b border-sky-100 flex gap-2 overflow-x-auto sticky top-0 z-20 backdrop-blur-md">
          {[
            { key: 'all', icon: <Sparkles size={13} className="inline mr-1 text-amber-400" />, label: `すべて (${favorites.length})` },
            { key: 'gourmet', icon: <UtensilsCrossed size={13} className="inline mr-1 text-amber-500" />, label: `グルメ (${foodCount})` },
            { key: 'spots', icon: <Camera size={13} className="inline mr-1 text-sky-500" />, label: `観光 (${spotCount})` },
            { key: 'omiyage', icon: <Gift size={13} className="inline mr-1 text-rose-500" />, label: `お土産 (${omiyageCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key as FavoriteType | 'all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${filterType === tab.key
                ? 'bg-sky-500 text-white shadow-xs scale-105'
                : 'bg-white text-slate-600 border border-sky-100 hover:bg-sky-50'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Saved Items List */}
        <div className="p-5 sm:p-6 bg-slate-50/50">
          {filtered.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center mx-auto mb-3 shadow-inner border border-sky-200/60">
                <Heart size={32} className="animate-bounce fill-rose-400 text-rose-500" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                {favorites.length === 0 ? 'お気に入りがまだありません 🏮' : '該当するお気に入りがありません'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                グルメ・観光地・お土産カードの右上にある <Heart size={12} className="inline fill-rose-500 text-rose-500" /> ハートマークを押すと、ここに一覧保存されます！
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-sky-100 flex gap-3 shadow-2xs hover:shadow-md transition-all relative overflow-hidden group"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-1 left-1 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700 shadow-2xs flex items-center gap-1">
                      {getIconForType(item.type)}
                      {getTypeName(item.type)}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{item.title}</h4>
                        <button
                          onClick={() => onRemoveFavorite(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors flex-shrink-0"
                          title="お気に入りから削除"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="text-[11px] text-sky-600 font-medium italic truncate mb-1">
                        {item.titleVi}
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-sky-50 text-sky-700 border border-sky-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {item.categoryTag}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-600 truncate">{item.priceOrArea}</span>

                      {item.mapUrl && (
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded-lg transition-colors border border-sky-100"
                        >
                          <MapPin size={10} />
                          Map
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>🏮 ホイアン旅行お気に入りガイド</span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-full transition-all shadow-xs"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
