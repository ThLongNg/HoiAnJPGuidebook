import { useState } from 'react'
import {
  MessageCircle, MapPin, Star, Flame, X, ExternalLink, Volume2,
  Navigation, Utensils, CookingPot, Sandwich, IceCream, Coffee,
  Lightbulb, Clock, UtensilsCrossed,
} from 'lucide-react'
import { sky, MI_QUANG, CAO_LAU, COM_GA, HOI_AN_STREET } from '@/types'
import { SectionHeading, Card } from '@/components/Atoms'
import { speak } from '@/utils/tts'

// ─── Food data ──────────────────────────────────────────────────
type OrderPhrase = { vn: string; reading: string; jp: string }
type Restaurant = { name: string; address: string; hours: string; mapUrl: string }

type Food = {
  vn: string
  name: string
  icon: React.ReactNode
  price: string
  rating: number
  spicy?: boolean
  img: string
  desc: string
  tip?: string
  category: 'main' | 'snack' | 'sweet' | 'drink'
  restaurants: Restaurant[]
  orderPhrases: OrderPhrase[]
}

const foods: Food[] = [
  {
    vn: 'Mì Quảng', name: 'ミークアン', icon: <CookingPot size={18} className="text-amber-500" />, price: '35,000〜50,000 VND', rating: 4.8,
    img: MI_QUANG, category: 'main',
    desc: 'ベトナム中部名物の麺料理。幅広の黄色い麺に、豚肉・エビ・ピーナッツをのせた一品。スープが少なく、具材の旨みが凝縮されている。',
    tip: 'ライスペーパーやハーブを一緒に入れて食べるのが現地流',
    restaurants: [
      { name: 'Mì Quảng 1A', address: '1A Hải Phòng, Hội An', hours: '06:00–20:00', mapUrl: 'https://maps.google.com/?q=Mi+Quang+1A+Hoi+An' },
      { name: 'Quán Bà Vị', address: '6 Trần Phú, Hội An', hours: '07:00–21:00', mapUrl: 'https://maps.google.com/?q=Mi+Quang+Ba+Vi+Hoi+An' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một tô Mì Quảng.', reading: 'チョー トイ モット トー ミー クアン', jp: 'ミークアンを一杯ください。' },
      { vn: 'Cho tôi thêm rau.', reading: 'チョー トイ テム ザウ', jp: '野菜を追加してください。' },
      { vn: 'Không cay nhé!', reading: 'コン カイ ニェ', jp: '辛くしないでください！' },
    ],
  },
  {
    vn: 'Cao Lầu', name: 'カオラウ', icon: <CookingPot size={18} className="text-[#0284c7]" />, price: '40,000〜60,000 VND', rating: 4.9,
    img: CAO_LAU, category: 'main',
    desc: 'ホイアンでしか味わえない伝統麺。独特の歯ごたえある麺は、古都の井戸水で作ると言われている。豚の角煮・もやし・ハーブが絶妙。',
    tip: 'ホイアンを離れると同じ味は食べられない！',
    restaurants: [
      { name: 'Cao Lầu Trung Bắc', address: '87 Trần Phú, Hội An', hours: '08:00–21:00', mapUrl: 'https://maps.google.com/?q=Cao+Lau+Trung+Bac+Hoi+An' },
      { name: 'Quán Hà', address: '6 Trần Phú, Hội An', hours: '07:00–20:00', mapUrl: 'https://maps.google.com/?q=Quan+Ha+Cao+Lau+Hoi+An' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một tô Cao Lầu.', reading: 'チョー トイ モット トー カオ ラウ', jp: 'カオラウを一杯ください。' },
      { vn: 'Cho tôi thêm xá xíu.', reading: 'チョー トイ テム サ シウ', jp: 'チャーシューを追加してください。' },
    ],
  },
  {
    vn: 'Cơm Gà Hội An', name: 'コムガーホイアン', icon: <Utensils size={18} className="text-amber-600" />, price: '30,000〜45,000 VND', rating: 4.7,
    img: COM_GA, category: 'main',
    desc: 'ホイアン名物の鶏ご飯。ショウガ風味のご飯に蒸し鶏をのせ、特製ソースで食べる優しい味わい。地元の人にも観光客にも人気。',
    tip: 'Bà Buội（バ・ブオイ）が有名店。行列ができるほど人気',
    restaurants: [
      { name: 'Cơm Gà Bà Buội', address: '22 Phan Châu Trinh, Hội An', hours: '08:00–14:00', mapUrl: 'https://maps.google.com/?q=Com+Ga+Ba+Buoi+Hoi+An' },
      { name: 'Cơm Gà Bà Liên', address: '26 Trần Phú, Hội An', hours: '07:30–21:00', mapUrl: 'https://maps.google.com/?q=Com+Ga+Ba+Lien+Hoi+An' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một phần cơm gà.', reading: 'チョー トイ モット ファン コム ガー', jp: 'コムガーを一人前ください。' },
      { vn: 'Cho tôi thêm nước chấm.', reading: 'チョー トイ テム ヌオック チャム', jp: 'タレを追加してください。' },
    ],
  },
  {
    vn: 'Phở', name: 'フォー', icon: <CookingPot size={18} className="text-[#0ea5e9]" />, price: '40,000〜70,000 VND', rating: 4.5,
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop&auto=format',
    category: 'main',
    desc: 'ベトナムを代表するスープ麺。牛骨ベースの澄んだスープに米麺、薄切り牛肉・鶏肉をのせた一品。ライム・もやし・ハーブを入れて食べる。',
    tip: 'フォー・ボー（牛肉）とフォー・ガー（鶏肉）の2種類が定番',
    restaurants: [
      { name: 'Phở Thìn', address: '19 Đào Duy Từ, Hội An, Đà Nẵng', hours: '06:00–21:00', mapUrl: 'https://maps.app.goo.gl/psuhQrTPhQPg8mVE6' },
      { name: 'Phở Ngân', address: 'Phở Ngân, 132 Đ. Trần Cao Vân, Hội An, Đà Nẵng', hours: '06:00–21:00', mapUrl: 'https://maps.app.goo.gl/iNd1ULZZPRxPG7Ny8' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một phần phở bò.', reading: 'チョー トイ モット ファン フォー ボー', jp: '牛肉フォーを一人前ください。' },
      { vn: 'Cho tôi một phần phở gà.', reading: 'チョー トイ モット ファン フォー ガー', jp: '鶏肉フォーを一人前ください。' },
    ],
  },
  {
    vn: 'Bánh Xèo', name: 'バインセオ', icon: <Sandwich size={18} className="text-amber-500" />, price: '50,000〜80,000 VND', rating: 4.6, spicy: true,
    img: 'https://img.taste.com.au/hegWu1Xh/taste/2016/11/banh-xeo-crispy-pancakes-77516-1.jpeg',
    category: 'main',
    desc: 'ターメリック風味のパリパリなクレープ。エビ・もやし・ネギを包んで揚げ焼きにしたベトナム風パンケーキ。レタスやハーブで包んで食べる。',
    tip: '「バインセオ」は「ジューと音がするケーキ」という意味',
    restaurants: [
      { name: 'Bánh Xèo Bà Dưỡng', address: 'Ngõ Hội An, 45 Trần Hưng Đạo', hours: '10:00–20:00', mapUrl: 'https://maps.google.com/?q=Banh+Xeo+Ba+Duong+Hoi+An' },
    ],
    orderPhrases: [
      { vn: 'Cho con một cái bánh xèo.', reading: 'チョー コン モット カイ バイン セオ', jp: 'バインセオを一枚ください。' },
    ],
  },
  {
    vn: 'Bánh Mì Phượng', name: 'バインミー・フオン', icon: <Sandwich size={18} className="text-amber-600" />, price: '25,000〜40,000 VND', rating: 4.9,
    img: 'https://vnitourist.com/wp-content/uploads/2020/08/vNGW9Cd.jpg',
    category: 'snack',
    desc: 'ホイアンで最も有名なバインミー。フランスパンに自家製ハム・パテ・野菜・ソースを詰めたベトナム風サンドイッチ。Anthony Bourdainが絶賛した一品。',
    tip: 'Anthony Bourdainが「世界最高のサンドイッチ」と絶賛！朝は行列必至',
    restaurants: [
      { name: 'Bánh Mì Phượng', address: '2B Phan Châu Trinh, Hội An', hours: '06:30–21:30', mapUrl: 'https://maps.google.com/?q=Banh+Mi+Phuong+Hoi+An' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một ổ bánh mì đặc biệt.', reading: 'チョー トイ モット オー バイン ミー ダック ビエット', jp: 'スペシャルバインミーをひとつください。' },
      { vn: 'Không hành nhé!', reading: 'コン ハイン ニェ', jp: 'ネギ抜きでお願いします！' },
    ],
  },
  {
    vn: 'Bánh Bao Bánh Vạc', name: 'ホワイトローズ餃子', icon: <Utensils size={18} className="text-rose-500" />, price: '50,000〜80,000 VND', rating: 4.8,
    img: 'https://static.vinwonders.com/2023/01/banh-hoa-hong-trang-hoi-an-thumb.png',
    category: 'snack',
    desc: 'ホイアン名物の蒸し餃子。白いライスペーパーで包んだ海老入り餃子で、白いバラの花のような形が特徴。特製スープと揚げエシャロットが添えられる。',
    tip: '作り方は一家だけが知る秘伝のレシピ！White Rose Restaurantが元祖',
    restaurants: [
      { name: 'White Rose Restaurant', address: '533 Hai Bà Trưng, Hội An', hours: '07:00–21:00', mapUrl: 'https://maps.google.com/?q=White+Rose+Restaurant+Hoi+An' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một phần bánh bao bánh vạc.', reading: 'チョー トイ モット ファン バイン バオ バイン バック', jp: 'ホワイトローズを一人前ください。' },
    ],
  },
  {
    vn: 'Bánh Đập', name: 'バインダップ', icon: <Sandwich size={18} className="text-amber-700" />, price: '15,000〜25,000 VND', rating: 4.4,
    img: 'https://tse2.mm.bing.net/th/id/OIP.0a0f0Pvbk2hR9Bz5IwNCrgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'snack',
    desc: 'パリパリの揚げライスペーパーと柔らかいもちもちライスシートを重ね、エビペーストと一緒に食べるB級グルメ。屋台料理の定番。',
    tip: '「バインダップ」は「叩くケーキ」という意味。2枚重ねて叩いて食べる！',
    restaurants: [
      { name: '屋台エリア（ナイトマーケット）', address: 'Nguyễn Hoàng, Hội An (夜市)', hours: '17:00–22:00', mapUrl: 'https://maps.google.com/?q=Hoi+An+Night+Market' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi hai cái bánh đập.', reading: 'チョー トイ ハイ カイ バイン ダップ', jp: 'バインダップを2枚ください。' },
    ],
  },
  {
    vn: 'Chè', name: 'チェー（ベトナムスイーツ）', icon: <IceCream size={18} className="text-purple-500" />, price: '25,000〜50,000 VND', rating: 4.5,
    img: 'https://medianews.thieunien.vn/uploads/2024/10/14/simply-recipes-che-ba-mau-lead-2-c6162830ea634fa5ae0fab2d21276378-1728874241.jpg',
    category: 'sweet',
    desc: 'ベトナムの伝統的な甘味。豆・芋・ゼリー・ヤシミルクなど多種多様な具材を組み合わせたスープデザート。暑い日に氷入りがおすすめ。',
    tip: 'Chè Bưởi がおすすめ。',
    restaurants: [
      { name: 'Tiệm Chè Xíu', address: '157 Trần Hưng Đạo, Hội An, Đà Nẵng, Việt Nam', hours: '12:00–22:00', mapUrl: 'https://maps.app.goo.gl/6YaxrAG2CLtddZCo8' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một ly chè này.', reading: 'チョー トイ モット リー チェー ナイ', jp: 'このチェーをひとつください。' },
      { vn: 'Cho tôi hai ly chè này.', reading: 'チョー トイ ハイ リー チェー ナイ', jp: 'このチェーを2つください。' },
      { vn: 'Cho tôi ba ly chè này.', reading: 'チョー トイ バー リー チェー ナイ', jp: 'このチェーを3つください。' },
    ],
  },
  {
    vn: 'Cà Phê', name: 'コーヒー', icon: <Coffee size={18} className="text-amber-800" />, price: '30,000〜50,000 VND', rating: 4.7,
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&auto=format',
    category: 'drink',
    desc: 'ベトナム独特のエッグコーヒー。卵黄・砂糖・コンデンスミルクをホイップして、濃いコーヒーの上に乗せた濃厚デザートコーヒー。',
    tip: 'スプーンでまぜながら飲むと絶品！熱いのと冷たいのが選べます',
    restaurants: [
      { name: 'Cộng Cà Phê', address: '64 Công Nữ Ngọc Hoa, Hội An, Đà Nẵng, Việt Nam', hours: '12:00–22:00', mapUrl: 'https://maps.app.goo.gl/T9qqozsw6FHRfQrc7' },
      { name: 'Faifo Coffee', address: '130 Trần Phú, Hội An', hours: '07:30–22:00', mapUrl: 'https://maps.app.goo.gl/t5AS14vbiEoYRA4u8' },
      { name: 'Hội An Roastery', address: '135/2 Trần Phú, Hội An', hours: '07:00–22:00', mapUrl: 'https://maps.app.goo.gl/2QoYp6na2aNcNYW49' },
    ],
    orderPhrases: [
      { vn: 'Cho mình một ly này', reading: 'チョー ミン モット リー ナイ', jp: 'これを一つください。' },
    ],
  },
  {
    vn: 'Mót Hội An',
    name: 'Mót Hội An',
    icon: <Coffee size={18} className="text-emerald-600" />,
    price: '25,000〜40,000 VND',
    rating: 4.6,
    img: 'https://static.vinwonders.com/production/Mot-Hoi-An-banner.jpg',
    category: 'drink',
    desc: 'ハーブやフルーツをブレンドした、爽やかなノンアルコールハーブドリンク。ロータスリーフに包まれているのが特徴。',
    tip: 'Mót Hội Anのオーガニックハーブティーは絶品！',
    restaurants: [
      { name: 'Mót Hội An', address: '150 Trần Phú, Hội An', hours: '08:00–22:00', mapUrl: 'https://maps.app.goo.gl/r4QkRzQjRzQjRzQj' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một ly nước mót.', reading: 'チョー トイ モット リー ヌック モット', jp: 'モットを一杯ください。' },
      { vn: 'Cho tôi một ly sinh tố xoài.', reading: 'チョー トイ モット リー シン トー ソアイ', jp: 'マンゴースムージーを一杯ください。' },
    ],
  }
]

const categories = [
  { id: 'all', label: 'すべて', icon: <Utensils size={15} /> },
  { id: 'main', label: '麺・ご飯', icon: <CookingPot size={15} /> },
  { id: 'snack', label: '軽食・屋台', icon: <Sandwich size={15} /> },
  { id: 'sweet', label: 'スイーツ', icon: <IceCream size={15} /> },
  { id: 'drink', label: 'ドリンク', icon: <Coffee size={15} /> },
] as const

// ─── Food Detail Modal ───────────────────────────────────────────
function FoodModal({ food, onClose }: { food: Food; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6 overscroll-none"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.22s ease both' }}
      >
        {/* Hero image */}
        <div className="relative h-52 overflow-hidden rounded-t-3xl">
          <img src={food.img} alt={food.vn} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
          {/* Badges */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star size={10} fill="white" /> {food.rating}
            </span>
            {food.spicy && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame size={10} /> 辛い
              </span>
            )}
            <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
              {food.price}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Title */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                {food.icon}
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg leading-tight">{food.vn}</h2>
                <div className="text-sm font-medium" style={{ color: sky[500] }}>{food.name}</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">{food.desc}</p>
            {food.tip && (
              <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                <Lightbulb size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">{food.tip}</p>
              </div>
            )}
          </div>

          {/* Restaurants */}
          <div>
            <div className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <MapPin size={14} style={{ color: sky[500] }} />
              おすすめのお店・住所
            </div>
            <div className="space-y-2">
              {food.restaurants.map((r) => (
                <div key={r.name} className="bg-sky-50 border border-sky-100 rounded-xl p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 text-sm">{r.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Navigation size={10} /> {r.address}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock size={10} /> {r.hours}
                      </div>
                    </div>
                    <a
                      href={r.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors"
                      style={{ backgroundColor: sky[100], color: sky[600] }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      地図 <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order phrases */}
          <div>
            <div className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <MessageCircle size={14} style={{ color: sky[500] }} />
              注文フレーズ
            </div>
            <div className="space-y-2">
              {food.orderPhrases.map((p) => (
                <div
                  key={p.vn}
                  className="flex items-center justify-between gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
                >
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 text-sm">{p.vn}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: sky[500] }}>{p.reading}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{p.jp}</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(p.vn) }}
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: sky[100] }}
                  >
                    <Volume2 size={14} style={{ color: sky[600] }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Food card (thumbnail) ───────────────────────────────────────
function FoodDetailCard({ food, delay, onClick }: { food: Food; delay: number; onClick: () => void }) {
  return (
    <button
      className="text-left w-full anim-up hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
      style={{ animationDelay: `${delay}s` } as React.CSSProperties}
      onClick={onClick}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative h-44 overflow-hidden">
          <img
            src={food.img}
            alt={food.vn}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {food.price}
          </div>
          {food.spicy && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Flame size={10} /> 辛い
            </div>
          )}
          <div className="absolute top-2 left-2 bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star size={10} fill="white" /> {food.rating}
          </div>
          {/* Tap hint */}
          <div className="absolute bottom-2 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
            タップで詳細 →
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="font-bold text-slate-900 text-sm leading-tight">{food.vn}</div>
              <div className="text-xs font-medium mt-0.5" style={{ color: sky[500] }}>{food.name}</div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
              {food.icon}
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-2">{food.desc}</p>
          <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: sky[500] }}>
            <MapPin size={10} />
            <span>{food.restaurants[0]?.name}</span>
          </div>
        </div>
      </Card>
    </button>
  )
}

// ─── Page ────────────────────────────────────────────────────────
export default function GourmetPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'main' | 'snack' | 'sweet' | 'drink'>('all')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)

  const filtered = activeCategory === 'all' ? foods : foods.filter(f => f.category === activeCategory)

  return (
    <div>
      <SectionHeading sub="ホイアンでしか味わえない絶品グルメ">
        <UtensilsCrossed size={22} className="inline mr-2 text-sky-500" />ホイアンおすすめ料理
      </SectionHeading>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={
              activeCategory === cat.id
                ? { background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})`, color: 'white', boxShadow: `0 4px 12px ${sky[200]}` }
                : { backgroundColor: 'white', color: '#64748b', border: `1px solid ${sky[100]}` }
            }
          >
            {cat.icon} {cat.label}
            <span className="text-xs px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: activeCategory === cat.id ? 'rgba(255,255,255,0.25)' : sky[50],
                color: activeCategory === cat.id ? 'white' : sky[600],
              }}
            >
              {cat.id === 'all' ? foods.length : foods.filter(f => f.category === cat.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Food grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 anim-in" key={activeCategory}>
        {filtered.map((food, i) => (
          <FoodDetailCard key={food.vn} food={food} delay={i * 0.06} onClick={() => setSelectedFood(food)} />
        ))}
      </div>

      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden h-48 mb-6 shadow-md">
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
      <div className="rounded-3xl p-7 text-center text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, #f8b0a3ff, #89baffff)` }}
      >
        <p className="text-xl font-bold mb-1">ぜひ一度食べてみてください！</p>
        <p className="text-white/70 text-sm">Hãy thử một lần nhé！</p>
      </div>

      {/* Food Detail Modal */}
      {selectedFood && <FoodModal food={selectedFood} onClose={() => setSelectedFood(null)} />}
    </div>
  )
}
