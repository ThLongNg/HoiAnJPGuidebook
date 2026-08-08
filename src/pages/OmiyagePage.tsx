import { useState } from 'react'
import {
  Heart,
  MapPin,
  Clock,
  ShoppingBag,
  Store,
  Lightbulb,
  Sparkles,
  Star,
  ChevronRight,
  Filter,
  Wallet,
  Package,
  Plane,
  Shirt,
  FlaskConical,
  UtensilsCrossed,
  Gem,
  Tag,
  ExternalLink,
} from 'lucide-react'
import { sky } from '@/types'
import { SectionHeading } from '@/components/Atoms'

type Category = 'すべて' | 'お菓子・食品' | '美容・コスメ' | '雑貨・工芸' | 'ファッション'

interface Item {
  id: number
  name: string
  nameVi: string
  priceJpy: string
  priceVnd: string
  category: Exclude<Category, 'すべて'>
  tag: string
  desc: string
  img: string
  alt: string
}

interface Shop {
  name: string
  nameJp: string
  area: string
  hours: string
  note: string
  icon: React.ReactNode
  accentColor: string
  mapUrl: string
}

const ITEMS: Item[] = [
  {
    id: 1,
    name: 'Pheva（フェバ）高級チョコレート',
    nameVi: 'Sô-cô-la Pheva',
    priceJpy: '¥600〜',
    priceVnd: '100,000 VND〜',
    category: 'お菓子・食品',
    tag: '人気 No.1',
    desc: '【おすすめ: 会社の同僚・女友達・バラマキ用】18種類のフレーバーとカラフルな箱が可愛い！個包装で配りやすく職場のお土産に大人気。',
    img: 'https://www.tnkjapan.com/blog/wp-content/uploads/2020/03/best6.gif',
    alt: 'Pheva チョコレート',
  },
  {
    id: 2,
    name: 'ベトナム伝統 蓮の花茶（ロータスティー）',
    nameVi: 'Trà sen Việt Nam',
    priceJpy: '¥480〜',
    priceVnd: '80,000 VND〜',
    category: 'お菓子・食品',
    tag: '上品な香りと美容',
    desc: '【おすすめ: 上司・目上の方・お義母様】ベトナム国花の高貴な香りと美肌・リラックス効果。日頃のお礼を伝える上品なギフトに最適。',
    img: 'https://tse1.mm.bing.net/th/id/OIP.2uOVTFm29ndrj_-cC8dXIgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: '蓮の花茶',
  },
  {
    id: 3,
    name: 'ココナッツフレーバーコーヒー',
    nameVi: 'Cà phê dừa',
    priceJpy: '¥360〜',
    priceVnd: '60,000 VND〜',
    category: 'お菓子・食品',
    tag: 'カフェ好き必見',
    desc: '【おすすめ: 甘党の友人・カフェ好きの同僚】お湯や牛乳を注ぐだけで南国カフェ気分！手軽にベトナムの味を楽しめる人気スティック。',
    img: 'https://i1.wp.com/sai5n.com/wp-content/uploads/2019/08/coconut_coffe_03.jpg?resize=1024%2C768&ssl=1',
    alt: 'ココナッツコーヒー',
  },
  {
    id: 4,
    name: '無添加 プレミアム ドライマンゴー',
    nameVi: 'Xoài sấy dẻo',
    priceJpy: '¥300〜',
    priceVnd: '50,000 VND〜',
    category: 'お菓子・食品',
    tag: '濃厚な美味しさ',
    desc: '【おすすめ: 自分へのご褒美・お酒好きな友人】完熟マンゴーの濃密な甘み！お仕事中の小腹満たしや、ワイン・ハイボールのおつまみに。',
    img: 'https://vietgourmet.vn/wp-content/uploads/2021/06/xoai-say-deo-25.jpg',
    alt: 'ドライマンゴー',
  },
  {
    id: 5,
    name: 'Cocoon 濃密ココナッツ リップバーム',
    nameVi: 'Son dưỡng dừa Cocoon',
    priceJpy: '¥210〜',
    priceVnd: '35,000 VND〜',
    category: '美容・コスメ',
    tag: 'SNS話題のコスメ',
    desc: '【おすすめ: 仲良しの女友達・トレンド好きな妹】ベトナム大人気ヴィーガンコスメ！プルプルの保湿力とお手頃価格でお配りにぴったり。',
    img: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/351/048/products/6f0290b7-4140-4820-9cd1-7ba3e8583238.jpg?v=1628343490070',
    alt: 'Cocoon リップバーム',
  },
  {
    id: 6,
    name: 'バージンココナッツ手作り石鹸',
    nameVi: 'Xà phòng dừa thiên nhiên',
    priceJpy: '¥240〜',
    priceVnd: '40,000 VND〜',
    category: '美容・コスメ',
    tag: 'ナチュラルオーガニック',
    desc: '【おすすめ: 美容好きな友人・ママ友】100%天然精油とココナッツオイルの贅沢石鹸。洗面用だけでなくクローゼットの芳香剤にも好評。',
    img: 'https://tse1.explicit.bing.net/th/id/OIP.lx2_9M51XjDjR5yy9i4sIAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: '手作りココナッツ石鹸',
  },
  {
    id: 7,
    name: 'ベトナム伝統 アジアン刺繍ポーチ',
    nameVi: 'Túi thêu thủ công',
    priceJpy: '¥240〜',
    priceVnd: '40,000 VND〜',
    category: '雑貨・工芸',
    tag: '職人の手仕事',
    desc: '【おすすめ: コスメ好きな友人・自分用】手刺繍の花や鳥が愛らしい巾着ポーチ。リップやイヤホンなどバッグの中身の整理に重宝。',
    img: 'https://tse3.mm.bing.net/th/id/OIP.MxGfCzHlStxky-E7pCBbqAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: '刺繍ポーチ',
  },
  {
    id: 8,
    name: 'カラフル プラかごバッグ',
    nameVi: 'Túi đan nhựa',
    priceJpy: '¥480〜',
    priceVnd: '80,000 VND〜',
    category: '雑貨・工芸',
    tag: '軽くて丈夫！',
    desc: '【おすすめ: 浴衣や海が好きな友人・自分用】水に強く軽やか！ベトナム滞在中の街歩きや、日本の夏祭り・スパバッグとしても映えます。',
    img: 'https://www.felissimo.co.jp/dw/image/v2/BGGR_PRD/on/demandware.static/-/Sites-90/default/dw034e2321/pic/672195-productcuts-01-99999999-S.jpg',
    alt: 'プラかごバッグ',
  },
  {
    id: 9,
    name: 'ホイアン折りたたみ シルクランタン',
    nameVi: 'Đèn lồng Hội An',
    priceJpy: '¥180〜',
    priceVnd: '30,000 VND〜',
    category: '雑貨・工芸',
    tag: 'ホイアンの象徴',
    desc: '【おすすめ: インテリア好きな方・旅の思い出用】ペタンコに折りたたんで持ち帰り楽々！幻想的なホイアンの情景をお部屋の間接照明に。',
    img: 'https://tse1.mm.bing.net/th/id/OIP.Iv5kIxdUqBFbZdNMU44fZQHaEo?r=0&w=960&h=600&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: 'ホイアンランタン',
  },
  {
    id: 10,
    name: '手描きバッチャン焼き（陶器小皿・茶器）',
    nameVi: 'Gốm Bát Tràng',
    priceJpy: '¥360〜',
    priceVnd: '60,000 VND〜',
    category: '雑貨・工芸',
    tag: 'ベトナム伝統陶芸',
    desc: '【おすすめ: お母様・お料理好きな方】素朴な手描きの蓮やトンボ柄が魅力。醤油皿や和食の小鉢としても馴染み日常使いに重宝。',
    img: 'https://vietnam-porter.jp/html/upload/save_image/bat-trang-ceramic-mug-with-lid-350ml-hand-painted-bamboo-pattern-white-sand-glaze_68f703cb2698c.webp',
    alt: 'バッチャン焼き',
  },
  {
    id: 11,
    name: '最高級本絹 シルクスカーフ',
    nameVi: 'Khăn lụa tơ tằm',
    priceJpy: '¥1,800〜',
    priceVnd: '300,000 VND〜',
    category: 'ファッション',
    tag: '100%本絹',
    desc: '【おすすめ: お母様・奥様・特別なギフト】100%天然絹の極上のなめらかさ。日焼け対策や冷房除けとして大切な方へ贈る上質プレゼント。',
    img: 'https://hanhsilk.giahanweb.com/wp-content/uploads/sites/273/2023/10/380315538_885151745830152_5214889573251223885_n-300x300.jpg',
    alt: 'シルクスカーフ',
  },
  {
    id: 12,
    name: 'ホイアン伝統 焼き緑豆せんべい',
    nameVi: 'Bánh đậu xanh nướng Hội An',
    priceJpy: '¥240〜',
    priceVnd: '40,000 VND〜',
    category: 'お菓子・食品',
    tag: 'ホイアン伝統銘菓',
    desc: '【おすすめ: ご両親・和茶好きなご家族】ホイアン名物の香ばしい焼き緑豆せんべい。素朴な甘みとカリッとした食感がお茶請けに最高！',
    img: 'https://statics.vinpearl.com/banh-dau-xanh-hoi-an-1_1694608059.jpg',
    alt: 'Bánh đậu xanh nướng Hội An',
  },
  {
    id: 13,
    name: 'ホイアン名物 棘葉（ラーガイ）モチモチ包み餅',
    nameVi: 'Bánh ít lá gai Hội An',
    priceJpy: '¥180〜',
    priceVnd: '30,000 VND〜',
    category: 'お菓子・食品',
    tag: 'もっちり伝統和菓子風',
    desc: '【おすすめ: 現地で味わう自分・和菓子好きの旅仲間】ラーガイ葉で染めたモチモチ伝統生菓子！バナナ葉と緑豆餡の優しい甘さが絶品。',
    img: 'https://mia.vn/media/uploads/blog-du-lich/top-6-loai-banh-dac-san-hoi-an-binh-dan-gay-nghien-co-the-mua-ve-lam-qua-17-1620490657.jpg',
    alt: 'Bánh ít lá gai Hội An',
  },
]

const SHOPS: Shop[] = [
  {
    name: 'Reaching Out Arts & Crafts',
    nameJp: 'リーチング・アウト（手作り工芸＆銀細工）',
    area: 'ホイアン旧市街 (Trần Phú通り)',
    hours: '08:30 — 20:00',
    note: '障がいを持つ職人さんが手作りするフェアトレードショップ。手刺繍巾着・真鍮アクセ・バッチャン焼きが並びます。静寂なティールームも併設。',
    icon: <Sparkles size={20} />,
    accentColor: '#0ea5e9',
    mapUrl: 'https://maps.google.com/?q=Reaching+Out+Arts+Crafts+Hoi+An',
  },
  {
    name: 'Pheva Chocolate (フェバ・ショコラティエ)',
    nameJp: 'フェバ チョコレート ダナン / ホイアン',
    area: 'ダナン市街 / ホイアン旧市街',
    hours: '08:00 — 19:00',
    note: 'フランス仕込みのベトナム産クラフトチョコ店。カラフルな箱を選んで18種類の味をカスタム詰め合わせ。保冷バッグ付きで安心。',
    icon: <ShoppingBag size={20} />,
    accentColor: '#ec4899',
    mapUrl: 'https://maps.google.com/?q=Pheva+Chocolate+Da+Nang',
  },
  {
    name: 'Cocobox (ココボックス)',
    nameJp: 'ココボックス オーガニックショップ＆カフェ',
    area: 'ホイアン旧市街 (Lê Lợi通り)',
    hours: '07:00 — 21:00',
    note: 'オーガニックにこだわったレトロナチュラルなお店。自家製フルーツジャム、ココナッツオイル、ハーブティー、カカオニブが美しい。',
    icon: <Store size={20} />,
    accentColor: '#f59e0b',
    mapUrl: 'https://maps.google.com/?q=Cocobox+Hoi+An',
  },
  {
    name: 'Chợ Hàn (ハン市場)',
    nameJp: 'ダナン ハン市場（ローカルマーケット）',
    area: 'ダナン市 ハン橋近く',
    hours: '06:00 — 19:00',
    note: 'プラかごバッグ・ドライマンゴー・カシューナッツの宝庫。2階にプラかごが並びます。「Bớt giá được không? (安くして)」と笑顔で交渉しよう！',
    icon: <Tag size={20} />,
    accentColor: '#10b981',
    mapUrl: 'https://maps.google.com/?q=Han+Market+Da+Nang',
  },
  {
    name: 'Chợ Đêm Hội An (ホイアン夜市)',
    nameJp: 'ホイアン ナイトマーケット',
    area: 'ホイアン Nguyễn Hoàng通り',
    hours: '17:00 — 22:00',
    note: 'アンホイ島で毎夜開催される賑やかな夜市。カラフルなミニランタン、木彫り細工、アジアンアクセサリーを露店で楽しく選べます。',
    icon: <Star size={20} />,
    accentColor: '#8b5cf6',
    mapUrl: 'https://maps.google.com/?q=Hoi+An+Night+Market',
  },
  {
    name: 'Metiseko (メティセコ)',
    nameJp: '高級オーガニックシルクブティック',
    area: 'ホイアン旧市街 (Trần Phú通り)',
    hours: '08:30 — 21:30',
    note: 'フランス人デザイナーが手掛けるハイエンドシルクブランド。オーガニックシルク100%のスカーフやドレスは特別な自分へのご褒美に。',
    icon: <Gem size={20} />,
    accentColor: '#0284c7',
    mapUrl: 'https://maps.google.com/?q=Metiseko+Hoi+An',
  },
]

const TIPS = [
  { icon: <Package size={22} />, tip: '値段交渉は笑顔でスマートに', detail: 'ハン市場や夜市では「Bớt giá được không? (安くして)」と笑顔で交渉するのが買い物のコツ！', color: '#ec4899' },
  { icon: <FlaskConical size={22} />, tip: '100ml超の液体類は受託手荷物へ', detail: 'ココナッツオイルやジャム、ハチミツは機内持ち込み不可です。必ずスーツケースへ！', color: '#f59e0b' },
  { icon: <Plane size={22} />, tip: '生の果物は日本持ち込みNG', detail: 'マンゴーなど生の果物は日本への持ち込み禁止。個包装のドライマンゴーがおすすめ！', color: '#10b981' },
]

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  'すべて': <Filter size={14} />,
  'お菓子・食品': <UtensilsCrossed size={14} />,
  '美容・コスメ': <Sparkles size={14} />,
  '雑貨・工芸': <Gem size={14} />,
  'ファッション': <Shirt size={14} />,
}

const CATEGORIES: Category[] = ['すべて', 'お菓子・食品', '美容・コスメ', '雑貨・工芸', 'ファッション']

export default function OmiyagePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('すべて')
  const [hearts, setHearts] = useState<Record<number, boolean>>({})
  const [activeTab, setActiveTab] = useState<'items' | 'shops'>('items')

  const filtered = activeCategory === 'すべて' ? ITEMS : ITEMS.filter((i) => i.category === activeCategory)
  const wishCount = Object.values(hearts).filter(Boolean).length

  function toggleHeart(id: number) {
    setHearts((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-2 border-b border-sky-100">
        <div>
          <SectionHeading sub="旅する女性のために選んだ絶対喜ばれるベストコレクション">
            🛍️ お土産ガイド
          </SectionHeading>
        </div>

        {/* Wishlist Heart Counter Badge */}
        <div
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all shadow-2xs ${wishCount > 0
            ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold scale-105'
            : 'bg-white/80 border-sky-100 text-slate-400 font-semibold'
            }`}
        >
          <Heart size={14} className={wishCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-400'} />
          <span className="text-xs">{wishCount}</span>
        </div>
      </div>

      {/* Hero Banner matching app sky theme */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold mb-3 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" /> TRAVEL SOUVENIR GUIDE FOR HER
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            センスいいね！って褒められる<br />ベトナム・ホイアンのお土産セレクション
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed font-medium">
            ベトナムを旅する日本人女性向けに、現地で絶対に買って帰りたいお土産をまとめました。自分へのご褒美に、大切な人へのプレゼントに。
          </p>
        </div>
      </div>

      {/* Main Tab bar: おすすめ商品 vs お土産ショップ */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-sky-100 p-1 flex shadow-2xs">
        {[
          { key: 'items', IconComp: ShoppingBag, label: 'おすすめ商品' },
          { key: 'shops', IconComp: MapPin, label: 'お土産ショップ' },
        ].map(({ key, IconComp, label }) => {
          const active = activeTab === key
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'items' | 'shops')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${active
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-500 hover:text-sky-600 hover:bg-sky-50/50'
                }`}
            >
              <IconComp size={16} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Sub-Tab 1: Recommended Items */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${activeCategory === c
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white/80 text-slate-600 border border-sky-100 hover:bg-sky-50'
                  }`}
              >
                {CATEGORY_ICONS[c]}
                {c}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl border border-sky-100 overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img src={item.img} alt={item.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-sky-700 shadow-2xs flex items-center gap-1 border border-white/40">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      {item.tag}
                    </div>

                    {/* Heart button */}
                    <button
                      onClick={() => toggleHeart(item.id)}
                      className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xs border border-white/40 active:scale-90 transition-all"
                    >
                      <Heart size={16} className={hearts[item.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-400'} />
                    </button>

                    {/* Category name bottom */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                      {item.category}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h3>
                      <div className="text-right flex-shrink-0">
                        <span className="font-bold text-sky-600 text-sm">{item.priceJpy}</span>
                        <div className="text-[10px] text-slate-400 font-semibold">{item.priceVnd}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-sky-500 font-medium italic mb-2.5">
                      <ChevronRight size={12} />
                      <span>{item.nameVi}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Souvenir Shops */}
      {activeTab === 'shops' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">おすすめお土産スポット</h3>
            <p className="text-xs text-slate-500 mt-0.5">ホイアン・ダナンの主要買い物スポットをピックアップ。現地のコツと一緒にご紹介します。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SHOPS.map((shop) => (
              <div
                key={shop.name}
                className="bg-white/90 backdrop-blur-sm rounded-3xl border border-sky-100 overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div style={{ height: 4, background: shop.accentColor }} />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xs"
                        style={{ backgroundColor: `${shop.accentColor}20`, color: shop.accentColor }}
                      >
                        {shop.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-base leading-tight">{shop.name}</h4>
                        <p className="text-xs text-sky-600 font-semibold mt-0.5">{shop.nameJp}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} style={{ color: shop.accentColor }} />
                        {shop.area}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} style={{ color: shop.accentColor }} />
                        {shop.hours}
                      </span>
                    </div>

                    {/* Note Box */}
                    <div
                      className="bg-slate-50 rounded-2xl p-3.5 border-l-4 text-xs text-slate-700 leading-relaxed"
                      style={{ borderLeftColor: shop.accentColor }}
                    >
                      <div className="flex items-start gap-1.5">
                        <Lightbulb size={14} style={{ color: shop.accentColor }} className="flex-shrink-0 mt-0.5" />
                        <p>{shop.note}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                    <a
                      href={shop.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-bold text-sky-600 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Google Map <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shopping Tips Section matching template */}
          <div className="bg-gradient-to-r from-sky-50 via-sky-100/60 to-amber-50 rounded-3xl p-6 sm:p-8 border border-sky-100">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">買い物上手になるコツ</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TIPS.map(({ icon, tip, detail, color }) => (
                <div
                  key={tip}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xs border border-white/80 hover:-translate-y-1 transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-2xs"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    {icon}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{tip}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
