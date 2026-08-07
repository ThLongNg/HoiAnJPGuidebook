import { useState } from 'react'
import { Camera, MapPin, Clock, Ticket, X, ChevronRight, Play, Image as ImageIcon } from 'lucide-react'
import { sky } from '@/types'
import { SectionHeading, Card } from '@/components/Atoms'

// ─── Spot data ──────────────────────────────────────────────────
type Spot = {
  name: string
  nameJp: string
  emoji: string
  area: 'hoian' | 'danang'
  tag: string
  rating: number
  time: string
  price: string
  img: string
  videoId?: string   // YouTube video ID
  desc: string
  tips: string[]
  mapUrl: string
}

const spots: Spot[] = [
  // ── Hội An ──
  {
    name: 'Chùa Cầu',
    nameJp: '来遠橋（日本橋）',
    emoji: '🌉',
    area: 'hoian',
    tag: '世界遺産',
    rating: 4.8,
    time: '所要：30〜60分',
    price: '共通チケット 120,000 VND（1枚で5か所見学可）',
    img: 'https://simg.zalopay.com.vn/zlp-website/assets/chua_cau_3_a9d95104ae.jpg',
    desc: '17世紀に日本人商人が建てた橋。ホイアン最大のシンボルで、20万VNDドン紙幣にも描かれています。橋の上には小さな神社があり、犬と猿の像が守護神として鎮座しています。',
    tips: [
      '旧市街チケット（120,000 VND）1枚で古民家や会館など好きな5施設に入場可能です',
      '各施設ごとに120,000 VNDかかるわけではありません',
      '朝早い時間（7:00〜8:30）は観光客が少なく撮影におすすめ',
      '20万VNDドン紙幣の裏面に描かれた名所です',
    ],
    mapUrl: 'https://maps.app.goo.gl/nJfw4nQua9WPRZpZ6',
  },
  {
    name: 'Show Ký Ức Hội An',
    nameJp: '「ホイアンの記憶」ショー',
    emoji: '🎭',
    area: 'hoian',
    tag: '文化ショー',
    rating: 4.7,
    time: '1回 約65分、週3回開催',
    price: '大人 600,000 VND、子供 300,000 VND',
    videoId: 'fBLF-kFihPs',
    img: 'https://fvgtravel.com.vn/uploads/up/root/editor/2025/10/10/21/02/w1230/rev1760083355_0948.jpg',
    desc: 'ホイアンの歴史と文化を舞台芸術で表現した大型ライブショー。500名以上の出演者と光・水・火を使った幻想的な演出が圧巻。ホイアン近郊の野外特設会場で開催されます。',
    tips: [
      '月・水・金・土曜日の20:00〜開催',
      '事前予約がおすすめ（当日券は完売することも）',
      '座席によって見え方が異なります。中央席がベスト',
      '雨天決行。防虫スプレーを持参しましょう',
    ],
    mapUrl: 'https://maps.app.goo.gl/F47ros5kFArkbDx16',
  },
  {
    name: 'VinWonders Nam Hội An',
    nameJp: 'ヴィンワンダーズ南ホイアン',
    emoji: '🎡',
    area: 'hoian',
    tag: 'テーマパーク',
    rating: 4.6,
    time: '所要：半日〜1日',
    price: '大人 850,000 VND〜、子供 650,000 VND〜',
    img: 'https://static.vinwonders.com/2023/01/DJI_0355crop-scaled.jpg',
    videoId: 'v--H1yIYRbY',
    desc: 'ベトナム最大規模のテーマパーク。ウォーターパーク・アドベンチャー・ゲームゾーン・ショッピングエリアが充実。ホイアン旧市街から車で約15〜20分の場所にあります。',
    tips: [
      'オンライン予約で最大30%割引あり',
      '週末・祝日は混雑します。平日がおすすめ',
      'ホテルの送迎サービスも利用可能',
      '水着・着替えを持参しましょう',
    ],
    mapUrl: 'https://maps.app.goo.gl/wVCK9GGZcEFjcALf7',
  },
  {
    name: 'Rừng Dừa Bảy Mẫu',
    nameJp: 'バイマウ椰子林（かご舟体験）',
    emoji: '🌴',
    area: 'hoian',
    tag: 'アクティビティ',
    rating: 4.7,
    time: '所要：1〜2時間',
    price: '150,000〜250,000 VND（かご舟込み）',
    img: 'https://tse1.mm.bing.net/th/id/OIP.uV32n495BdFiJBcdtj8dlQHaDt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    videoId: '8EpoiQGRphw',
    desc: '水椰子（ニパヤシ）の林の中を、丸いかご舟（トゥンチャイ）でめぐるユニークな体験。船頭が舟をスピンさせるパフォーマンスが大人気。ホイアンから車で約20分。',
    tips: [
      'かご舟スピンが名物！チップ（20,000〜50,000 VND）を忘れずに',
      '虫除けスプレーは必須',
      '服が濡れることがあるので着替えを準備',
      '早朝・夕方は光が美しく写真映え抜群',
    ],
    mapUrl: 'https://maps.google.com/?q=Bay+Mau+Coconut+Forest+Hoi+An',
  },
  {
    name: 'Hội Quán Phước Kiến',
    nameJp: '福建会館',
    emoji: '🏯',
    area: 'hoian',
    tag: '歴史建築',
    rating: 4.7,
    time: '所要：30〜60分',
    price: '共通チケット 120,000 VND（1枚で5か所入場可）',
    img: 'https://media.mia.vn/uploads/blog-du-lich/Hoi-quan-Phuc-Kien-Hoi-An-Di-san-van-hoa-dep-nhat-nhi-do-thi-co-11-1618287314.JPG',
    desc: '1697年に建てられた福建省出身の華僑の集会所。龍・鳳凰・魚など豪華な装飾が施されており、ホイアン旧市街で最も美しい建物のひとつとされています。',
    tips: [
      '旧市街共通チケット（120,000 VND）で入場できる5つの指定施設のひとつです',
      '豪華な龍の彫刻と大きな赤い渦巻き線香が有名',
      '旧暦1日・15日は特別なお参りが行われます',
    ],
    mapUrl: 'https://maps.google.com/?q=Phuc+Kien+Assembly+Hall+Hoi+An',
  },
  {
    name: 'Nhà Cổ Tấn Ký',
    nameJp: '陳記古民家（タンキー）',
    emoji: '🏠',
    area: 'hoian',
    tag: '古民家',
    rating: 4.6,
    time: '所要：30分',
    price: '共通チケット 120,000 VND（1枚で5か所入場可）',
    img: 'https://api.sovaba.travel/uploads/nha_co_tan_ky_duoc_xay_dung_nam_1741_edc975ae72.jpg',
    desc: '1741年に建てられた200年以上の歴史を持つ古民家。日本・中国・ベトナム3カ国の建築様式が融合した珍しい建物。7代にわたって同じ家族が住んでいます。',
    tips: [
      '旧市街共通チケット（120,000 VND）で入場できる5か所のひとつ',
      '現在も7代目のご家族が実際に生活している現役の古民家です',
      '柱に刻まれた過去の洪水水位を見つけることができます',
    ],
    mapUrl: 'https://maps.google.com/?q=Tan+Ky+Ancient+House+Hoi+An',
  },
  {
    name: 'Nhà Cổ Quân Thắng',
    nameJp: '覃勝古民家（クアンタン）',
    emoji: '🏡',
    area: 'hoian',
    tag: '古民家',
    rating: 4.5,
    time: '所要：20〜30分',
    price: '共通チケット 120,000 VND（1枚で5か所入場可）',
    img: 'https://3.bp.blogspot.com/-Xq7oejRtybc/XEMp-vjZ8MI/AAAAAAACQmo/gGtolp3KiXMG0tKuua6VVDsU-uF96IRrwCLcBGAs/s1600/Quan%2BThang%2B01.jpg',
    desc: '約300年前に広東省出身の商人が建てた古民家。精緻な木彫り彫刻が見事で、特に梁の装飾は芸術品レベル。ホイアン旧市街の建築美を堪能できます。',
    tips: [
      '旧市街共通チケット（120,000 VND）で入場可能',
      '木彫り彫刻の細かさは旧市街トップレベルの美しさ',
      'タンキー古民家と合わせて見学がおすすめ',
    ],
    mapUrl: 'https://maps.google.com/?q=Quan+Thang+Ancient+House+Hoi+An',
  },
  {
    name: 'Thả Hoa Đăng',
    nameJp: '花灯籠流し＆ボート体験',
    emoji: '🏮',
    area: 'hoian',
    tag: '体験',
    rating: 4.9,
    time: '夕方〜夜（日没直後〜21:00頃）',
    price: '灯籠 20,000〜30,000 VND / ボート 150,000〜200,000 VND',
    img: 'https://tse4.mm.bing.net/th/id/OIP.dAqIDTYICeo1GQMbeH2_6AHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    videoId: '0m5ErV76zoE',
    desc: 'ホアイ川に花と灯籠を流す幻想的なベトナムの伝統体験。手漕ぎボートに乗って水面からランタンで彩られた古都の夜景を楽しめます。',
    tips: [
      '手漕ぎボート乗船料の公定価格は 150,000〜200,000 VND/舟（約20分、1〜4名乗船可）です',
      '川沿いの公営チケット乗り場（Vé đi thuyền）で購入するとボッタクリを防げます',
      '灯籠は1個 20,000〜30,000 VND（川沿いの露店やボート上で購入可能）',
      '旧暦の14日（満月のランタン祭り）は街の電気が消え最も幻想的です',
    ],
    mapUrl: 'https://maps.google.com/?q=Hoai+River+Hoi+An+Lantern',
  },
  {
    name: 'Làng Gốm Thanh Hà',
    nameJp: 'タインハー陶芸村',
    emoji: '🏺',
    area: 'hoian',
    tag: '伝統工芸',
    rating: 4.5,
    time: '所要：1〜2時間',
    price: '35,000 VND（陶芸体験は別途）',
    img: 'https://static.vinwonders.com/2021/11/lang-gom-thanh-ha-thumb.jpg',
    desc: '500年以上の歴史を持つ陶芸村。職人の手作り陶器の製作過程を見学したり、実際にろくろ体験ができます。ホイアン旧市街から自転車で約20分。',
    tips: [
      '陶芸体験は事前予約なしでも参加可能',
      '小さなお土産の陶器が人気。手荷物として持ち込める大きさを選ぼう',
      '自転車でのんびり行くのがおすすめ',
      '川沿いの景色も美しい',
    ],
    mapUrl: 'https://maps.google.com/?q=Thanh+Ha+Pottery+Village+Hoi+An',
  },
  {
    name: 'Bãi Biển An Bàng',
    nameJp: 'アンバン ビーチ',
    emoji: '🏖️',
    area: 'hoian',
    tag: 'ビーチ',
    rating: 4.6,
    time: '所要：半日〜1日',
    price: '無料（ビーチチェア：50,000〜100,000 VND）',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format',
    desc: 'ホイアンから自転車で約15分の美しいビーチ。観光客が少なく穏やかな雰囲気で、地元のレストランやカフェも充実。青い海と白い砂浜が広がります。',
    tips: [
      '旧市街から自転車で気軽に行けます',
      'ビーチでの食事は100,000〜200,000 VND程度',
      '午前中は波が穏やかで泳ぎやすい',
      '日差しが強いので日焼け止めは必須',
    ],
    mapUrl: 'https://maps.google.com/?q=An+Bang+Beach+Hoi+An+Vietnam',
  },
  // ── Da Nang ──
  {
    name: 'Cầu Rồng',
    nameJp: 'ドラゴン橋',
    emoji: '🐉',
    area: 'danang',
    tag: '夜景',
    rating: 4.6,
    time: '所要：30〜60分（夜がおすすめ）',
    price: '無料（火噴きショー：土日 21:00〜）',
    img: 'https://images.unsplash.com/photo-1559562664-c7f5a2da31dd?w=600&h=400&fit=crop&auto=format',
    desc: '週末の夜に火と水を噴き出すことで有名なダナンのシンボル橋。日没後のライトアップも圧巻。龍の形をした橋全体が色鮮やかに照らされます。',
    tips: [
      '火噴きショーは土日の21:00〜（無料）',
      '橋の両側の遊歩道から観覧可能',
      '夕方〜夜に訪問がおすすめ',
      '周辺にカフェ・レストランが多数あります',
    ],
    mapUrl: 'https://maps.google.com/?q=Dragon+Bridge+Da+Nang+Vietnam',
  },
  {
    name: 'Ngũ Hành Sơn',
    nameJp: '五行山（大理石山）',
    emoji: '⛰️',
    area: 'danang',
    tag: '絶景',
    rating: 4.5,
    time: '所要：1〜2時間',
    price: '40,000 VND（エレベーター：15,000 VND）',
    img: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop&auto=format',
    desc: '石灰岩と大理石でできた5つの山。洞窟の中に仏像が祀られており、山頂からダナン市内・海岸を一望できます。大理石の彫刻品のお土産も豊富。',
    tips: [
      'エレベーターあり（別途15,000 VND）',
      '山頂への登山は階段が急で滑りやすい。歩きやすい靴で',
      '大理石の彫刻は重いのでお土産選びに注意',
      '洞窟内は薄暗いので懐中電灯があると便利',
    ],
    mapUrl: 'https://maps.google.com/?q=Marble+Mountains+Da+Nang+Vietnam',
  },
]

// ─── Spot Detail Modal ───────────────────────────────────────────
function SpotModal({ spot, onClose }: { spot: Spot; onClose: () => void }) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.22s ease both' }}
      >
        {/* Media area */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl bg-slate-900">
          {showVideo && spot.videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${spot.videoId}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              title={spot.name}
            />
          ) : (
            <>
              <img
                src={spot.img}
                alt={spot.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574614366831-900f959788c9?w=800&h=500&fit=crop' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Video play button */}
              {spot.videoId && !showVideo && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowVideo(true) }}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                </button>
              )}
            </>
          )}

          {/* Toggle image/video */}
          {spot.videoId && (
            <div className="absolute bottom-3 left-3 flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setShowVideo(false) }}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full transition-all ${!showVideo ? 'bg-white text-slate-800' : 'bg-black/40 text-white'}`}
              >
                <ImageIcon size={11} /> 写真
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowVideo(true) }}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full transition-all ${showVideo ? 'bg-red-600 text-white' : 'bg-black/40 text-white'}`}
              >
                <Play size={11} fill="currentColor" /> 動画
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <div className="flex items-start gap-2">
              <span className="text-2xl">{spot.emoji}</span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-slate-900 text-lg leading-tight">{spot.name}</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: sky[100], color: sky[600] }}>
                    {spot.tag}
                  </span>
                </div>
                <div className="text-sm font-medium mt-0.5" style={{ color: sky[500] }}>{spot.nameJp}</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">{spot.desc}</p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-3 bg-sky-50 rounded-xl px-4 py-2.5 border border-sky-100">
              <Clock size={14} style={{ color: sky[500] }} className="flex-shrink-0" />
              <span className="text-sm text-slate-700">{spot.time}</span>
            </div>
            <div className="flex items-center gap-3 bg-amber-50 rounded-xl px-4 py-2.5 border border-amber-100">
              <Ticket size={14} className="text-amber-500 flex-shrink-0" />
              <span className="text-sm text-slate-700">{spot.price}</span>
            </div>
          </div>

          {/* Tips */}
          <div>
            <div className="font-bold text-slate-800 text-sm mb-2.5 flex items-center gap-2">
              <Camera size={14} style={{ color: sky[500] }} />
              観光のコツ
            </div>
            <div className="space-y-2">
              {spot.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                  <ChevronRight size={14} className="text-sky-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map button */}
          <a
            href={spot.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})` }}
          >
            <MapPin size={16} />
            Google Mapsで開く
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Spot thumbnail card ─────────────────────────────────────────
function SpotCard({ spot, delay, onClick }: { spot: Spot; delay: number; onClick: () => void }) {
  return (
    <button
      className="text-left w-full anim-up hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
      style={{ animationDelay: `${delay}s` } as React.CSSProperties}
      onClick={onClick}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative h-44 overflow-hidden">
          <img
            src={spot.img}
            alt={spot.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574614366831-900f959788c9?w=600&h=400&fit=crop' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Tag */}
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
              {spot.tag}
            </span>
          </div>

          {/* Video badge */}
          {spot.videoId && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Play size={9} fill="white" /> 動画あり
            </div>
          )}

          {/* Tap hint */}
          <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
            タップで詳細 →
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start gap-2">
            <span className="text-xl flex-shrink-0">{spot.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900 text-sm leading-tight truncate">{spot.name}</div>
              <div className="text-xs font-medium mt-0.5 truncate" style={{ color: sky[500] }}>{spot.nameJp}</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-2">{spot.desc}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
            <Clock size={10} />
            <span>{spot.time}</span>
          </div>
        </div>
      </Card>
    </button>
  )
}

// ─── Page ────────────────────────────────────────────────────────
const hoianTips = [
  '🎟️ 旧市街入場チケット（120,000 VND）は1枚で好きな5施設（古民家・会館など）に見学可能です（施設ごとに買う必要はありません）',
  '🚣‍♂️ 花灯籠ボートの公定料金は1舟 150,000〜200,000 VND（約20分・1〜4人）。公営乗り場での購入が安全です',
  '🚶‍♂️ 歩行者天国（車・バイク禁止時間）：毎日15:00〜21:30（午前9:00〜11:00）。静かに旧市街を散策できます',
  '🕯️ 旧暦の14日はランタン祭り（街の電灯が消え、伝統的なランタンの光に包まれます）',
  '🚲 旧市街の移動はレンタル自転車が便利（1日約50,000 VND）',
]

const danangTips = [
  '🔥 ドラゴン橋の火噴きは土日の21:00（無料で見学可）',
  '🚕 ダナン空港からホイアンへはタクシーで約45分（約350,000 VND）',
  '🏖️ ミーケービーチはダナン中心から近く、きれい',
  '🛵 GrabバイクはダナンでもOK。安くて便利',
]

export default function SpotsPage() {
  const [area, setArea] = useState<'hoian' | 'danang'>('hoian')
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)

  const filtered = spots.filter(s => s.area === area)
  const tips = area === 'hoian' ? hoianTips : danangTips

  return (
    <div>
      <SectionHeading sub="ホイアン・ダナンのおすすめ観光地">📍 観光スポット</SectionHeading>

      {/* Area switcher */}
      <div className="flex gap-3 mb-6">
        {([
          { id: 'hoian', label: '🏮 ホイアン', count: spots.filter(s => s.area === 'hoian').length },
          { id: 'danang', label: '🌉 ダナン', count: spots.filter(s => s.area === 'danang').length },
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
            <span className="text-xs px-1.5 py-0.5 rounded-full"
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

      {/* Spot grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 anim-in" key={area}>
        {filtered.map((spot, i) => (
          <SpotCard key={spot.name} spot={spot} delay={i * 0.07} onClick={() => setSelectedSpot(spot)} />
        ))}
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Camera size={16} className="text-amber-500" />
          <span className="font-bold text-amber-700 text-sm">観光のヒント</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {tips.map((tip) => (
            <div key={tip} className="flex items-start gap-2 text-sm text-amber-800 bg-white/60 rounded-xl px-3 py-2.5">
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spot Detail Modal */}
      {selectedSpot && <SpotModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} />}
    </div>
  )
}
