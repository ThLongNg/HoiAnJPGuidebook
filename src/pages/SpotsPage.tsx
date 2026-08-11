import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Camera, MapPin, Clock, Ticket, X, ChevronRight, Play, Image as ImageIcon, Sparkles, Landmark, Home, Building2, Palmtree, Umbrella, Mountain, Flame, Drama, Flower2, Scissors, Brush, Heart, Navigation, Star } from 'lucide-react'
import { type FavoriteItem } from '@/types'
import { SectionHeading, Card } from '@/components/Atoms'

// ─── Spot data ──────────────────────────────────────────────────
type SpotAct = {
  num: string
  title: string
  desc: string
}

type Spot = {
  name: string
  nameJp: string
  icon: React.ReactNode
  area: 'hoian' | 'danang'
  category?: 'sightseeing' | 'activity' | 'spa'
  tag: string
  rating: number
  time: string
  price: string
  img: string
  videoId?: string   // YouTube video ID
  desc: string
  acts?: SpotAct[]
  tips: string[]
  mapUrl: string
}

const spots: Spot[] = [
  // ── Hội An ──
  {
    name: 'Chùa Cầu',
    nameJp: '来遠橋（日本橋）',
    icon: <Landmark size={20} className="text-[#c8741a]" />,
    area: 'hoian',
    category: 'sightseeing',
    tag: '世界遺産・修復完了',
    rating: 4.8,
    time: '所要：30〜60分',
    price: '共通チケット 120,000 VND（1枚で5か所見学可）',
    img: 'https://simg.zalopay.com.vn/zlp-website/assets/chua_cau_3_a9d95104ae.jpg',
    desc: '17世紀に江戸時代の日本人商人が築いたと伝わる木造の屋根付き橋。ベトナムの2万ドン紙幣（青いポリマー札）にも描かれたホイアンの象徴です。約2年間の大規模修復工事が完了し、美しい姿で正式に公開中！一歩足を踏み入れると木のぬくもりと重厚な歴史が漂い、橋の中央には航海安全を祈願する小神社が静かに鎮座しています。',
    tips: [
      '旧市街チケット（120,000 VND）1枚で古民家や会館など好きな5施設に入場可能です',
      '青い2万ドン紙幣（20,000 VND）を取り出して、本物の橋と重ね合わせて記念写真を撮るのが人気です',
      '大規模修復工事が完了し、橋の中に入っての参拝や通り抜けが再び可能になりました',
      '朝7:00〜8:30の静けさに包まれた時間帯に、朝日を浴びる木造橋の美しい写真を撮影',
    ],
    mapUrl: 'https://maps.app.goo.gl/nJfw4nQua9WPRZpZ6',
  },
  {
    name: 'Show Ký Ức Hội An',
    nameJp: '「ホイアンの記憶」ショー',
    icon: <Drama size={20} className="text-[#3d6b63]" />,
    area: 'hoian',
    category: 'activity',
    tag: '文化ショー',
    rating: 4.7,
    time: '1回 約65分（20:00〜21:05）※火曜日休演',
    price: 'ECO席 600,000 VND / HIGH席 750,000 VND / VIP席 1,200,000 VND（子供半額）',
    videoId: 'fBLF-kFihPs',
    img: 'https://fvgtravel.com.vn/uploads/up/root/editor/2025/10/10/21/02/w1230/rev1760083355_0948.jpg',
    desc: '総勢500名を超えるキャストが紡ぐベトナム最大級の屋外水上スペクタクルショー。川に浮かぶ25,000㎡の特設大ステージで、400年にわたる国際貿易港ファイフォ（ホイアン）の誕生と繁栄の歴史を全5幕の絢爛豪華な舞台芸術で描きます。',
    acts: [
      {
        num: '第1幕',
        title: '生命（Làng dệt vải）— 伝統の織物と命の芽生え',
        desc: '100人の乙女が織りなす光のアオザイと機織りの音。古都ホイアンの生命の誕生と平穏な日常を象徴的に描きます。',
      },
      {
        num: '第2幕',
        title: '婚礼（Thời Kỳ Chăm Pa）— チャンパ王国の宴',
        desc: '玉華姫とチャンパ王チェイ・チェッタ2世の豪華絢爛なロイヤルウェディング。巨大な象やエキゾチックな舞踊、輝く神殿が圧巻！',
      },
      {
        num: '第3幕',
        title: '灯と海（Giai đoạn Bão Tố）— 荒波と一途な愛の誓い',
        desc: '大海原へ挑む男と灯籠を掲げて待つ女の切ない愛の物語。嵐と荒波の壮大な特効演出と灯籠の光が胸を打ちます。',
      },
      {
        num: '第4幕',
        title: '岸辺（Thương cảng Quốc tế）— 国際貿易港の黄金期',
        desc: '16〜17世紀の黄金時代。日本、中国、オランダ、ポルトガルなど世界中の貿易船が集い、活気あふれる貿易港ファイフォを再現。',
      },
      {
        num: '第5幕',
        title: 'アオザイ（Hội An Hiện Đại & Cổ Kính）— 伝統と未来',
        desc: '純白のアオザイを纏った数百人の女性たちがヴィンテージ自転車で舞台を駆け抜ける感動のフィナーレ！',
      },
    ],
    tips: [
      '火曜日を除く毎日20:00〜開催。全体を見渡せるHIGH席（750k）や中央VIP席（1200k）が一番おすすめ！',
      '全5幕（①生命 → ②チャンパ婚礼 → ③灯と海 → ④国際貿易港 → ⑤現代アオザイ）の歴史ドラマに感動',
      'ショー前後にはテーマパーク内のノスタルジックなランタン小路やミニパフォーマンスも無料で楽しめます',
      '屋外会場のため、防虫スプレーを持参すると快適に鑑賞できます',
    ],
    mapUrl: 'https://maps.app.goo.gl/F47ros5kFArkbDx16',
  },
  {
    name: 'VinWonders Nam Hội An',
    nameJp: 'ヴィンワンダーズ南ホイアン',
    icon: <Ticket size={20} className="text-[#c8741a]" />,
    area: 'hoian',
    category: 'activity',
    tag: 'テーマパーク',
    rating: 4.6,
    time: '所要：半日〜1日',
    price: '大人 600,000〜650,000 VND / 子供 450,000 VND（100cm未満無料）',
    img: 'https://static.vinwonders.com/2023/01/DJI_0355crop-scaled.jpg',
    videoId: 'v--H1yIYRbY',
    desc: 'ホイアンの風情と最新エンターテインメントが融合したベトナム最大級の複合リゾートパーク。川をリバークルーズ舟で進みながらアジアやアフリカの野生動物を間近で観察できる「River Safari」や、世界遺産建築をモチーフにしたノスタルジックな街並み、大迫力のウォータースライダーまで、大人から子供まで1日中夢中になれるワンダーランドです。',
    tips: [
      '16:00以降の夕方入園ならトワイライト割引価格（約450,000 VND）でお得に入園可能！',
      'リバーサファリで舟の上からキリンやシマウマに手渡しで餌やり体験（専用フード販売あり）',
      '巨大プールエリアで爽快なウォータースライダーや波の出るプールを大満喫（水着持参）',
      '伝統工芸村エリアでベトナム各地の職人による手仕事の見学＆手作り体験',
    ],
    mapUrl: 'https://maps.app.goo.gl/wVCK9GGZcEFjcALf7',
  },
  {
    name: 'Thả Hoa Đăng',
    nameJp: '花灯籠流し＆ボート体験',
    icon: <Flame size={20} className="text-[#c8741a]" />,
    area: 'hoian',
    category: 'activity',
    tag: '体験',
    rating: 4.9,
    time: '夕方〜夜（17:30〜21:00頃）',
    price: '灯籠 20,000〜30,000 VND / ボート 150,000〜200,000 VND',
    img: 'https://tse4.mm.bing.net/th/id/OIP.dAqIDTYICeo1GQMbeH2_6AHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    videoId: '0m5ErV76zoE',
    desc: '日没とともに旧市街を流れるホアイ川が幾千のランタンの光で黄金色に染まる時間。手漕ぎの小舟に乗り込み、水面に静かに揺れる灯籠を浮かべると、温かな光が川面を漂っていきます。水上から見上げるランタン街の夜景は、まるで絵本の世界に迷い込んだかのようなロマンチックなひとときを約束します。',
    tips: [
      '手漕ぎボート乗船料の公定価格は 150,000〜200,000 VND/舟（約20分、1〜4名同料金）です',
      '川沿いの公営チケット乗り場（Vé đi thuyền）で購入するとボッタクリを防げます',
      '紙で作られた伝統の花灯籠（20,000〜30,000 VND）に願いを込めて川面へ静かに流しましょう',
      '旧暦14日（満月のランタン祭り）は街の電気が消え、ランタンと灯籠の光だけで満たされる最高の魔法へ',
    ],
    mapUrl: 'https://maps.google.com/?q=Hoai+River+Hoi+An+Lantern',
  },
  {
    name: 'Rừng Dừa Bảy Mẫu',
    nameJp: 'バイマウ椰子林（かご舟体験）',
    icon: <Palmtree size={20} className="text-[#3d6b63]" />,
    area: 'hoian',
    category: 'activity',
    tag: 'アクティビティ',
    rating: 4.7,
    time: '所要：1〜2時間',
    price: '150,000〜250,000 VND（かご舟込み）',
    img: 'https://tse1.mm.bing.net/th/id/OIP.uV32n495BdFiJBcdtj8dlQHaDt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    videoId: '8EpoiQGRphw',
    desc: 'ホイアン郊外に広がる、南国情緒あふれる水椰子（ニパヤシ）のジャングル。ベトナム伝統の丸い竹編みの小舟「かご舟（トゥンチャイ）」に乗り、迷路のような緑のトンネルを探索します。圧巻は船頭による超高速回転「かご舟ダンス」！大迫力のパフォーマンスと歓声が静かな椰子林に響き渡ります。',
    tips: [
      '船頭さんの一回限りの大旋回「スピンパフォーマンス」を特等席で体感＆動画撮影',
      '椰子の葉で作ってくれる可愛い指輪や冠（カニや折り紙のような葉細工）のプレゼント',
      'ニパヤシの木陰が涼しい緑のトンネルで静かなネイチャークルーズを満喫',
      'パフォーマンスを楽しんだ後は船頭さんへチップ（20,000〜50,000 VND）を渡すと喜ばれます',
    ],
    mapUrl: 'https://maps.google.com/?q=Bay+Mau+Coconut+Forest+Hoi+An',
  },
  {
    name: 'Hội Quán Phước Kiến',
    nameJp: '福建会館',
    icon: <Landmark size={20} className="text-[#c8741a]" />,
    area: 'hoian',
    category: 'sightseeing',
    tag: '歴史建築',
    rating: 4.7,
    time: '所要：30〜60分',
    price: '共通チケット 120,000 VND（1枚で5か所入場可）',
    img: 'https://media.mia.vn/uploads/blog-du-lich/Hoi-quan-Phuc-Kien-Hoi-An-Di-san-van-hoa-dep-nhat-nhi-do-thi-co-11-1618287314.JPG',
    desc: '1697年に福建省出身の華僑によって建てられた、旧市街で最も壮麗な集会所・廟宇。鮮やかな朱色の三門をくぐると、静寂の中に巨大な赤渦巻き線香が天井からいくつも吊り下げられ、香木の香りが漂います。航海の守護神である「媽祖女神」が祀られ、今も多くの参拝客が祈りを捧げています。',
    tips: [
      '天井から吊り下げられた大きな渦巻き線香（願掛け線香）に名前と願い事を書いて奉納できます',
      '龍や鳳凰、金魚の見事な陶器モザイク彫刻と色鮮やかな建築美をじっくり観賞',
      '境内の静かな中庭で緑を眺めながら歴史の息吹を感じる贅沢な時間を過ごせます',
      '旧市街共通チケット（120,000 VND）で入場できる5つの指定施設のひとつです',
    ],
    mapUrl: 'https://maps.google.com/?q=Phuc+Kien+Assembly+Hall+Hoi+An',
  },
  {
    name: 'Nhà Cổ Tấn Ký',
    nameJp: '陳記古民家（タンキー）',
    icon: <Home size={20} className="text-[#8b5e3c]" />,
    area: 'hoian',
    category: 'sightseeing',
    tag: '古民家',
    rating: 4.6,
    time: '所要：30分',
    price: '共通チケット 120,000 VND（1枚で5か所入場可）',
    img: 'https://api.sovaba.travel/uploads/nha_co_tan_ky_duoc_xay_dung_nam_1741_edc975ae72.jpg',
    desc: '1741年に建築され、7世代280年以上にわたって同じ家族が守り続けてきた伝統の古民家。風水に基づいた設計で、日本の折り上げ天井、中国の彫刻、ベトナムの梁構造が見事に調和しています。過去の大洪水で水没した壁の刻印や、風情ある吹抜けの中庭（光庭）が古き良き港町の歴史を現代に伝えています。',
    tips: [
      '柱に刻まれた「過去の歴史的大洪水の水位マーク」を探して歴史の深さを実感できます',
      '7代目当主やガイドによる解説を聞きながら、三国の建築様式の融合美を発見できます',
      '中国の「孔子杯（満たすとこぼれる節度を教える不思議な盃）」の展示を見学できます',
      '旧市街共通チケット（120,000 VND）で入場できる5か所のひとつです',
    ],
    mapUrl: 'https://maps.google.com/?q=Tan+Ky+Ancient+House+Hoi+An',
  },
  {
    name: 'Nhà Cổ Quân Thắng',
    nameJp: '覃勝古民家（クアンタン）',
    icon: <Building2 size={20} className="text-[#8b5e3c]" />,
    area: 'hoian',
    category: 'sightseeing',
    tag: '古民家',
    rating: 4.5,
    time: '所要：20〜30分',
    price: '共通チケット 120,000 VND（1枚で5か所入場可）',
    img: 'https://3.bp.blogspot.com/-Xq7oejRtybc/XEMp-vjZ8MI/AAAAAAACQmo/gGtolp3KiXMG0tKuua6VVDsU-uF96IRrwCLcBGAs/s1600/Quan%2BThang%2B01.jpg',
    desc: '約300年前に広東省の商人クアンタン氏によって建てられた、旧市街最高峰の木造彫刻を誇る古民家。木目の美しい重厚な柱や梁には、熟練の職人が彫り上げた牡丹の花や葡萄のツタが繊細に浮かび上がります。静かな光が差し込む家屋内で、昔の貿易商人の暮らしに思いを馳せることができます。',
    tips: [
      '梁や欄間に施された、芸術品レベルの極めて繊細な木彫り彫刻をじっくり鑑賞',
      '喧騒を離れて静かにたたずむ中庭の彫刻井戸やアンティーク調の調度品を撮影',
      'タンキー古民家と比較して、より広東風の重厚な美しさをじっくり楽しめます',
      '旧市街共通チケット（120,000 VND）で入場可能です',
    ],
    mapUrl: 'https://maps.google.com/?q=Quan+Thang+Ancient+House+Hoi+An',
  },
  {
    name: 'Làng Gốm Thanh Hà',
    nameJp: 'タインハー陶芸村（ろくろ体験・テラコッタパーク）',
    icon: <Brush size={20} className="text-[#c8741a]" />,
    area: 'hoian',
    category: 'activity',
    tag: '伝統工芸・陶芸ツアー',
    rating: 4.7,
    time: '所要：1.5〜2時間',
    price: '35,000 VND（十二支の土笛お土産付き / ろくろ体験可能）',
    img: 'https://xtrip.vn/upload/editor/dia-diem-du-lich-o-da-nang-hoi-an-lang-gom-thanh-ha.png',
    desc: '500年以上の歴史を誇るトゥボン川沿いの素焼き陶器の村。職人のおばあさんが足でろくろを回し、手で粘土を形作る温もりある光景に出会えます。村内には世界遺産のミニチュア粘土像が並ぶ現代アート空間「テラコッタパーク」も併設され、伝統とモダンが交差する創作の村です。',
    tips: [
      '職人さんの指導のもと、足踏みろくろで自分だけのお皿やカップを粘土から手作り体験！',
      '入場時にもらえる可愛い十二支の土笛（素焼きの小さな笛）を無料でお持ち帰りできます',
      'ピサの斜塔や自由の女神が赤土粘土で表現された「テラコッタパーク」を散策＆記念撮影',
      '旧市街から自転車で約15〜20分、川沿いの心地よい風を感じながらサイクリング訪問がおすすめ',
    ],
    mapUrl: 'https://maps.google.com/?q=Thanh+Ha+Pottery+Village+Hoi+An',
  },
  {
    name: 'Làng Lụa Hội An',
    nameJp: 'ホイアン絹の村（伝統シルク工房ツアー）',
    icon: <Scissors size={20} className="text-[#3d6b63]" />,
    area: 'hoian',
    category: 'activity',
    tag: '伝統工芸・絹織物ツアー',
    rating: 4.7,
    time: '所要：1〜2時間',
    price: '自由見学 50,000 VND / ガイド付き見学ツアー 約100,000〜300,000 VND',
    img: 'https://statics.vinpearl.com/lang-lua-hoi-an-8_1636712643.jpg',
    desc: 'かつて「海のシルクロード」として栄えたホイアンの絹織り伝統を今に伝える工房。桑の葉を食む蚕（かいこ）の音、黄金色の繭から絹糸を紡ぎ出す技術、木製機織り機が奏でる心地よいカタカタという音。一本の糸から極上の絹布が生まれるまでのドラマチックな工程を五感で体感できます。',
    tips: [
      '実際に生の繭から糸を繰り出す糸紡ぎや、木製機織り機の手仕事を間近で見学',
      '本物の純天然シルクと化繊シルクの見分け方（燃やす実験など）をガイドから学習できます',
      '高品質な100%天然シルクスカーフを購入したり、自分好みの生地でアオザイをオーダーメイド',
      '旧市街から約1km（車で約5分、徒歩15分）とアクセス抜群の穴場スポットです',
    ],
    mapUrl: 'https://maps.google.com/?q=Hoi+An+Silk+Village',
  },
  {
    name: 'Gội Đầu Dưỡng Sinh Hội An',
    nameJp: 'ホイアン 伝統ハーバルヘッドスパ＆ボディケア',
    icon: <Sparkles size={20} className="text-[#3d6b63]" />,
    area: 'hoian',
    category: 'spa',
    tag: 'スパ・ヘッドスパ',
    rating: 4.9,
    time: '所要：60〜90分',
    price: '150,000〜400,000 VND（約900〜2,400円）',
    img: 'https://cdn.tgdd.vn/Files/2023/12/23/1558195/goi-dau-duong-sinh-la-gi-loi-ich-va-cach-goi-dau-duong-sinh-chuan-spa-202312230808014982.jpg',
    desc: 'ベトナムに古くから伝わるハーブの恵みを活用した極上シャンプー「Gội đầu dưỡng sinh」。生姜、レモングラス、柚子の皮、ボケットの実を煮出した芳醇な温ハーブ湯で頭皮を丁寧に洗い流し、熟練セラピストが頭・首・肩のツボをじっくり揉みほぐします。長旅の疲れがすーっと吹き飛ぶ最高の癒やし時間です。',
    tips: [
      '髪と頭皮のディープクレンジング、顔のツボ押し、首肩マッサージ付き60分コース（約2,000円〜）を体感',
      '爽やかなハーブの香りに包まれながら、心身ともにディープリラックスできます',
      '施術後はツヤツヤにブローされた髪でそのまま旧市街の夜の散策へ出発できます',
      '事前予約（WhatsAppやZalo）またはホテルのフロントで手配すると待ち時間ゼロでスムーズ',
    ],
    mapUrl: 'https://maps.google.com/?q=Hoi+An+Herbal+Head+Spa',
  },
  {
    name: 'White Rose Spa Hội An',
    nameJp: 'ホワイトローズ スパ（フット＆アロママッサージ）',
    icon: <Flower2 size={20} className="text-[#c8741a]" />,
    area: 'hoian',
    category: 'spa',
    tag: 'スパ・マッサージ',
    rating: 4.8,
    time: '所要：60〜120分',
    price: '200,000〜500,000 VND（約1,200〜3,000円）',
    img: 'https://tse2.mm.bing.net/th/id/OIP.M1sfVKaJy5MaeBzmtYY4cAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    desc: '古民家風の落ち着いたインテリアと温かなおもてなしで女性旅行者に大人気の隠れ家スパ。ほんのり温かい天然ココナッツオイルやホットストーンを使ったフット＆ボディマッサージで、旧市街を歩き回って疲れた足を優しく解きほぐしてくれます。',
    tips: [
      'たっぷり歩いた日の締めくくりに、ホットストーン入りのフットマッサージ（60分約1,200円〜）で足のむくみをリセット',
      'ウェルカムドリンクの冷たいハーブティーと新鮮なトロピカルフルーツを味わえます',
      '友人同士やカップルでゆっくり過ごせる落ち着いたプライベートサロン空間を堪能',
      '旧市街中心部から徒歩数分の便利な立地です',
    ],
    mapUrl: 'https://maps.google.com/?q=White+Rose+Spa+Hoi+An',
  },
  {
    name: 'Bãi Biển An Bàng',
    nameJp: 'アンバン ビーチ',
    icon: <Umbrella size={20} className="text-[#3d6b63]" />,
    area: 'hoian',
    category: 'sightseeing',
    tag: 'ビーチ',
    rating: 4.6,
    time: '所要：半日〜1日',
    price: '無料（ビーチチェア：50,000〜100,000 VND）',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format',
    desc: 'ホイアン旧市街から自転車でわずか15分。椰子の木の葉が風に揺れ、青い海とどこまでも続く白い砂浜が広がるパノラマビーチです。素朴なビーチチェアに身をゆだね、波の音を聞きながらフレッシュなココナッツジュースを飲む時間は、南国リゾートそのものです。',
    tips: [
      '旧市街で自転車を借りて、田園風景を抜けながら爽快なビーチサイクリング旅行',
      '海辺のカフェやレストランでパラソルの下に座り、獲れたての海鮮料理やトロピカルドリンクを楽しむ',
      '早朝の静かな海で波打ち際を散歩したり、波の穏やかな海で海水浴を満喫',
      '日差しが強いので日焼け止めやサングラスを持参しましょう',
    ],
    mapUrl: 'https://maps.google.com/?q=An+Bang+Beach+Hoi+An+Vietnam',
  },
  // ── Da Nang ──
  {
    name: 'Cầu Rồng',
    nameJp: 'ドラゴン橋',
    icon: <Flame size={20} className="text-[#c8741a]" />,
    area: 'danang',
    category: 'sightseeing',
    tag: '夜景',
    rating: 4.6,
    time: '所要：30〜60分（夜がおすすめ）',
    price: '無料（火噴きショー：土日 21:00〜）',
    img: 'https://images.unsplash.com/photo-1559562664-c7f5a2da31dd?w=600&h=400&fit=crop&auto=format',
    desc: 'ダナンのハン川を力強くまたぐ、巨大なイエローゴールドの龍をモチーフにした建造物。夜になると数千個のLEDライトで龍が7色に変化し、街を華やかに照らします。週末の夜、龍の口から本物の火と水が大迫力で吹き出すエンターテインメントは必見です！',
    tips: [
      '土日21:00〜スタートする大迫力の「火と水の噴射ショー（約15分間）」を橋のたもとで観賞',
      '橋の袂のナイトマーケット（Son Tra Night Market）でローカル屋台グルメを食べ歩き',
      '川沿いの遊歩道から7色に光り輝く龍の全景をバックに夜景ショットを撮影できます',
      '火噴きショーの際は水滴がかかることがあるので少し離れた場所が観覧にベストです',
    ],
    mapUrl: 'https://maps.google.com/?q=Dragon+Bridge+Da+Nang+Vietnam',
  },
  {
    name: 'Ngũ Hành Sơn',
    nameJp: '五行山（大理石山）',
    icon: <Mountain size={20} className="text-[#8b5e3c]" />,
    area: 'danang',
    category: 'sightseeing',
    tag: '絶景',
    rating: 4.5,
    time: '所要：1〜2時間',
    price: '40,000 VND（エレベーター：15,000 VND）',
    img: 'https://danangfantasticity.com/wp-content/uploads/2025/08/danh-thang-ngu-hanh-son-da-nang-002.jpg',
    desc: 'ダナンとホイアンの中間にそびえ立つ、大理石と石灰岩でできた5つの神秘的な峰。山内には自然の洞窟が無数にあり、洞窟の天窓から光の束（天使の梯子）が差し込む中に大きな仏像が神々しく佇んでいます。山頂からはダナンの青い海と街並みを一望できる絶景スポットです。',
    tips: [
      '神秘的な「玄空洞（Huyen Khong Cave）」で、天窓から射し込む神秘的な光と仏像を撮影',
      'エレベーターで一気に中腹へ登り、息をのむような美しい東シナ海のパノラマ絶景を鑑賞',
      '麓の伝統的な大理石彫刻の工房を覗き、職人の技を身近に見学できます',
      '階段が急で滑りやすいため、スニーカーなどの歩きやすい靴での参拝をおすすめします',
    ],
    mapUrl: 'https://maps.app.goo.gl/dMyb5CYaxzHVnxVz8',
  },
]

// ─── Spot Detail Modal ───────────────────────────────────────────
function SpotModal({ spot, onClose }: { spot: Spot; onClose: () => void }) {
  const [showVideo, setShowVideo] = useState(false)

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-4 sm:p-6 overscroll-none" onClick={onClose}>
      <div className="absolute inset-0 bg-[#1a1208]/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#faf8f3] border border-[#e8e0d0] rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.22s ease both' }}
      >
        {/* Media area */}
        <div className="relative h-60 overflow-hidden rounded-t-3xl bg-[#1a1208]">
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 via-transparent to-transparent" />
              {/* Video play button */}
              {spot.videoId && !showVideo && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowVideo(true) }}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-[#c8741a] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
                className={`flex items-center gap-1 font-sans text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${!showVideo ? 'bg-[#c8741a] text-white' : 'bg-[#1a1208]/60 text-white/80 border border-white/20'}`}
              >
                <ImageIcon size={11} /> 写真
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowVideo(true) }}
                className={`flex items-center gap-1 font-sans text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${showVideo ? 'bg-rose-600 text-white' : 'bg-[#1a1208]/60 text-white/80 border border-white/20'}`}
              >
                <Play size={11} fill="currentColor" /> 動画
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-[#1a1208]/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#1a1208] transition-colors border border-white/20 text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f5f1ea] border border-[#e8e0d0] flex items-center justify-center flex-shrink-0 mt-0.5">
                {spot.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-serif text-2xl font-normal text-[#1a1208] leading-tight">{spot.name}</h2>
                  <span className="font-sans text-[11px] px-2.5 py-0.5 rounded-full font-medium bg-[#f5f1ea] text-[#c8741a] border border-[#e8e0d0]">
                    {spot.tag}
                  </span>
                </div>
                <div className="font-sans text-xs font-medium text-[#c8741a] mt-0.5">{spot.nameJp}</div>
              </div>
            </div>
            <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed mt-3.5 whitespace-pre-line">{spot.desc}</p>

            {/* 5 Acts Timeline UI */}
            {spot.acts && (
              <div className="mt-4 space-y-2.5">
                <div className="font-serif text-sm font-medium text-[#1a1208] flex items-center gap-2">
                  <Sparkles size={15} className="text-[#c8741a]" />
                  全5幕のストーリー構成
                </div>
                <div className="space-y-2">
                  {spot.acts.map((act) => (
                    <div key={act.num} className="bg-[#f5f1ea] border border-[#e8e0d0] rounded-2xl p-3.5 flex items-start gap-3 shadow-2xs">
                      <span className="bg-[#c8741a] text-white font-sans text-[10px] font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 mt-0.5">
                        {act.num}
                      </span>
                      <div className="flex-1">
                        <div className="font-serif text-xs font-medium text-[#1a1208]">{act.title}</div>
                        <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed mt-1">{act.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 gap-2.5">
            <div className="flex items-center gap-3 bg-[#f5f1ea] rounded-xl px-4 py-3 border border-[#e8e0d0]">
              <Clock size={15} className="text-[#3d6b63] flex-shrink-0" />
              <span className="font-sans text-xs font-light text-[#1a1208]">{spot.time}</span>
            </div>
            <div className="flex items-center gap-3 bg-[#fffdf9] border-l-4 border-l-[#c8741a] border border-[#e8e0d0] rounded-xl px-4 py-3">
              <Ticket size={15} className="text-[#c8741a] flex-shrink-0" />
              <span className="font-sans text-xs font-light text-[#1a1208]">{spot.price}</span>
            </div>
          </div>

          {/* Tips */}
          <div>
            <div className="font-serif text-sm font-medium text-[#1a1208] mb-3 flex items-center gap-2">
              <Camera size={15} className="text-[#c8741a]" />
              観光のコツ・攻略ガイド
            </div>
            <div className="space-y-2">
              {spot.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-[#f5f1ea] rounded-xl px-3.5 py-2.5 border border-[#e8e0d0]">
                  <ChevronRight size={14} className="text-[#c8741a] flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{tip}</span>
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
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-sans text-xs font-medium text-white transition-all bg-[#c8741a] hover:bg-[#a85e12] shadow-2xs"
          >
            <MapPin size={16} />
            Google Mapsで開く
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Spot thumbnail card ─────────────────────────────────────────
function SpotCardDetail({
  spot,
  delay,
  onClick,
  isFav,
  onToggleFav,
}: {
  spot: Spot
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
        <div className="relative h-48 overflow-hidden bg-[#d4c8b0]">
          <img
            src={spot.img}
            alt={spot.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574614366831-900f959788c9?w=600&h=400&fit=crop' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 via-[#1a1208]/20 to-transparent" />

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

          <span className="absolute top-3 left-3 font-sans text-[10px] font-medium text-white bg-[#1a1208]/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 uppercase tracking-wider flex items-center gap-1">
            <MapPin size={10} /> {spot.area === 'hoian' ? 'ホイアン' : 'ダナン'}
          </span>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <div className="font-serif text-white font-normal text-lg leading-tight">{spot.nameJp}</div>
              <div className="font-sans text-white/70 text-xs font-light">{spot.name}</div>
            </div>
            <div className="flex items-center gap-1 bg-[#c8741a] text-white text-[10px] font-sans font-medium px-2 py-0.5 rounded-full">
              <Star size={10} fill="white" /> {spot.rating}
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2 font-sans text-xs text-[#7a6447]">
            <span className="flex items-center gap-1">
              <Clock size={11} /> {spot.time}
            </span>
          </div>
          <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed mb-4 line-clamp-2">{spot.desc}</p>
          <div className="inline-flex items-center gap-2 font-sans text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#f5f1ea] text-[#c8741a] border border-[#e8e0d0] group-hover:bg-[#c8741a] group-hover:text-white transition-all">
            <Navigation size={12} /> 詳細・地図を見る →
          </div>
        </div>
      </Card>
    </button>
  )
}

// ─── Main Spots Page Component ──────────────────────────────────
interface SpotsPageProps {
  isFavorite?: (id: string) => boolean
  toggleFavorite?: (item: FavoriteItem) => void
}

export default function SpotsPage({ isFavorite, toggleFavorite }: SpotsPageProps) {
  const [areaFilter, setAreaFilter] = useState<'all' | 'hoian' | 'danang'>('all')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'sightseeing' | 'activity' | 'spa'>('all')
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)

  const filteredSpots = spots.filter((s) => {
    if (areaFilter !== 'all' && s.area !== areaFilter) return false
    if (categoryFilter !== 'all' && s.category !== categoryFilter) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-sans">
      <SectionHeading tag="SIGHTSEEING & EXPERIENCES" sub="世界遺産の歴史建築から体験アクティビティ・スパまで">
        観光名所・体験ガイド
      </SectionHeading>

      {/* Filter Tabs */}
      <div className="space-y-3 mb-8 border-b border-[#e8e0d0] pb-5">
        {/* Area Filter */}
        <div className="flex gap-2 flex-wrap items-center">
          <span className="font-sans text-xs text-[#7a6447] font-medium mr-2">エリア:</span>
          {[
            { id: 'all', label: 'すべてのエリア' },
            { id: 'hoian', label: 'ホイアン古都' },
            { id: 'danang', label: 'ダナン' },
          ].map((a) => (
            <button
              key={a.id}
              onClick={() => setAreaFilter(a.id as any)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
              style={
                areaFilter === a.id
                  ? { background: '#c8741a', color: 'white', border: '1px solid #c8741a' }
                  : { backgroundColor: '#faf8f3', color: '#7a6447', border: '1px solid #e8e0d0' }
              }
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap items-center">
          <span className="font-sans text-xs text-[#7a6447] font-medium mr-2">ジャンル:</span>
          {[
            { id: 'all', label: 'すべて' },
            { id: 'sightseeing', label: '観光・名所' },
            { id: 'activity', label: '体験・アクティビティ' },
            { id: 'spa', label: 'スパ・リラクゼーション' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id as any)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
              style={
                categoryFilter === c.id
                  ? { background: '#3d6b63', color: 'white', border: '1px solid #3d6b63' }
                  : { backgroundColor: '#faf8f3', color: '#7a6447', border: '1px solid #e8e0d0' }
              }
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spot Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 anim-in" key={`${areaFilter}-${categoryFilter}`}>
        {filteredSpots.map((spot, i) => {
          const favId = `spot-${spot.name}`
          const isFav = isFavorite ? isFavorite(favId) : false
          return (
            <SpotCardDetail
              key={spot.name}
              spot={spot}
              delay={i * 0.06}
              onClick={() => setSelectedSpot(spot)}
              isFav={isFav}
              onToggleFav={
                toggleFavorite
                  ? () =>
                      toggleFavorite({
                        id: favId,
                        type: 'spots',
                        title: spot.nameJp,
                        titleVi: spot.name,
                        categoryTag: spot.tag,
                        priceOrArea: spot.area === 'hoian' ? 'ホイアン' : 'ダナン',
                        img: spot.img,
                        mapUrl: spot.mapUrl,
                      })
                  : undefined
              }
            />
          )
        })}
      </div>

      {/* Spot Detail Modal */}
      {selectedSpot && <SpotModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} />}
    </div>
  )
}
