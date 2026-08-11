import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  MessageCircle, MapPin, Star, Flame, X, ExternalLink, Volume2,
  Navigation, Utensils, CookingPot, Sandwich, IceCream, Coffee,
  Lightbulb, Clock, UtensilsCrossed, Heart,
} from 'lucide-react'
import { MI_QUANG, CAO_LAU, COM_GA, HOI_AN_STREET, type FavoriteItem } from '@/types'
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
    vn: 'Mì Quảng', name: 'ミークアン', icon: <CookingPot size={18} className="text-[#c8741a]" />, price: '35,000〜50,000 VND', rating: 4.8,
    img: MI_QUANG, category: 'main',
    desc: 'ベトナム中部名物の麺料理。幅広の黄色い麺に、豚肉・エビ・ピーナッツをのせた一品。スープが少なく、具材の旨みが凝縮されている。',
    tip: 'ライスペーパーやハーブを一緒に入れて食べるのが現地流',
    restaurants: [
      { name: 'Mì Quảng Ông Hai - Mr. Hai Noodles', address: '6A Trương Minh Lượng, Hội An, Quảng Nam, Việt Nam', hours: '08:00–21:00', mapUrl: 'https://maps.app.goo.gl/YruP9HsMBjPT55PG8' },
      { name: 'Mì Quảng 92', address: '112A Đ. Trần Cao Vân, Hội An, Quảng Nam, Việt Nam', hours: '06:30–20:00', mapUrl: 'https://maps.app.goo.gl/9oDqDv3oWUV8TVtY7' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một tô Mì Quảng.', reading: 'チョー トイ モット トー ミー クアン', jp: 'ミークアンを一杯ください。' },
      { vn: 'Cho tôi thêm rau.', reading: 'チョー トイ テム ザウ', jp: '野菜を追加してください。' },
      { vn: 'Không cay nhé!', reading: 'コン カイ ニェ', jp: '辛くしないでください！' },
    ],
  },
  {
    vn: 'Cao Lầu', name: 'カオラウ', icon: <CookingPot size={18} className="text-[#c8741a]" />, price: '40,000〜60,000 VND', rating: 4.9,
    img: CAO_LAU, category: 'main',
    desc: 'ホイアンでしか味わえない伝統麺。独特の歯ごたえある麺は、古都の井戸水で作ると言われている。豚の角煮・もやし・ハーブが絶妙。',
    tip: 'ホイアンを離れると同じ味は食べられない！',
    restaurants: [
      { name: 'Quán Cao lầu Bá Lễ', address: '49/3 Trần Hưng Đạo, Hội An, Quảng Nam', hours: '08:00–21:00', mapUrl: 'https://maps.app.goo.gl/ZyjkYtF6a5mJu57U8' },
      { name: 'Quán Cao Lầu Thanh', address: '26 Thái Phiên, Hội An, Quảng Nam, Việt Nam', hours: '07:00–19:00', mapUrl: 'https://maps.app.goo.gl/mK6ntNZ5u9MZ85V89' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một tô Cao Lầu.', reading: 'チョー トイ モット トー カオ ラウ', jp: 'カオラウを一杯ください。' },
      { vn: 'Cho tôi thêm xá xíu.', reading: 'チョー トイ テム サ シウ', jp: 'チャーシューを追加してください。' },
    ],
  },
  {
    vn: 'Cơm Gà Hội An', name: 'コムガーホイアン', icon: <Utensils size={18} className="text-[#c8741a]" />, price: '30,000〜45,000 VND', rating: 4.7,
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
    vn: 'Phở', name: 'フォー', icon: <CookingPot size={18} className="text-[#3d6b63]" />, price: '40,000〜70,000 VND', rating: 4.5,
    img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop&auto=format',
    category: 'main',
    desc: 'ベトナムを代表するスープ麺。牛骨ベースの澄んだスープに米麺、薄切り牛肉・鶏肉をのせた一品。ライム・もやし・ハーブを入れて食べる。',
    tip: 'フォー・ボー（牛肉）とフォー・ガー（鶏肉）の2種類が定番',
    restaurants: [
      { name: 'Phở Thìn', address: '19 Đào Duy Từ, Hội An, Quảng Nam', hours: '06:00–21:00', mapUrl: 'https://maps.app.goo.gl/psuhQrTPhQPg8mVE6' },
      { name: 'Phở Ngân', address: '132 Đ. Trần Cao Vân, Hội An, Quảng Nam', hours: '06:00–21:00', mapUrl: 'https://maps.app.goo.gl/iNd1ULZZPRxPG7Ny8' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một phần phở bò.', reading: 'チョー トイ モット ファン フォー ボー', jp: '牛肉フォーを一人前ください。' },
      { vn: 'Cho tôi một phần phở gà.', reading: 'チョー トイ モット ファン フォー ガー', jp: '鶏肉フォーを一人前ください。' },
    ],
  },
  {
    vn: 'Bánh Xèo', name: 'バインセオ', icon: <Sandwich size={18} className="text-[#c8741a]" />, price: '50,000〜80,000 VND', rating: 4.6, spicy: true,
    img: 'https://img.taste.com.au/hegWu1Xh/taste/2016/11/banh-xeo-crispy-pancakes-77516-1.jpeg',
    category: 'main',
    desc: 'ターメリック風味のパリパリなクレープ。エビ・もやし・ネギを包んで揚げ焼きにしたベトナム風パンケーキ。レタスやハーブで包んで食べる。',
    tip: 'ホイアン旧市街周辺の名店「Bánh Xèo Sông Hoài」が有名！',
    restaurants: [
      { name: 'Bánh Xèo Sông Hoài', address: '59/32 Đ. 18 Tháng 8, Hội An, Quảng Nam', hours: '10:00–21:00', mapUrl: 'https://maps.google.com/?q=Banh+Xeo+Song+Hoai+Hoi+An' },
    ],
    orderPhrases: [
      { vn: 'Cho con một cái bánh xèo.', reading: 'チョー コン モット カイ バイン セオ', jp: 'バインセオを一枚ください。' },
    ],
  },
  {
    vn: 'Bánh Mì Phượng', name: 'バインミー・フオン', icon: <Sandwich size={18} className="text-[#c8741a]" />, price: '25,000〜40,000 VND', rating: 4.9,
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
    vn: 'Bánh Bao Bánh Vạc', name: 'ホワイトローズ餃子', icon: <Utensils size={18} className="text-[#c8741a]" />, price: '50,000〜80,000 VND', rating: 4.8,
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
    vn: 'Bánh Đập', name: 'バインダップ', icon: <Sandwich size={18} className="text-[#8b5e3c]" />, price: '15,000〜25,000 VND', rating: 4.4,
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
    vn: 'Chè', name: 'チェー（ベトナムスイーツ）', icon: <IceCream size={18} className="text-[#3d6b63]" />, price: '25,000〜50,000 VND', rating: 4.5,
    img: 'https://medianews.thieunien.vn/uploads/2024/10/14/simply-recipes-che-ba-mau-lead-2-c6162830ea634fa5ae0fab2d21276378-1728874241.jpg',
    category: 'sweet',
    desc: 'ベトナムの伝統的な甘味。豆・芋・ゼリー・ヤシミルクなど多種多様な具材を組み合わせたスープデザート。暑い日に氷入りがおすすめ。',
    tip: 'Chè Bưởi がおすすめ。',
    restaurants: [
      { name: 'Tiệm Chè Xíu', address: '157 Trần Hưng Đạo, Hội An, Quảng Nam', hours: '12:00–22:00', mapUrl: 'https://maps.app.goo.gl/6YaxrAG2CLtddZCo8' },
    ],
    orderPhrases: [
      { vn: 'Cho tôi một ly chè này.', reading: 'チョー トイ モット リー チェー ナイ', jp: 'このチェーをひとつください。' },
      { vn: 'Cho tôi hai ly chè này.', reading: 'チョー トイ ハイ リー チェー ナイ', jp: 'このチェーを2つください。' },
      { vn: 'Cho tôi ba ly chè này.', reading: 'チョー トイ バー リー チェー ナイ', jp: 'このチェーを3つください。' },
    ],
  },
  {
    vn: 'Cà Phê', name: 'コーヒー', icon: <Coffee size={18} className="text-[#8b5e3c]" />, price: '30,000〜50,000 VND', rating: 4.7,
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&auto=format',
    category: 'drink',
    desc: 'ベトナム独特のエッグコーヒー。卵黄・砂糖・コンデンスミルクをホイップして、濃いコーヒーの上に乗せた濃厚デザートコーヒー。',
    tip: 'スプーンでまぜながら飲むと絶品！熱いのと冷たいのが選べます',
    restaurants: [
      { name: 'Cộng Cà Phê', address: '64 Công Nữ Ngọc Hoa, Hội An, Quảng Nam', hours: '12:00–22:00', mapUrl: 'https://maps.app.goo.gl/T9qqozsw6FHRfQrc7' },
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
    icon: <Coffee size={18} className="text-[#3d6b63]" />,
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
  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-4 sm:p-6 overscroll-none"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#1a1208]/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#faf8f3] border border-[#e8e0d0] rounded-3xl shadow-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.22s ease both' }}
      >
        {/* Hero image */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl bg-[#d4c8b0]">
          <img src={food.img} alt={food.vn} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-[#1a1208]/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#1a1208] transition-colors border border-white/20 text-white cursor-pointer"
          >
            <X size={16} />
          </button>
          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="bg-[#c8741a] text-white text-xs px-2.5 py-1 rounded-full font-sans font-medium flex items-center gap-1">
              <Star size={11} fill="white" /> {food.rating}
            </span>
            {food.spicy && (
              <span className="bg-rose-600 text-white text-xs px-2.5 py-1 rounded-full font-sans font-medium flex items-center gap-1">
                <Flame size={11} /> 辛い
              </span>
            )}
            <span className="bg-[#1a1208]/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-sans border border-white/20">
              {food.price}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center flex-shrink-0">
                {food.icon}
              </div>
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#1a1208] leading-tight">{food.vn}</h2>
                <div className="font-sans text-xs font-medium text-[#c8741a] mt-0.5">{food.name}</div>
              </div>
            </div>
            <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed mt-3.5">{food.desc}</p>
            {food.tip && (
              <div className="mt-4 bg-[#fffdf9] border-l-4 border-l-[#c8741a] border border-[#e8e0d0] rounded-xl p-3.5 flex items-start gap-2.5">
                <Lightbulb size={16} className="text-[#c8741a] flex-shrink-0 mt-0.5" />
                <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{food.tip}</p>
              </div>
            )}
          </div>

          {/* Restaurants */}
          <div>
            <div className="font-serif text-sm font-medium text-[#1a1208] mb-3 flex items-center gap-2">
              <MapPin size={15} className="text-[#c8741a]" />
              おすすめのお店・住所
            </div>
            <div className="space-y-2.5">
              {food.restaurants.map((r) => (
                <div key={r.name} className="bg-[#f5f1ea] border border-[#e8e0d0] rounded-xl p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-sans text-xs font-medium text-[#1a1208]">{r.name}</div>
                      <div className="font-sans text-[11px] text-[#7a6447] mt-1 flex items-center gap-1">
                        <Navigation size={10} /> {r.address}
                      </div>
                      <div className="font-sans text-[11px] text-[#7a6447]/80 mt-0.5 flex items-center gap-1">
                        <Clock size={10} /> {r.hours}
                      </div>
                    </div>
                    <a
                      href={r.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-1 font-sans text-xs font-medium px-3 py-1.5 rounded-lg transition-colors bg-[#c8741a] text-white hover:bg-[#a85e12]"
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
            <div className="font-serif text-sm font-medium text-[#1a1208] mb-3 flex items-center gap-2">
              <MessageCircle size={15} className="text-[#3d6b63]" />
              注文フレーズ
            </div>
            <div className="space-y-2.5">
              {food.orderPhrases.map((p) => (
                <div
                  key={p.vn}
                  className="flex items-center justify-between gap-3 bg-[#f5f1ea] rounded-xl px-4 py-3 border border-[#e8e0d0]"
                >
                  <div className="flex-1">
                    <div className="font-serif text-base font-normal text-[#1a1208]">{p.vn}</div>
                    <div className="font-sans text-xs font-medium text-[#3d6b63] mt-0.5">{p.reading}</div>
                    <div className="font-sans text-xs font-light text-[#7a6447] mt-0.5">{p.jp}</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(p.vn) }}
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#3d6b63]/10 border border-[#3d6b63]/30 text-[#3d6b63] hover:bg-[#3d6b63] hover:text-white transition-colors cursor-pointer"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Food card (thumbnail) ───────────────────────────────────────
function FoodDetailCard({
  food,
  delay,
  onClick,
  isFav,
  onToggleFav,
}: {
  food: Food
  delay: number
  onClick: () => void
  isFav?: boolean
  onToggleFav?: () => void
}) {
  return (
    <button
      className="text-left w-full anim-up hover:border-[#c8741a] hover:-translate-y-1 transition-all rounded-2xl overflow-hidden cursor-pointer focus:outline-none relative group"
      style={{ animationDelay: `${delay}s` } as React.CSSProperties}
      onClick={onClick}
    >
      <Card className="overflow-hidden h-full bg-[#faf8f3]">
        <div className="relative h-44 overflow-hidden bg-[#d4c8b0]">
          <img
            src={food.img}
            alt={food.vn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/70 via-transparent to-transparent" />
          
          {/* Heart button */}
          {onToggleFav && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleFav()
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#faf8f3]/90 backdrop-blur-md flex items-center justify-center shadow-2xs border border-[#e8e0d0] active:scale-90 transition-all cursor-pointer"
            >
              <Heart size={14} className={isFav ? 'fill-rose-500 text-rose-500' : 'text-[#7a6447]'} />
            </button>
          )}

          <div className="absolute bottom-2 left-3 bg-[#1a1208]/60 backdrop-blur-sm text-white text-[11px] font-sans px-2.5 py-0.5 rounded-full border border-white/20">
            {food.price}
          </div>
          {food.spicy && (
            <div className={`absolute top-3 ${onToggleFav ? 'right-13' : 'right-3'} bg-rose-600 text-white text-[10px] font-sans px-2 py-0.5 rounded-full flex items-center gap-1`}>
              <Flame size={10} /> 辛い
            </div>
          )}
          <div className="absolute top-3 left-3 bg-[#c8741a] text-white text-[10px] font-sans font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star size={10} fill="white" /> {food.rating}
          </div>
          {/* Tap hint */}
          <div className="absolute bottom-2 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-sans px-2 py-0.5 rounded-full">
            詳細 →
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="font-serif text-base font-normal text-[#1a1208] leading-tight">{food.vn}</div>
              <div className="font-sans text-xs font-medium text-[#c8741a] mt-0.5">{food.name}</div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center flex-shrink-0">
              {food.icon}
            </div>
          </div>
          <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed mt-1 line-clamp-2">{food.desc}</p>
          <div className="mt-2.5 flex items-center gap-1 font-sans text-[11px] text-[#3d6b63]">
            <MapPin size={10} />
            <span className="truncate">{food.restaurants[0]?.name}</span>
          </div>
        </div>
      </Card>
    </button>
  )
}

// ─── Page ────────────────────────────────────────────────────────
interface GourmetPageProps {
  isFavorite?: (id: string) => boolean
  toggleFavorite?: (item: FavoriteItem) => void
}

export default function GourmetPage({ isFavorite, toggleFavorite }: GourmetPageProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'main' | 'snack' | 'sweet' | 'drink'>('all')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)

  const filtered = activeCategory === 'all' ? foods : foods.filter(f => f.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-sans">
      <SectionHeading tag="HOI AN GOURMET" sub="ホイアンでしか味わえない、伝統のローカル料理">
        ホイアン名物グルメガイド
      </SectionHeading>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8 border-b border-[#e8e0d0] pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer"
            style={
              activeCategory === cat.id
                ? { background: '#c8741a', color: 'white', border: '1px solid #c8741a' }
                : { backgroundColor: '#faf8f3', color: '#7a6447', border: '1px solid #e8e0d0' }
            }
          >
            {cat.icon} {cat.label}
            <span className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: activeCategory === cat.id ? 'rgba(255,255,255,0.25)' : '#f5f1ea',
                color: activeCategory === cat.id ? 'white' : '#7a6447',
              }}
            >
              {cat.id === 'all' ? foods.length : foods.filter(f => f.category === cat.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Food grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 anim-in" key={activeCategory}>
        {filtered.map((food, i) => {
          const favId = `gourmet-${food.vn}`
          const isFav = isFavorite ? isFavorite(favId) : false
          return (
            <FoodDetailCard
              key={food.vn}
              food={food}
              delay={i * 0.06}
              onClick={() => setSelectedFood(food)}
              isFav={isFav}
              onToggleFav={
                toggleFavorite
                  ? () =>
                      toggleFavorite({
                        id: favId,
                        type: 'gourmet',
                        title: food.name,
                        titleVi: food.vn,
                        categoryTag: food.price,
                        priceOrArea: food.price,
                        img: food.img,
                        mapUrl: food.restaurants[0]?.mapUrl,
                      })
                  : undefined
              }
            />
          )
        })}
      </div>

      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden h-48 mb-8 border border-[#e8e0d0]">
        <img src={HOI_AN_STREET} alt="Hoi An street" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1208]/80 via-[#1a1208]/40 to-transparent flex items-center p-8">
          <div>
            <div className="font-serif text-white font-normal text-xl flex items-center gap-2 mb-1">
              <MapPin size={18} className="text-[#c8741a]" /> ホイアン古都の食文化
            </div>
            <div className="font-sans text-white/70 text-xs font-light tracking-wide">ユネスコ世界遺産 · Quảng Nam Province</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl p-8 text-center text-white border border-[#c8741a]/30 bg-[#1e1408]">
        <p className="font-serif text-2xl font-light mb-2 text-[#c8741a]">ぜひ一度、食べてみてください！</p>
        <p className="font-sans text-white/70 text-xs tracking-wider">Hãy thưởng thức ẩm thực độc đáo của Hội An nhé！</p>
      </div>

      {/* Food Detail Modal */}
      {selectedFood && <FoodModal food={selectedFood} onClose={() => setSelectedFood(null)} />}
    </div>
  )
}
