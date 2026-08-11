import { useState } from 'react'
import { ChevronLeft, Lightbulb, Smartphone, X, Maximize2 } from 'lucide-react'
import { type Tab } from '@/types'
import { greenSMBase64 } from '@/data/greenSMImages'
import { SectionHeading, Card } from '@/components/Atoms'

const steps = [
  {
    num: 1,
    title: 'アプリを開いて登録',
    desc: '日本の電話番号（+81）を入力して「Continue」をタップします。Googleアカウントでも登録できます。',
    img: greenSMBase64.step1,
    imageLeft: true,
  },
  {
    num: 2,
    title: 'OTPコードを入力',
    desc: 'WhatsAppまたはSMSで届いた4桁のコードを入力します。日本にいる間に登録を済ませておきましょう。',
    img: greenSMBase64.step2,
    imageLeft: false,
  },
  {
    num: 3,
    title: '行き先を入力',
    desc: '「行き先は？」に目的地を入力。現在地から自動でルートが表示されます。住所を保存しておくと便利です。',
    img: greenSMBase64.step3,
    imageLeft: true,
  },
  {
    num: 4,
    title: '車を選んで呼ぶ',
    desc: '「車」を選択すると配車されます。料金は事前に確定するので安心です。食事の注文もできます。',
    img: greenSMBase64.step4,
    imageLeft: false,
  },
]

export default function GreenSMPage({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 font-sans">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('chui')}
          className="flex items-center gap-1.5 font-sans text-xs font-medium text-[#3d6b63] hover:text-[#c8741a] transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} /> 注意事項へ戻る
        </button>
        <div className="flex items-center gap-1.5 font-sans text-xs text-[#3d6b63] bg-[#f5f1ea] px-3.5 py-1.5 rounded-full font-medium border border-[#e8e0d0]">
          <Smartphone size={14} /> 配車アプリガイド
        </div>
      </div>

      <SectionHeading tag="APP TUTORIAL" sub="安心・快適な電気タクシー配車アプリの使い方（画像タップで拡大）">
        🛺 GreenSMアプリの使い方
      </SectionHeading>

      {/* Tutorial Step Cards */}
      <div className="space-y-6 mb-8">
        {steps.map((step) => (
          <Card
            key={step.num}
            className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-[#faf8f3]"
          >
            {/* Step Content */}
            <div className={`flex-1 space-y-3 ${step.imageLeft ? 'md:order-2' : 'md:order-1'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3d6b63] text-white flex items-center justify-center font-serif text-sm font-medium flex-shrink-0">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl font-normal text-[#1a1208]">
                  {step.title}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm font-light text-[#7a6447] leading-relaxed">
                {step.desc}
              </p>
            </div>

            {/* Phone Screen Mockup Container */}
            <div className={`w-full md:w-64 flex justify-center flex-shrink-0 ${step.imageLeft ? 'md:order-1' : 'md:order-2'}`}>
              <button
                onClick={() => setSelectedImg(step.img)}
                className="relative w-52 sm:w-56 aspect-[9/19] bg-[#1a1208] rounded-[32px] p-2 border-4 border-[#3d6b63]/40 shadow-md overflow-hidden group cursor-pointer focus:outline-none transition-transform hover:scale-[1.02]"
              >
                <div className="w-full h-full bg-[#faf8f3] rounded-[24px] overflow-hidden relative">
                  {/* Speaker notch */}
                  <div className="w-16 h-3 bg-[#1a1208] mx-auto rounded-b-xl absolute top-0 left-0 right-0 z-10" />

                  {/* High Quality Image */}
                  <img
                    src={step.img}
                    alt={`GreenSM Step ${step.num}`}
                    className="w-full h-full object-contain bg-white"
                    loading="eager"
                  />

                  {/* Zoom Hint Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1a1208]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white font-sans text-xs font-medium backdrop-blur-[1px]">
                    <Maximize2 size={16} /> 拡大表示
                  </div>
                </div>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pro Tip Card */}
      <div className="bg-[#fffdf9] border-l-4 border-l-[#c8741a] border border-[#e8e0d0] rounded-2xl p-5 flex items-start gap-3.5">
        <Lightbulb size={20} className="text-[#c8741a] flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-serif text-sm font-medium text-[#1a1208]">日本出発前のご準備</h4>
          <p className="font-sans text-xs font-light text-[#7a6447] mt-1 leading-relaxed">
            日本出発前にSMS認証コードを入力してアカウント作成を完了させておくと、ダナン空港到着直後からスムーズに呼ぶことができます。
          </p>
        </div>
      </div>

      {/* Fullscreen Image Preview Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-[#1a1208]/80 backdrop-blur-sm flex items-center justify-center p-4 overscroll-none"
          onClick={() => setSelectedImg(null)}
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 p-2.5 rounded-full transition-colors z-50 cursor-pointer"
          >
            <X size={22} />
          </button>
          <div
            className="max-w-md w-full max-h-[90vh] overflow-hidden flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg}
              alt="Screenshot Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <p className="text-center font-sans text-[11px] text-[#7a6447]/70 mt-8">
        ※ 本ガイドは一般的な手順を示すものであり、アプリの更新により画面仕様が異なる場合があります。
      </p>
    </div>
  )
}
