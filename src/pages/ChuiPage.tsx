import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Car, CheckCircle2, Sparkles, X, ExternalLink, ChevronRight,
  CreditCard, Banknote, Bike, Droplets, Thermometer, Smartphone,
  Receipt, Leaf, Plane, BookOpen, Lightbulb, ArrowRight, ShieldCheck,
  Compass, MapPin, Clock, Ticket
} from 'lucide-react'
import { type Tab } from '@/types'
import CurrencyConverter from '@/components/CurrencyConverter'

// ─── Tip data with Lucide Icons ──────────────────────────────
type TipLink = { label: string; icon: React.ReactNode; url: string; placeholder?: boolean; note?: string }
type TipDetail = { body: string; links?: TipLink[] }

export type TipItem = {
  id: string
  icon: React.ReactNode
  title: string
  displayTitle: string
  desc: string
  color: string
  bg: string
  border: string
  detail: TipDetail
}

const tips: TipItem[] = [
  {
    id: 'sim',
    icon: <Smartphone size={20} className="text-[#8b5e3c]" />,
    title: 'SIMカード',
    displayTitle: 'SIM・eSIMはどうする？',
    desc: '空港で購入可。10日間で約1,000円とお手頃。',
    color: '#8b5e3c', bg: '#faf8f3', border: '#e8e0d0',
    detail: {
      body: `ベトナムのSIMカードは非常に安くて高速です（4G/5G）。\n\n✅ 空港到着ホールで購入可能（Viettel / Vinaphone / Mobifone）\n✅ 10日間プラン：約150,000〜200,000 VND（約1,000円）\n✅ 事前にオンラインで購入するとスムーズ！\n\n📦 オンライン購入はこちら：`,
      links: [
        { label: 'Klook でSIM購入', icon: <Smartphone size={18} />, url: 'https://s.klook.com/c/my4bVPpgwO', placeholder: true, note: 'Klookアフィリエイトリンクをここに設定' },
        { label: 'Trip.com でSIM購入', icon: <Plane size={18} />, url: 'https://jp.trip.com/things-to-do/detail/45861197?locale=ja-JP&curr=JPY', placeholder: true, note: 'Trip.comアフィリエイトリンクをここに設定' },
      ],
    },
  },
  {
    id: 'exchange',
    icon: <Banknote size={20} className="text-[#3d6b63]" />,
    title: '両替について',
    displayTitle: '両替はどこでする？',
    desc: '空港の両替は高め。市内の両替所がお得。',
    color: '#3d6b63', bg: '#faf8f3', border: '#e8e0d0',
    detail: { body: `空港の両替レートは市内より5〜10%悪いことが多いです。\n\n✅ おすすめは市内の両替所（ホイアン旧市街周辺に多数あり）\n✅ ATMでキャッシュ引き出しも可（手数料に注意）\n\n⚠️ 複数店舗で確認してから両替しましょう。` },
  },
  {
    id: 'pedestrian',
    icon: <Bike size={20} className="text-[#c8741a]" />,
    title: '歩行者天国の時間帯',
    displayTitle: '旧市街を歩くなら',
    desc: '毎日15:00〜21:30は旧市街全域でバイク進入禁止！',
    color: '#c8741a', bg: '#faf8f3', border: '#e8e0d0',
    detail: { body: `ホイアン旧市街は時間帯によって車両・バイクの進入が禁止（歩行者天国）になります。\n\n🚶‍♂️ 【禁止時間帯】\n・午後の部：15:00 〜 21:30（最もおすすめの散策時間！）\n・朝の部：09:00 〜 11:00\n\n✅ 車やバイクの騒音がなく、写真撮影や徒歩での観光にベストな時間帯です。\n⚠️ この時間帯はタクシーやGrabも旧市街中心部に入れません。周辺の降車ポイントを利用しましょう。` },
  },
  {
    id: 'tickets',
    icon: <Banknote size={20} className="text-[#be123c]" />,
    title: 'チケット＆ボート定額料金',
    displayTitle: 'チケットとボートの料金を確認',
    desc: '旧市街共通チケット(120k)とボート公定料金の注意点。',
    color: '#be123c', bg: '#faf8f3', border: '#e8e0d0',
    detail: { body: `ぼったくりを防ぐための公式料金ガイドです。\n\n🎟️ 【旧市街共通チケット】\n・料金：120,000 VND / 1枚\n・ルール：1枚のチケットで「好きな5つの有料施設（日本橋・タンキー古民家・福建会館など）」に入場できます。\n⚠️ 各施設ごとに120,000 VNDを支払う必要はありません！\n\n🚣‍♂️ 【花灯籠ボート乗船料】\n・公定料金：150,000〜200,000 VND / 舟（約20分、1〜4人まで同料金）\n・灯籠代：1個 20,000〜30,000 VND\n✅ 川沿いの公営乗り場（Vé đi thuyền）のチケット窓口で購入してください。客引きでの交渉は高く言われることがあります。` },
  },
  {
    id: 'water',
    icon: <Droplets size={20} className="text-[#3d6b63]" />,
    title: 'お水について',
    displayTitle: 'お水はどうする？',
    desc: '水道水は飲めません。必ずペットボトルを。',
    color: '#3d6b63', bg: '#faf8f3', border: '#e8e0d0',
    detail: { body: `ベトナムの水道水は飲料に適していません。\n\n✅ コンビニ・スーパーで500mlボトルが約5,000 VND（約30円）\n✅ おすすめブランド：Aquafina、Dasani、LaVie\n\n⚠️ 氷もお店によっては注意が必要。観光客向けレストランは問題ない場合が多いです。` },
  },
  {
    id: 'receipt',
    icon: <Receipt size={20} className="text-[#3d6b63]" />,
    title: '領収書・レシート',
    displayTitle: 'お店での支払いについて',
    desc: '小さな店では領収書が出ないことも。価格確認を先に。',
    color: '#3d6b63', bg: '#faf8f3', border: '#e8e0d0',
    detail: { body: `ベトナムでは小規模な飲食店・露店ではレシートが出ない場合があります。\n\n✅ 注文前に料金を確認する習慣をつけましょう\n✅ メニューの値段と請求額が違う場合は、丁寧に確認しましょう\n✅ スーパー・コンビニ・観光施設は基本的にレシートあり\n\n💡 「Bao nhiêu tiền?（バオ ニエウ ティエン）= いくらですか？」を活用しましょう。` },
  },
  {
    id: 'weather',
    icon: <Thermometer size={20} className="text-[#c8741a]" />,
    title: '気候・服装',
    displayTitle: 'ホイアンの気候と服装',
    desc: '暑い！日焼け止めと帽子を持ちましょう。',
    color: '#c8741a', bg: '#faf8f3', border: '#e8e0d0',
    detail: { body: `ホイアン・ダナンは年間を通じて暑い気候です。\n\n🌞 乾季（2月〜8月）：晴れが多く観光しやすい。気温30〜35℃\n🌧️ 雨季（9月〜1月）：雨が多く、台風シーズンも。洪水注意\n\n✅ 日焼け止め（SPF50以上）必須\n✅ 軽い羽織りもの（寺院参拝で必要な場合も）\n✅ 水分補給をこまめに！` },
  },
  {
    id: 'bike',
    icon: <Bike size={20} className="text-[#c8741a]" />,
    title: 'バイクタクシー',
    displayTitle: 'バイクタクシーを使うなら',
    desc: 'Grabバイクは安くて便利。ヘルメット着用を忘れずに。',
    color: '#c8741a', bg: '#faf8f3', border: '#e8e0d0',
    detail: { body: `Grabバイクはアプリで呼ぶバイクタクシーです。\n\n✅ 料金が事前に確定するので安心\n✅ 市内短距離なら20,000〜40,000 VND程度\n✅ ヘルメットはドライバーが用意してくれます\n\n⚠️ 夜間や雨の日は車（GreenSM / Grab Car）がより安全です。` },
  },
]

// ─── Japanese Travel Note Modal ──────────────────────────────
function TipModal({ tip, onClose }: { tip: TipItem; onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-4 sm:p-6 overscroll-none" onClick={onClose}>
      <div className="absolute inset-0 bg-[#1a1208]/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#faf8f3] border border-[#e8e0d0] rounded-3xl shadow-2xl w-full max-w-md max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.22s ease both' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#faf8f3]/95 backdrop-blur-sm flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#e8e0d0] z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#f5f1ea] border border-[#e8e0d0]">
              {tip.icon}
            </div>
            <div>
              <span className="font-sans text-[10px] font-medium text-[#c8741a] uppercase tracking-wider">TRAVEL NOTE</span>
              <h3 className="font-serif text-lg font-normal text-[#1a1208] leading-snug">{tip.displayTitle}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f1ea] flex items-center justify-center hover:bg-[#e8e0d0] transition-colors border border-[#e8e0d0] cursor-pointer"
          >
            <X size={16} className="text-[#1a1208]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 font-sans space-y-4">
          <div className="text-xs sm:text-sm font-light text-[#7a6447] leading-relaxed whitespace-pre-line bg-[#fffdf9] p-4 rounded-2xl border border-[#e8e0d0]">
            {tip.detail.body}
          </div>

          {tip.id === 'exchange' && (
            <div className="mt-4 pt-2 border-t border-[#e8e0d0]">
              <div className="font-serif text-xs font-medium text-[#1a1208] mb-2 flex items-center gap-1">
                <Sparkles size={13} className="text-[#c8741a]" /> リアルタイム為替計算機
              </div>
              <CurrencyConverter />
            </div>
          )}

          {tip.detail.links && (
            <div className="mt-4 space-y-2.5">
              {tip.detail.links.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full rounded-full px-5 py-3 text-xs font-medium text-white transition-all bg-[#c8741a] hover:bg-[#a85e12] shadow-2xs"
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    <span className="flex-1">{link.label}</span>
                    <ExternalLink size={14} className="opacity-80" />
                  </a>
                  {link.placeholder && (
                    <p className="text-[11px] text-[#c8741a] mt-1 px-2 font-light">📌 {link.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Main ChuiPage Component ─────────────────────────────────
export default function ChuiPage({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const [activeTip, setActiveTip] = useState<TipItem | null>(null)
  const [showConverterModal, setShowConverterModal] = useState(false)

  // Map tip items by ID for easy access
  const tipMap = tips.reduce((acc, tip) => {
    acc[tip.id] = tip
    return acc
  }, {} as Record<string, TipItem>)

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 py-4 sm:py-8 font-sans pb-28 sm:pb-16">
      {/* ── Warm White Magazine Page Sheet Container ── */}
      <div className="bg-[#faf8f3] border border-[#e8e0d0] shadow-xl rounded-3xl p-6 sm:p-10 space-y-10 sm:space-y-14 text-[#1a1208]">

        {/* ── 1. HERO SECTION (Japanese Travel Guidebook Chapter Opening) ── */}
        <div className="relative text-center sm:text-left py-4 sm:py-6 border-b border-[#e8e0d0]/60 pb-8 sm:pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f1ea] border border-[#e8e0d0] text-[#c8741a] font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-3">
            <Compass size={13} className="text-[#c8741a]" /> HOI AN TRAVEL TIPS
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1208] leading-tight tracking-tight">
            ホイアンを安心して楽しむために
          </h1>
          <p className="font-sans text-sm sm:text-base font-light text-[#7a6447] mt-3 max-w-2xl leading-relaxed">
            旅の前に知っておきたい、小さなヒント。現地のローカルルールや移動のコツをチェックして、安心で心地よいホイアン滞在を楽しみましょう。
          </p>
        </div>

        {/* ── 2. SECTION: 到着したら、まずこれ (Airport & Arrival Setup) ── */}
        <section className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c8741a]" />
              <span className="font-sans text-xs font-medium text-[#c8741a] uppercase tracking-wider">STEP 1</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1208] mt-1">
              到着したら、まずこれ
            </h2>
            <p className="font-sans text-xs font-light text-[#7a6447] mt-1">
              空港到着から両替、SIMカードの準備まで。スムーズなスタートを切るためのポイント。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SIM & eSIM */}
            {tipMap.sim && (
              <div
                onClick={() => setActiveTip(tipMap.sim)}
                className="bg-white border border-[#e8e0d0] hover:border-[#c8741a] rounded-2xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center">
                      {tipMap.sim.icon}
                    </div>
                    <span className="text-[11px] font-sans font-medium text-[#c8741a] bg-[#f5f1ea] px-2.5 py-0.5 rounded-full border border-[#e8e0d0]">
                      ネット環境
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-[#1a1208]">{tipMap.sim.displayTitle}</h3>
                  <p className="font-sans text-xs font-light text-[#7a6447] mt-1 leading-relaxed">{tipMap.sim.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e8e0d0]/60 flex items-center justify-between text-xs font-sans text-[#c8741a] font-medium">
                  <span>詳細とオンライン購入</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}

            {/* Exchange & Currency Converter Preview */}
            {tipMap.exchange && (
              <div
                onClick={() => setActiveTip(tipMap.exchange)}
                className="bg-white border border-[#e8e0d0] hover:border-[#3d6b63] rounded-2xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center">
                      {tipMap.exchange.icon}
                    </div>
                    <span className="text-[11px] font-sans font-medium text-[#3d6b63] bg-[#f5f1ea] px-2.5 py-0.5 rounded-full border border-[#e8e0d0]">
                      両替・為替
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-[#1a1208]">{tipMap.exchange.displayTitle}</h3>
                  <p className="font-sans text-xs font-light text-[#7a6447] mt-1 leading-relaxed">{tipMap.exchange.desc}</p>
                </div>

                {/* Small Currency Converter Inline Preview */}
                <div className="mt-4 pt-3 border-t border-[#e8e0d0]/60 flex items-center justify-between">
                  <div className="font-sans text-xs font-medium text-[#1a1208] bg-[#f5f1ea] px-3 py-1.5 rounded-xl border border-[#e8e0d0]">
                    100,000 VND ≈ <span className="text-[#c8741a]">約 600 円</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowConverterModal(true)
                    }}
                    className="font-sans text-xs font-medium text-[#3d6b63] hover:underline flex items-center gap-1"
                  >
                    為替計算機 <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── 3. SECTION: 移動は、安心できる方法を選ぼう (Taxi & GreenSM Feature) ── */}
        <section className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3d6b63]" />
              <span className="font-sans text-xs font-medium text-[#3d6b63] uppercase tracking-wider">STEP 2</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1208] mt-1">
              移動は、安心できる方法を選ぼう
            </h2>
            <p className="font-sans text-xs font-light text-[#7a6447] mt-1">
              空港からホイアンまで、移動は事前に決めておくと安心です。
            </p>
          </div>

          {/* GreenSM Prominent Feature Block */}
          <div className="bg-white border-2 border-[#3d6b63]/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#3d6b63] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Leaf size={22} />
                </div>
                <div>
                  <span className="font-sans text-[10px] font-medium text-[#3d6b63] uppercase tracking-widest bg-[#3d6b63]/10 px-2.5 py-0.5 rounded-full border border-[#3d6b63]/20">
                    RECOMMENDED LOCAL TOOL
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1208] mt-1">
                    移動に迷ったら、GreenSM
                  </h3>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onNavigate('greensm')}
                className="px-5 py-2.5 rounded-full font-sans font-medium text-white text-xs tracking-wider transition-all bg-[#3d6b63] hover:bg-[#2d524c] flex items-center gap-2 shadow-2xs cursor-pointer ml-auto"
              >
                GreenSMアプリの使い方を見る <ChevronRight size={15} />
              </button>
            </div>

            <p className="font-sans text-xs sm:text-sm font-light text-[#7a6447] leading-relaxed mt-4">
              ダナン空港からの移動やホイアン市内の移動には、静かで清潔なEV（電気自動車）タクシー「GreenSM」が最もおすすめです。ぼったくりの心配がなく、アプリで簡単に手配できます。
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              {[
                { title: '料金が明確', desc: '乗車前にアプリで確定料金がわかるので安心です' },
                { title: 'EVで快適', desc: '新車で静か。排気ガスもなく快適な車内です' },
                { title: 'アプリで簡単', desc: '目的地を入力するだけで言葉の心配も不要です' },
              ].map((b) => (
                <div key={b.title} className="bg-[#f5f1ea] border border-[#e8e0d0] rounded-xl p-3.5 flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-[#3d6b63] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-serif text-xs font-medium text-[#1a1208]">{b.title}</div>
                    <div className="font-sans text-[11px] font-light text-[#7a6447] mt-0.5">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. SECTION: ホイアンの街を歩く (Walking Old Town) ── */}
        <section className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c8741a]" />
              <span className="font-sans text-xs font-medium text-[#c8741a] uppercase tracking-wider">STEP 3</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1208] mt-1">
              ホイアンの街を歩く
            </h2>
            <p className="font-sans text-xs font-light text-[#7a6447] mt-1">
              旧市街の歩行者天国や観光チケット、ボート乗船料について。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pedestrian Zone Feature Card */}
            {tipMap.pedestrian && (
              <div
                onClick={() => setActiveTip(tipMap.pedestrian)}
                className="bg-white border border-[#e8e0d0] hover:border-[#c8741a] rounded-2xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#c8741a]">
                      <span className="text-xl">🏮</span>
                      <span className="font-sans text-xs font-medium">旧市街を散策する時間</span>
                    </div>
                    <span className="text-[10px] font-sans font-medium text-[#c8741a] bg-[#f5f1ea] px-2.5 py-0.5 rounded-full border border-[#e8e0d0]">
                      歩行者天国
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1a1208]">{tipMap.pedestrian.displayTitle}</h3>
                  <p className="font-sans text-xs font-light text-[#7a6447] mt-1 leading-relaxed">
                    旧市街は時間帯によって車両・バイク進入禁止の歩行者天国になります。静かに散策できるおすすめの時間帯です。
                  </p>

                  {/* Time Badge Highlight */}
                  <div className="mt-4 bg-[#f5f1ea] border border-[#c8741a]/30 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-[#c8741a]" />
                      <span className="font-sans text-xs font-medium text-[#1a1208]">午後の部（ベストタイム）</span>
                    </div>
                    <span className="font-serif text-sm font-medium text-[#c8741a]">15:00 — 21:30</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e8e0d0]/60 flex items-center justify-between text-xs font-sans text-[#c8741a] font-medium">
                  <span>詳細ルールを見る</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}

            {/* Ticket & Boat Pricing Card */}
            {tipMap.tickets && (
              <div
                onClick={() => setActiveTip(tipMap.tickets)}
                className="bg-white border border-[#e8e0d0] hover:border-[#c8741a] rounded-2xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center">
                      <Ticket size={20} className="text-[#c8741a]" />
                    </div>
                    <span className="text-[10px] font-sans font-medium text-[#c8741a] bg-[#f5f1ea] px-2.5 py-0.5 rounded-full border border-[#e8e0d0]">
                      公定料金
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1a1208]">{tipMap.tickets.displayTitle}</h3>
                  <p className="font-sans text-xs font-light text-[#7a6447] mt-1 leading-relaxed">
                    旧市街の共通入場チケット（120,000 VND）と川沿いボートの公定料金ガイド。
                  </p>

                  <div className="mt-4 space-y-2 font-sans text-xs text-[#7a6447]">
                    <div className="bg-[#f5f1ea] p-2.5 rounded-xl border border-[#e8e0d0] flex items-center justify-between">
                      <span>🎟️ 旧市街共通チケット</span>
                      <strong className="text-[#1a1208] font-medium">120,000 VND / 5施設</strong>
                    </div>
                    <div className="bg-[#f5f1ea] p-2.5 rounded-xl border border-[#e8e0d0] flex items-center justify-between">
                      <span>🚣‍♂️ 花灯籠ボート乗船料</span>
                      <strong className="text-[#1a1208] font-medium">150k〜200k VND / 舟</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e8e0d0]/60 flex items-center justify-between text-xs font-sans text-[#c8741a] font-medium">
                  <span>公式ルールと注意事項</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── 5. SECTION: 食べる・買うときに知っておきたいこと (Food & Payments) ── */}
        <section className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8b5e3c]" />
              <span className="font-sans text-xs font-medium text-[#8b5e3c] uppercase tracking-wider">STEP 4</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1208] mt-1">
              食べる・買うときに知っておきたいこと
            </h2>
            <p className="font-sans text-xs font-light text-[#7a6447] mt-1">
              お水やお店での支払いのコツ。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Water */}
            {tipMap.water && (
              <div
                onClick={() => setActiveTip(tipMap.water)}
                className="bg-white border border-[#e8e0d0] hover:border-[#3d6b63] rounded-2xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer group flex items-start justify-between gap-3 shadow-2xs"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center flex-shrink-0">
                      {tipMap.water.icon}
                    </div>
                    <h3 className="font-serif text-base font-normal text-[#1a1208]">{tipMap.water.displayTitle}</h3>
                  </div>
                  <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{tipMap.water.desc}</p>
                </div>
                <ChevronRight size={16} className="text-[#7a6447] group-hover:text-[#3d6b63] group-hover:translate-x-0.5 transition-all mt-2" />
              </div>
            )}

            {/* Receipt */}
            {tipMap.receipt && (
              <div
                onClick={() => setActiveTip(tipMap.receipt)}
                className="bg-white border border-[#e8e0d0] hover:border-[#3d6b63] rounded-2xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer group flex items-start justify-between gap-3 shadow-2xs"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center flex-shrink-0">
                      {tipMap.receipt.icon}
                    </div>
                    <h3 className="font-serif text-base font-normal text-[#1a1208]">{tipMap.receipt.displayTitle}</h3>
                  </div>
                  <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{tipMap.receipt.desc}</p>
                </div>
                <ChevronRight size={16} className="text-[#7a6447] group-hover:text-[#3d6b63] group-hover:translate-x-0.5 transition-all mt-2" />
              </div>
            )}
          </div>
        </section>

        {/* ── 6. SECTION: ベトナムでの支払い、どうする？ (VNPay & Cash) ── */}
        <section className="bg-[#1e1408] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg border border-[#c8741a]/30">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="font-sans text-[10px] text-[#c8741a] tracking-[0.22em] uppercase font-medium mb-1">PAYMENT FLOW</div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white flex items-center gap-2">
                <CreditCard size={24} className="text-[#c8741a]" /> ベトナムでの支払い、どうする？
              </h2>
              <p className="font-sans text-xs font-light text-white/70 mt-1">
                QR決済も便利。でも、現金も少し準備しておくと安心です。
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {['外国人OK', 'VISA', 'Mastercard', 'QRコード'].map((tag) => (
                <span key={tag} className="font-sans text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Travel Flow Timeline (Not SaaS cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            {[
              { step: '01', title: '日本で準備', body: 'App Store / Google Play で「VNPay」をダウンロードし、VISA/Mastercardを登録。' },
              { step: '02', title: '現地で使う', body: 'お店のQRコードをアプリでスキャンしてスマートにお支払い。' },
              { step: '03', title: '支払い完了', body: '現金を出さずにお会計が完了。暗い場所でも小銭の心配なし。' },
            ].map((s) => (
              <div key={s.step} className="bg-white/5 border border-white/10 rounded-2xl p-4 relative">
                <div className="font-serif text-[#c8741a] text-sm font-medium mb-1">{s.step}. {s.title}</div>
                <p className="font-sans text-xs font-light text-white/70 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            <a
              href="https://danangfantasticity.com/en/discovery/how-to-use-the-vnpay-app-for-international-visitors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs font-medium text-white bg-[#c8741a] hover:bg-[#a85e12] transition-colors"
            >
              <BookOpen size={14} /> 外国人向けVNPay使い方ガイド <ExternalLink size={12} />
            </a>

            {/* Cash Tip Callout */}
            <div className="bg-[#c8741a]/20 border border-[#c8741a]/40 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-sans text-amber-200">
              <Lightbulb size={16} className="text-[#c8741a] flex-shrink-0" />
              <span><strong>💡 現金も少し持っておこう</strong>（屋台や露店用に10,000〜50,000 VNDの紙幣を準備）</span>
            </div>
          </div>
        </section>

        {/* ── 7. SECTION: 旅の小さなヒント (Comfort & Extras) ── */}
        <section className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3d6b63]" />
              <span className="font-sans text-xs font-medium text-[#3d6b63] uppercase tracking-wider">STEP 5</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1208] mt-1">
              旅の小さなヒント
            </h2>
            <p className="font-sans text-xs font-light text-[#7a6447] mt-1">
              気候に応じた服装とバイクタクシーの使いこなし。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weather */}
            {tipMap.weather && (
              <div
                onClick={() => setActiveTip(tipMap.weather)}
                className="bg-white border border-[#e8e0d0] hover:border-[#c8741a] rounded-2xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer group flex items-start justify-between gap-3 shadow-2xs"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center flex-shrink-0">
                      {tipMap.weather.icon}
                    </div>
                    <h3 className="font-serif text-base font-normal text-[#1a1208]">{tipMap.weather.displayTitle}</h3>
                  </div>
                  <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{tipMap.weather.desc}</p>
                </div>
                <ChevronRight size={16} className="text-[#7a6447] group-hover:text-[#c8741a] group-hover:translate-x-0.5 transition-all mt-2" />
              </div>
            )}

            {/* Bike Taxi */}
            {tipMap.bike && (
              <div
                onClick={() => setActiveTip(tipMap.bike)}
                className="bg-white border border-[#e8e0d0] hover:border-[#c8741a] rounded-2xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer group flex items-start justify-between gap-3 shadow-2xs"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center flex-shrink-0">
                      {tipMap.bike.icon}
                    </div>
                    <h3 className="font-serif text-base font-normal text-[#1a1208]">{tipMap.bike.displayTitle}</h3>
                  </div>
                  <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{tipMap.bike.desc}</p>
                </div>
                <ChevronRight size={16} className="text-[#7a6447] group-hover:text-[#c8741a] group-hover:translate-x-0.5 transition-all mt-2" />
              </div>
            )}
          </div>
        </section>

      </div>

      {/* ── Active Tip Detail Modal ── */}
      {activeTip && <TipModal tip={activeTip} onClose={() => setActiveTip(null)} />}

      {/* ── Currency Converter Modal Triggered From Exchange Card ── */}
      {showConverterModal && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#1a1208]/70 backdrop-blur-sm overscroll-none"
          onClick={() => setShowConverterModal(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <CurrencyConverter onClose={() => setShowConverterModal(false)} />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
