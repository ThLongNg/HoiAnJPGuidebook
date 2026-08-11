import { useState, useEffect, useRef } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  UtensilsCrossed,
  ShoppingBag,
  Camera,
  Volume2,
  Heart,
  Banknote,
  Languages,
  Navigation,
  Compass,
  Coffee,
  Gift,
  Flame,
  Star,
  Landmark,
  Waves,
  Footprints,
  Sparkle,
} from 'lucide-react'
import { type Tab } from '@/types'
import { speak } from '@/utils/tts'

// ─── Image constants ──────────────────────────────────────────────────────────
const IMG = {
  heroLanterns: 'https://images.unsplash.com/photo-1748271151446-0013c0bc7061?w=1800&h=1100&fit=crop&auto=format',
  heroBoat: 'https://images.unsplash.com/photo-1761150284871-ad4800e7fca2?w=1800&h=1100&fit=crop&auto=format',
  yellowBuildings: 'https://images.unsplash.com/photo-1780198303980-862783b0e4e4?w=900&h=700&fit=crop&auto=format',
  streetLanterns: 'https://images.unsplash.com/photo-1776236075205-09b487baa647?w=700&h=950&fit=crop&auto=format',
  alleyScooter: 'https://images.unsplash.com/photo-1776236075261-4720f2ff4e37?w=700&h=950&fit=crop&auto=format',
  oldStreet: 'https://images.unsplash.com/photo-1776236075314-f5de886f8d2c?w=900&h=600&fit=crop&auto=format',
  womanLantern: 'https://images.unsplash.com/photo-1768017093068-7d0a34d0add0?w=700&h=950&fit=crop&auto=format',
  foodCG: 'https://nhn.1cdn.vn/2023/07/27/van-hoa-am-thuc-hoi-an-06.jpg',
  foodMQ: 'https://statics.vinpearl.com/mi-quang-quang-nam-2_1698931608.jpg',
  foodCL: 'https://static.vinwonders.com/production/Cao-Lau-3.jpg',
  foodBM: 'https://statics.vinpearl.com/banh-mi-hoi-an-8_1631787006.jpg',
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

interface HomePageProps {
  onNavigate: (tab: Tab) => void
  onOpenConverter?: () => void
  onOpenTranslator?: () => void
  onOpenFavorites?: () => void
  onOpenSecret?: () => void
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────
function Hero({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
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
          <button
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2"
            style={{
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
            onMouseEnter={(e) => (e.currentTarget.style.background = '#a85e12')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#c8741a')}
          >
            <span>旅をはじめる</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('spots')}
            className="flex items-center gap-2"
            style={{
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
          >
            <span>おすすめを見る</span>
            <Camera className="w-4 h-4" />
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
function IntroSection({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <section id="intro" style={{ background: '#faf8f3', padding: 'clamp(80px,10vh,140px) clamp(24px,6vw,96px)' }}>
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
          <FadeIn delay={0}>
            <EditorialBlock
              number="01"
              tag="観る"
              title="黄色い街並みとランタンの灯り"
              desc="夕暮れ時、古い黄色い家々の間を歩けば、色とりどりのランタンが柔らかな光を灯す。ここは映画のセットではなく、今も人々が暮らす生きた街。"
              img={IMG.yellowBuildings}
              imgAlt="ホイアンの黄色い建物と川"
              accent="#c8741a"
              tall
              onClick={() => onNavigate('spots')}
            />
          </FadeIn>
          <FadeIn delay={80}>
            <EditorialBlock
              number="02"
              tag="食べる"
              title="カオラウ、ミークアン、バインミー"
              desc="ホイアンには、この街にしかない味がある。もちもちの麺、香ばしいスープ、パリパリのバゲット。食べることが、旅の中心になる。"
              img={IMG.foodCG}
              imgAlt="ホイアンのローカルフード"
              accent="#3d6b63"
              onClick={() => onNavigate('gourmet')}
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
              onClick={() => onNavigate('spots')}
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
              onClick={() => onNavigate('chui')}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function EditorialBlock({ number, tag, title, desc, img, imgAlt, accent, tall = false, onClick }: {
  number: string; tag: string; title: string; desc: string; img: string; imgAlt: string; accent: string; tall?: boolean; onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', borderRight: '1px solid #e8e0d0', borderBottom: '1px solid #e8e0d0' }}
      className="group"
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
        <h3 className="flex items-center justify-between gap-2" style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(15px,1.4vw,18px)', fontWeight: 400, color: '#1a1208', lineHeight: 1.5, letterSpacing: '0.04em', margin: '0 0 12px' }}>
          <span>{title}</span>
          <ChevronRight className="w-4 h-4 text-[#c8741a] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
        </h3>
        <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, fontWeight: 300, color: '#7a6447', lineHeight: 1.95, letterSpacing: '0.04em', margin: 0 }}>{desc}</p>
      </div>
    </div>
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
    img: IMG.foodCL,
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
    img: IMG.foodMQ,
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
    img: IMG.foodCG,
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
    img: IMG.foodBM,
  },
]

function FoodSection({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
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
          <div style={{ display: 'flex', gap: 0, marginBottom: 48, borderBottom: '1px solid #e8e0d0', overflowX: 'auto' }}>
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
                  whiteSpace: 'nowrap',
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Active food detail */}
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
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
                <DataRow
                  label="辛さ"
                  customValue={
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Flame
                          key={i}
                          className={`w-3.5 h-3.5 ${i < food.spice ? 'text-rose-500 fill-rose-500' : 'text-stone-300'}`}
                        />
                      ))}
                    </div>
                  }
                />
                <DataRow label="パクチー" value={food.cilantro ? '含む（調節可）' : 'なし'} />
                <DataRow
                  label="おすすめ度"
                  customValue={
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < food.rec ? 'text-amber-500 fill-amber-400' : 'text-stone-300'}`}
                        />
                      ))}
                    </div>
                  }
                />
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
            <button
              onClick={() => onNavigate('gourmet')}
              className="inline-flex items-center gap-1 group"
              style={{
                fontFamily: "'Noto Sans JP'",
                fontSize: 12,
                color: '#3d6b63',
                letterSpacing: '0.14em',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(61,107,99,0.4)',
                paddingBottom: 3,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span>ホイアンのグルメをすべて見る</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function DataRow({ label, value, customValue }: { label: string; value?: string; customValue?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: '#7a6447', letterSpacing: '0.08em', minWidth: 80 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: '#e8e0d0', margin: '0 16px' }} />
      {customValue || <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 13, color: '#2c1e0f', letterSpacing: '0.06em' }}>{value}</span>}
    </div>
  )
}

// ─── Section 5: Japan × Hoi An ───────────────────────────────────────────────
function JapanHoiAnSection({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <section style={{ background: '#f5f1ea', padding: 'clamp(80px,10vh,120px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,6vw,96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
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
              <button
                onClick={() => onNavigate('spots')}
                className="inline-flex items-center gap-2 group cursor-pointer"
                style={{
                  fontFamily: "'Noto Sans JP'",
                  fontSize: 12,
                  color: '#c8741a',
                  letterSpacing: '0.14em',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(200,116,26,0.3)',
                  paddingBottom: 4,
                }}
              >
                <span>日本とホイアンの歴史を知る</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Section 6: Local Experiences ────────────────────────────────────────────
const experiences = [
  { label: 'ランタン流し', Icon: Sparkles, color: 'text-amber-500', desc: 'Thu Bon川に灯りを流す' },
  { label: 'バスケットボート', Icon: Waves, color: 'text-teal-600', desc: '丸い竹舟で水路を巡る' },
  { label: 'トラケ野菜村', Icon: Footprints, color: 'text-emerald-600', desc: '農業体験と自然の中の昼食' },
  { label: 'スパ＆マッサージ', Icon: Sparkle, color: 'text-amber-600', desc: '古民家を改装した癒しの空間' },
  { label: '陶芸体験', Icon: Landmark, color: 'text-orange-600', desc: 'タインハーの職人と共に' },
  { label: 'シルク工房', Icon: ShoppingBag, color: 'text-amber-700', desc: '伝統の絹織物を見て触れる' },
  { label: 'ローカル市場', Icon: Compass, color: 'text-teal-700', desc: '早朝のホイアン中央市場' },
]

function ExperiencesSection({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <section style={{ background: '#1e1408', padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,96px)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'start' }}>
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
              {experiences.map((exp, i) => {
                const IconComponent = exp.Icon
                return (
                  <FadeIn key={exp.label} delay={i * 50}>
                    <div
                      onClick={() => onNavigate('spots')}
                      className="group"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20,
                        padding: '18px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '8px')}
                      onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className={`w-4 h-4 ${exp.color}`} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 14, fontWeight: 500, color: '#fff', letterSpacing: '0.04em' }}>{exp.label}</div>
                        <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.4)', marginTop: 3, letterSpacing: '0.04em' }}>{exp.desc}</div>
                      </div>
                      <ChevronRight className="ml-auto w-4 h-4 text-[#c8741a]/70 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </FadeIn>
                )
              })}
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
  { name: 'ランタン', desc: 'カラフルな手作りランタン。色や形も豊富で、部屋に飾るとホイアンの記憶が蘇る。', price: '30,000〜200,000ドン', Icon: Sparkles, color: 'text-amber-600' },
  { name: 'シルク製品', desc: 'スカーフ、アオザイ、ポーチなど。ホイアンの職人による上質なシルクは触り心地が違う。', price: '100,000〜500,000ドン+', Icon: ShoppingBag, color: 'text-teal-600' },
  { name: 'ベトナムコーヒー', desc: 'コンデンスミルクと一緒に楽しむ独特のコーヒー文化。豆やフィルターごと持ち帰りを。', price: '50,000〜150,000ドン', Icon: Coffee, color: 'text-amber-800' },
  { name: 'ローカルチョコレート', desc: 'マルゥやキムアンなど、ホイアン発のクラフトチョコレート。上品な甘さとパッケージが素敵。', price: '80,000〜250,000ドン', Icon: Gift, color: 'text-rose-600' },
]

function SouvenirsSection({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
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
            <button
              onClick={() => onNavigate('omiyage')}
              className="inline-flex items-center gap-1 group cursor-pointer"
              style={{
                fontFamily: "'Noto Sans JP'",
                fontSize: 12,
                color: '#8b5e3c',
                letterSpacing: '0.12em',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(139,94,60,0.35)',
                paddingBottom: 3,
              }}
            >
              <span>お土産を探す</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, border: '1px solid #e8e0d0' }}>
          {souvenirs.map((item, i) => {
            const IconComp = item.Icon
            return (
              <FadeIn key={item.name} delay={i * 60}>
                <div
                  onClick={() => onNavigate('omiyage')}
                  className="group"
                  style={{
                    padding: '36px 32px',
                    borderRight: '1px solid #e8e0d0',
                    cursor: 'pointer',
                    transition: 'background 0.25s',
                    background: '#faf8f3',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f1ea')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#faf8f3')}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8b5e3c]/10 border border-[#8b5e3c]/20 flex items-center justify-center mb-5">
                    <IconComp className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="flex items-center justify-between gap-2" style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 18, fontWeight: 400, color: '#1a1208', letterSpacing: '0.04em', margin: '0 0 12px' }}>
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#8b5e3c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, fontWeight: 300, color: '#7a6447', lineHeight: 1.9, letterSpacing: '0.04em', margin: '0 0 20px' }}>{item.desc}</p>
                  <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: '#8b5e3c', letterSpacing: '0.06em' }}>{item.price}</div>
                </div>
              </FadeIn>
            )
          })}
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
    Icon: Banknote,
    color: '#c8741a',
  },
  {
    id: 'translate',
    label: '日越リアルタイム翻訳',
    sublabel: '画面を見せるだけ',
    desc: '困ったときは、このガイドの翻訳画面をそのまま相手に見せましょう。',
    Icon: Languages,
    color: '#3d6b63',
  },
  {
    id: 'transport',
    label: '配車ガイド',
    sublabel: 'GreenSMの使い方',
    desc: 'ホイアンの移動は配車アプリが便利。使い方をわかりやすく解説。',
    Icon: Navigation,
    color: '#8b5e3c',
  },
]

function PracticalSection({
  onNavigate,
  onOpenConverter,
  onOpenTranslator,
}: {
  onNavigate: (tab: Tab) => void
  onOpenConverter?: () => void
  onOpenTranslator?: () => void
}) {
  const handleToolClick = (id: string) => {
    if (id === 'currency') onOpenConverter?.()
    else if (id === 'translate') onOpenTranslator?.()
    else if (id === 'transport') onNavigate('greensm')
  }

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
          {tools.map((tool, i) => {
            const ToolIcon = tool.Icon
            return (
              <FadeIn key={tool.id} delay={i * 80}>
                <div
                  onClick={() => handleToolClick(tool.id)}
                  className="group"
                  style={{
                    background: '#faf8f3',
                    border: '1px solid #e8e0d0',
                    padding: '32px 28px',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = tool.color; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e8e0d0'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                >
                  <div style={{ width: 44, height: 44, background: `${tool.color}18`, border: `1px solid ${tool.color}30`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <ToolIcon className="w-5 h-5" style={{ color: tool.color }} />
                  </div>
                  <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 17, fontWeight: 400, color: '#1a1208', letterSpacing: '0.04em', margin: '0 0 6px' }}>{tool.label}</h3>
                  <div style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: tool.color, letterSpacing: '0.08em', margin: '0 0 14px' }}>{tool.sublabel}</div>
                  <p style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, fontWeight: 300, color: '#7a6447', lineHeight: 1.85, letterSpacing: '0.04em', margin: '0 0 20px' }}>{tool.desc}</p>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Noto Sans JP'", fontSize: 11, color: tool.color, letterSpacing: '0.1em' }}>
                    <span>開く</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </FadeIn>
            )
          })}
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

function PhrasesSection({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [playing, setPlaying] = useState<number | null>(null)

  const handleSpeakPhrase = (index: number, vn: string) => {
    setPlaying(index)
    speak(vn)
    setTimeout(() => setPlaying(null), 1500)
  }

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
            <button
              onClick={() => onNavigate('kaiwa')}
              className="inline-flex items-center gap-1 group cursor-pointer"
              style={{
                fontFamily: "'Noto Sans JP'",
                fontSize: 12,
                color: '#3d6b63',
                letterSpacing: '0.12em',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(61,107,99,0.35)',
                paddingBottom: 3,
              }}
            >
              <span>会話フレーズを見る</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
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
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f0ece2')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#faf8f3')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 20, fontWeight: 400, color: '#3d6b63', letterSpacing: '0.04em' }}>{phrase.vn}</div>
                  <button
                    onClick={() => handleSpeakPhrase(i, phrase.vn)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid rgba(61,107,99,0.3)',
                      background: playing === i ? '#3d6b63' : 'none',
                      color: playing === i ? '#fff' : '#3d6b63',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s',
                    }}
                    title="発音を聞く"
                  >
                    <Volume2 className={`w-4 h-4 ${playing === i ? 'animate-bounce' : ''}`} />
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
function FinalCTA({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
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
          <button
            onClick={() => onNavigate('spots')}
            className="inline-flex items-center gap-2 group cursor-pointer"
            style={{
              fontFamily: "'Noto Sans JP'",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: '#fff',
              background: '#c8741a',
              border: 'none',
              padding: '16px 52px',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#a85e12')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#c8741a')}
          >
            <span>ホイアンの旅をはじめる</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => onNavigate('spots')} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: "'Noto Sans JP'", fontSize: 11, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', letterSpacing: '0.06em' }}>観光</button>
            <button onClick={() => onNavigate('gourmet')} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: "'Noto Sans JP'", fontSize: 11, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', letterSpacing: '0.06em' }}>グルメ</button>
            <button onClick={() => onNavigate('omiyage')} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: "'Noto Sans JP'", fontSize: 11, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', letterSpacing: '0.06em' }}>お土産</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => onNavigate('kaiwa')} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: "'Noto Sans JP'", fontSize: 11, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', letterSpacing: '0.06em' }}>会話</button>
            <button onClick={() => onNavigate('chui')} style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: "'Noto Sans JP'", fontSize: 11, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', letterSpacing: '0.06em' }}>注意事項</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '32px auto 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>© 2026 ホイアン旅行ガイド</span>
        <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>HOI AN / QUẢNG NAM / VIETNAM</span>
      </div>
    </footer>
  )
}

// ─── Main HomePage Component ──────────────────────────────────────────────────
export default function HomePage({
  onNavigate,
  onOpenConverter,
  onOpenTranslator,
  onOpenFavorites,
  onOpenSecret,
}: HomePageProps) {
  return (
    <div className="pb-0" style={{ fontFamily: "'Noto Sans JP', sans-serif", background: '#faf8f3', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Hero onNavigate={onNavigate} />
      <IntroSection onNavigate={onNavigate} />
      <FoodSection onNavigate={onNavigate} />
      <JapanHoiAnSection onNavigate={onNavigate} />
      <ExperiencesSection onNavigate={onNavigate} />
      <SouvenirsSection onNavigate={onNavigate} />
      <PracticalSection
        onNavigate={onNavigate}
        onOpenConverter={onOpenConverter}
        onOpenTranslator={onOpenTranslator}
      />
      <PhrasesSection onNavigate={onNavigate} />
      <FinalCTA onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
