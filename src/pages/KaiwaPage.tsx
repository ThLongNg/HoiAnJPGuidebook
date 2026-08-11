import { useState } from 'react'
import { AlertTriangle, Lightbulb, Languages, Sparkles } from 'lucide-react'
import { SectionHeading, Card, SpeakButton, TipBox } from '@/components/Atoms'
import { PhraseCard, AddressCard, OrderCard, ExpressionCard } from '@/components/Cards'
import TranslatorModal from '@/components/TranslatorModal'

const orderPhrases = [
  { vn: 'Cho em xem menu.', reading: 'チョーエム セム メニュー', jp: 'メニューを見せてください。' },
  { vn: 'Em muốn gọi món này.', reading: 'エム ムオン ゴイ モン ナイ', jp: 'これを注文したいです。' },
  { vn: 'Không cay nhé.', reading: 'コン カイ ニェ', jp: '辛くしないでください。' },
  { vn: 'Tính tiền cho em ạ!', reading: 'ティン ティエン チョー エム ア', jp: 'お会計お願いします！' },
]

const bargainPhrases = [
  { vn: 'Giảm giá được không?', reading: 'ジャム ジャー ドゥック コン', jp: '値引きできますか？', delay: 0 },
  { vn: 'Đắt quá!', reading: 'ダット クア', jp: '高すぎます！', delay: 0.07 },
  { vn: 'Rẻ hơn được không?', reading: 'ゼー ホン ドゥック コン', jp: 'もっと安くなりますか？', delay: 0.14 },
  { vn: 'Tôi mua hai cái.', reading: 'トイ ムア ハイ カイ', jp: '２つ買います。', delay: 0.21 },
  { vn: 'Cho tôi xem cái đó.', reading: 'チョー トイ セム カイ ドー', jp: 'それを見せてください。', delay: 0.28 },
  { vn: 'Tôi suy nghĩ thêm.', reading: 'トイ スイ ンギー テム', jp: 'もう少し考えます。', delay: 0.35 },
]

const emergencyPhrases = [
  { vn: 'Cứu tôi với!', reading: 'クウ トイ ヴォイ', jp: '助けてください！', delay: 0 },
  { vn: 'Gọi cảnh sát!', reading: 'ゴイ カイン サット', jp: '警察を呼んでください！', delay: 0.07 },
  { vn: 'Gọi cấp cứu!', reading: 'ゴイ カップ クウ', jp: '救急車を呼んでください！', delay: 0.14 },
  { vn: 'Tôi bị lạc đường.', reading: 'トイ ビー ラック ドゥオン', jp: '道に迷いました。', delay: 0.21 },
  { vn: 'Tôi bị mất ví.', reading: 'トイ ビー マット ヴィ', jp: '財布をなくしました。', delay: 0.28 },
  { vn: 'Bệnh viện ở đâu?', reading: 'ベン ヴィエン オー ダウ', jp: '病院はどこですか？', delay: 0.35 },
]

const weatherPhrases = [
  { vn: 'Trời nóng quá!', reading: 'チョイ ノン クア', jp: '暑すぎる！' },
  { vn: 'Trời mưa.', reading: 'チョイ ムア', jp: '雨が降っています。' },
  { vn: 'Mang ô đi nhé.', reading: 'マン オー ディ ニェ', jp: '傘を持っていきましょう。' },
  { vn: 'Thời tiết đẹp quá!', reading: 'トイ ティエット デップ クア', jp: 'いい天気ですね！' },
]

export default function KaiwaPage() {
  const [section, setSection] = useState<'phrases' | 'address' | 'order' | 'expressions' | 'bargain' | 'emergency'>('phrases')
  const [showTranslator, setShowTranslator] = useState(false)

  const sections = [
    { id: 'phrases', label: '基本フレーズ' },
    { id: 'address', label: '呼び方' },
    { id: 'order', label: '注文するとき' },
    { id: 'expressions', label: 'よく使う表現' },
    { id: 'bargain', label: '値切り・買物' },
    { id: 'emergency', label: '緊急・その他' },
  ] as const

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 font-sans">
      <SectionHeading tag="VIETNAMESE PHRASES" sub="旅でそのまま使える、かんたんベトナム語会話">
        ベトナム語フレーズ集
      </SectionHeading>

      {/* Realtime Translator Banner */}
      <div className="mb-8 bg-[#1e1408] border border-[#c8741a]/30 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c8741a]/20 border border-[#c8741a]/40 flex items-center justify-center text-[#c8741a] flex-shrink-0">
            <Languages className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-white leading-tight">日越 リアルタイム音声・文字翻訳</h3>
            <p className="font-sans text-xs font-light text-white/70 mt-1">日本語を入力/話すとベトナム語に変換 ➔ 店員に全画面表示！</p>
          </div>
        </div>
        <button
          onClick={() => setShowTranslator(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#c8741a] text-white font-sans font-medium text-xs tracking-wider transition-all hover:bg-[#a85e12] active:scale-95 flex items-center justify-center gap-2 shadow-xs flex-shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white/90" /> 翻訳ツールを開く
        </button>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap mb-8 border-b border-[#e8e0d0] pb-4">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className="px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer"
            style={
              section === s.id
                ? { background: '#c8741a', color: 'white', border: '1px solid #c8741a' }
                : { backgroundColor: '#faf8f3', color: '#7a6447', border: '1px solid #e8e0d0' }
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="anim-in" key={section}>
        {/* ─── 基本フレーズ ─── */}
        {section === 'phrases' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <PhraseCard vn="Xin chào" reading="シン チャオ" meanings={['こんにちは', 'おはようございます', 'こんばんは']} delay={0} />
            <PhraseCard vn="Xin lỗi" reading="シン ロイ" meanings={['すみません', 'ごめんなさい']} delay={0.07} />
            <PhraseCard vn="Cảm ơn" reading="カム オン" meanings={['ありがとうございます']} delay={0.14} />
            <PhraseCard vn="Không có gì" reading="コン コー ジー" meanings={['どういたしまして']} delay={0.21} />
            <PhraseCard vn="Xin lỗi, tôi không biết tiếng Việt" reading="シン ロイ、トイ コン ビエット ティエン ヴェット" meanings={['すみません。ベトナム語わかりません。']} delay={0.28} />

            <div className="md:col-span-2 xl:col-span-3"><TipBox /></div>
          </div>
        )}

        {/* ─── 呼び方 ─── */}
        {section === 'address' && (
          <>
            <p className="font-sans text-xs text-[#7a6447] mb-5">相手の年齢に合わせて呼び方を変えましょう</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <AddressCard emoji="👨" vn="Anh ơi" reading="アン オイ" jp="年上くらいの男性" bg="#faf8f3" delay={0} />
              <AddressCard emoji="👨‍🦳" vn="Chú ơi" reading="チュ オイ" jp="父親くらいの男性" bg="#faf8f3" delay={0.07} />
              <AddressCard emoji="👩" vn="Chị ơi" reading="チ オイ" jp="年上のお姉さんくらいの女性" bg="#faf8f3" delay={0.14} />
              <AddressCard emoji="👩‍🦰" vn="Cô ơi" reading="コー オイ" jp="母親くらいの女性" bg="#faf8f3" delay={0.21} />
              <AddressCard emoji="👵" vn="Bà ơi" reading="バー オイ" jp="おばあさんくらいの女性" bg="#faf8f3" delay={0.28} />
            </div>
            <div className="mt-6">
              <TipBox>
                店員さんを呼んだり注文したいときは、これらの呼び方を使えばOKです！
              </TipBox>
            </div>
          </>
        )}

        {/* ─── 注文するとき ─── */}
        {section === 'order' && (
          <>
            <p className="font-sans text-xs text-[#7a6447] mb-5">
              <span className="font-medium text-[#1a1208]">phần（ファン）</span> = 人前 / 一皿
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {[
                { num: 1, vn: 'Một phần', reading: 'モット ファン', count: '１人前' },
                { num: 2, vn: 'Hai phần', reading: 'ハイ ファン', count: '２人前' },
                { num: 3, vn: 'Ba phần', reading: 'バー ファン', count: '３人前' },
                { num: 4, vn: 'Bốn phần', reading: 'ボン ファン', count: '４人前' },
                { num: 5, vn: 'Năm phần', reading: 'ナム ファン', count: '５人前' },
                { num: 6, vn: 'Sáu phần', reading: 'サウ ファン', count: '６人前' },
              ].map((o, i) => <OrderCard key={o.num} {...o} delay={i * 0.06} />)}
            </div>
            <div className="mt-6 bg-[#fffdf9] border border-[#e8e0d0] rounded-2xl p-5 border-l-4 border-l-[#c8741a]">
              <p className="font-serif text-sm font-medium text-[#1a1208] mb-3">よく使う注文フレーズ</p>
              <div className="space-y-3">
                {orderPhrases.map((p) => (
                  <div key={p.vn} className="flex items-center justify-between gap-3 bg-[#faf8f3] rounded-xl px-4 py-3 border border-[#e8e0d0]">
                    <div>
                      <div className="font-serif text-base font-normal text-[#1a1208]">{p.vn}</div>
                      <div className="font-sans text-xs font-medium mt-0.5 text-[#c8741a]">{p.reading}</div>
                      <div className="font-sans text-xs font-light text-[#7a6447] mt-0.5">{p.jp}</div>
                    </div>
                    <SpeakButton text={p.vn} size={14} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ─── よく使う表現 ─── */}
        {section === 'expressions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExpressionCard vn="Bao nhiêu tiền ạ?" reading="バオ ニエウ ティエン ア" jp="いくらですか？" delay={0} />
            <ExpressionCard vn="Ở đâu ạ?" reading="オー ダウ ア" jp="どこですか？" delay={0.07} />
            <ExpressionCard vn="Nhà vệ sinh ở đâu ạ?" reading="ニャー ヴェ シン オー ダウ ア" jp="トイレはどこですか？" delay={0.14} />
            <ExpressionCard vn="Ngon lắm!" reading="ンゴン ラム" jp="とても美味しい！" delay={0.21} />
            <ExpressionCard vn="Cái này bao nhiêu tiền ạ?" reading="カイ ナイ バオ ニエウ ティエン ア" jp="これはいくらですか？"
              sub={{ vn: 'Cái này', jp: 'これ', example: 'Cái này bao nhiêu tiền ạ?', exJp: 'これはいくらですか？' }} delay={0.28} />
            <ExpressionCard vn="Cái đó bao nhiêu tiền ạ?" reading="カイ ドー バオ ニエウ ティエン ア" jp="それはいくらですか？"
              sub={{ vn: 'Cái đó', jp: 'それ', example: 'Cái đó bao nhiêu tiền ạ?', exJp: 'それはいくらですか？' }} delay={0.35} />
          </div>
        )}

        {/* ─── 値切り・買物 ─── */}
        {section === 'bargain' && (
          <div className="space-y-6">
            <div className="bg-[#fffdf9] border-l-4 border-l-[#c8741a] border border-[#e8e0d0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} className="text-[#c8741a]" />
                <span className="font-serif font-medium text-[#1a1208] text-sm">値切り交渉のコツ</span>
              </div>
              <p className="font-sans text-xs sm:text-sm font-light text-[#7a6447] leading-relaxed">
                市場やお土産屋では値引き交渉が普通です。笑顔で明るく交渉しましょう！相場の50〜70%から始めるのがコツです。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bargainPhrases.map((p) => (
                <Card key={p.vn} className="anim-up p-5 hover:border-[#c8741a] transition-all bg-[#faf8f3]" style={{ animationDelay: `${p.delay}s` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-serif text-lg font-normal text-[#1a1208]">{p.vn}</div>
                      <div className="font-sans text-xs font-medium mt-0.5 text-[#3d6b63]">{p.reading}</div>
                      <div className="font-sans text-xs font-light text-[#7a6447] mt-1">{p.jp}</div>
                    </div>
                    <SpeakButton text={p.vn} size={14} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ─── 緊急・その他 ─── */}
        {section === 'emergency' && (
          <div className="space-y-6">
            <div className="bg-[#fffdf9] border-l-4 border-l-rose-500 border border-[#e8e0d0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-rose-500" />
                <span className="font-serif font-medium text-[#1a1208] text-sm">緊急連絡先（ベトナム）</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {[{ label: '警察', num: '113' }, { label: '救急', num: '115' }, { label: '消防', num: '114' }].map((e) => (
                  <div key={e.label} className="bg-[#faf8f3] rounded-xl p-3 text-center border border-[#e8e0d0]">
                    <div className="font-sans text-xs text-[#7a6447]">{e.label}</div>
                    <div className="font-serif text-2xl font-bold text-rose-600 mt-1">{e.num}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyPhrases.map((p) => (
                <Card key={p.vn} className="anim-up p-5 hover:border-[#c8741a] transition-all bg-[#faf8f3]" style={{ animationDelay: `${p.delay}s` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-serif text-lg font-normal text-[#1a1208]">{p.vn}</div>
                      <div className="font-sans text-xs font-medium mt-0.5 text-[#3d6b63]">{p.reading}</div>
                      <div className="font-sans text-xs font-light text-[#7a6447] mt-1">{p.jp}</div>
                    </div>
                    <SpeakButton text={p.vn} size={14} />
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-5 bg-[#faf8f3]">
              <p className="font-serif text-sm font-medium text-[#1a1208] mb-3">🌤️ 天気に関する表現</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {weatherPhrases.map((p) => (
                  <div key={p.vn} className="flex items-center justify-between gap-3 bg-[#f5f1ea] rounded-xl px-4 py-3 border border-[#e8e0d0]">
                    <div>
                      <div className="font-serif text-base font-normal text-[#1a1208]">{p.vn}</div>
                      <div className="font-sans text-xs font-medium mt-0.5 text-[#3d6b63]">{p.reading}</div>
                      <div className="font-sans text-xs font-light text-[#7a6447] mt-0.5">{p.jp}</div>
                    </div>
                    <SpeakButton text={p.vn} size={14} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Translator Modal */}
      {showTranslator && <TranslatorModal onClose={() => setShowTranslator(false)} />}
    </div>
  )
}
