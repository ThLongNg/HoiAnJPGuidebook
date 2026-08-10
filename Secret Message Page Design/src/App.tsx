import { useState, useEffect, useRef, useCallback } from 'react'

const CORRECT_NAME = '関戸香乃'
const STORAGE_KEY = 'hoian_secret_unlocked'

type Phase = 'input' | 'transitioning' | 'revealed'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  driftX: number
  delay: number
}

function HoiAnBackground({ warm }: { warm: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0 transition-all duration-2000"
        style={{
          background: warm
            ? 'linear-gradient(180deg, #1a2744 0%, #2d3f6e 25%, #5c4a6e 45%, #8b5a5a 60%, #c4846a 75%, #d4a574 85%, #e8c89a 100%)'
            : 'linear-gradient(180deg, #1e2d52 0%, #2a3d6a 20%, #3d4f7c 40%, #5a6a8f 55%, #8a9dc0 70%, #b8c8d8 85%, #d4e0e8 100%)',
        }}
      />

      {/* Moon / soft orb */}
      <div
        className="absolute rounded-full transition-all duration-2000"
        style={{
          top: '8%',
          right: '20%',
          width: 48,
          height: 48,
          background: warm
            ? 'radial-gradient(circle, rgba(255,240,200,0.9) 0%, rgba(255,220,150,0.4) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(220,235,255,0.9) 0%, rgba(180,210,240,0.4) 60%, transparent 100%)',
          boxShadow: warm
            ? '0 0 40px 20px rgba(255,220,150,0.2)'
            : '0 0 40px 20px rgba(180,210,240,0.15)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* Stars */}
      {[
        { x: 15, y: 5 }, { x: 35, y: 3 }, { x: 55, y: 7 }, { x: 75, y: 4 },
        { x: 88, y: 9 }, { x: 25, y: 12 }, { x: 65, y: 6 }, { x: 45, y: 2 },
        { x: 82, y: 14 }, { x: 10, y: 16 },
      ].map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full lantern-glow"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: i % 3 === 0 ? 2 : 1.5,
            height: i % 3 === 0 ? 2 : 1.5,
            background: 'rgba(255,255,255,0.85)',
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* River reflection at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-all duration-2000"
        style={{
          height: '28%',
          background: warm
            ? 'linear-gradient(180deg, rgba(180,120,80,0.3) 0%, rgba(140,100,60,0.5) 40%, rgba(100,80,60,0.4) 100%)'
            : 'linear-gradient(180deg, rgba(80,100,140,0.3) 0%, rgba(60,80,120,0.5) 40%, rgba(40,60,100,0.4) 100%)',
        }}
      />

      {/* Ripple lines on river */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0 transition-opacity duration-2000"
          style={{
            bottom: `${4 + i * 5}%`,
            height: 1,
            background: warm
              ? `rgba(220,180,120,${0.12 - i * 0.02})`
              : `rgba(140,170,210,${0.1 - i * 0.02})`,
            borderRadius: 999,
            marginLeft: `${5 + i * 3}%`,
            marginRight: `${5 + i * 3}%`,
          }}
        />
      ))}

      {/* Old building silhouettes */}
      <svg
        className="absolute bottom-0 left-0 right-0 transition-all duration-2000"
        viewBox="0 0 800 200"
        preserveAspectRatio="xMidYMax slice"
        style={{ height: '30%', width: '100%' }}
      >
        <g fill={warm ? 'rgba(40,25,15,0.7)' : 'rgba(20,30,50,0.65)'}>
          {/* Left buildings */}
          <rect x="0" y="120" width="80" height="80" />
          <rect x="10" y="90" width="60" height="35" />
          <rect x="25" y="70" width="30" height="25" />
          <polygon points="30,70 40,50 50,70" />

          <rect x="85" y="100" width="100" height="100" />
          <rect x="95" y="75" width="80" height="30" />
          <rect x="110" y="58" width="50" height="22" />
          <polygon points="118,58 135,38 152,58" />

          <rect x="190" y="115" width="70" height="85" />
          <rect x="200" y="88" width="50" height="32" />
          <polygon points="208,88 225,68 242,88" />

          {/* Right buildings */}
          <rect x="550" y="108" width="90" height="92" />
          <rect x="558" y="80" width="74" height="32" />
          <rect x="572" y="62" width="46" height="22" />
          <polygon points="580,62 595,42 610,62" />

          <rect x="645" y="118" width="75" height="82" />
          <rect x="655" y="92" width="55" height="30" />
          <polygon points="660,92 682,72 704,92" />

          <rect x="725" y="95" width="75" height="105" />
          <rect x="733" y="68" width="60" height="30" />
          <rect x="748" y="50" width="30" height="22" />
          <polygon points="753,50 763,30 773,50" />
        </g>
      </svg>

      {/* Lantern lights — enhanced when warm */}
      <LanternLights warm={warm} />

      {/* Atmospheric haze at horizon */}
      <div
        className="absolute transition-all duration-2000"
        style={{
          left: 0, right: 0,
          bottom: '25%',
          height: 80,
          background: warm
            ? 'linear-gradient(0deg, rgba(200,140,80,0.2) 0%, transparent 100%)'
            : 'linear-gradient(0deg, rgba(100,130,180,0.15) 0%, transparent 100%)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  )
}

function LanternLights({ warm }: { warm: boolean }) {
  const lanterns = [
    { x: 32, y: 62, size: 8, delay: 0 },
    { x: 38, y: 58, size: 6, delay: 0.7 },
    { x: 44, y: 65, size: 7, delay: 1.4 },
    { x: 50, y: 60, size: 9, delay: 0.3 },
    { x: 56, y: 64, size: 6, delay: 1.1 },
    { x: 62, y: 59, size: 8, delay: 0.5 },
    { x: 30, y: 68, size: 5, delay: 1.8 },
    { x: 66, y: 67, size: 6, delay: 2.1 },
  ]

  return (
    <>
      {lanterns.map((l, i) => (
        <div
          key={i}
          className="absolute rounded-full lantern-glow transition-all duration-2000"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            width: l.size,
            height: l.size * 1.3,
            background: warm
              ? `radial-gradient(circle, rgba(255,200,80,${0.9}) 0%, rgba(255,160,40,0.6) 50%, transparent 100%)`
              : `radial-gradient(circle, rgba(255,200,80,${0.5}) 0%, rgba(255,160,40,0.3) 50%, transparent 100%)`,
            boxShadow: warm
              ? `0 0 ${l.size * 3}px ${l.size}px rgba(255,180,60,0.35)`
              : `0 0 ${l.size * 2}px ${l.size * 0.5}px rgba(255,180,60,0.18)`,
            animationDelay: `${l.delay}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Reflection of lanterns in river */}
      {lanterns.map((l, i) => (
        <div
          key={`refl-${i}`}
          className="absolute rounded-full transition-all duration-2000"
          style={{
            left: `${l.x + (Math.random() * 2 - 1)}%`,
            bottom: `${2 + (i % 4) * 3}%`,
            width: l.size * 0.6,
            height: l.size * 2,
            background: warm
              ? `radial-gradient(circle, rgba(255,180,60,0.3) 0%, transparent 100%)`
              : `radial-gradient(circle, rgba(255,180,60,0.15) 0%, transparent 100%)`,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </>
  )
}

function FloatingParticles({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const nextId = useRef(0)

  useEffect(() => {
    if (!active) return

    const colors = [
      'rgba(255,210,100,0.9)',
      'rgba(255,230,150,0.8)',
      'rgba(255,190,80,0.85)',
      'rgba(220,240,255,0.7)',
      'rgba(255,255,220,0.8)',
    ]

    let count = 0
    const spawn = () => {
      if (count > 40) return
      const batch: Particle[] = Array.from({ length: 3 }, (_, i) => ({
        id: nextId.current++,
        x: 30 + Math.random() * 40,
        y: 55 + Math.random() * 25,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        driftX: (Math.random() - 0.5) * 60,
        delay: i * 80,
      }))
      setParticles((p) => [...p, ...batch])
      count += 3
      setTimeout(spawn, 200)
    }

    spawn()
    const cleanup = setTimeout(() => setParticles([]), 4000)
    return () => clearTimeout(cleanup)
  }, [active])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            '--drift-x': `${p.driftX}px`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDelay: `${p.delay}ms`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

function InputScreen({
  onCorrect,
  onDismiss,
}: {
  onCorrect: () => void
  onDismiss: () => void
}) {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  const handleSubmit = () => {
    if (name.trim() === CORRECT_NAME) {
      setFadingOut(true)
      setTimeout(onCorrect, 500)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 py-12 relative z-10 transition-all duration-500 ${fadingOut ? 'fade-out-down opacity-0' : 'fade-in-up'}`}
      style={{ animationFillMode: 'both' }}
    >
      {/* Decorative symbol */}
      <div
        className="text-2xl mb-6 lantern-glow"
        style={{ color: 'rgba(255,210,120,0.9)', fontFamily: 'serif', animationDuration: '4s' }}
      >
        ✦
      </div>

      {/* Main title */}
      <h1
        className="text-center mb-3 leading-relaxed"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.95)',
          letterSpacing: '0.12em',
          textShadow: '0 2px 20px rgba(0,0,0,0.4)',
        }}
      >
        小さな秘密を、ひとつ。
      </h1>

      {/* Subtitle */}
      <p
        className="text-center mb-10"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)',
          fontWeight: 300,
          color: 'rgba(200,220,240,0.75)',
          letterSpacing: '0.08em',
          lineHeight: 1.8,
        }}
      >
        旅行の前に、ちょっとだけ探してみてください。
      </p>

      {/* Glass input card */}
      <div
        className={`w-full max-w-sm transition-transform duration-150 ${shaking ? 'translate-x-2' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.22)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
          padding: '28px 24px 24px',
        }}
      >
        <p
          className="text-center mb-5"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: 400,
            color: 'rgba(220,235,255,0.88)',
            letterSpacing: '0.06em',
          }}
        >
          あなたの名前を入力してください
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="お名前を入力"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.08)',
            border: error
              ? '1px solid rgba(255,140,140,0.7)'
              : '1px solid rgba(255,255,255,0.25)',
            borderRadius: 12,
            padding: '14px 16px',
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.95)',
            outline: 'none',
            textAlign: 'center',
            letterSpacing: '0.08em',
            transition: 'border-color 0.2s',
            marginBottom: 12,
            display: 'block',
          }}
          autoComplete="off"
        />

        {/* Error message */}
        <div
          style={{
            height: 20,
            marginBottom: 8,
            textAlign: 'center',
            transition: 'opacity 0.3s',
            opacity: error ? 1 : 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'rgba(255,180,180,0.9)',
              letterSpacing: '0.04em',
            }}
          >
            もう一度、思い出してみてください🔍
          </span>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '15px 24px',
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.97)',
            background: 'linear-gradient(135deg, rgba(100,160,220,0.85) 0%, rgba(80,130,200,0.9) 50%, rgba(90,110,180,0.85) 100%)',
            boxShadow: '0 4px 20px rgba(80,130,200,0.35), 0 1px 0 rgba(255,255,255,0.15) inset',
            transition: 'transform 0.15s, box-shadow 0.15s',
            minHeight: 52,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(80,130,200,0.45), 0 1px 0 rgba(255,255,255,0.15) inset'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(80,130,200,0.35), 0 1px 0 rgba(255,255,255,0.15) inset'
          }}
        >
          開いてみる
        </button>
      </div>

      {/* Hint */}
      <p
        className="mt-5 text-center"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          color: 'rgba(180,200,230,0.55)',
          letterSpacing: '0.05em',
        }}
      >
        ヒント：先生のお名前です☺️
      </p>

      {/* Back button */}
      <button
        onClick={onDismiss}
        className="mt-8"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          color: 'rgba(180,200,230,0.4)',
          letterSpacing: '0.06em',
          padding: '8px 16px',
        }}
      >
        旅行ガイドに戻る
      </button>
    </div>
  )
}

function SecretCard({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-5 py-10 relative z-10"
    >
      {/* Tiny hanging lantern above card */}
      <div
        className="fade-in-up mb-3"
        style={{ animationDelay: '0.05s', animationFillMode: 'both' }}
      >
        <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
          <line x1="11" y1="0" x2="11" y2="5" stroke="rgba(255,210,120,0.6)" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="3" y="5" width="16" height="19" rx="2.5" fill="rgba(255,160,40,0.12)" stroke="rgba(255,200,80,0.5)" strokeWidth="0.8" />
          <ellipse cx="11" cy="14.5" rx="5.5" ry="7" fill="rgba(255,200,80,0.2)" />
          <line x1="7" y1="5" x2="7" y2="24" stroke="rgba(255,180,60,0.28)" strokeWidth="0.6" />
          <line x1="11" y1="5" x2="11" y2="24" stroke="rgba(255,180,60,0.28)" strokeWidth="0.6" />
          <line x1="15" y1="5" x2="15" y2="24" stroke="rgba(255,180,60,0.28)" strokeWidth="0.6" />
          <rect x="5" y="23" width="12" height="2.5" rx="1" fill="rgba(255,180,60,0.35)" />
          <line x1="10" y1="25.5" x2="9.5" y2="32" stroke="rgba(255,180,60,0.4)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="11" y1="25.5" x2="11" y2="32" stroke="rgba(255,180,60,0.4)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="12" y1="25.5" x2="12.5" y2="32" stroke="rgba(255,180,60,0.4)" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Postcard */}
      <div
        className="w-full max-w-sm unfold-card"
        style={{
          animationDelay: '0.15s',
          animationFillMode: 'both',
          position: 'relative',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.38), 0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        {/* Paper base layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(250,244,232,0.13)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
        />

        {/* Paper grain texture via SVG filter */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            filter: 'url(#paper-grain)',
            background: 'rgba(240,230,210,1)',
            borderRadius: 18,
          }}
        />

        {/* Outer postcard border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.22)',
            pointerEvents: 'none',
          }}
        />
        {/* Inner postcard border — the classic postcard line */}
        <div
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: 12,
            border: '0.5px dashed rgba(255,220,160,0.18)',
            pointerEvents: 'none',
          }}
        />

        {/* Subtle ruled lines (paper effect) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 16, right: 16,
              top: `${90 + i * 32}px`,
              height: '0.5px',
              background: 'rgba(255,230,180,0.06)',
            }}
          />
        ))}

        {/* Travel stamp — top right */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 52,
            height: 52,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.55,
            transform: 'rotate(8deg)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '1.5px solid rgba(255,200,100,0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <span style={{ fontSize: '0.44rem', color: 'rgba(255,210,120,1)', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>HOI AN</span>
            <div style={{ width: 24, height: '0.5px', background: 'rgba(255,200,100,0.7)' }} />
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,200,100,0.9)', letterSpacing: '0.04em', fontFamily: 'var(--font-hand)' }}>9.19</span>
            <div style={{ width: 24, height: '0.5px', background: 'rgba(255,200,100,0.7)' }} />
            <span style={{ fontSize: '0.38rem', color: 'rgba(255,210,120,0.8)', letterSpacing: '0.1em', fontFamily: 'var(--font-sans)' }}>VIETNAM</span>
          </div>
        </div>

        {/* Card content */}
        <div style={{ position: 'relative', padding: '28px 24px 24px' }}>

          {/* Discovery line */}
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontWeight: 400,
              color: 'rgba(255,240,205,0.96)',
              letterSpacing: '0.08em',
              marginBottom: 6,
            }}
          >
            見つけましたね。☺️
          </p>

          {/* Thin gold divider */}
          <div
            style={{
              width: 40,
              height: '0.5px',
              background: 'linear-gradient(90deg, transparent, rgba(255,210,120,0.55), transparent)',
              margin: '10px auto 14px',
            }}
          />

          {/* Recipient */}
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.8rem',
              fontWeight: 300,
              color: 'rgba(205,225,255,0.75)',
              letterSpacing: '0.2em',
              marginBottom: 20,
            }}
          >
            香乃先生へ
          </p>

          {/* Main message — paragraph 1 */}
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.85rem, 3vw, 0.96rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.91)',
              letterSpacing: '0.05em',
              lineHeight: 2.1,
              marginBottom: 18,
            }}
          >
            9月19日のホイアン旅行が、<br />
            素敵な思い出でいっぱいに<br />
            なりますように。
          </p>

          {/* Paragraph 2 */}
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.76rem, 2.4vw, 0.83rem)',
              fontWeight: 300,
              color: 'rgba(210,228,252,0.78)',
              letterSpacing: '0.04em',
              lineHeight: 2.1,
              marginBottom: 22,
            }}
          >
            ホイアンの街も、食べ物も、景色も、<br />
            ゆっくり楽しんできてください。
          </p>

          {/* Divider before P.S. */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              margin: '0 0 16px',
            }}
          >
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,230,180,0.12)' }} />
            <span style={{ fontSize: '0.45rem', color: 'rgba(255,210,120,0.35)', fontFamily: 'serif' }}>✦</span>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,230,180,0.12)' }} />
          </div>

          {/* P.S. section */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '0.88rem',
                color: 'rgba(255,220,160,0.7)',
                letterSpacing: '0.04em',
                marginBottom: 6,
              }}
            >
              P.S.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: 'clamp(0.82rem, 2.6vw, 0.9rem)',
                color: 'rgba(240,225,195,0.62)',
                letterSpacing: '0.03em',
                lineHeight: 1.85,
              }}
            >
              このガイドが、<br />
              ホイアンを楽しむときの<br />
              小さな助けになったら嬉しいです。
            </p>
          </div>

          {/* Signature — right-aligned */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginBottom: 20,
              paddingRight: 4,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.15rem',
                color: 'rgba(255,235,190,0.75)',
                letterSpacing: '0.02em',
              }}
            >
              — Long
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.64rem',
                color: 'rgba(200,220,245,0.4)',
                letterSpacing: '0.06em',
                marginTop: 2,
              }}
            >
              from Vietnam 🇻🇳
            </span>
          </div>

          {/* Thin bottom separator */}
          <div
            style={{
              width: '100%',
              height: '0.5px',
              background: 'rgba(255,255,255,0.07)',
              marginBottom: 12,
            }}
          />

          {/* Date — handwritten journal style */}
          <div className="text-center">
            <p
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '0.88rem',
                color: 'rgba(200,215,240,0.45)',
                letterSpacing: '0.12em',
                marginBottom: 3,
              }}
            >
              9.19 — Hoi An
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                color: 'rgba(180,200,230,0.28)',
                letterSpacing: '0.1em',
                fontStyle: 'italic',
              }}
            >
              A little guide for your trip.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle star row below card */}
      <div
        className="flex gap-3 mt-4 fade-in-up"
        style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
      >
        {['·', '✦', '·', '✦', '·'].map((s, i) => (
          <span
            key={i}
            style={{
              fontSize: s === '✦' ? '0.48rem' : '0.9rem',
              color: 'rgba(255,210,120,0.3)',
              fontFamily: 'serif',
              lineHeight: 1,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-6 fade-in-up"
        style={{
          animationDelay: '1.1s',
          animationFillMode: 'both',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: 9,
          padding: '9px 22px',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          color: 'rgba(200,215,240,0.5)',
          letterSpacing: '0.08em',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.11)'
          e.currentTarget.style.color = 'rgba(200,215,240,0.8)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.color = 'rgba(200,215,240,0.5)'
        }}
      >
        旅行ガイドに戻る
      </button>
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState<Phase>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true' ? 'revealed' : 'input'
    } catch {
      return 'input'
    }
  })
  const [showParticles, setShowParticles] = useState(false)
  const [warm, setWarm] = useState(phase === 'revealed')

  const handleCorrect = useCallback(() => {
    setPhase('transitioning')
    setShowParticles(true)
    setTimeout(() => {
      setWarm(true)
    }, 300)
    setTimeout(() => {
      setPhase('revealed')
      try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
    }, 1200)
  }, [])

  const handleBack = useCallback(() => {
    setPhase('input')
    setWarm(false)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        minHeight: '100dvh',
        overflow: 'hidden',
      }}
    >
      <HoiAnBackground warm={warm} />
      <FloatingParticles active={showParticles} />

      {/* Overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: warm
            ? 'rgba(15,10,5,0.25)'
            : 'rgba(10,15,30,0.3)',
        }}
      />

      {phase === 'input' && (
        <InputScreen onCorrect={handleCorrect} onDismiss={() => {}} />
      )}

      {phase === 'transitioning' && (
        <div className="absolute inset-0 z-10" />
      )}

      {phase === 'revealed' && (
        <SecretCard onBack={handleBack} />
      )}
    </div>
  )
}
