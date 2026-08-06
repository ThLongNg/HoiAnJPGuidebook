import { MessageCircle, MapPin } from 'lucide-react'
import { sky, MI_QUANG, CAO_LAU, COM_GA, HOI_AN_STREET } from '@/types'
import { SectionHeading, SpeakButton } from '@/components/Atoms'
import { FoodCard } from '@/components/Cards'

const orderPhrases = [
  { vn: 'Cho tôi một tô Cao Lầu.',     reading: 'チョー トイ モット トー カオ ラウ',    jp: 'カオラウを一杯ください。' },
  { vn: 'Cho tôi một phần Mì Quảng.',  reading: 'チョー トイ モット ファン ミー クアン', jp: 'ミークアンを一人前ください。' },
  { vn: 'Ngon lắm!',                   reading: 'ンゴン ラム',                          jp: 'とても美味しい！' },
  { vn: 'Tính tiền nhé!',              reading: 'ティン ティエン ニェ',                 jp: 'お会計お願いします！' },
]

export default function GourmetPage() {
  return (
    <div>
      <SectionHeading sub="ホイアンでしか味わえない絶品グルメ">🍜 ホイアンおすすめ料理</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FoodCard num="① Mì Quảng" name="ミークアン"
          desc="ベトナム中部名物の麺料理。幅広の黄色い麺に、豚肉・エビ・ピーナッツをのせた一品。相場：35,000〜50,000 VND"
          img={MI_QUANG} delay={0} />
        <FoodCard num="② Cao Lầu" name="カオラウ"
          desc="ホイアンでしか味わえない伝統麺。独特の歯ごたえある麺と豚の角煮が絶妙にマッチ。相場：40,000〜60,000 VND"
          img={CAO_LAU} delay={0.08} />
        <FoodCard num="③ Cơm Gà Hội An" name="コムガーホイアン"
          desc="ホイアン名物の鶏ご飯。ショウガ風味のご飯に蒸し鶏をのせた、優しい味わい。相場：30,000〜45,000 VND"
          img={COM_GA} delay={0.16} />
      </div>

      {/* Order phrases */}
      <div className="bg-white rounded-2xl shadow-sm border border-sky-100 mb-8 p-6">
        <div className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <MessageCircle size={16} style={{ color: sky[500] }} />
          注文のときに使えるフレーズ
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {orderPhrases.map((p) => (
            <div key={p.vn} className="flex items-center justify-between gap-3 bg-sky-50 rounded-xl px-4 py-3 border border-sky-100">
              <div>
                <div className="font-bold text-slate-800 text-sm">{p.vn}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: sky[500] }}>{p.reading}</div>
                <div className="text-xs text-slate-400 mt-0.5">{p.jp}</div>
              </div>
              <SpeakButton text={p.vn} size={14} />
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden h-56 mb-8 shadow-md">
        <img src={HOI_AN_STREET} alt="Hoi An street" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center p-8">
          <div>
            <div className="text-white font-bold text-xl flex items-center gap-2 mb-1">
              <MapPin size={16} /> ホイアン古都
            </div>
            <div className="text-white/70 text-sm">ユネスコ世界遺産 · Quảng Nam Province</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-3xl p-8 text-center text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${sky[600]}, ${sky[400]})` }}
      >
        <div className="text-4xl mb-3">🇻🇳</div>
        <p className="text-2xl font-bold mb-2">ぜひ一度食べてみてください！</p>
        <p className="text-white/70 text-base">Hãy thử một lần nhé！</p>
      </div>
    </div>
  )
}
