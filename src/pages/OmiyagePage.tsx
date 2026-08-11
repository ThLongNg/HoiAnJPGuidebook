import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Heart, MapPin, Clock, ShoppingBag, Store, Lightbulb, Sparkles, Star,
  ChevronRight, Filter, Package, Plane, Shirt, FlaskConical, Gem, Tag,
  ExternalLink, Moon, X, Layers, UtensilsCrossed,
} from 'lucide-react'
import { type FavoriteItem } from '@/types'
import { SectionHeading } from '@/components/Atoms'

type Category = 'すべて' | '中秋節月餅' | 'お菓子・食品' | '美容・コスメ' | '雑貨・工芸' | 'ファッション'

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
  isCollection?: boolean
}

interface MooncakeItem {
  id: number
  code: string
  name: string
  nameVi: string
  priceJpy: string
  priceVnd: string
  typeGroup: '高級ギフト' | 'Lava流心' | '伝統焼き月餅' | '伝統モチ白餅' | 'ヘルシー＆キッズ'
  tag: string
  ingredients: string
  desc: string
  img: string
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

const KINH_DO_MOONCAKE_IMG = 'https://th.bing.com/th/id/R.f6b0d6f6999a2b50ad299961f70e3833?rik=JgFIpjyrQllGsA&riu=http%3a%2f%2fmedia.vietq.vn%2ffiles%2fsu_that_banh_trung_thu_kinh_do.jpg&ehk=tmLaZh1JJrIITar8hXhQ1id5ef0JfIyX%2bwaFWQjsEWA%3d&risl=&pid=ImgRaw&r=0'

const MOONCAKE_ITEMS: MooncakeItem[] = [
  {
    id: 1,
    code: 'KC',
    name: '【高級木箱】桂花望月 プレミアム中秋月餅ボックス (6個入)',
    nameVi: 'Quế Hoa Vọng Nguyệt (Hộp 6 Bánh)',
    priceJpy: '¥12,000',
    priceVnd: '2,000,000 VND',
    typeGroup: '高級ギフト',
    tag: '中秋高級限定',
    ingredients: 'キンモクセイ（桂花）エキス、フカヒレ、燕の巣、塩漬け卵黄',
    desc: 'Kinh Đô最高級の中秋限定ギフト。金箔をあしらった豪華木箱に贅沢な特製餡が詰まった至高のアソート。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 2,
    code: 'LAVA6',
    name: 'Lavaとろける塩卵カスタード流心月餅 (6個入)',
    nameVi: 'Hộp Lava Trứng Chảy (Hộp 6 Bánh)',
    priceJpy: '¥3,000',
    priceVnd: '500,000 VND',
    typeGroup: 'Lava流心',
    tag: 'SNS話題 No.1',
    ingredients: '塩漬け卵黄（咸蛋）、バターカスタード、生クリーム',
    desc: 'カットした瞬間に濃厚な塩卵カスタードのソースがとろ〜り溢れ出る現代風大人気月餅。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 3,
    code: 'MINI4',
    name: 'ミニLavaとろけるカスタード月餅 (4個入)',
    nameVi: 'Hộp Mini Lava Tan Chảy (Hộp 4 Bánh)',
    priceJpy: '¥900',
    priceVnd: '150,000 VND',
    typeGroup: 'Lava流心',
    tag: '手軽なお試し',
    ingredients: 'とろけるカスタード餡、塩漬け卵黄',
    desc: '一口サイズで食べやすいミニ流心月餅。女子旅のおやつや気軽なバラマキお配り用にも重宝。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 4,
    code: 'T6',
    name: '日本の雪餅・モチモチスノー月餅 (6個入)',
    nameVi: 'Hộp Bánh Trung Thu Tuyết (Hộp 6 Bánh)',
    priceJpy: '¥3,000',
    priceVnd: '500,000 VND',
    typeGroup: '伝統モチ白餅',
    tag: 'ひんやり食感',
    ingredients: '求肥もち米皮、抹茶餡、柚子ペースト',
    desc: '和菓子の求肥もちの技術を取り入れたひんやりモチモチした新感覚の和風月餅。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 5,
    code: 'HQD',
    name: '【Combo 4個入】富貴満堂 定番中秋月餅ボックス',
    nameVi: 'Hộp Bánh Phú Quý Mãn Đường (Combo 4 Bánh)',
    priceJpy: '¥3,318',
    priceVnd: '553,000 VND',
    typeGroup: '高級ギフト',
    tag: '定番人気ギフト',
    ingredients: '五目五穀、ローストチキン、緑豆餡、ハスの実餡',
    desc: 'ベトナムで最も親しまれている伝統の焼き月餅4種セット。贈答用に最適。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 6,
    code: '24',
    name: '【ずっしり800g!】XOソースチキン＆塩卵4個入り特大焼き月餅',
    nameVi: 'Bánh Nướng Gà Quay Sốt XO 4 Trứng (800g)',
    priceJpy: '¥2,628',
    priceVnd: '438,000 VND',
    typeGroup: '伝統焼き月餅',
    tag: '塩卵4個入り豪華版',
    ingredients: '塩漬け卵黄4個、XOソースローストチキン、スイカの種、ハスの実',
    desc: '重さ800gの超ビッグサイズ！ご家族で切り分けて楽しむ伝統月餅。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 7,
    code: 'B',
    name: '高級アワビ（鮑）＆ローストチキン特製焼き月餅',
    nameVi: 'Bánh Nướng Bào Ngư (2 Trứng - 210g)',
    priceJpy: '¥1,128',
    priceVnd: '188,000 VND',
    typeGroup: '伝統焼き月餅',
    tag: '高級アワビ入り',
    ingredients: 'アワビ（鮑）、ローストチキン、ハスの実、塩漬け卵黄2個',
    desc: '贅沢な海の幸アワビの旨みと塩卵が引き立つ最高級焼き月餅。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 8,
    code: '4',
    name: 'ベトナム伝統風五目サラミ＆ナッツ焼き月餅',
    nameVi: 'Bánh Nướng Lạp Xưởng Ngũ Hạt (2 Trứng - 210g)',
    priceJpy: '¥828',
    priceVnd: '138,000 VND',
    typeGroup: '伝統焼き月餅',
    tag: 'ベトナム王道の味',
    ingredients: 'ベトナムサラミ（Lạp Xưởng）、アーモンド、スイカの種、塩卵2個',
    desc: '香ばしいナッツと甘塩っぱいサラミのバランスが絶妙な王道伝統餅。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 9,
    code: 'T',
    name: 'ハスの実餡＆宇治抹茶ペースト焼き月餅',
    nameVi: 'Bánh Nướng Hạt Sen Trà Xanh (210g)',
    priceJpy: '¥690',
    priceVnd: '115,000 VND',
    typeGroup: '伝統焼き月餅',
    tag: '女子旅一番人気',
    ingredients: 'ベトナム特産ハスの実ペースト、上品な抹茶風味餡',
    desc: '自然なやさしい甘みとほのかな苦みが調和した甘さ控えめな人気月餅。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 10,
    code: 'C1',
    name: '若もち米（コム）＆シャキシャキココナッツ焼き月餅',
    nameVi: 'Bánh Nướng Cốm Dừa (0 Trứng - 150g)',
    priceJpy: '¥444',
    priceVnd: '74,000 VND',
    typeGroup: '伝統焼き月餅',
    tag: '名物コム＆ココナッツ',
    ingredients: 'ハノイ風若もち米（Cốm）、シャキシャキココナッツ果肉',
    desc: '爽やかな新米の香りとココナッツの心地よい食感が楽しめる爽やかスイーツ。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 11,
    code: '82',
    name: '【伝統白もち】ハスの実＆スイカの種入り バインデオ',
    nameVi: 'Bánh Dẻo Hạt Sen Hạt Dưa (1 Trứng - 230g)',
    priceJpy: '¥510',
    priceVnd: '85,000 VND',
    typeGroup: '伝統モチ白餅',
    tag: '伝統白もち（Bánh Dẻo）',
    ingredients: 'もち米パウダー、ハスの実ペースト、スイカの種、塩卵1個',
    desc: 'ベトナム伝統のしっとり柔らかい白いお餅皮（バインデオ）でなめらかなハスの実餡を包んだ一品。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 12,
    code: '99',
    name: '【伝統白もち】トロピカル芳醇ドリアン白もち月餅',
    nameVi: 'Bánh Dẻo Sầu Riêng (0 Trứng - 180g)',
    priceJpy: '¥372',
    priceVnd: '62,000 VND',
    typeGroup: '伝統モチ白餅',
    tag: '南国ドリアン風味',
    ingredients: '南国フルーツ王ドリアン餡、もち米パウダー',
    desc: '濃厚な香りとクリーミーな甘みがモチモチの皮からあふれる南国ならではの伝統もち月餅。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 13,
    code: 'XHS',
    name: '【精進・ヘルシー】ハスの実＆チアシードのヴィーガン月餅',
    nameVi: 'Bánh Ăn Chay Hạt Sen Hạt Chia (150g)',
    priceJpy: '¥480',
    priceVnd: '80,000 VND',
    typeGroup: 'ヘルシー＆キッズ',
    tag: '精進・チアシード入り',
    ingredients: '有機チアシード、天然ハスの実餡、ひまわり油',
    desc: '砂糖控えめで動物性食材ゼロ。ヘルシー志向の方や精進料理好きな方に。',
    img: KINH_DO_MOONCAKE_IMG,
  },
  {
    id: 14,
    code: 'LV',
    name: '【可愛いミニ月餅】金獅子舞デザイン チョコ月餅',
    nameVi: 'Bánh Trung Thu Thiếu Nhi Lân Vàng (60g)',
    priceJpy: '¥210',
    priceVnd: '35,000 VND',
    typeGroup: 'ヘルシー＆キッズ',
    tag: '可愛い金獅子型',
    ingredients: 'チョコレートカスタード、小麦粉',
    desc: '中秋節の踊り「金獅子舞（Lân Vàng）」をモチーフにしたキュートなお子様・可愛いお土産用ミニ月餅。',
    img: KINH_DO_MOONCAKE_IMG,
  },
]

const ITEMS: Item[] = [
  {
    id: 100,
    name: 'ベトナム伝統中秋節月餅コレクション',
    nameVi: 'Bánh Trung Thu Kinh Đô (Bộ sưu tập 14 loại)',
    priceJpy: '¥210〜',
    priceVnd: '35,000 VND〜',
    category: '中秋節月餅',
    tag: '中秋節 限定14選 🥮',
    desc: '【タップして全14種類を一覧表示 🥮】伝統の焼き月餅（Bánh Nướng）、モチモチ白餅（Bánh Dẻo）、Lava流心卵、高級木箱まで厳選14種類の月餅コレクション。',
    img: KINH_DO_MOONCAKE_IMG,
    alt: 'Bánh Trung Thu Collection',
    isCollection: true,
  },
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
    accentColor: '#c8741a',
    mapUrl: 'https://maps.google.com/?q=Reaching+Out+Arts+Crafts+Hoi+An',
  },
  {
    name: 'Pheva Chocolate (フェバ・ショコラティエ)',
    nameJp: 'フェバ チョコレート ダナン / ホイアン',
    area: 'ダナン市街 / ホイアン旧市街',
    hours: '08:00 — 19:00',
    note: 'フランス仕込みのベトナム産クラフトチョコ店。カラフルな箱を選んで18種類の味をカスタム詰め合わせ。保冷バッグ付きで安心。',
    icon: <ShoppingBag size={20} />,
    accentColor: '#3d6b63',
    mapUrl: 'https://maps.google.com/?q=Pheva+Chocolate+Da+Nang',
  },
  {
    name: 'Cocobox (ココボックス)',
    nameJp: 'ココボックス オーガニックショップ＆カフェ',
    area: 'ホイアン旧市街 (Lê Lợi通り)',
    hours: '07:00 — 21:00',
    note: 'オーガニックにこだわったレトロナチュラルなお店。自家製フルーツジャム、ココナッツオイル、ハーブティー、カカオニブが美しい。',
    icon: <Store size={20} />,
    accentColor: '#8b5e3c',
    mapUrl: 'https://maps.google.com/?q=Cocobox+Hoi+An',
  },
  {
    name: 'Chợ Hàn (ハン市場)',
    nameJp: 'ダナン ハン市場（ローカルマーケット）',
    area: 'ダナン市 ハン橋近く',
    hours: '06:00 — 19:00',
    note: 'プラかごバッグ・ドライマンゴー・カシューナッツの宝庫。2階にプラかごが並びます。「Bớt giá được không? (安くして)」と笑顔で交渉しよう！',
    icon: <Tag size={20} />,
    accentColor: '#c8741a',
    mapUrl: 'https://maps.google.com/?q=Han+Market+Da+Nang',
  },
  {
    name: 'Chợ Đêm Hội An (ホイアン夜市)',
    nameJp: 'ホイアン ナイトマーケット',
    area: 'ホイアン Nguyễn Hoàng通り',
    hours: '17:00 — 22:00',
    note: 'アンホイ島で毎夜開催される賑やかな夜市。カラフルなミニランタン、木彫り細工、アジアンアクセサリーを露店で楽しく選べます。',
    icon: <Star size={20} />,
    accentColor: '#3d6b63',
    mapUrl: 'https://maps.google.com/?q=Hoi+An+Night+Market',
  },
  {
    name: 'Metiseko (メティセコ)',
    nameJp: '高級オーガニックシルクブティック',
    area: 'ホイアン旧市街 (Trần Phú通り)',
    hours: '08:30 — 21:30',
    note: 'フランス人デザイナーが手掛けるハイエンドシルクブランド。オーガニックシルク100%のスカーフやドレスは特別な自分へのご褒美に。',
    icon: <Gem size={20} />,
    accentColor: '#8b5e3c',
    mapUrl: 'https://maps.google.com/?q=Metiseko+Hoi+An',
  },
]

const TIPS = [
  { icon: <Package size={22} />, tip: '値段交渉は笑顔でスマートに', detail: 'ハン市場や夜市では「Bớt giá được không? (安くして)」と笑顔で交渉するのが買い物のコツ！', color: '#c8741a' },
  { icon: <FlaskConical size={22} />, tip: '100ml超の液体類は受託手荷物へ', detail: 'ココナッツオイルやジャム、ハチミツは機内持ち込み不可です。必ずスーツケースへ！', color: '#3d6b63' },
  { icon: <Plane size={22} />, tip: '生の果物は日本持ち込みNG', detail: 'マンゴーなど生の果物は日本への持ち込み禁止。個包装のドライマンゴーがおすすめ！', color: '#8b5e3c' },
]

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  'すべて': <Filter size={14} />,
  '中秋節月餅': <Moon size={14} className="text-[#c8741a] fill-[#c8741a]/30" />,
  'お菓子・食品': <UtensilsCrossed size={14} />,
  '美容・コスメ': <Sparkles size={14} />,
  '雑貨・工芸': <Gem size={14} />,
  'ファッション': <Shirt size={14} />,
}

const CATEGORIES: Category[] = ['すべて', '中秋節月餅', 'お菓子・食品', '美容・コスメ', '雑貨・工芸', 'ファッション']

interface OmiyagePageProps {
  isFavorite?: (id: string) => boolean
  toggleFavorite?: (item: FavoriteItem) => void
}

export default function OmiyagePage({ isFavorite, toggleFavorite }: OmiyagePageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('すべて')
  const [localHearts, setLocalHearts] = useState<Record<number, boolean>>({})
  const [activeTab, setActiveTab] = useState<'items' | 'shops'>('items')
  const [isMooncakeModalOpen, setIsMooncakeModalOpen] = useState(false)
  const [mooncakeGroup, setMooncakeGroup] = useState<string>('すべて')

  useEffect(() => {
    if (isMooncakeModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMooncakeModalOpen])

  const filtered = activeCategory === 'すべて' ? ITEMS : ITEMS.filter((i) => i.category === activeCategory)

  function checkFav(id: number) {
    if (isFavorite) {
      return isFavorite(`omiyage-${id}`)
    }
    return !!localHearts[id]
  }

  function handleToggleFav(item: Item) {
    if (toggleFavorite) {
      toggleFavorite({
        id: `omiyage-${item.id}`,
        type: 'omiyage',
        title: item.name,
        titleVi: item.nameVi,
        categoryTag: item.tag,
        priceOrArea: item.priceJpy,
        img: item.img,
      })
    } else {
      setLocalHearts((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
    }
  }

  const wishCount = ITEMS.filter((i) => checkFav(i.id)).length

  const filteredMooncakes = mooncakeGroup === 'すべて'
    ? MOONCAKE_ITEMS
    : MOONCAKE_ITEMS.filter((m) => m.typeGroup === mooncakeGroup)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-sans">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e8e0d0] mb-8">
        <SectionHeading tag="SOUVENIR GUIDE" sub="ベトナム・ホイアンで選ぶ、センス溢れるお土産セレクション">
          お土産・買い物ガイド
        </SectionHeading>

        {/* Wishlist Heart Counter Badge */}
        <div
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all shadow-2xs ${wishCount > 0
            ? 'bg-[#fffdf9] border-[#c8741a] text-[#c8741a] font-medium'
            : 'bg-[#faf8f3] border-[#e8e0d0] text-[#7a6447]'
            }`}
        >
          <Heart size={14} className={wishCount > 0 ? 'fill-[#c8741a] text-[#c8741a]' : 'text-[#7a6447]'} />
          <span className="font-sans text-xs">{wishCount}</span>
        </div>
      </div>

      {/* Main Tab bar */}
      <div className="bg-[#f5f1ea] border border-[#e8e0d0] rounded-2xl p-1.5 flex mb-8">
        {[
          { key: 'items', IconComp: ShoppingBag, label: 'おすすめお土産' },
          { key: 'shops', IconComp: MapPin, label: 'お土産ショップ・市場' },
        ].map(({ key, IconComp, label }) => {
          const active = activeTab === key
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'items' | 'shops')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer ${active
                ? 'bg-[#c8741a] text-white shadow-2xs'
                : 'text-[#7a6447] hover:text-[#1a1208]'
                }`}
            >
              <IconComp size={15} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Sub-Tab 1: Recommended Items */}
      {activeTab === 'items' && (
        <div className="space-y-8">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap border-b border-[#e8e0d0] pb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveCategory(c)
                  if (c === '中秋節月餅') {
                    setIsMooncakeModalOpen(true)
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-medium transition-all cursor-pointer"
                style={
                  activeCategory === c
                    ? { background: '#c8741a', color: 'white', border: '1px solid #c8741a' }
                    : { backgroundColor: '#faf8f3', color: '#7a6447', border: '1px solid #e8e0d0' }
                }
              >
                {CATEGORY_ICONS[c]}
                {c}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              item.isCollection ? (
                <div
                  key={item.id}
                  onClick={() => setIsMooncakeModalOpen(true)}
                  className="bg-[#faf8f3] rounded-2xl border-2 border-[#c8741a] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer group relative"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-48 bg-[#d4c8b0] overflow-hidden">
                      <img src={item.img} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/70 via-transparent to-transparent" />

                      {/* Tag badge */}
                      <div className="absolute top-3 left-3 bg-[#c8741a] text-white font-sans font-medium text-[10px] px-3 py-1 rounded-full shadow-2xs flex items-center gap-1">
                        <Moon size={11} className="fill-amber-200 text-amber-200" />
                        {item.tag}
                      </div>

                      {/* Heart button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleFav(item) }}
                        className="absolute top-3 right-3 w-8 h-8 bg-[#faf8f3]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xs border border-[#e8e0d0] active:scale-90 transition-all cursor-pointer"
                      >
                        <Heart size={14} className={checkFav(item.id) ? 'fill-rose-500 text-rose-500' : 'text-[#7a6447]'} />
                      </button>

                      {/* Category name bottom */}
                      <div className="absolute bottom-3 left-3 text-[10px] font-sans font-medium text-white bg-[#1a1208]/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                        {item.category}
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-serif text-lg font-normal text-[#1a1208] leading-tight group-hover:text-[#c8741a] transition-colors">{item.name}</h3>
                        <div className="text-right flex-shrink-0">
                          <span className="font-sans font-medium text-[#c8741a] text-sm">{item.priceJpy}</span>
                          <div className="text-[10px] text-[#7a6447] font-light">{item.priceVnd}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-[#3d6b63] font-sans font-medium italic mb-2.5">
                        <ChevronRight size={12} />
                        <span>{item.nameVi}</span>
                      </div>

                      <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0">
                    <div className="w-full bg-[#c8741a] hover:bg-[#a85e12] text-white font-sans font-medium text-xs py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-2xs transition-all">
                      <Layers size={15} />
                      <span>全14種類の月餅コレクションを見る</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={item.id}
                  className="bg-[#faf8f3] rounded-2xl border border-[#e8e0d0] overflow-hidden shadow-2xs hover:border-[#c8741a] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-48 bg-[#d4c8b0] overflow-hidden">
                      <img src={item.img} alt={item.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/70 via-transparent to-transparent" />

                      {/* Tag badge */}
                      <div className="absolute top-3 left-3 bg-[#f5f1ea] backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-sans font-medium text-[#c8741a] border border-[#e8e0d0] flex items-center gap-1">
                        <Star size={10} fill="#c8741a" />
                        {item.tag}
                      </div>

                      {/* Heart button */}
                      <button
                        onClick={() => handleToggleFav(item)}
                        className="absolute top-3 right-3 w-8 h-8 bg-[#faf8f3]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xs border border-[#e8e0d0] active:scale-90 transition-all cursor-pointer"
                      >
                        <Heart size={14} className={checkFav(item.id) ? 'fill-rose-500 text-rose-500' : 'text-[#7a6447]'} />
                      </button>

                      {/* Category name bottom */}
                      <div className="absolute bottom-3 left-3 text-[10px] font-sans font-medium text-white bg-[#1a1208]/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                        {item.category}
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-serif text-lg font-normal text-[#1a1208] leading-tight">{item.name}</h3>
                        <div className="text-right flex-shrink-0">
                          <span className="font-sans font-medium text-[#c8741a] text-sm">{item.priceJpy}</span>
                          <div className="text-[10px] text-[#7a6447] font-light">{item.priceVnd}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-[#3d6b63] font-sans font-medium italic mb-2.5">
                        <ChevronRight size={12} />
                        <span>{item.nameVi}</span>
                      </div>

                      <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Mooncake Full Collection Gallery Modal */}
      {isMooncakeModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] p-3 sm:p-6 bg-[#1a1208]/70 backdrop-blur-sm overflow-y-auto flex items-start justify-center">
          <div className="bg-[#faf8f3] border border-[#e8e0d0] rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden text-[#1a1208] relative my-4 sm:my-8">
            {/* Modal Header */}
            <div className="bg-[#1e1408] p-5 sm:p-6 flex items-start justify-between relative text-white border-b border-[#c8741a]/30">
              <div className="pr-4">
                <div className="inline-flex items-center gap-1.5 bg-[#c8741a]/20 px-3 py-1 rounded-full text-[11px] font-sans font-medium text-[#c8741a] mb-2 border border-[#c8741a]/40">
                  <Moon size={13} fill="#c8741a" />
                  中秋節（Tết Trung Thu）限定月餅
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-white leading-snug">
                  🥮 ベトナム伝統 Kinh Đô 月餅コレクション 14選
                </h2>
                <p className="font-sans text-xs font-light text-white/70 mt-1">
                  伝統焼き月餅からとろける流心Lava、モチモチ白餅、ヘルシー精進餡まで全種類一覧
                </p>
              </div>
              <button
                onClick={() => setIsMooncakeModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Group Sub-Filter Pills */}
            <div className="p-3 sm:p-4 bg-[#f5f1ea] border-b border-[#e8e0d0] flex gap-2 overflow-x-auto scrollbar-none sticky top-0 z-20">
              {(['すべて', '高級ギフト', 'Lava流心', '伝統焼き月餅', '伝統モチ白餅', 'ヘルシー＆キッズ'] as const).map((group) => (
                <button
                  key={group}
                  onClick={() => setMooncakeGroup(group)}
                  className="px-4 py-1.5 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all cursor-pointer"
                  style={
                    mooncakeGroup === group
                      ? { background: '#c8741a', color: 'white', border: '1px solid #c8741a' }
                      : { backgroundColor: '#faf8f3', color: '#7a6447', border: '1px solid #e8e0d0' }
                  }
                >
                  {group === 'すべて' ? `すべて (14)` : group}
                </button>
              ))}
            </div>

            {/* Modal Items Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#faf8f3]">
              {filteredMooncakes.map((mc) => (
                <div
                  key={mc.id}
                  className="bg-[#f5f1ea] rounded-2xl p-4 border border-[#e8e0d0] flex flex-col gap-3 hover:border-[#c8741a] transition-all shadow-2xs"
                >
                  <div className="w-full h-40 rounded-xl overflow-hidden flex-shrink-0 bg-[#d4c8b0] relative">
                    <img src={mc.img} alt={mc.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-[#1a1208]/70 backdrop-blur-xs text-white px-2.5 py-0.5 rounded font-sans text-[10px] font-medium border border-white/20 z-10">
                      Mã {mc.code}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="bg-[#faf8f3] text-[#c8741a] border border-[#e8e0d0] text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-full">
                          {mc.tag}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-normal text-[#1a1208] leading-snug">{mc.name}</h4>
                      <p className="font-sans text-xs text-[#3d6b63] font-medium italic mt-0.5">{mc.nameVi}</p>
                      <p className="font-sans text-xs font-light text-[#7a6447] mt-2 leading-relaxed bg-[#faf8f3] p-3 rounded-xl border border-[#e8e0d0]">
                        <strong className="text-[#1a1208] font-medium">【主な原材料】:</strong> {mc.ingredients}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#e8e0d0] flex items-center justify-between">
                      <div>
                        <span className="text-[#c8741a] font-sans font-medium text-base">{mc.priceJpy}</span>
                        <span className="text-xs text-[#7a6447] font-light ml-1.5">({mc.priceVnd})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#f5f1ea] border-t border-[#e8e0d0] flex items-center justify-between font-sans text-xs text-[#7a6447]">
              <span>🥮 Kinh Đô 月餅コレクション</span>
              <button
                onClick={() => setIsMooncakeModalOpen(false)}
                className="bg-[#c8741a] hover:bg-[#a85e12] text-white font-medium px-6 py-2 rounded-full transition-all cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Sub-Tab 2: Souvenir Shops */}
      {activeTab === 'shops' && (
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl font-normal text-[#1a1208]">おすすめお土産スポット＆市場</h3>
            <p className="font-sans text-xs font-light text-[#7a6447] mt-1">ホイアン・ダナンの主要買い物スポット。買い物のコツと一緒にご紹介します。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHOPS.map((shop) => (
              <div
                key={shop.name}
                className="bg-[#faf8f3] rounded-2xl border border-[#e8e0d0] overflow-hidden shadow-2xs hover:border-[#c8741a] transition-all flex flex-col justify-between"
              >
                <div style={{ height: 4, background: shop.accentColor }} />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-3.5 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#e8e0d0]"
                        style={{ backgroundColor: `${shop.accentColor}15`, color: shop.accentColor }}
                      >
                        {shop.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-lg font-normal text-[#1a1208] leading-tight">{shop.name}</h4>
                        <p className="font-sans text-xs font-medium text-[#3d6b63] mt-0.5">{shop.nameJp}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 font-sans text-xs text-[#7a6447] mb-4 flex-wrap">
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
                      className="bg-[#f5f1ea] rounded-xl p-4 border-l-4 text-xs font-sans font-light text-[#7a6447] leading-relaxed border-[#e8e0d0]"
                      style={{ borderLeftColor: shop.accentColor }}
                    >
                      <div className="flex items-start gap-2">
                        <Lightbulb size={15} style={{ color: shop.accentColor }} className="flex-shrink-0 mt-0.5" />
                        <p>{shop.note}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#e8e0d0] flex items-center justify-end">
                    <a
                      href={shop.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-sans text-xs font-medium text-white bg-[#c8741a] hover:bg-[#a85e12] px-4 py-1.5 rounded-full transition-colors"
                    >
                      Google Map <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shopping Tips Section */}
          <div className="bg-[#f5f1ea] rounded-2xl p-6 sm:p-8 border border-[#e8e0d0]">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#c8741a]" />
              <h3 className="font-serif text-lg font-normal text-[#1a1208]">買い物上手になる旅のコツ</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {TIPS.map(({ icon, tip, detail, color }) => (
                <div
                  key={tip}
                  className="bg-[#faf8f3] rounded-xl p-5 border border-[#e8e0d0] hover:-translate-y-1 transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-[#e8e0d0]"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {icon}
                  </div>
                  <h4 className="font-serif text-base font-normal text-[#1a1208] mb-1.5">{tip}</h4>
                  <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
