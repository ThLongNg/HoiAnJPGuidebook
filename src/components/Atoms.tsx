import { useState, useCallback } from 'react'
import { Volume2, VolumeX, Lightbulb } from 'lucide-react'
import { sky } from '@/types'
import { speak } from '@/utils/tts'

export function SectionHeading({ children, sub, tag }: { children: React.ReactNode; sub?: string; tag?: string }) {
  return (
    <div className="mb-8">
      {tag && (
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-[1px] bg-[#c8741a]" />
          <span className="font-sans text-[10px] text-[#c8741a] tracking-[0.22em] uppercase font-medium">{tag}</span>
        </div>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1a1208] leading-tight tracking-[0.04em]">{children}</h2>
      {sub && <p className="font-sans text-xs sm:text-sm font-light text-[#7a6447] mt-1.5 leading-relaxed tracking-[0.04em]">{sub}</p>}
    </div>
  )
}

export function Card({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`bg-[#faf8f3] rounded-2xl border border-[#e8e0d0] shadow-2xs transition-all ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export function SpeakButton({ text, size = 14 }: { text: string; size?: number }) {
  const [speaking, setSpeaking] = useState(false)

  const handleSpeak = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (speaking) {
        window.speechSynthesis.cancel()
        setSpeaking(false)
        return
      }
      setSpeaking(true)
      speak(text)
      const duration = Math.max(1200, text.length * 200)
      setTimeout(() => setSpeaking(false), duration)
    },
    [speaking, text],
  )

  return (
    <button
      onClick={handleSpeak}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 active:scale-90 cursor-pointer"
      style={{
        backgroundColor: speaking ? '#3d6b63' : 'rgba(61,107,99,0.08)',
        color: speaking ? '#ffffff' : '#3d6b63',
        border: '1px solid rgba(61,107,99,0.25)',
      }}
      title={text}
    >
      {speaking ? <VolumeX size={size} /> : <Volume2 size={size} />}
    </button>
  )
}

export function TipBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="anim-up d4 bg-[#fffdf9] border-l-4 border-[#c8741a] border border-[#e8e0d0] rounded-xl p-5 shadow-2xs">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb size={16} className="text-[#c8741a]" />
        <span className="font-serif text-sm font-medium text-[#1a1208]">ワンポイント</span>
      </div>
      {children ? (
        <div className="font-sans text-xs sm:text-sm font-light text-[#7a6447] leading-relaxed">{children}</div>
      ) : (
        <>
          <p className="font-sans text-xs sm:text-sm font-light text-[#7a6447] leading-relaxed">
            年上の人には、語尾に{' '}
            <span className="font-medium text-[#c8741a] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              「ạ（ア）」
            </span>{' '}
            を付けると丁寧になります。
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {['Xin chào ạ.', 'Cảm ơn ạ.', 'Bao nhiêu tiền ạ?'].map((ex) => (
              <button
                key={ex}
                onClick={() => speak(ex)}
                className="font-sans text-xs font-medium text-[#7a6447] flex items-center gap-2 hover:text-[#c8741a] transition-colors text-left bg-white/60 p-2 rounded-lg border border-[#e8e0d0]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8741a] flex-shrink-0" />
                {ex}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

