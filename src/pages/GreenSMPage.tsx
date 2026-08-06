import { ChevronLeft, Download, Smartphone, MapPin, CheckCircle2, Car, AlertTriangle, ExternalLink } from 'lucide-react'
import { type Tab, sky } from '@/types'
import { Card } from '@/components/Atoms'

const steps = [
  {
    num: 1,
    title: 'アプリをダウンロード',
    icon: <Download size={20} />,
    color: sky[500],
    content: (
      <div className="space-y-3">
        <p className="text-sm text-slate-600 leading-relaxed">
          GreenSMアプリをスマートフォンにインストールしてください。
        </p>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://apps.apple.com/app/greensm/id1476167861"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black text-white rounded-xl px-4 py-3 text-xs font-semibold hover:opacity-80 transition-opacity"
          >
            <span className="text-lg">🍎</span>
            <div>
              <div className="text-[10px] text-white/70">App Store</div>
              <div>iOS</div>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=vn.greensm.driver"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800 text-white rounded-xl px-4 py-3 text-xs font-semibold hover:opacity-80 transition-opacity"
          >
            <span className="text-lg">🤖</span>
            <div>
              <div className="text-[10px] text-white/70">Google Play</div>
              <div>Android</div>
            </div>
          </a>
        </div>
      </div>
    ),
  },
  {
    num: 2,
    title: 'アカウント登録',
    icon: <Smartphone size={20} />,
    color: '#8b5cf6',
    content: (
      <div className="space-y-3">
        <p className="text-sm text-slate-600 leading-relaxed">
          日本の電話番号で登録できます。
        </p>
        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
          {[
            { step: '①', text: 'アプリを開いて「Register」をタップ' },
            { step: '②', text: '電話番号を入力（＋81 から始まる日本の番号）' },
            { step: '③', text: 'SMSでOTPコードが届く（日本の番号に届きます）' },
            { step: '④', text: 'コードを入力して登録完了' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="font-bold text-purple-500 flex-shrink-0">{s.step}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
          <p className="text-xs text-amber-700">
            💡 出発前に日本で登録しておくと現地でスムーズです！
          </p>
        </div>
      </div>
    ),
  },
  {
    num: 3,
    title: '車を注文する',
    icon: <Car size={20} />,
    color: '#f59e0b',
    content: (
      <div className="space-y-3">
        <p className="text-sm text-slate-600 leading-relaxed">
          目的地を入力して車を呼びましょう。
        </p>
        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
          {[
            { step: '①', text: '「Book Now」をタップ' },
            { step: '②', text: '乗車場所（現在地）を確認' },
            { step: '③', text: '目的地を英語または地図で入力' },
            { step: '④', text: '料金を確認して「Confirm」' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="font-bold text-amber-500 flex-shrink-0">{s.step}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
          <p className="text-xs text-sky-700">
            💡 車種は <strong>GreenSM Car</strong>（4人乗り）がおすすめです。
          </p>
        </div>
      </div>
    ),
  },
  {
    num: 4,
    title: '乗車・支払い',
    icon: <CheckCircle2 size={20} />,
    color: '#10b981',
    content: (
      <div className="space-y-3">
        <p className="text-sm text-slate-600 leading-relaxed">
          ドライバーが来たら安全を確認してから乗りましょう。
        </p>
        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
          {[
            { step: '①', text: 'アプリでドライバーの車のナンバーを確認' },
            { step: '②', text: '実際の車のナンバーと一致したら乗車' },
            { step: '③', text: '降車時に料金はアプリ表示金額のみ支払う' },
            { step: '④', text: '現金またはアプリ内払いが可能' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="font-bold text-emerald-500 flex-shrink-0">{s.step}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

const fareTable = [
  { route: 'ダナン空港 → ホイアン', fare: '約 350,000 VND', time: '約45分' },
  { route: 'ホイアン旧市街 ↔ ビーチ', fare: '約 50,000 VND', time: '約10分' },
  { route: 'ダナン市内（短距離）', fare: '約 40,000〜80,000 VND', time: '5〜15分' },
]

export default function GreenSMPage({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => onNavigate('chui')}
        className="flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-70 transition-opacity"
        style={{ color: sky[500] }}
      >
        <ChevronLeft size={18} /> 注意事項に戻る
      </button>

      {/* Header */}
      <div
        className="rounded-3xl p-6 mb-8 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${sky[700]}, ${sky[500]})` }}
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
            🚗
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">GreenSM アプリ</h1>
            <p className="text-white/70 text-sm">使い方ガイド</p>
          </div>
        </div>
        <p className="text-white/80 text-sm leading-relaxed">
          GreenSMはベトナムの配車アプリです。日本の電話番号で登録でき、料金が事前にわかるので安心です。
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-8">
        {steps.map((step) => (
          <Card key={step.num} className="overflow-hidden">
            <div className="flex items-center gap-4 px-5 py-4 border-b border-sky-50">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: step.color }}
              >
                {step.icon}
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">STEP {step.num}</div>
                <div className="font-bold text-slate-800">{step.title}</div>
              </div>
            </div>
            <div className="p-5">{step.content}</div>
          </Card>
        ))}
      </div>

      {/* Fare guide */}
      <Card className="mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-sky-50 flex items-center gap-2">
          <MapPin size={16} style={{ color: sky[500] }} />
          <span className="font-bold text-slate-800">料金の目安</span>
        </div>
        <div className="divide-y divide-sky-50">
          {fareTable.map((row) => (
            <div key={row.route} className="px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-800">{row.route}</div>
                <div className="text-xs text-slate-400 mt-0.5">{row.time}</div>
              </div>
              <div
                className="text-sm font-bold flex-shrink-0 px-3 py-1 rounded-full"
                style={{ backgroundColor: sky[50], color: sky[600] }}
              >
                {row.fare}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-amber-50 text-xs text-amber-700">
          ⚠️ 料金はあくまで目安です。渋滞・時間帯により変動します。
        </div>
      </Card>

      {/* Warning */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-red-500" />
          <span className="font-bold text-red-700 text-sm">ご注意</span>
        </div>
        <div className="space-y-2 text-sm text-red-700">
          {[
            '車のナンバーを必ず確認してから乗車してください',
            'アプリ外での現金取引の要求には応じないでください',
            '荷物は自分の手元に置いておきましょう',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Official link */}
      <a
        href="https://greensm.vn"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold transition-all hover:shadow-md active:scale-95 mb-4"
        style={{ background: `linear-gradient(135deg, ${sky[600]}, ${sky[400]})`, color: 'white' }}
      >
        <ExternalLink size={16} />
        GreenSM 公式サイトを見る
      </a>

      <button
        onClick={() => onNavigate('chui')}
        className="w-full py-3 rounded-2xl text-sm font-medium text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors"
      >
        注意事項ページに戻る
      </button>
    </div>
  )
}
