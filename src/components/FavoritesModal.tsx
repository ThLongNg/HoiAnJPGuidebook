import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Heart, X, Trash2, MapPin, ExternalLink, UtensilsCrossed, Camera, Gift, ChevronRight, Sparkles } from 'lucide-react'
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
      case 'gourmet': return <UtensilsCrossed size={14} className="text-[#c8741a]" />
      case 'spots': return <Camera size={14} className="text-[#3d6b63]" />
      case 'omiyage': return <Gift size={14} className="text-[#8b5e3c]" />
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
    <div className="fixed inset-0 z-[99999] p-3 sm:p-6 bg-[#1a1208]/70 backdrop-blur-sm overflow-y-auto flex items-start justify-center">
      <div className="bg-[#faf8f3] border border-[#e8e0d0] rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden text-[#1a1208] relative my-4 sm:my-8 font-sans">

        {/* Modal Header */}
        <div className="bg-[#1e1408] p-5 sm:p-6 flex items-start justify-between relative text-white border-b border-[#c8741a]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#c8741a]/20 px-3 py-1 rounded-full text-[11px] font-sans font-medium text-[#c8741a] mb-2 border border-[#c8741a]/40">
              <Heart size={14} className="fill-[#c8741a] text-[#c8741a]" />
              MY FAVORITES / 保存リスト
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-white flex items-center gap-2">
              💖 お気に入り保存リスト ({favorites.length})
            </h2>
            <p className="font-sans text-xs font-light text-white/70 mt-1">
              気になったグルメ・観光スポット・お土産をいつでも振り返れます
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-3 sm:p-4 bg-[#f5f1ea] border-b border-[#e8e0d0] flex gap-2 overflow-x-auto sticky top-0 z-20">
          {[
            { key: 'all', icon: <Sparkles size={13} className="inline mr-1 text-[#c8741a]" />, label: `すべて (${favorites.length})` },
            { key: 'gourmet', icon: <UtensilsCrossed size={13} className="inline mr-1 text-[#c8741a]" />, label: `グルメ (${foodCount})` },
            { key: 'spots', icon: <Camera size={13} className="inline mr-1 text-[#3d6b63]" />, label: `観光 (${spotCount})` },
            { key: 'omiyage', icon: <Gift size={13} className="inline mr-1 text-[#8b5e3c]" />, label: `お土産 (${omiyageCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key as FavoriteType | 'all')}
              className="px-4 py-1.5 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1"
              style={
                filterType === tab.key
                  ? { background: '#c8741a', color: 'white', border: '1px solid #c8741a' }
                  : { backgroundColor: '#faf8f3', color: '#7a6447', border: '1px solid #e8e0d0' }
              }
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items List */}
        <div className="p-4 sm:p-6 bg-[#faf8f3]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center mx-auto mb-3 text-[#7a6447]">
                <Heart size={28} />
              </div>
              <p className="font-serif text-lg font-normal text-[#1a1208]">保存されたアイテムはありません</p>
              <p className="font-sans text-xs font-light text-[#7a6447] mt-1 max-w-sm mx-auto">
                各ページのハートアイコン（♡）をタップすると、ここにお気に入りが保存されます。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f5f1ea] border border-[#e8e0d0] rounded-2xl p-4 flex gap-3.5 items-start relative group hover:border-[#c8741a] transition-all shadow-2xs"
                >
                  {item.img && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#d4c8b0] relative">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="bg-[#faf8f3] text-[#c8741a] border border-[#e8e0d0] text-[10px] font-sans font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        {getIconForType(item.type)}
                        {getTypeName(item.type)}
                      </span>
                      {item.categoryTag && (
                        <span className="text-[10px] text-[#7a6447] font-sans font-light truncate">
                          {item.categoryTag}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-base font-normal text-[#1a1208] leading-snug truncate">{item.title}</h4>
                    {item.titleVi && (
                      <p className="font-sans text-xs text-[#3d6b63] font-medium italic truncate mt-0.5">{item.titleVi}</p>
                    )}

                    {item.priceOrArea && (
                      <div className="font-sans text-xs text-[#7a6447] font-light mt-1.5 flex items-center gap-1">
                        <MapPin size={11} className="text-[#c8741a]" />
                        <span>{item.priceOrArea}</span>
                      </div>
                    )}

                    {item.mapUrl && (
                      <a
                        href={item.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-sans text-[11px] font-medium text-[#c8741a] hover:underline mt-2"
                      >
                        Google Mapで開く <ExternalLink size={10} />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveFavorite(item.id)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#faf8f3] border border-[#e8e0d0] hover:bg-rose-50 hover:border-rose-200 text-[#7a6447] hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                    title="お気に入りから削除"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f5f1ea] border-t border-[#e8e0d0] flex items-center justify-between font-sans text-xs text-[#7a6447]">
          <span>保存済み: {favorites.length} 件</span>
          <button
            onClick={onClose}
            className="bg-[#c8741a] hover:bg-[#a85e12] text-white font-medium px-6 py-2 rounded-full transition-all cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
