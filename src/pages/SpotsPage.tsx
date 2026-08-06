import { useState } from 'react'
import { Camera } from 'lucide-react'
import { sky, HOI_AN_BRIDGE, HOI_AN_STREET, MY_SON, AN_BANG_BEACH, DA_NANG_BRIDGE, MARBLE_MTN } from '@/types'
import { SectionHeading } from '@/components/Atoms'
import { SpotCard } from '@/components/Cards'

const hoianSpots = [
  {
    name: 'Chùa Cầu',
    nameJp: '来遠橋（日本橋）',
    area: 'ホイアン',
    rating: 4.7,
    time: '所要：30分',
    desc: '17世紀に日本人商人が建てた橋。ホイアン最大のシンボルで、20万VNDドン紙幣にも描かれています。',
    img: HOI_AN_BRIDGE,
    mapUrl: 'https://maps.google.com/?q=Hoi+An+Japanese+Bridge+Vietnam',
  },
  {
    name: 'Phố Cổ Hội An',
    nameJp: 'ホイアン旧市街',
    area: 'ホイアン',
    rating: 4.8,
    time: '所要：2〜3時間',
    desc: 'ユネスコ世界遺産。提灯が灯る夜の散策は特に幻想的。夜のランタン祭りも必見です。',
    img: HOI_AN_STREET,
    mapUrl: 'https://maps.google.com/?q=Hoi+An+Ancient+Town+Vietnam',
  },
  {
    name: 'Thánh địa Mỹ Sơn',
    nameJp: 'ミーソン聖域',
    area: 'ホイアン近郊',
    rating: 4.5,
    time: '所要：2〜3時間（車で約1時間）',
    desc: 'チャンパ王国の遺跡群。ユネスコ世界遺産に登録された、神秘的なヒンドゥー寺院の廃墟。',
    img: MY_SON,
    mapUrl: 'https://maps.google.com/?q=My+Son+Sanctuary+Vietnam',
  },
  {
    name: 'Bãi biển An Bàng',
    nameJp: 'アンバン ビーチ',
    area: 'ホイアン',
    rating: 4.6,
    time: '所要：半日',
    desc: 'ホイアンから自転車で行けるきれいなビーチ。観光客が少なく、地元の雰囲気が楽しめます。',
    img: AN_BANG_BEACH,
    mapUrl: 'https://maps.google.com/?q=An+Bang+Beach+Hoi+An+Vietnam',
  },
]

const danangSpots = [
  {
    name: 'Cầu Rồng',
    nameJp: 'ドラゴン橋',
    area: 'ダナン',
    rating: 4.6,
    time: '所要：30〜60分（夜がおすすめ）',
    desc: '週末の夜に火と水を噴き出すことで有名な橋。夜のライトアップが美しく、ダナンのシンボル。',
    img: DA_NANG_BRIDGE,
    mapUrl: 'https://maps.google.com/?q=Dragon+Bridge+Da+Nang+Vietnam',
  },
  {
    name: 'Ngũ Hành Sơn',
    nameJp: '五行山（大理石山）',
    area: 'ダナン',
    rating: 4.5,
    time: '所要：1〜2時間',
    desc: '石灰岩と大理石でできた5つの山。洞窟の中に仏像が祀られており、ダナン市内を一望できます。',
    img: MARBLE_MTN,
    mapUrl: 'https://maps.google.com/?q=Marble+Mountains+Da+Nang+Vietnam',
  },
]

const hoianTips = [
  '🕯️ 毎月旧暦の14日はランタン祭り（電気を消してランタンだけに）',
  '🚲 旧市街は自転車で回るのがおすすめ。レンタルは1日約50,000 VND',
  '🎟️ 旧市街の観光にはチケットが必要（120,000 VND）',
  '🌅 日の出の時間帯は観光客が少なくおすすめ',
]

const danangTips = [
  '🔥 ドラゴン橋の火噴きは土日の21:00（無料で見学可）',
  '🚕 ダナン空港からホイアンへはタクシーで約45分（約350,000 VND）',
  '🏖️ ミーケービーチはダナン中心から近く、きれい',
  '🛵 GrabバイクはダナンでもOK。安くて便利',
]

export default function SpotsPage() {
  const [area, setArea] = useState<'hoian' | 'danang'>('hoian')
  const spots = area === 'hoian' ? hoianSpots : danangSpots
  const tips  = area === 'hoian' ? hoianTips  : danangTips

  return (
    <div>
      <SectionHeading sub="ホイアン・ダナンのおすすめ観光地">📍 観光スポット</SectionHeading>

      {/* Area switcher */}
      <div className="flex gap-3 mb-8">
        {([
          { id: 'hoian',  label: '🏮 ホイアン', count: hoianSpots.length },
          { id: 'danang', label: '🌉 ダナン',   count: danangSpots.length },
        ] as const).map((a) => (
          <button
            key={a.id}
            onClick={() => setArea(a.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            style={
              area === a.id
                ? { background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})`, color: 'white', boxShadow: `0 4px 12px ${sky[200]}` }
                : { backgroundColor: 'white', color: '#64748b', border: `1px solid ${sky[100]}` }
            }
          >
            {a.label}
            <span
              className="text-xs px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: area === a.id ? 'rgba(255,255,255,0.25)' : sky[50],
                color: area === a.id ? 'white' : sky[600],
              }}
            >
              {a.count}
            </span>
          </button>
        ))}
      </div>

      <div className="anim-in" key={area}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spots.map((spot, i) => (
            <SpotCard key={spot.name} {...spot} delay={i * 0.1} />
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Camera size={16} className="text-amber-500" />
            <span className="font-bold text-amber-700 text-sm">観光のヒント</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-amber-800">
            {tips.map((tip) => (
              <div key={tip} className="flex items-start gap-2">
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
