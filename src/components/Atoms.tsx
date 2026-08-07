import { useState, useCallback } from 'react'
import { Volume2, VolumeX, Lightbulb } from 'lucide-react'
import { sky } from '@/types'
import { speak } from '@/utils/tts'

export function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-800 leading-tight">{children}</h2>
      {sub && <p className="text-sm text-slate-500 mt-1">{sub}</p>}
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
      className={`bg-white/90 rounded-2xl shadow-sm border border-sky-100 backdrop-blur-sm ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export function SpeakButton({ text, size = 16 }: { text: string; size?: number }) {
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
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 active:scale-90"
      style={{
        backgroundColor: speaking ? sky[500] : sky[50],
        color: speaking ? 'white' : sky[500],
        boxShadow: speaking ? `0 0 0 4px ${sky[200]}` : 'none',
      }}
      title={text}
    >
      {speaking ? <VolumeX size={size} /> : <Volume2 size={size} />}
    </button>
  )
}

export function TipBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="anim-up d4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-amber-500" />
        <span className="font-bold text-amber-700 text-sm">ワンポイント</span>
      </div>
      {children ? (
        <div className="text-sm text-amber-800 leading-relaxed">{children}</div>
      ) : (
        <>
          <p className="text-sm text-amber-800 leading-relaxed">
            年上の人には、語尾に{' '}
            <span className="font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
              「ạ（ア）」
            </span>{' '}
            を付けると丁寧になります。
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {['Xin chào ạ.', 'Cảm ơn ạ.', 'Bao nhiêu tiền ạ?'].map((ex) => (
              <button
                key={ex}
                onClick={() => speak(ex)}
                className="text-sm font-medium text-amber-800 flex items-center gap-2 hover:text-amber-900 transition-colors text-left"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                {ex}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
