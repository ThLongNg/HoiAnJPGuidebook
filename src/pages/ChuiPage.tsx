import { useState } from 'react'
import { Car, CheckCircle2, Sparkles, X, ExternalLink, ChevronRight, CreditCard, AlertTriangle, Smartphone } from 'lucide-react'
import { type Tab, sky } from '@/types'
import { SectionHeading, Card } from '@/components/Atoms'

// ─── Tip data with popup content ──────────────────────────────
type TipLink = { label: string; icon: string; url: string; placeholder?: boolean; note?: string }
type TipDetail = { body: string; links?: TipLink[] }

const tips: { icon: string; title: string; desc: string; detail: TipDetail }[] = [
  {
    icon: '💵',
    title: '両替について',
    desc: '空港の両替は高め。市内の両替所の方がレートが良いです。',
    detail: {
      body: `空港の両替レートは市内より5〜10%悪いことが多いです。\n\n✅ おすすめは市内の両替所（ホイアン旧市街周辺に多数あり）\n✅ ATMでキャッシュ引き出しも可（手数料に注意）\n\n⚠️ 「いくらで両替してくれるの？」と複数店舗で確認してから両替しましょう。`,
    },
  },
  {
    icon: '🛵',
    title: 'バイクタクシー',
    desc: 'Grabバイクは安くて便利。ヘルメット着用を忘れずに。',
    detail: {
      body: `Grabバイクはアプリで呼ぶバイクタクシーです。\n\n✅ 料金が事前に確定するので安心\n✅ 市内短距離なら20,000〜40,000 VND程度\n✅ ヘルメットはドライバーが用意してくれます\n\n⚠️ 夜間や雨の日は車（GreenSM / Grab Car）がより安全です。`,
    },
  },
  {
    icon: '💧',
    title: 'お水について',
    desc: '水道水は飲めません。必ずペットボトルのお水を。',
    detail: {
      body: `ベトナムの水道水は飲料に適していません。\n\n✅ コンビニ・スーパーで500mlボトルが約5,000 VND（約30円）\n✅ ホテルに無料の水が置いてある場合も\n✅ おすすめブランド：Aquafina、Dasani、LaVie\n\n⚠️ 氷もお店によっては注意が必要。観光客向けレストランは問題ない場合が多いです。`,
    },
  },
  {
    icon: '🌡️',
    title: '気候',
    desc: '暑いです！日焼け止めと帽子を持ちましょう。',
    detail: {
      body: `ホイアン・ダナンは年間を通じて暑い気候です。\n\n🌞 乾季（2月〜8月）：晴れが多く観光しやすい。気温30〜35℃\n🌧️ 雨季（9月〜1月）：雨が多く、台風シーズンも。洪水注意\n\n✅ 日焼け止め（SPF50以上）必須\n✅ 軽い羽織りもの（寺院参拝で必要な場合も）\n✅ 水分補給をこまめに！`,
    },
  },
  {
    icon: '📱',
    title: 'SIMカード',
    desc: '空港でSIMカードを購入できます。通信は安くて速いです。',
    detail: {
      body: `ベトナムのSIMカードは非常に安くて高速です（4G/5G）。\n\n✅ 空港到着ホールで購入可能（Viettel / Vinaphone / Mobifone）\n✅ 10日間プラン：約150,000〜200,000 VND（約1,000円）\n✅ 事前にオンラインで購入するとスムーズ！\n\n📦 オンライン購入はこちら：`,
      links: [
        {
          label: 'Klook でSIM購入',
          icon: '🛒',
          // TODO: ここにKlookのアフィリエイトリンクを追加してください
          url: 'https://s.klook.com/c/my4bVPpgwO',
          placeholder: true,
          note: 'Klookアフィリエイトリンクをここに設定',
        },
        {
          label: 'Trip.com でSIM購入',
          icon: '✈️',
          // TODO: ここにTrip.comのアフィリエイトリンクを追加してください
          url: 'https://jp.trip.com/things-to-do/detail/45861197?locale=ja-JP&curr=JPY',
          placeholder: true,
          note: 'Trip.comアフィリエイトリンクをここに設定',
        },
      ],
    },
  },
]

// ─── Tip Popup Modal ──────────────────────────────────────────
function TipModal({
  tip,
  onClose,
}: {
  tip: typeof tips[0]
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Sheet */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.25s ease both' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between px-6 pt-6 pb-4 border-b border-sky-50">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{tip.icon}</span>
            <span className="font-bold text-slate-800 text-lg">{tip.title}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors flex-shrink-0"
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {tip.detail.body}
          </div>

          {/* Links (SIM card etc.) */}
          {tip.detail.links && (
            <div className="mt-5 space-y-3">
              {tip.detail.links.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all hover:shadow-md active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})`,
                      color: 'white',
                    }}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="flex-1">{link.label}</span>
                    <ExternalLink size={14} className="opacity-70" />
                  </a>
                  {link.placeholder && (
                    <p className="text-xs text-amber-600 mt-1 px-1 flex items-center gap-1">
                      <span>📌</span>
                      {/* TODO コメント — リンク設定用 */}
                      <span className="text-amber-500">{link.note}</span>
                    </p>
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
    <div>
      <SectionHeading sub="旅をより安全・快適にするために">⚠️ ベトナム到着後の注意</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Taxi warning */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-red-100" style={{ backgroundColor: '#fff1f2' }}>
            <div className="flex items-center gap-2">
              <Car size={18} className="text-red-500" />
              <span className="font-bold text-red-700">タクシーに注意</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              空港では客引きのタクシーが多くいます。料金が高かったり、サービスが良くない場合もあるため、利用はおすすめしません。
            </p>
            <div className="rounded-2xl p-5 border" style={{ backgroundColor: sky[50], borderColor: sky[200] }}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} style={{ color: sky[500] }} />
                <span className="font-bold text-sm" style={{ color: sky[600] }}>GreenSM がおすすめ</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
                {['料金が明確', '比較的安い', '運転が丁寧', '車が新しい'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: sky[400] }} />
                    {item}
                  </div>
                ))}
              </div>
              {/* 詳しく見る button */}
              <button
                onClick={() => onNavigate('greensm')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-md active:scale-95"
                style={{ background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})`, color: 'white' }}
              >
                アプリの使い方を見る <ChevronRight size={15} />
              </button>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-slate-600">アプリについて</p>
              {['日本の電話番号でも登録可能', '英語表示あり'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={14} style={{ color: sky[500] }} />
                  {item}
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-sm text-amber-800 leading-relaxed">
                もし操作が分からなければ、いつでも私に聞いてください。😊
              </p>
            </div>
          </div>
        </Card>

        {/* General tips — clickable */}
        <Card className="p-6">
          <div className="font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Sparkles size={16} style={{ color: sky[500] }} />
            その他の注意事項
          </div>
          <p className="text-xs text-slate-400 mb-4">各項目をタップすると詳細が表示されます</p>
          <div className="space-y-1">
            {tips.map((tip) => (
              <button
                key={tip.title}
                onClick={() => setActiveTip(tip)}
                className="w-full flex items-center gap-4 py-3.5 px-3 rounded-xl border border-transparent hover:bg-sky-50 hover:border-sky-100 transition-all text-left group"
              >
                <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">{tip.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5 leading-relaxed truncate">{tip.desc}</div>
                </div>
                <ChevronRight
                  size={16}
                  className="flex-shrink-0 text-slate-300 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all"
                />
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── VNPay / Cashless Section ─────────────────────────── */}
      <div className="mt-6">
        <Card className="overflow-hidden">
          {/* Header */}
          <div
            className="px-6 py-5 flex items-center gap-4"
            style={{ background: `linear-gradient(135deg, #7c3aed, #a78bfa)` }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <CreditCard size={22} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-base leading-tight">💳 キャッシュレス決済</div>
              <div className="text-white/70 text-xs mt-0.5">QRコードで支払いたい方へ — VNPay</div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Intro */}
            <p className="text-sm text-slate-700 leading-relaxed">
              ベトナムのQR決済アプリ <strong>VNPay</strong> は外国人でも利用できます。
              ベトナム国内の多くの飲食店・コンビニ・観光施設で使えます。
            </p>

            {/* VNPay Steps */}
            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone size={16} className="text-purple-600" />
                <span className="font-bold text-purple-700 text-sm">VNPay の始め方</span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    step: '①',
                    title: 'アプリをダウンロード',
                    body: 'App Store / Google Play で「VNPay」を検索してインストール。',
                  },
                  {
                    step: '②',
                    title: '日本でカードを登録（重要！）',
                    body: '日本の電話番号でアカウント作成し、自国で登録済みのVISA / Mastercardを追加してください。',
                  },
                  {
                    step: '③',
                    title: 'ベトナムではそのまま使える',
                    body: 'QRコードをスキャンするだけで支払い完了。現地でのSIM・OTP不要。',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <span className="font-bold text-purple-500 text-sm flex-shrink-0 mt-0.5">{s.step}</span>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{s.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700 leading-relaxed">
                <span className="font-bold">⚠️ 重要：</span>ベトナムに着いてからの登録は難しい場合があります。
                現地でSIMが繋がるまでの間、日本の番号にOTPが届かないことがあります。
                <strong> 必ず日本出発前に登録・カード追加を完了させてください。</strong>
              </div>
            </div>

            {/* Download buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://apps.apple.com/jp/app/vnpay/id917023721"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white rounded-xl px-4 py-3 text-xs font-semibold hover:opacity-80 transition-opacity justify-center"
              >
                <span className="text-base">🍎</span> App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.vnpay.hdbank"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-800 text-white rounded-xl px-4 py-3 text-xs font-semibold hover:opacity-80 transition-opacity justify-center"
              >
                <span className="text-base">🤖</span> Google Play
              </a>
            </div>

            {/* Cash reminder */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-xs text-amber-800 leading-relaxed">
                💡 <strong>現金も必要！</strong> 市場・屋台・小さなお店は現金のみの場合が多いです。
                小額紙幣（5,000〜20,000 VND）を多めに持っておくと便利です。
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tip Modal */}
      {activeTip && <TipModal tip={activeTip} onClose={() => setActiveTip(null)} />}
    </div>
  )
}
