import { useState, useEffect, useRef } from 'react'

// ─── Image constants ──────────────────────────────────────────────────────────
const IMG = {
  heroLanterns: 'https://images.unsplash.com/photo-1748271151446-0013c0bc7061?w=1800&h=1100&fit=crop&auto=format',
  heroBoat: 'https://images.unsplash.com/photo-1761150284871-ad4800e7fca2?w=1800&h=1100&fit=crop&auto=format',
  yellowBuildings: 'https://images.unsplash.com/photo-1780198303980-862783b0e4e4?w=900&h=700&fit=crop&auto=format',
  streetLanterns: 'https://images.unsplash.com/photo-1776236075205-09b487baa647?w=700&h=950&fit=crop&auto=format',
  alleyScooter: 'https://images.unsplash.com/photo-1776236075261-4720f2ff4e37?w=700&h=950&fit=crop&auto=format',
  oldStreet: 'https://images.unsplash.com/photo-1776236075314-f5de886f8d2c?w=900&h=600&fit=crop&auto=format',
  womanLantern: 'https://images.unsplash.com/photo-1768017093068-7d0a34d0add0?w=700&h=950&fit=crop&auto=format',
  foodSoup: 'https://images.unsplash.com/photo-1597345637412-9fd611e758f3?w=600&h=600&fit=crop&auto=format',
  foodNoodle: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=600&fit=crop&auto=format',
  foodBowl: 'https://images.unsplash.com/photo-1605311525808-ea0daef137b7?w=600&h=600&fit=crop&auto=format',
  foodChopsticks: 'https://images.unsplash.com/photo-1509072619873-adb3dc289b50?w=600&h=600&fit=crop&auto=format',
  japaneseBridgeWoman: 'https://images.unsplash.com/photo-1643030080539-b411caf44c37?w=800&h=600&fit=crop&auto=format',
  japaneseBridgeBuilding: 'https://images.unsplash.com/photo-1582379481622-4282045b474f?w=800&h=600&fit=crop&auto=format',
  lanternBoatNight: 'https://images.unsplash.com/photo-1544722827-484d3a94c799?w=700&h=900&fit=crop&auto=format',
  smallBoats: 'https://images.unsplash.com/photo-1719904252594-b2fb4dd3c699?w=700&h=900&fit=crop&auto=format',
  canalBuildings: 'https://images.unsplash.com/photo-1761150285751-c593ab20159c?w=1800&h=1000&fit=crop&auto=format',
  vietnameseStreet: 'https://images.unsplash.com/photo-1780803244219-a21588279fc6?w=700&h=700&fit=crop&auto=format',
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeIn()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        backgroundColor: scrolled ? 'rgba(26,18,8,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,116,26,0.2)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 13, fontWeight: 500, color: '#c8741a', letterSpacing: '0.12em' }}>HOI AN</span>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', marginTop: 1 }}>旅行ガイド</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
          {['ホーム', 'モデルコース', '観光', 'グルメ', 'お土産', '会話', '注意事項'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: 12,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8741a')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Utility icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {[
            { icon: '♡', label: 'お気に入り' },
            { icon: '¥', label: '通貨' },
            { icon: '翻', label: '翻訳' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              title={label}
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid rgba(200,116,26,0.4)',
                background: 'rgba(200,116,26,0.08)',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,116,26,0.3)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,116,26,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)' }}
            >
              {icon}
            </button>
          ))}
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: 4, display: 'none' }}
            className="show-mobile"
          >
            <div style={{ width: 22, height: 2, background: 'currentColor', margin: '4px 0', transition: '0.2s' }} />
            <div style={{ width: 22, height: 2, background: 'currentColor', margin: '4px 0', transition: '0.2s' }} />
            <div style={{ width: 22, height: 2, background: 'currentColor', margin: '4px 0', transition: '0.2s' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(26,18,8,0.97)', borderTop: '1px solid rgba(200,116,26,0.2)', padding: '16px 24px 24px' }}>
          {['ホーム', 'モデルコース', '観光', 'グルメ', 'お土産', '会話', '注意事項'].map((item) => (
            <a key={item} href="#" style={{ display: 'block', fontFamily: "'Noto Sans JP'", fontSize: 14, color: 'rgba(255,255,255,0.8)', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', letterSpacing: '0.06em' }}>{item}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────
function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 600, overflow: 'hidden', background: '#1a1208' }}>
      {/* Background image */}
      <img
        src={IMG.heroLanterns}
        alt="ホイアンの夜、川に浮かぶランタン"
        onLoad={() => setImgLoaded(true)}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 1.2s ease',
          filter: 'brightness(0.6)',
        }}
      />

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,8,0.2) 0%, rgba(26,18,8,0.1) 40%, rgba(26,18,8,0.75) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,18,8,0.4) 0%, transparent 60%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 clamp(24px,6vw,96px) clamp(64px,8vh,120px)' }}>
        {/* Small label */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 1, background: '#c8741a' }} />
          <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, fontWeight: 400, color: '#c8741a', letterSpacing: '0.22em' }}>HOI AN / VIETNAM</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 'clamp(36px,6vw,80px)',
          fontWeight: 300,
          color: '#fff',
          lineHeight: 1.25,
          letterSpacing: '0.04em',
          margin: '0 0 20px',
          textShadow: '0 2px 24px rgba(0,0,0,0.3)',
        }}>
          ホイアンへ、<br />旅に出よう。
        </h1>

        {/* Subheadline */}
        <p style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 'clamp(13px,1.4vw,16px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.9,
          letterSpacing: '0.06em',
          maxWidth: 480,
          margin: '0 0 40px',
        }}>
          古い町並み、ランタンの灯り、そしてここでしか味わえない食文化。<br />
          初めてのベトナム旅行でも、ホイアンをもっと自由に楽しめるガイドです。
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button style={{
            fontFamily: "'Noto Sans JP'",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: '#fff',
            background: '#c8741a',
            border: 'none',
            padding: '14px 36px',
            cursor: 'pointer',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#a85e12')}
            onMouseLeave={e => (e.currentTarget.style.background = '#c8741a')}
          >
            旅をはじめる
          </button>
          <button style={{
            fontFamily: "'Noto Sans JP'",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.9)',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '14px 36px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
          >
            おすすめを見る
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, right: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10 }}>
        <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em', writingMode: 'vertical-rl' }}>SCROLL</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(200,116,26,0.8), transparent)' }} />
      </div>
    </section>
  )
}

// ─── Section 2: Introduce Hoi An ─────────────────────────────────────────────
function IntroSection() {
  return (
    <section style={{ background: '#faf8f3', padding: 'clamp(80px,10vh,140px) clamp(24px,6vw,96px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: '#c8741a' }} />
            <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: '#c8741a', letterSpacing: '0.22em' }}>DISCOVER HOI AN</span>
          </div>
          <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 300, color: '#1a1208', letterSpacing: '0.06em', margin: '0 0 20px', lineHeight: 1.35 }}>
            ホイアンには、<br />何がある？
          </h2>
          <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 'clamp(13px,1.2vw,15px)', fontWeight: 300, color: '#7a6447', lineHeight: 2, letterSpacing: '0.06em', maxWidth: 560, margin: '0 0 72px' }}>
            歩いて、食べて、眺めて、少しだけ現地の人と話してみる。<br />
            ホイアンの魅力は、有名な観光地だけではありません。
          </p>
        </FadeIn>

        {/* Editorial 4-block layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>
          {/* Block 1: 観る — large left */}
          <FadeIn delay={0} className="">
            <EditorialBlock
              number="01"
              tag="観る"
              title="黄色い街並みとランタンの灯り"
              desc="夕暮れ時、古い黄色い家々の間を歩けば、色とりどりのランタンが柔らかな光を灯す。ここは映画のセットではなく、今も人々が暮らす生きた街。"
              img={IMG.yellowBuildings}
              imgAlt="ホイアンの黄色い建物と川"
              accent="#c8741a"
              tall
            />
          </FadeIn>
          <FadeIn delay={80}>
            <EditorialBlock
              number="02"
              tag="食べる"
              title="カオラウ、ミークアン、バインミー"
              desc="ホイアンには、この街にしかない味がある。もちもちの麺、香ばしいスープ、パリパリのバゲット。食べることが、旅の中心になる。"
              img={IMG.foodSoup}
              imgAlt="ホイアンのローカルフード"
              accent="#3d6b63"
            />
          </FadeIn>
          <FadeIn delay={160}>
            <EditorialBlock
              number="03"
              tag="体験する"
              title="ランタン、バスケットボート、スパ"
              desc="川にランタンを流す。丸いバスケットボートで水路を巡る。古い路地の奥に隠れたスパで疲れを癒す。体で覚える旅がある。"
              img={IMG.lanternBoatNight}
              imgAlt="夜のランタンボート"
              accent="#c8741a"
            />
          </FadeIn>
          <FadeIn delay={240}>
            <EditorialBlock
              number="04"
              tag="暮らすように旅する"
              title="市場、路地、ローカルな店、人との出会い"
              desc="早朝の市場、路地裏のコーヒー、見知らぬ店主との笑顔のやりとり。ガイドブックには載っていない瞬間が、旅を本物にする。"
              img={IMG.vietnameseStreet}
              imgAlt="ホイアンのローカルな街の風景"
              accent="#3d6b63"
              tall
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function EditorialBlock({ number, tag, title, desc, img, imgAlt, accent, tall = false }: {
  number: string; tag: string; title: string; desc: string; img: string; imgAlt: string; accent: string; tall?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', borderRight: '1px solid #e8e0d0', borderBottom: '1px solid #e8e0d0' }}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', height: tall ? 320 : 260, background: '#d4c8b0' }}>
        <img src={img} alt={imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
      </div>
      {/* Text */}
      <div style={{ padding: '28px 28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: 'rgba(26,18,8,0.3)', letterSpacing: '0.12em' }}>{number}</span>
          <div style={{ width: 16, height: 1, background: accent }} />
          <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: accent, letterSpacing: '0.12em', fontWeight: 500 }}>{tag}</span>
        </div>
        <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(15px,1.4vw,18px)', fontWeight: 400, color: '#1a1208', lineHeight: 1.5, letterSpacing: '0.04em', margin: '0 0 12px' }}>{title}</h3>
        <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, fontWeight: 300, color: '#7a6447', lineHeight: 1.95, letterSpacing: '0.04em', margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Section 3: Itinerary ─────────────────────────────────────────────────────
function ItinerarySection() {
  const courses = [
    {
      label: '半日コース',
      hours: '4–5時間',
      color: '#c8741a',
      items: [
        { time: '16:00', activity: '古都散策', note: 'ランタン通りを歩く' },
        { time: '17:30', activity: 'ホイアン料理', note: 'カオラウを味わう' },
        { time: '19:00', activity: 'ランタン', note: '川でランタンを流す' },
        { time: '20:00', activity: 'ナイトマーケット', note: 'お土産と夜の散策' },
      ],
    },
    {
      label: '1日コース',
      hours: '丸1日',
      color: '#3d6b63',
      items: [
        { time: '朝', activity: '古都散策', note: '朝の静かな路地を歩く' },
        { time: '昼', activity: 'ランチ', note: 'ローカル食堂で食事' },
        { time: '午後', activity: '文化体験', note: 'ランタン作り / 料理教室' },
        { time: '夕方', activity: '街並みと夕日', note: 'Thu Bon河沿いを歩く' },
        { time: '夜', activity: 'ランタンナイト', note: '幻想的な旧市街の夜' },
      ],
    },
    {
      label: '食と街歩き',
      hours: '半日〜1日',
      color: '#8b5e3c',
      items: [
        { time: '朝', activity: 'ローカルフード', note: 'ミークアン、バインミー' },
        { time: '午前', activity: 'カフェ巡り', note: 'コーヒー文化を体験' },
        { time: '昼', activity: '古民家と工房', note: 'シルクや陶芸の職人を訪ねる' },
        { time: '夜', activity: '夜市', note: '賑わいの中で夕食を' },
      ],
    },
  ]

  return (
    <section style={{ background: '#1e1408', padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,96px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: '#c8741a' }} />
            <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: '#c8741a', letterSpacing: '0.22em' }}>MODEL COURSE</span>
          </div>
          <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 300, color: '#fff', letterSpacing: '0.06em', margin: '0 0 16px', lineHeight: 1.35 }}>
            初めてなら、この過ごし方。
          </h2>
          <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, letterSpacing: '0.06em', margin: '0 0 60px' }}>
            時間に合わせて、ホイアンを楽しむモデルコース。
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {courses.map((course, i) => (
            <FadeIn key={course.label} delay={i * 100}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '36px 32px',
                  transition: 'background 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                  <div>
                    <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: course.color, letterSpacing: '0.16em', marginBottom: 8 }}>{course.hours}</div>
                    <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 20, fontWeight: 400, color: '#fff', letterSpacing: '0.04em', margin: 0 }}>{course.label}</h3>
                  </div>
                  <div style={{ width: 2, height: 48, background: course.color, flexShrink: 0 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {course.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: course.color, letterSpacing: '0.06em', minWidth: 40, paddingTop: 1 }}>{item.time}</span>
                      <div>
                        <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 13, fontWeight: 500, color: '#fff', letterSpacing: '0.04em' }}>{item.activity}</div>
                        <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.45)', marginTop: 2, letterSpacing: '0.04em' }}>{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
            <button style={{
              fontFamily: "'Noto Sans JP'",
              fontSize: 12,
              letterSpacing: '0.12em',
              color: '#c8741a',
              background: 'none',
              border: '1px solid rgba(200,116,26,0.4)',
              padding: '12px 40px',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,116,26,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = '#c8741a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,116,26,0.4)' }}
            >
              モデルコースを見る →
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Section 4: Food Story ────────────────────────────────────────────────────
const foods = [
  {
    name: 'カオラウ',
    roman: 'Cao Lầu',
    desc: 'ホイアン名物。太めのもちもち麺に豚肉、クルトン、新鮮な野菜が乗る。ホイアンの水だけで作れると言われる唯一無二の味。',
    taste: '香ばしい / もちもち',
    spice: 1,
    cilantro: true,
    rec: 5,
    price: '約60,000〜80,000ドン',
    img: IMG.foodBowl,
  },
  {
    name: 'ミークアン',
    roman: 'Mì Quảng',
    desc: 'ターメリックで黄色く染まった幅広麺に、えびや豚肉、ピーナッツをトッピング。ブロスが少なく濃厚な味わい。',
    taste: '濃厚 / 風味豊か',
    spice: 2,
    cilantro: true,
    rec: 4,
    price: '約40,000〜60,000ドン',
    img: IMG.foodNoodle,
  },
  {
    name: 'コムガー',
    roman: 'Cơm Gà',
    desc: '鶏の旨みたっぷりのご飯に蒸し鶏をのせたシンプルなひと皿。ホイアンで最も親しまれているローカルフード。',
    taste: 'やさしい / 上品',
    spice: 0,
    cilantro: false,
    rec: 5,
    price: '約35,000〜55,000ドン',
    img: IMG.foodSoup,
  },
  {
    name: 'バインミー',
    roman: 'Bánh Mì',
    desc: 'フランス統治時代の遺産、パリパリのバゲット。ホイアン式はパテ、野菜、パクチーが絶妙にバランス。世界で最も美味しいサンドイッチとも。',
    taste: 'サクサク / ハーブ',
    spice: 1,
    cilantro: true,
    rec: 5,
    price: '約25,000〜40,000ドン',
    img: IMG.foodChopsticks,
  },
]

function FoodSection() {
  const [active, setActive] = useState(0)
  const food = foods[active]

  return (
    <section style={{ background: '#faf8f3', padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,96px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: '#3d6b63' }} />
            <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: '#3d6b63', letterSpacing: '0.22em' }}>LOCAL FOOD</span>
          </div>
          <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 300, color: '#1a1208', letterSpacing: '0.06em', margin: '0 0 12px', lineHeight: 1.35 }}>
            ホイアンで、何を食べる？
          </h2>
          <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 300, color: '#7a6447', lineHeight: 1.9, letterSpacing: '0.06em', margin: '0 0 56px' }}>
            初めてでも挑戦しやすい、ホイアンのローカルグルメ。
          </p>
        </FadeIn>

        {/* Tab selectors */}
        <FadeIn delay={100}>
          <div style={{ display: 'flex', gap: 0, marginBottom: 48, borderBottom: '1px solid #e8e0d0' }}>
            {foods.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setActive(i)}
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: 'clamp(14px,1.3vw,17px)',
                  fontWeight: active === i ? 500 : 300,
                  color: active === i ? '#c8741a' : '#7a6447',
                  background: 'none',
                  border: 'none',
                  borderBottom: active === i ? '2px solid #c8741a' : '2px solid transparent',
                  padding: '12px 28px 16px',
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  transition: 'all 0.2s',
                  marginBottom: -1,
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Active food detail */}
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Image */}
            <div style={{ background: '#d4c8b0', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                key={food.img}
                src={food.img}
                alt={food.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s' }}
              />
            </div>
            {/* Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(24px,3vw,40px)', fontWeight: 300, color: '#1a1208', letterSpacing: '0.04em', margin: 0 }}>{food.name}</h3>
                <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, color: '#7a6447', letterSpacing: '0.08em' }}>{food.roman}</span>
              </div>
              <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 300, color: '#4a3728', lineHeight: 2, letterSpacing: '0.06em', margin: '0 0 32px' }}>{food.desc}</p>

              {/* Data rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid #e8e0d0', paddingTop: 28 }}>
                <DataRow label="味" value={food.taste} />
                <DataRow label="辛さ" value={'🌶️'.repeat(food.spice) + '○'.repeat(3 - food.spice)} />
                <DataRow label="パクチー" value={food.cilantro ? '含む（調節可）' : 'なし'} />
                <DataRow label="おすすめ度" value={'★'.repeat(food.rec) + '☆'.repeat(5 - food.rec)} />
                <DataRow label="目安価格" value={food.price} />
              </div>

              <div style={{ marginTop: 32, padding: '14px 20px', background: 'rgba(200,116,26,0.06)', borderLeft: '3px solid #c8741a' }}>
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 13, color: '#8b5e3c', lineHeight: 1.8, letterSpacing: '0.04em', margin: 0, fontStyle: 'italic' }}>
                  「{food.name} — {food.taste.split(' / ')[0]}な風味。初めてなら、ぜひ試して。」
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div style={{ marginTop: 56, textAlign: 'center' }}>
            <a href="#" style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, color: '#3d6b63', letterSpacing: '0.14em', textDecoration: 'none', borderBottom: '1px solid rgba(61,107,99,0.4)', paddingBottom: 3, transition: 'all 0.2s' }}>
              ホイアンのグルメをすべて見る →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: '#7a6447', letterSpacing: '0.08em', minWidth: 80 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: '#e8e0d0', margin: '0 16px' }} />
      <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 13, color: '#2c1e0f', letterSpacing: '0.06em' }}>{value}</span>
    </div>
  )
}

// ─── Section 5: Japan × Hoi An ───────────────────────────────────────────────
function JapanHoiAnSection() {
  return (
    <section style={{ background: '#f5f1ea', padding: 'clamp(80px,10vh,120px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,6vw,96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Images */}
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, height: 480 }}>
              <div style={{ background: '#d4c8b0', overflow: 'hidden' }}>
                <img src={IMG.japaneseBridgeWoman} alt="来遠橋（日本橋）" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 8 }}>
                <div style={{ background: '#d4c8b0', overflow: 'hidden' }}>
                  <img src={IMG.japaneseBridgeBuilding} alt="ホイアン旧市街" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ background: '#1e1408', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 36, color: '#c8741a', lineHeight: 1, marginBottom: 8 }}>来</div>
                    <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 36, color: '#c8741a', lineHeight: 1, marginBottom: 8 }}>遠</div>
                    <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 36, color: '#c8741a', lineHeight: 1 }}>橋</div>
                    <div style={{ width: 1, height: 24, background: 'rgba(200,116,26,0.4)', margin: '12px auto 0' }} />
                    <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 9, color: 'rgba(200,116,26,0.6)', letterSpacing: '0.16em', marginTop: 8 }}>17C</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={150}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 24, height: 1, background: '#c8741a' }} />
                <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: '#c8741a', letterSpacing: '0.22em' }}>JAPAN × HOI AN</span>
              </div>
              <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(22px,3vw,40px)', fontWeight: 300, color: '#1a1208', letterSpacing: '0.06em', lineHeight: 1.4, margin: '0 0 28px' }}>
                日本とホイアン、<br />400年のつながり。
              </h2>
              <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 300, color: '#4a3728', lineHeight: 2.1, letterSpacing: '0.06em', margin: '0 0 32px' }}>
                17世紀、ホイアンには日本人商人が行き交い、日本町が形成されました。今も残る来遠橋（日本橋）は、当時の日越交流を今に伝えるホイアンの象徴です。
              </p>
              <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 300, color: '#4a3728', lineHeight: 2.1, letterSpacing: '0.06em', margin: '0 0 40px' }}>
                黄色い壁、運河、静かな路地——ホイアンの風景に、どこか懐かしさを感じるのは、この深いつながりがあるからかもしれません。
              </p>
              <a href="#" style={{
                fontFamily: "'Noto Sans JP'",
                fontSize: 12,
                color: '#c8741a',
                letterSpacing: '0.14em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                borderBottom: '1px solid rgba(200,116,26,0.3)',
                paddingBottom: 4,
              }}>
                日本とホイアンの歴史を知る →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Section 6: Local Experiences ────────────────────────────────────────────
const experiences = [
  { label: 'ランタン流し', icon: '🏮', desc: 'Thu Bon川に灯りを流す' },
  { label: 'バスケットボート', icon: '🛶', desc: '丸い竹舟で水路を巡る' },
  { label: 'トラケ野菜村', icon: '🌿', desc: '農業体験と自然の中の昼食' },
  { label: 'スパ＆マッサージ', icon: '✦', desc: '古民家を改装した癒しの空間' },
  { label: '陶芸体験', icon: '◎', desc: 'タインハーの職人と共に' },
  { label: 'シルク工房', icon: '〜', desc: '伝統の絹織物を見て触れる' },
  { label: 'ローカル市場', icon: '⊹', desc: '早朝のホイアン中央市場' },
]

function ExperiencesSection() {
  return (
    <section style={{ background: '#1e1408', padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,96px)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left: headline + experiences list */}
          <div>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 24, height: 1, background: '#c8741a' }} />
                <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: '#c8741a', letterSpacing: '0.22em' }}>EXPERIENCES</span>
              </div>
              <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(22px,3vw,40px)', fontWeight: 300, color: '#fff', letterSpacing: '0.06em', lineHeight: 1.4, margin: '0 0 16px' }}>
                観光だけじゃない、<br />ホイアン。
              </h2>
              <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, letterSpacing: '0.06em', margin: '0 0 48px' }}>
                地元の人の暮らしに、少しだけ触れてみよう。
              </p>
            </FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {experiences.map((exp, i) => (
                <FadeIn key={exp.label} delay={i * 50}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
                    onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
                  >
                    <span style={{ fontSize: 16, width: 28, textAlign: 'center', flexShrink: 0 }}>{exp.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 500, color: '#fff', letterSpacing: '0.04em' }}>{exp.label}</div>
                      <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.4)', marginTop: 3, letterSpacing: '0.04em' }}>{exp.desc}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', color: 'rgba(200,116,26,0.5)', fontSize: 12 }}>→</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: image collage */}
          <FadeIn delay={200}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gap: 8, height: 560 }}>
              <div style={{ gridRow: '1 / 3', background: '#3d2e1a', overflow: 'hidden' }}>
                <img src={IMG.lanternBoatNight} alt="ランタンボート夜" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              </div>
              <div style={{ background: '#2a1f10', overflow: 'hidden' }}>
                <img src={IMG.womanLantern} alt="ランタンを持つ女性" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              </div>
              <div style={{ background: '#1a1408', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 2, letterSpacing: '0.08em' }}>
                    体で覚える<br />旅がある
                  </div>
                </div>
              </div>
              <div style={{ gridColumn: '1 / 3', background: '#3d2e1a', overflow: 'hidden' }}>
                <img src={IMG.smallBoats} alt="ホイアンの小舟" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Section 7: Souvenirs ─────────────────────────────────────────────────────
const souvenirs = [
  { name: 'ランタン', desc: 'カラフルな手作りランタン。色や形も豊富で、部屋に飾るとホイアンの記憶が蘇る。', price: '30,000〜200,000ドン', icon: '🏮' },
  { name: 'シルク製品', desc: 'スカーフ、アオザイ、ポーチなど。ホイアンの職人による上質なシルクは触り心地が違う。', price: '100,000〜500,000ドン+', icon: '〜' },
  { name: 'ベトナムコーヒー', desc: 'コンデンスミルクと一緒に楽しむ独特のコーヒー文化。豆やフィルターごと持ち帰りを。', price: '50,000〜150,000ドン', icon: '☕' },
  { name: 'ローカルチョコレート', desc: 'マルゥやキムアンなど、ホイアン発のクラフトチョコレート。上品な甘さとパッケージが素敵。', price: '80,000〜250,000ドン', icon: '◈' },
]

function SouvenirsSection() {
  return (
    <section style={{ background: '#faf8f3', padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,96px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: '#8b5e3c' }} />
                <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: '#8b5e3c', letterSpacing: '0.22em' }}>SOUVENIRS</span>
              </div>
              <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(22px,3vw,40px)', fontWeight: 300, color: '#1a1208', letterSpacing: '0.06em', lineHeight: 1.35, margin: 0 }}>
                旅の思い出を、ひとつ。
              </h2>
            </div>
            <a href="#" style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, color: '#8b5e3c', letterSpacing: '0.12em', textDecoration: 'none', borderBottom: '1px solid rgba(139,94,60,0.35)', paddingBottom: 3 }}>
              お土産を探す →
            </a>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, border: '1px solid #e8e0d0' }}>
          {souvenirs.map((item, i) => (
            <FadeIn key={item.name} delay={i * 60}>
              <div
                style={{
                  padding: '36px 32px',
                  borderRight: '1px solid #e8e0d0',
                  cursor: 'pointer',
                  transition: 'background 0.25s',
                  background: '#faf8f3',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f5f1ea')}
                onMouseLeave={e => (e.currentTarget.style.background = '#faf8f3')}
              >
                <div style={{ fontSize: 24, marginBottom: 20 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 18, fontWeight: 400, color: '#1a1208', letterSpacing: '0.04em', margin: '0 0 12px' }}>{item.name}</h3>
                <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, fontWeight: 300, color: '#7a6447', lineHeight: 1.9, letterSpacing: '0.04em', margin: '0 0 20px' }}>{item.desc}</p>
                <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: '#8b5e3c', letterSpacing: '0.06em' }}>{item.price}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 8: Practical Tools ───────────────────────────────────────────────
const tools = [
  {
    id: 'currency',
    label: '通貨換算',
    sublabel: '日本円 ⇄ ベトナムドン',
    desc: '現地でいくら払えばいい？リアルタイムのレートで素早く確認。',
    icon: '¥',
    color: '#c8741a',
  },
  {
    id: 'translate',
    label: '日越リアルタイム翻訳',
    sublabel: '画面を見せるだけ',
    desc: '困ったときは、このガイドの翻訳画面をそのまま相手に見せましょう。',
    icon: '翻',
    color: '#3d6b63',
  },
  {
    id: 'transport',
    label: '配車ガイド',
    sublabel: 'Grab / XaXi の使い方',
    desc: 'ホイアンの移動は配車アプリが便利。使い方をわかりやすく解説。',
    icon: '◎',
    color: '#8b5e3c',
  },
]

function PracticalSection() {
  return (
    <section style={{ background: '#f5f1ea', padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,96px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: '#7a6447' }} />
            <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: '#7a6447', letterSpacing: '0.22em' }}>PRACTICAL TOOLS</span>
          </div>
          <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(22px,3vw,40px)', fontWeight: 300, color: '#1a1208', letterSpacing: '0.06em', lineHeight: 1.35, margin: '0 0 12px' }}>
            旅をもっと安心・快適に。
          </h2>
          <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 300, color: '#7a6447', lineHeight: 1.9, letterSpacing: '0.06em', margin: '0 0 56px' }}>
            言葉やお金、移動に困ったときは、スマートフォンからすぐに使えます。
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {tools.map((tool, i) => (
            <FadeIn key={tool.id} delay={i * 80}>
              <div
                style={{
                  background: '#faf8f3',
                  border: '1px solid #e8e0d0',
                  padding: '32px 28px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = tool.color; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e8e0d0'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                <div style={{ width: 44, height: 44, background: `${tool.color}18`, border: `1px solid ${tool.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontFamily: "'Noto Sans JP'", fontSize: 16, color: tool.color }}>
                  {tool.icon}
                </div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 17, fontWeight: 400, color: '#1a1208', letterSpacing: '0.04em', margin: '0 0 6px' }}>{tool.label}</h3>
                <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: tool.color, letterSpacing: '0.08em', margin: '0 0 14px' }}>{tool.sublabel}</div>
                <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, fontWeight: 300, color: '#7a6447', lineHeight: 1.85, letterSpacing: '0.04em', margin: '0 0 20px' }}>{tool.desc}</p>
                <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: tool.color, letterSpacing: '0.1em' }}>開く →</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 9: Vietnamese Phrases ───────────────────────────────────────────
const phrases = [
  { vn: 'Xin chào', kana: 'シンチャオ', meaning: 'こんにちは', note: '最もよく使う挨拶' },
  { vn: 'Cảm ơn', kana: 'カムオン', meaning: 'ありがとう', note: '笑顔と共に' },
  { vn: 'Bao nhiêu tiền?', kana: 'バオニェウティエン', meaning: 'いくらですか？', note: '買い物に必須' },
  { vn: 'Cho tôi cái này', kana: 'チョートイカイナイ', meaning: 'これをください', note: '指差しと一緒に' },
]

function PhrasesSection() {
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <section style={{ background: '#faf8f3', padding: 'clamp(64px,8vh,100px) clamp(24px,6vw,96px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: '#3d6b63' }} />
                <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: '#3d6b63', letterSpacing: '0.22em' }}>VIETNAMESE PHRASES</span>
              </div>
              <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(20px,2.5vw,34px)', fontWeight: 300, color: '#1a1208', letterSpacing: '0.06em', lineHeight: 1.35, margin: 0 }}>
                旅で使える、かんたんベトナム語。
              </h2>
            </div>
            <a href="#" style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, color: '#3d6b63', letterSpacing: '0.12em', textDecoration: 'none', borderBottom: '1px solid rgba(61,107,99,0.35)', paddingBottom: 3 }}>
              会話フレーズを見る →
            </a>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, border: '1px solid #e8e0d0' }}>
          {phrases.map((phrase, i) => (
            <FadeIn key={phrase.vn} delay={i * 70}>
              <div
                style={{
                  padding: '28px 24px',
                  borderRight: '1px solid #e8e0d0',
                  background: '#faf8f3',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f0ece2')}
                onMouseLeave={e => (e.currentTarget.style.background = '#faf8f3')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 20, fontWeight: 400, color: '#3d6b63', letterSpacing: '0.04em' }}>{phrase.vn}</div>
                  <button
                    onClick={() => setPlaying(playing === i ? null : i)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      border: '1px solid rgba(61,107,99,0.3)',
                      background: playing === i ? '#3d6b63' : 'none',
                      color: playing === i ? '#fff' : '#3d6b63',
                      fontSize: 10,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s',
                    }}
                    title="発音を聞く"
                  >
                    ♪
                  </button>
                </div>
                <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 13, color: '#7a6447', letterSpacing: '0.08em', marginBottom: 6 }}>{phrase.kana}</div>
                <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 500, color: '#1a1208', letterSpacing: '0.06em', marginBottom: 6 }}>{phrase.meaning}</div>
                <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, fontWeight: 300, color: 'rgba(26,18,8,0.4)', letterSpacing: '0.04em' }}>{phrase.note}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 10: Final CTA ────────────────────────────────────────────────────
function FinalCTA() {
  const [loaded, setLoaded] = useState(false)
  return (
    <section style={{ position: 'relative', height: '70vh', minHeight: 480, overflow: 'hidden', background: '#1a1208' }}>
      <img
        src={IMG.canalBuildings}
        alt="ホイアン旧市街の夜"
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s ease',
          filter: 'brightness(0.45) saturate(0.85)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,18,8,0.9) 0%, rgba(26,18,8,0.3) 60%, rgba(26,18,8,0.1) 100%)' }} />

      <div style={{
        position: 'relative', zIndex: 10,
        height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        textAlign: 'center',
        padding: '0 24px clamp(64px,10vh,100px)',
      }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 24, height: 1, background: 'rgba(200,116,26,0.6)' }} />
            <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: 'rgba(200,116,26,0.8)', letterSpacing: '0.22em' }}>HOI AN / VIETNAM</span>
            <div style={{ width: 24, height: 1, background: 'rgba(200,116,26,0.6)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: 'clamp(28px,5vw,64px)',
            fontWeight: 300,
            color: '#fff',
            letterSpacing: '0.06em',
            lineHeight: 1.3,
            margin: '0 0 20px',
            textShadow: '0 2px 24px rgba(0,0,0,0.4)',
          }}>
            さあ、ホイアンを<br />歩いてみよう。
          </h2>
          <p style={{
            fontFamily: "'Noto Sans JP'",
            fontSize: 'clamp(13px,1.3vw,15px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.9,
            letterSpacing: '0.08em',
            maxWidth: 400,
            margin: '0 auto 40px',
          }}>
            知らない街だからこそ、少しだけ寄り道してみる。
          </p>
          <button style={{
            fontFamily: "'Noto Sans JP'",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: '#fff',
            background: '#c8741a',
            border: 'none',
            padding: '16px 52px',
            cursor: 'pointer',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#a85e12')}
            onMouseLeave={e => (e.currentTarget.style.background = '#c8741a')}
          >
            ホイアンの旅をはじめる
          </button>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#120d06', padding: '48px clamp(24px,6vw,96px) 32px', borderTop: '1px solid rgba(200,116,26,0.15)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 14, color: '#c8741a', letterSpacing: '0.16em', marginBottom: 6 }}>HOI AN 旅行ガイド</div>
          <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', lineHeight: 1.8 }}>
            日本語で楽しむ、ホイアンの旅。<br />ベトナム語が話せなくても大丈夫。
          </div>
        </div>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[['観光', 'グルメ', 'お土産'], ['会話', '注意事項', 'モデルコース']].map((col, ci) => (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.map(item => (
                <a key={item} href="#" style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c8741a')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >{item}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '32px auto 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>© 2026 ホイアン旅行ガイド</span>
        <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>HOI AN / QUẢNG NAM / VIETNAM</span>
      </div>
    </footer>
  )
}

// ─── Responsive helpers ───────────────────────────────────────────────────────
const mobileCSS = `
  @media (max-width: 768px) {
    .hidden-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
  }
  @media (min-width: 769px) {
    .show-mobile { display: none !important; }
  }
`

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{mobileCSS}</style>
      <div style={{ fontFamily: "'Noto Sans JP', sans-serif", background: '#faf8f3' }}>
        <Nav />
        <Hero />
        <IntroSection />
        <ItinerarySection />
        <FoodSection />
        <JapanHoiAnSection />
        <ExperiencesSection />
        <SouvenirsSection />
        <PracticalSection />
        <PhrasesSection />
        <FinalCTA />
        <Footer />
      </div>
    </>
  )
}
