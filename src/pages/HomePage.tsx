import { ChevronRight, Globe, Car, MessageCircle, UtensilsCrossed, Camera, AlertTriangle, Volume2 } from 'lucide-react'
import { type Tab, sky, HERO_IMG, MI_QUANG, CAO_LAU, COM_GA } from '@/types'
import { SectionHeading, TipBox } from '@/components/Atoms'
import { speak } from '@/utils/tts'
import GlassSurface from '@/components/GlassSurface'

const previewPhrases = [
  { vn: 'Xin chào', reading: 'シン チャオ', jp: 'こんにちは' },
  { vn: 'Cảm ơn', reading: 'カム オン', jp: 'ありがとうございます' },
  { vn: 'Bao nhiêu tiền?', reading: 'バオ ニエウ ティエン', jp: 'いくらですか？' },
  { vn: 'Ngon lắm!', reading: 'ンゴン ラム', jp: 'とても美味しい！' },
]

const categories = [
  {
    icon: <MessageCircle size={24} className="text-[#4eabdc]" />,
    label: '通用会話',
    sub: 'フレーズ集',
    tab: 'kaiwa' as Tab,
    accent: '#4eabdc',
    glow: 'rgba(78,171,220,0.25)',
  },
  {
    icon: <UtensilsCrossed size={24} className="text-[#f59e0b]" />,
    label: 'おすすめ料理',
    sub: 'ホイアン名物',
    tab: 'gourmet' as Tab,
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
  },
  {
    icon: <Camera size={24} className="text-[#8b5cf6]" />,
    label: '観光スポット',
    sub: 'ホイアン・ダナン',
    tab: 'spots' as Tab,
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    icon: <AlertTriangle size={24} className="text-[#ef4444]" />,
    label: '注意事項',
    sub: '安全・交通',
    tab: 'chui' as Tab,
    accent: '#ef4444',
    glow: 'rgba(239,68,68,0.25)',
  },
]

export default function HomePage({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden h-80 lg:h-96 shadow-lg">
        <img
          src={HERO_IMG}
          alt="Hoi An lantern street"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.65)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Globe size={14} className="text-white" />
            <span className="text-white text-sm font-medium">ベトナム旅行ガイド</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            初めてのベトナム旅行<br />でも安心！
          </h1>
          <p className="text-white/70 text-sm mt-2 lg:text-base">ホイアン・ダナン完全対応ガイド</p>
        </div>
      </div>

      {/* ── Category cards with GlassSurface ── */}
      <div>
        <SectionHeading sub="気になるカテゴリから始めましょう">カテゴリ</SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((item, i) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.tab)}
              className="anim-up text-left active:scale-95 transition-all rounded-2xl"
              style={{
                animationDelay: `${i * 0.07}s`,
                height: 170,
                filter: `drop-shadow(0 8px 24px ${item.glow})`,
              } as React.CSSProperties}
            >
              <GlassSurface
                width="100%"
                height="100%"
                borderRadius={16}
                backgroundOpacity={0.18}
                saturation={1.4}
                brightness={55}
                distortionScale={-160}
                className="hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex flex-col justify-between w-full h-full p-5 text-left">
                  {/* Icon badge */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: `${item.accent}22`, border: `1.5px solid ${item.accent}44` }}
                  >
                    {item.icon}
                  </div>
                  {/* Text */}
                  <div>
                    <div className="font-bold text-slate-800 text-sm leading-tight">{item.label}</div>
                    <div className="text-slate-500 text-xs mt-1">{item.sub}</div>
                  </div>
                  {/* Arrow */}
                  <ChevronRight
                    size={14}
                    className="self-end opacity-40"
                    style={{ color: item.accent }}
                  />
                </div>
              </GlassSurface>
            </button>
          ))}
        </div>
      </div>

      {/* Two-column preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phrase preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <SectionHeading sub="">よく使うフレーズ</SectionHeading>
            <button
              onClick={() => onNavigate('kaiwa')}
              className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity mb-6"
              style={{ color: sky[500] }}
            >
              すべて見る <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {previewPhrases.map((item, i) => (
              <div
                key={item.vn}
                className="anim-up hover:shadow-md hover:-translate-y-0.5 transition-all group"
                style={{ animationDelay: `${0.1 + i * 0.06}s` } as React.CSSProperties}
              >
                <GlassSurface
                  width="100%"
                  height={72}
                  borderRadius={14}
                  backgroundOpacity={0.06}
                  saturation={1.4}
                  brightness={55}
                  distortionScale={-160}
                >
                  <div className="flex items-center justify-between w-full px-4 py-0">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${sky[500]}, ${sky[300]})` }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{item.vn}</span>
                        <div className="text-xs font-medium mt-0.5" style={{ color: sky[500] }}>{item.reading}</div>
                        <div className="text-xs text-slate-400">{item.jp}</div>
                      </div>
                    </div>
                    <button onClick={() => speak(item.vn)} className="p-1">
                      <Volume2 size={14} className="text-slate-300 group-hover:text-sky-400 transition-colors" />
                    </button>
                  </div>
                </GlassSurface>
              </div>
            ))}
          </div>
        </div>

        {/* Food + taxi */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <SectionHeading sub="">ホイアン名物料理</SectionHeading>
            <button
              onClick={() => onNavigate('gourmet')}
              className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity mb-6"
              style={{ color: sky[500] }}
            >
              すべて見る <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Mì Quảng', img: MI_QUANG },
              { name: 'Cao Lầu', img: CAO_LAU },
              { name: 'Cơm Gà', img: COM_GA },
            ].map((f) => (
              <button
                key={f.name}
                onClick={() => onNavigate('gourmet')}
                className="rounded-xl overflow-hidden shadow-sm border border-white/40 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all text-left"
              >
                <div className="h-24 bg-sky-50 overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2.5" style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>
                  <div className="text-xs font-bold text-slate-800 truncate">{f.name}</div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('chui')}
            className="mt-4 w-full hover:shadow-md hover:-translate-y-0.5 transition-all text-left rounded-2xl overflow-hidden"
          >
            <GlassSurface width="100%" height={64} borderRadius={16} backgroundOpacity={0.2} saturation={1.2}>
              <div className="flex items-center gap-3 w-full px-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})` }}
                >
                  <Car size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">タクシーに注意！</div>
                  <div className="text-xs text-slate-500 mt-0.5">GreenSMアプリがおすすめです →</div>
                </div>
                <ChevronRight size={16} className="text-sky-300" />
              </div>
            </GlassSurface>
          </button>
        </div>
      </div>

      <TipBox />
    </div>
  )
}
