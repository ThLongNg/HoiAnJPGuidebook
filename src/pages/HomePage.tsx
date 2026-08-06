import { ChevronRight, Globe, Car } from 'lucide-react'
import { type Tab, sky, HERO_IMG, MI_QUANG, CAO_LAU, COM_GA } from '@/types'
import { SectionHeading, TipBox } from '@/components/Atoms'
import { speak } from '@/utils/tts'
import { Volume2 } from 'lucide-react'

const previewPhrases = [
  { vn: 'Xin chào', reading: 'シン チャオ', jp: 'こんにちは' },
  { vn: 'Cảm ơn', reading: 'カム オン', jp: 'ありがとうございます' },
  { vn: 'Bao nhiêu tiền?', reading: 'バオ ニエウ ティエン', jp: 'いくらですか？' },
  { vn: 'Ngon lắm!', reading: 'ンゴン ラム', jp: 'とても美味しい！' },
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
            🇻🇳 初めてのベトナム旅行<br />でも安心！
          </h1>
          <p className="text-white/70 text-sm mt-2 lg:text-base">ホイアン・ダナン完全対応ガイド</p>
        </div>
      </div>

      {/* Category cards */}
      <div>
        <SectionHeading sub="気になるカテゴリから始めましょう">カテゴリ</SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '💬', label: '通用会話', sub: 'フレーズ集', tab: 'kaiwa' as Tab, grad: `linear-gradient(135deg, ${sky[500]}, ${sky[300]})` },
            { icon: '🍜', label: 'おすすめ料理', sub: 'ホイアン名物', tab: 'gourmet' as Tab, grad: 'linear-gradient(135deg, #f59e0b, #fcd34d)' },
            { icon: '📍', label: '観光スポット', sub: 'ホイアン・ダナン', tab: 'spots' as Tab, grad: 'linear-gradient(135deg, #8b5cf6, #c4b5fd)' },
            { icon: '⚠️', label: '注意事項', sub: '安全・交通', tab: 'chui' as Tab, grad: 'linear-gradient(135deg, #ef4444, #fca5a5)' },
          ].map((item, i) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.tab)}
              className="anim-up rounded-2xl p-6 text-left hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all"
              style={{ background: item.grad, animationDelay: `${i * 0.07}s` } as React.CSSProperties}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-bold text-white text-base">{item.label}</div>
              <div className="text-white/70 text-xs mt-1">{item.sub}</div>
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
                className="anim-up flex items-center justify-between bg-white rounded-xl px-5 py-4 shadow-sm border border-sky-100 hover:border-sky-200 hover:shadow-md transition-all group"
                style={{ animationDelay: `${0.1 + i * 0.06}s` } as React.CSSProperties}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${sky[500]}, ${sky[300]})` }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{item.vn}</span>
                    <div className="text-xs font-medium mt-0.5" style={{ color: sky[400] }}>{item.reading}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.jp}</div>
                  </div>
                </div>
                <button onClick={() => speak(item.vn)} className="p-1 rounded-full transition-colors">
                  <Volume2 size={14} className="text-slate-300 group-hover:text-sky-400 transition-colors" />
                </button>
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
                className="rounded-xl overflow-hidden shadow-sm border border-sky-100 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all text-left"
              >
                <div className="h-24 bg-sky-50 overflow-hidden">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="bg-white p-2.5">
                  <div className="text-xs font-bold text-slate-800 truncate">{f.name}</div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('chui')}
            className="mt-4 w-full bg-white rounded-2xl p-4 border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all text-left"
          >
            <div className="flex items-center gap-3">
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
          </button>
        </div>
      </div>

      <TipBox />
    </div>
  )
}
