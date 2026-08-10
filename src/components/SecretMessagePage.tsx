import { useState, useEffect, useRef, useCallback } from 'react'
import FirefliesOverlay from '@/components/FirefliesOverlay'
import signatureImg from '@/assets/signature.png'

const CORRECT_NAME = '関戸香乃'

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
    <div className="absolute inset-0 overflow-hidden bg-[#070c18]">
      {/* ── Background Video for Secret Message Page ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-all duration-2000"
        style={{
          filter: warm ? 'brightness(0.9) contrast(1.1)' : 'brightness(0.75) contrast(1.05)',
          opacity: warm ? 0.95 : 0.85,
        }}
      >
        <source
          src="https://res.cloudinary.com/dbjejsbh7/video/upload/v1786395435/FLOWERS_LIGHT_ON_THE_RIVER_IN_HOI_AN_VIETNAM_HOA_%C4%90%C4%82NG_TR%C3%8AN_S%C3%94NG_bpvd6h.mp4"
          type="video/mp4"
        />
      </video>

      {/* Vignette & Night sky gradient overlay */}
      <div
        className="absolute inset-0 transition-all duration-2000 pointer-events-none"
        style={{
          background: warm
            ? 'radial-gradient(ellipse at center, rgba(30,15,5,0.25) 0%, rgba(12,8,4,0.7) 100%)'
            : 'radial-gradient(ellipse at center, rgba(15,25,50,0.3) 0%, rgba(7,10,22,0.8) 100%)',
        }}
      />

      {/* Moon / soft orb */}
      <div
        className="absolute rounded-full transition-all duration-2000 pointer-events-none"
        style={{
          top: '6%',
          right: '18%',
          width: 54,
          height: 54,
          background: warm
            ? 'radial-gradient(circle, rgba(255,240,200,0.95) 0%, rgba(255,210,140,0.4) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(220,235,255,0.95) 0%, rgba(180,210,240,0.4) 60%, transparent 100%)',
          boxShadow: warm
            ? '0 0 50px 25px rgba(255,210,140,0.25)'
            : '0 0 50px 25px rgba(180,210,240,0.2)',
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
          className="absolute rounded-full lantern-glow pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: i % 3 === 0 ? 2.5 : 1.5,
            height: i % 3 === 0 ? 2.5 : 1.5,
            background: 'rgba(255,255,255,0.9)',
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      <LanternLights warm={warm} />
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
              ? `radial-gradient(circle, rgba(255,200,80,0.9) 0%, rgba(255,160,40,0.6) 50%, transparent 100%)`
              : `radial-gradient(circle, rgba(255,200,80,0.5) 0%, rgba(255,160,40,0.3) 50%, transparent 100%)`,
            boxShadow: warm
              ? `0 0 ${l.size * 3}px ${l.size}px rgba(255,180,60,0.35)`
              : `0 0 ${l.size * 2}px ${l.size * 0.5}px rgba(255,180,60,0.18)`,
            animationDelay: `${l.delay}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

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

export function InputScreen({
  onSubmitName,
  onDismiss,
}: {
  onSubmitName: (name: string) => void
  onDismiss?: () => void
}) {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
      return
    }

    setFadingOut(true)
    setTimeout(() => {
      onSubmitName(trimmed)
    }, 500)
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 py-12 relative z-10 transition-all duration-500 ${fadingOut ? 'fade-out-down opacity-0' : 'fade-in-up'}`}
      style={{ animationFillMode: 'both' }}
    >
      <div
        className="text-2xl mb-6 lantern-glow"
        style={{ color: 'rgba(255,210,120,0.9)', fontFamily: 'serif', animationDuration: '4s' }}
      >
        ✦
      </div>

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
        {decodeSecret(B64_INPUT_TITLE)}
      </h1>

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
        {decodeSecret(B64_INPUT_SUB)}
      </p>

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
            お名前を入力してください☺️
          </span>
        </div>

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
            background: 'linear-gradient(135deg, rgba(255, 108, 169, 0.85) 0%, rgba(252, 84, 224, 0.45) 50%, rgba(252, 99, 99, 0.85) 100%)',
            boxShadow: '0 4px 20px rgba(80,130,200,0.35), 0 1px 0 rgba(255,255,255,0.15) inset',
            transition: 'transform 0.15s, box-shadow 0.15s',
            minHeight: 52,
          }}
        >
          開いてみる
        </button>
      </div>

      <p
        className="mt-5 text-center"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          color: 'rgba(180,200,230,0.55)',
          letterSpacing: '0.05em',
        }}
      >
        {decodeSecret(B64_INPUT_HINT)}
      </p>

      {onDismiss && (
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
      )}
    </div>
  )
}

function decodeSecret(b64: string): string {
  try {
    return new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)))
  } catch {
    return ''
  }
}

function encodeSecret(str: string): string {
  try {
    const bytes = new TextEncoder().encode(str)
    let binary = ''
    bytes.forEach((b) => (binary += String.fromCharCode(b)))
    return btoa(binary)
  } catch {
    return ''
  }
}

const B64_MSG_HEADER = '6KaL44Gk44GR44G+44GX44Gf44Gt44CC4pi677iP'
const B64_MSG_TO = '6aaZ5LmD5YWI55Sf44G4'
const B64_MSG_LINE1 = 'OeaciDE55pel44Gu44Ob44Kk44Ki44Oz5peF6KGM44GM44CBCue0oOaVteOBquaAneOBhOWHuuOBp+OBhOOBo+OBheOBhOOBq+OBquOCiuOBvuOBmeOCiOOBhuOBq+OAgg=='
const B64_MSG_LINE2 = '44Ob44Kk44Ki44Oz44Gu6KGX44KC44CB6aOf44G554mp44KC44CB5pmv6Imy44KC44CBCuOChuOBo+OBj+OCiualveOBl+OCk+OBp+OBjeOBpuOBj+OBoOOBleOBhOOAgg=='
const B64_MSG_LINE3 = '5YWI55Sf44GM5YOV44Gr44GP44KM44Gf44CB44GC44Gu5pil44Go44GE44GG5peF44Gu44KI44GG44Gr44CBCuS7iuW6puOBr+WFiOeUn+iHqui6q+OBq+OBqOOBo+OBpuOAgeW/g+OBq+aui+OCi+aXheOBq+OBquOCiuOBvuOBmeOCiOOBhuOBq+OAgg=='
const B64_INPUT_TITLE = '5bCP44GV44Gq56eY5a+G44KS44CB44Gy44Go44Gk44CC'
const B64_INPUT_SUB = '5peF6KGM44Gu5YmN44Gr44CB44Gh44KH44Gj44Go44Gg44GR5o6i44GX44Gm44G/44Gm44GP44Gg44GV44GE44CC'
const B64_INPUT_HINT = '44OS44Oz44OI77ya44GK5ZCN5YmN44Gn44GZ4pi677iP'

function isSekidoKanoName(rawName?: string): boolean {
  if (!rawName) return false
  const trimmed = rawName.trim().toLowerCase()
  const clean = trimmed.replace(/[\s　]+/g, '')
  const encodedClean = encodeSecret(clean)
  const encodedTrimmed = encodeSecret(trimmed)

  const VALID_B64 = [
    '6Zai5oi46aaZ5LmD',
    '6Zai5oi4',
    '6aaZ5LmD',
    '44Gb44GN44Gp',
    '44GL44Gu',
    '44Gb44GN44Gp44GL44Gu',
    'c2VraWRv',
    'a2Fubw==',
    'c2VraWRva2Fubw==',
    'a2Fub2JhZWJhZQ==',
    'a2Fub3NlbnNlaQ==',
    '6Zai5oi45YWI55Sf',
    '6aaZ5LmD5YWI55Sf',
    '44Gb44GN44Gp44Gb44KT44Gb44GE',
    '44GL44Gu44Gb44KT44Gb44GE',
  ]

  if (VALID_B64.includes(encodedClean) || VALID_B64.includes(encodedTrimmed)) {
    return true
  }

  return ['6Zai5oi4', '6aaZ5LmD', '44Gb44GN44Gp', '44GL44Gu', 'c2VraWRv', 'a2Fubw==', 'a2Fub2JhZWJhZQ=='].some(
    (kwB64) => {
      const kw = decodeSecret(kwB64)
      return kw && clean.includes(kw)
    }
  )
}

export function SecretCard({ onBack, userName }: { onBack: () => void; userName?: string }) {
  const isSekido = isSekidoKanoName(userName)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 relative z-10">
      <div className="fade-in-up mb-3" style={{ animationDelay: '0.05s', animationFillMode: 'both' }}>
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(250,244,232,0.13)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
        />

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

        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.22)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: 12,
            border: '0.5px dashed rgba(255,220,160,0.18)',
            pointerEvents: 'none',
          }}
        />

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

        <div style={{ position: 'relative', padding: '28px 24px 24px' }}>
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
            {isSekido ? decodeSecret(B64_MSG_HEADER) : 'ようこそ、ホイアンへ 🏮'}
          </p>

          <div
            style={{
              width: 40,
              height: '0.5px',
              background: 'linear-gradient(90deg, transparent, rgba(255,210,120,0.55), transparent)',
              margin: '10px auto 14px',
            }}
          />

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
            {isSekido ? decodeSecret(B64_MSG_TO) : `${userName || '旅人'}さんへ`}
          </p>

          {isSekido ? (
            <>
              <p
                className="text-center"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.85rem, 3vw, 0.96rem)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.91)',
                  letterSpacing: '0.05em',
                  lineHeight: 2.1,
                  whiteSpace: 'pre-line',
                  marginBottom: 16,
                }}
              >
                {decodeSecret(B64_MSG_LINE1)}
              </p>

              <p
                className="text-center"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.82rem, 2.6vw, 0.92rem)',
                  fontWeight: 300,
                  color: 'rgba(235,242,255,0.85)',
                  letterSpacing: '0.04em',
                  lineHeight: 2.1,
                  whiteSpace: 'pre-line',
                  marginBottom: 16,
                }}
              >
                {decodeSecret(B64_MSG_LINE2)}
              </p>

              <p
                className="text-center"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.82rem, 2.6vw, 0.92rem)',
                  fontWeight: 300,
                  color: 'rgba(255,230,175,0.92)',
                  letterSpacing: '0.04em',
                  lineHeight: 2.1,
                  whiteSpace: 'pre-line',
                  marginBottom: 22,
                }}
              >
                {decodeSecret(B64_MSG_LINE3)}
              </p>

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

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  marginBottom: 20,
                  paddingRight: 4,
                }}
              >
                <img
                  src={signatureImg}
                  alt="Signature"
                  style={{
                    height: 170,
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1) drop-shadow(0 2px 12px rgba(255,220,150,0.5))',
                    opacity: 0.95,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.64rem',
                    color: 'rgba(200,220,245,0.4)',
                    letterSpacing: '0.06em',
                    marginTop: -14,
                  }}
                >

                </span>
              </div>
            </>
          ) : (
            <p
              className="text-center"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.05em',
                lineHeight: 2,
                marginBottom: 24,
              }}
            >
              ホイアンの街と素晴らしい思い出を<br />
              心ゆくまでお楽しみください。
            </p>
          )}

          <div
            style={{
              width: '100%',
              height: '0.5px',
              background: 'rgba(255,255,255,0.07)',
              marginBottom: 12,
            }}
          />

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

      <div className="flex gap-3 mt-4 fade-in-up" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
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
      >
        旅行ガイドに戻る
      </button>
    </div>
  )
}

export default function SecretMessagePage({
  onBack,
}: {
  onBack: () => void
}) {
  const [phase, setPhase] = useState<Phase>('input')
  const [enteredName, setEnteredName] = useState<string>('')
  const [showParticles, setShowParticles] = useState(false)
  const [warm, setWarm] = useState(false)

  const handleInputName = useCallback((name: string) => {
    setEnteredName(name)
    setPhase('transitioning')
    setShowParticles(true)
    setTimeout(() => {
      setWarm(true)
    }, 300)
    setTimeout(() => {
      setPhase('revealed')
    }, 1200)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        minHeight: '100dvh',
        overflowY: 'auto',
        backgroundColor: '#070c18',
      }}
    >
      <HoiAnBackground warm={warm} />
      <FirefliesOverlay />
      <FloatingParticles active={showParticles} />

      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: warm
            ? 'rgba(15,10,5,0.15)'
            : 'rgba(10,15,30,0.2)',
        }}
      />

      {phase === 'input' && (
        <InputScreen onSubmitName={handleInputName} onDismiss={onBack} />
      )}

      {phase === 'transitioning' && (
        <div className="absolute inset-0 z-10" />
      )}

      {phase === 'revealed' && (
        <SecretCard onBack={onBack} userName={enteredName} />
      )}
    </div>
  )
}
