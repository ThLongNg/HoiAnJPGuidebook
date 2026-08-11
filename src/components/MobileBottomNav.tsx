import { Home, Camera, UtensilsCrossed, Gift, MessageCircle, ShieldAlert } from 'lucide-react'
import { type Tab } from '@/types'

interface MobileBottomNavProps {
  activeTab: Tab
  onNavigate: (tab: Tab) => void
}

export default function MobileBottomNav({ activeTab, onNavigate }: MobileBottomNavProps) {
  const items = [
    { id: 'home' as Tab, label: 'ホーム', Icon: Home },
    { id: 'spots' as Tab, label: '観光', Icon: Camera },
    { id: 'gourmet' as Tab, label: 'グルメ', Icon: UtensilsCrossed },
    { id: 'omiyage' as Tab, label: 'お土産', Icon: Gift },
    { id: 'kaiwa' as Tab, label: '会話', Icon: MessageCircle },
    { id: 'chui' as Tab, label: '注意事項', Icon: ShieldAlert },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#faf8f3]/94 backdrop-blur-md border-t border-[#e8e0d0] shadow-[0_-4px_20px_rgba(26,18,8,0.08)] flex items-center justify-around px-1 py-1.5"
      style={{
        paddingBottom: 'calc(6px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {items.map(({ id, label, Icon }) => {
        const isActive = activeTab === id || (id === 'chui' && activeTab === 'chui')

        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 px-0.5 transition-all rounded-xl relative cursor-pointer active:scale-95"
            style={{
              color: isActive ? '#c8741a' : '#7a6447',
            }}
          >
            {/* Active Pill Glow */}
            {isActive && (
              <span className="absolute inset-0 bg-[#c8741a]/10 rounded-xl border border-[#c8741a]/20" />
            )}

            <Icon
              size={18}
              className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'opacity-80'}`}
              strokeWidth={isActive ? 2.3 : 1.7}
            />

            <span
              className={`font-sans text-[9px] sm:text-[10px] tracking-tight mt-0.5 transition-all whitespace-nowrap ${
                isActive ? 'font-medium text-[#c8741a]' : 'font-light text-[#7a6447]'
              }`}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
