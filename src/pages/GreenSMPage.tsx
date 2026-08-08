import { useState } from 'react'
import { ChevronLeft, Lightbulb, Smartphone, X, Maximize2 } from 'lucide-react'
import { type Tab } from '@/types'
import { greenSMBase64 } from '@/data/greenSMImages'

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
    <div className="pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate('chui')}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0f766e] hover:opacity-80 transition-opacity"
        >
          <ChevronLeft size={16} /> 注意事項に戻る
        </button>
        <div className="flex items-center gap-1 text-xs text-[#0f766e] bg-[#e6f4f1] px-3 py-1 rounded-full font-medium border border-[#b2f5ea]">
          <Smartphone size={12} /> アプリの使い方
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="mb-8">
        <span className="inline-block bg-[#e6f4f1] text-[#0f766e] text-[11px] font-bold px-3 py-1 rounded-full border border-[#b2f5ea] tracking-wider uppercase mb-2">
          APP TUTORIAL
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          🛺 GreenSMの使い方
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          安全で快適な配車アプリ（画像タップで拡大表示できます）
        </p>
      </div>

      {/* Tutorial Step Cards */}
      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6 sm:gap-8"
          >
            {/* Step Content */}
            <div className={`flex-1 space-y-3 ${step.imageLeft ? 'md:order-2' : 'md:order-1'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0f766e] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-800 text-lg sm:text-xl">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>

            {/* Phone Screen Mockup Container (High Resolution & Crisp) */}
            <div className={`w-full md:w-64 flex justify-center flex-shrink-0 ${step.imageLeft ? 'md:order-1' : 'md:order-2'}`}>
              <button
                onClick={() => setSelectedImg(step.img)}
                className="relative w-56 sm:w-60 aspect-[9/19] bg-slate-900 rounded-[36px] p-2 border-4 border-slate-800 shadow-xl overflow-hidden group cursor-pointer focus:outline-none transition-transform hover:scale-[1.02]"
              >
                <div className="w-full h-full bg-slate-100 rounded-[26px] overflow-hidden relative">
                  {/* Speaker notch */}
                  <div className="w-20 h-3.5 bg-slate-800 mx-auto rounded-b-xl absolute top-0 left-0 right-0 z-10" />

                  {/* High Quality Image */}
                  <img
                    src={step.img}
                    alt={`GreenSM Step ${step.num}`}
                    className="w-full h-full object-contain bg-white"
                    style={{ imageRendering: 'crisp-edges' }}
                    loading="eager"
                    decoding="async"
                  />

                  {/* Zoom Hint Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-bold backdrop-blur-[1px]">
                    <Maximize2 size={16} /> 拡大表示
                  </div>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip Card */}
      <div className="mt-8 bg-amber-50/70 border border-amber-200/80 rounded-3xl p-5 flex items-center gap-3.5 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-500 flex items-center justify-center flex-shrink-0 text-xl">
          <Lightbulb size={20} className="text-amber-500 fill-amber-400" />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 text-sm">プロのヒント</h4>
          <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
            日本出発前にアプリの登録を完了しておくと、ベトナム到着後すぐに使えます。
          </p>
        </div>
      </div>

      {/* Fullscreen Image Preview Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overscroll-none"
          onClick={() => setSelectedImg(null)}
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 p-2.5 rounded-full transition-colors z-50"
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
      <p className="text-center text-[11px] text-slate-400 mt-10">
        ※ 本ガイドは一般的な手順を示すものであり、アプリの更新により画面仕様が異なる場合があります。
      </p>
    </div>
  )
}
