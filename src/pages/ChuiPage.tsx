import { useState } from 'react'
import {
  Car, CheckCircle2, Sparkles, X, ExternalLink, ChevronRight,
  CreditCard, AlertTriangle, ShieldAlert, Banknote, Bike, Droplets,
  Thermometer, Smartphone, Receipt, Leaf, Plane, BookOpen, Lightbulb,
  Bot, Apple,
} from 'lucide-react'
import { type Tab, sky } from '@/types'
import { SectionHeading, Card } from '@/components/Atoms'
import CurrencyConverter from '@/components/CurrencyConverter'

// ─── Tip data with Lucide Icons ──────────────────────────────
type TipLink = { label: string; icon: React.ReactNode; url: string; placeholder?: boolean; note?: string }
type TipDetail = { body: string; links?: TipLink[] }

const tips: {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
  bg: string
  border: string
  detail: TipDetail
}[] = [
    {
      icon: <Banknote size={20} className="text-emerald-600" />,
      title: '両替について',
      desc: '空港の両替は高め。市内の両替所がお得。',
      color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
      detail: { body: `空港の両替レートは市内より5〜10%悪いことが多いです。\n\n✅ おすすめは市内の両替所（ホイアン旧市街周辺に多数あり）\n✅ ATMでキャッシュ引き出しも可（手数料に注意）\n\n⚠️ 複数店舗で確認してから両替しましょう。` },
    },
    {
      icon: <Bike size={20} className="text-sky-600" />,
      title: 'バイクタクシー',
      desc: 'Grabバイクは安くて便利。ヘルメット着用を忘れずに。',
      color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd',
      detail: { body: `Grabバイクはアプリで呼ぶバイクタクシーです。\n\n✅ 料金が事前に確定するので安心\n✅ 市内短距離なら20,000〜40,000 VND程度\n✅ ヘルメットはドライバーが用意してくれます\n\n⚠️ 夜間や雨の日は車（GreenSM / Grab Car）がより安全です。` },
    },
    {
      icon: <Droplets size={20} className="text-cyan-600" />,
      title: 'お水について',
      desc: '水道水は飲めません。必ずペットボトルを。',
      color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc',
      detail: { body: `ベトナムの水道水は飲料に適していません。\n\n✅ コンビニ・スーパーで500mlボトルが約5,000 VND（約30円）\n✅ おすすめブランド：Aquafina、Dasani、LaVie\n\n⚠️ 氷もお店によっては注意が必要。観光客向けレストランは問題ない場合が多いです。` },
    },
    {
      icon: <Thermometer size={20} className="text-amber-600" />,
      title: '気候・服装',
      desc: '暑い！日焼け止めと帽子を持ちましょう。',
      color: '#d97706', bg: '#fffbeb', border: '#fde68a',
      detail: { body: `ホイアン・ダナンは年間を通じて暑い気候です。\n\n🌞 乾季（2月〜8月）：晴れが多く観光しやすい。気温30〜35℃\n🌧️ 雨季（9月〜1月）：雨が多く、台風シーズンも。洪水注意\n\n✅ 日焼け止め（SPF50以上）必須\n✅ 軽い羽織りもの（寺院参拝で必要な場合も）\n✅ 水分補給をこまめに！` },
    },
    {
      icon: <Smartphone size={20} className="text-purple-600" />,
      title: 'SIMカード',
      desc: '空港で購入可。10日間で約1,000円とお手頃。',
      color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe',
      detail: {
        body: `ベトナムのSIMカードは非常に安くて高速です（4G/5G）。\n\n✅ 空港到着ホールで購入可能（Viettel / Vinaphone / Mobifone）\n✅ 10日間プラン：約150,000〜200,000 VND（約1,000円）\n✅ 事前にオンラインで購入するとスムーズ！\n\n📦 オンライン購入はこちら：`,
        links: [
          { label: 'Klook でSIM購入', icon: <Smartphone size={18} />, url: 'https://s.klook.com/c/my4bVPpgwO', placeholder: true, note: 'Klookアフィリエイトリンクをここに設定' },
          { label: 'Trip.com でSIM購入', icon: <Plane size={18} />, url: 'https://jp.trip.com/things-to-do/detail/45861197?locale=ja-JP&curr=JPY', placeholder: true, note: 'Trip.comアフィリエイトリンクをここに設定' },
        ],
      },
    },
    {
      icon: <Receipt size={20} className="text-teal-600" />,
      title: '領収書・レシート',
      desc: '小さな店では領収書が出ないことも。価格確認を先に。',
      color: '#0f766e', bg: '#f0fdfa', border: '#99f6e4',
      detail: { body: `ベトナムでは小規模な飲食店・露店ではレシートが出ない場合があります。\n\n✅ 注文前に料金を確認する習慣をつけましょう\n✅ メニューの値段と請求額が違う場合は、丁寧に確認しましょう\n✅ スーパー・コンビニ・観光施設は基本的にレシートあり\n\n💡 「Bao nhiêu tiền?（バオ ニエウ ティエン）= いくらですか？」を活用しましょう。` },
    },
    {
      icon: <Bike size={20} className="text-[#d97706]" />,
      title: '歩行者天国の時間帯',
      desc: '毎日15:00〜21:30は旧市街全域でバイク進入禁止！',
      color: '#b45309', bg: '#fffbeb', border: '#fef08a',
      detail: { body: `ホイアン旧市街は時間帯によって車両・バイクの進入が禁止（歩行者天国）になります。\n\n🚶‍♂️ 【禁止時間帯】\n・午後の部：15:00 〜 21:30（最もおすすめの散策時間！）\n・朝の部：09:00 〜 11:00\n\n✅ 車やバイクの騒音がなく、写真撮影や徒歩での観光にベストな時間帯です。\n⚠️ この時間帯はタクシーやGrabも旧市街中心部に入れません。周辺の降車ポイントを利用しましょう。` },
    },
    {
      icon: <Banknote size={20} className="text-rose-600" />,
      title: 'チケット＆ボート定額料金',
      desc: '旧市街共通チケット(120k)とボート公定料金の注意点。',
      color: '#be123c', bg: '#fff1f2', border: '#fecdd3',
      detail: { body: `ぼったくりを防ぐための公式料金ガイドです。\n\n🎟️ 【旧市街共通チケット】\n・料金：120,000 VND / 1枚\n・ルール：1枚のチケットで「好きな5つの有料施設（日本橋・タンキー古民家・福建会館など）」に入場できます。\n⚠️ 各施設ごとに120,000 VNDを支払う必要はありません！\n\n🚣‍♂️ 【花灯籠ボート乗船料】\n・公定料金：150,000〜200,000 VND / 舟（約20分、1〜4人まで同料金）\n・灯籠代：1個 20,000〜30,000 VND\n✅ 川沿いの公営乗り場（Vé đi thuyền）のチケット窓口で購入してください。客引きでの交渉は高く言われることがあります。` },
    },
  ]

// ─── Tip Popup Modal ──────────────────────────────────────────
function TipModal({ tip, onClose }: { tip: typeof tips[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6 overscroll-none" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.22s ease both' }}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: tip.bg, border: `1.5px solid ${tip.border}` }}>
              {tip.icon}
            </div>
            <span className="font-bold text-slate-800 text-lg">{tip.title}</span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <X size={16} className="text-slate-500" />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{tip.detail.body}</div>
          {tip.title === '両替について' && (
            <div className="mt-4">
              <CurrencyConverter />
            </div>
          )}
          {tip.detail.links && (
            <div className="mt-5 space-y-3">
              {tip.detail.links.map((link) => (
                <div key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all hover:shadow-md active:scale-95"
                    style={{ background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})`, color: 'white' }}>
                    <span className="flex-shrink-0">{link.icon}</span>
                    <span className="flex-1">{link.label}</span>
                    <ExternalLink size={14} className="opacity-70" />
                  </a>
                  {link.placeholder && (
                    <p className="text-xs text-amber-500 mt-1 px-1">📌 {link.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── ChuiPage ─────────────────────────────────────────────────
export default function ChuiPage({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const [activeTip, setActiveTip] = useState<typeof tips[0] | null>(null)

  return (
    <div className="space-y-6">
      <SectionHeading sub="旅をより安全・快適にするために">⚠️ ベトナム到着後の注意</SectionHeading>

      {/* ── Taxi warning ── */}
      <Card className="overflow-hidden border border-slate-100 shadow-sm rounded-3xl p-6 bg-white">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Car size={22} className="text-slate-700" />
            <h3 className="font-bold text-slate-800 text-lg">タクシーに注意</h3>
          </div>
          <span className="bg-red-50 text-red-500 text-xs px-2.5 py-1 rounded-full font-bold border border-red-100 flex items-center gap-1">
            <AlertTriangle size={12} /> 要注意
          </span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed mb-5">
          空港でのぼったくりタクシーや、執拗な客引きには絶対について行かないでください。ベトナムでは、信頼できる配車アプリを利用するのが鉄則です。
        </p>

        {/* GreenSM Box */}
        <div className="rounded-2xl p-5 mb-5 border" style={{ backgroundColor: '#edfcf7', borderColor: '#c4f1e4' }}>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#0f766e] text-white flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
              <Leaf size={16} />
            </div>
            <div>
              <h4 className="font-bold text-[#0f766e] text-sm sm:text-base leading-snug">
                電気タクシー「GreenSM」がおすすめ！
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                ぼったくりの心配がなく、移動がとても快適です。
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#0f766e] flex-shrink-0" />
              <span><strong className="text-[#0f766e]">料金が明確</strong> – アプリで乗車前に確定料金がわかる</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#0f766e] flex-shrink-0" />
              <span><strong className="text-[#0f766e]">比較的安い</strong> – 通常のタクシーと同等かそれ以下</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#0f766e] flex-shrink-0" />
              <span><strong className="text-[#0f766e]">運転が丁寧</strong> – 社員教育されたドライバーで安心</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#0f766e] flex-shrink-0" />
              <span><strong className="text-[#0f766e]">車が新しい</strong> – 静かで清潔な青緑色のEV車両</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onNavigate('greensm')}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-95 active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm"
          style={{ backgroundColor: '#0f766e' }}
        >
          アプリの使い方を見る <ChevronRight size={16} />
        </button>
      </Card>

      {/* ── Tips grid ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={15} style={{ color: sky[500] }} />
          <span className="font-bold text-slate-700 text-sm">その他の注意事項</span>
          <span className="text-xs text-slate-400">（タップで詳細）</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tips.map((tip, i) => (
            <button key={tip.title} onClick={() => setActiveTip(tip)}
              className="anim-up text-left rounded-2xl p-4 border transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 group"
              style={{ animationDelay: `${i * 0.06}s`, backgroundColor: tip.bg, borderColor: tip.border } as React.CSSProperties}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: 'white', border: `1px solid ${tip.border}` }}>
                {tip.icon}
              </div>
              <div className="font-bold text-slate-800 text-sm leading-tight">{tip.title}</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{tip.desc}</div>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: tip.color }}>
                詳細 <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── VNPay / Cashless (Sky Blue Theme - Harmonious with Website) ── */}
      <div
        className="rounded-3xl overflow-hidden shadow-sm border border-sky-100"
        style={{ background: `linear-gradient(135deg, ${sky[600]}, ${sky[400]})` }}
      >
        {/* Top header */}
        <div className="px-6 pt-7 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-white/70 text-xs font-medium tracking-widest uppercase mb-1">Cashless Payment</div>
              <h3 className="text-white font-bold text-xl leading-tight flex items-center gap-2">
                <CreditCard size={20} /> キャッシュレス決済
              </h3>
              <p className="text-white/80 text-xs mt-1.5">VNPay — ベトナムのQR決済アプリ</p>
            </div>
            {/* Card mockup */}
            <div
              className="flex-shrink-0 w-20 h-12 rounded-xl flex items-end justify-end p-1.5"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
            >
              <CreditCard size={18} className="text-white/80" />
            </div>
          </div>

          {/* Tag badges */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {['外国人OK', 'VISA / Mastercard', 'QRコード'].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* White content area */}
        <div className="bg-white mx-0 rounded-t-3xl px-5 pt-6 pb-5 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            ベトナムのQR決済アプリ <strong className="text-slate-800">VNPay</strong> は外国人でも利用できます。
            飲食店・コンビニ・観光施設など幅広く使えます。
          </p>

          {/* Steps */}
          <div className="space-y-3">
            {[
              { step: '01', title: 'アプリをダウンロード', body: 'App Store / Google Play で「VNPay」を検索してインストール。', color: sky[600] },
              { step: '02', title: '日本でカードを登録（重要！）', body: '日本の電話番号でアカウント作成し、VISA / Mastercardを追加。', color: sky[500] },
              { step: '03', title: 'ベトナムでそのまま使える', body: 'QRコードをスキャンするだけで支払い完了。SIM・OTP不要。', color: sky[400] },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 bg-sky-50/60 border border-sky-100 rounded-2xl p-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${sky[400]})` }}
                >
                  {s.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">{s.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Guide link (Foreigner Guide) */}
          <a
            href="https://danangfantasticity.com/en/discovery/how-to-use-the-vnpay-app-for-international-visitors"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full rounded-2xl px-4 py-3.5 transition-all hover:bg-sky-100/60 active:scale-95 border border-sky-200 bg-sky-50"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
              style={{ background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})` }}
            >
              <BookOpen size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 text-sm">外国人向けVNPay使い方ガイド</div>
              <div className="text-xs mt-0.5" style={{ color: sky[500] }}>danangfantasticity.com • 英語</div>
            </div>
            <ExternalLink size={14} style={{ color: sky[400] }} className="flex-shrink-0" />
          </a>

          {/* Warning */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4">
            <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-relaxed">
              <strong>日本出発前に必ず登録を！</strong> ベトナム到着後はOTPが届かず登録できない場合があります。
            </p>
          </div>

          {/* Download buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://apps.apple.com/jp/app/ứng-dụng-vnpay/id1470378562"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold text-white hover:opacity-90 transition-opacity active:scale-95 bg-[#1c1c1e]"
            >
              <Apple size={18} />
              <div className="text-left">
                <div className="text-white/60 text-[10px] leading-none">Download on the</div>
                <div className="text-white text-xs font-bold leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=vnpay.smartacccount&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold text-white hover:opacity-90 transition-opacity active:scale-95"
              style={{ background: `linear-gradient(135deg, ${sky[600]}, ${sky[500]})` }}
            >
              <Bot size={18} />
              <div className="text-left">
                <div className="text-white/60 text-[10px] leading-none">Get it on</div>
                <div className="text-white text-xs font-bold leading-tight">Google Play</div>
              </div>
            </a>
          </div>

          {/* Cash reminder */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-2.5">
            <Lightbulb size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>現金も必要！</strong> 市場・屋台・小さなお店は現金のみの場合が多いです。
              小額紙幣（5,000〜20,000 VND）を多めに持っておきましょう。
            </p>
          </div>
        </div>
      </div>

      {/* Tip Modal */}
      {activeTip && <TipModal tip={activeTip} onClose={() => setActiveTip(null)} />}
    </div>
  )
}
