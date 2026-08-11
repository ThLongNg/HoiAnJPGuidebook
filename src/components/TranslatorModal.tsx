import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Volume2, Maximize2, Mic, MicOff, Copy, Check, X, Send, Sparkles, RefreshCw, Languages } from 'lucide-react'
import { speak } from '@/utils/tts'

const PRESET_PHRASES = [
  { ja: 'これをお願いします', vi: 'Cho em xin cái này ạ' },
  { ja: 'いくらですか？', vi: 'Cho em hỏi cái này bao nhiêu tiền ạ?' },
  { ja: 'お会計をお願いします', vi: 'Tính tiền giúp em với ạ!' },
  { ja: '安くしてもらえますか？', vi: 'Bớt giá cho em một chút được không ạ?' },
  { ja: 'トイレはどこですか？', vi: 'Cho em hỏi nhà vệ sinh ở đâu ạ?' },
  { ja: '辛くしないでください', vi: 'Đừng làm cay giúp em nhé ạ!' },
  { ja: '写真を撮ってもいいですか？', vi: 'Cho em xin chụp ảnh được không ạ?' },
  { ja: 'おすすめは何ですか？', vi: 'Quán mình có món nào ngon gợi ý cho em ạ?' },
]

export function softenVietnameseTranslation(rawViText: string, jaText: string): string {
  if (!rawViText) return ''
  let text = rawViText.trim()

  text = text.replace(/^Tôi /i, 'Em ')
  text = text.replace(/ tôi /gi, ' em ')
  text = text.replace(/ cho tôi/gi, ' cho em')
  text = text.replace(/^Cho tôi /i, 'Cho em ')

  text = text.replace(/^Cho em cái này/i, 'Cho em xin cái này')
  if (text.toLowerCase().includes('tính tiền') && !text.toLowerCase().includes('giúp em')) {
    text = text.replace(/tính tiền/i, 'tính tiền giúp em')
  }

  const isPoliteJa = /[です|ます|ください|おねがい|お願いします|ですか]/i.test(jaText)
  const hasAlreadyPoliteVi = /[ạ|ạ\?|nhé ạ|với ạ|hả ạ]$/i.test(text)

  if (isPoliteJa && !hasAlreadyPoliteVi) {
    if (text.endsWith('?')) {
      text = text.slice(0, -1).trim() + ' ạ?'
    } else if (text.endsWith('.') || text.endsWith('!')) {
      const punc = text.slice(-1)
      text = text.slice(0, -1).trim() + ' ạ' + punc
    } else {
      text = text + ' ạ'
    }
  }

  return text.charAt(0).toUpperCase() + text.slice(1)
}

export async function translateJaToVi(text: string): Promise<string> {
  if (!text.trim()) return ''
  const foundPreset = PRESET_PHRASES.find((p) => p.ja === text.trim())
  if (foundPreset) return foundPreset.vi

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=vi&dt=t&q=${encodeURIComponent(text.trim())}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Translation network error')
    const data = await res.json()
    if (data && data[0]) {
      const translated = data[0].map((item: [string, string]) => item[0]).join('')
      return softenVietnameseTranslation(translated, text)
    }
  } catch (err) {
    console.error('Translation error:', err)
  }

  return '自動翻訳エラー (ネット接続を確認してください)'
}

interface TranslatorModalProps {
  onClose: () => void
}

export default function TranslatorModal({ onClose }: TranslatorModalProps) {
  const [jaText, setJaText] = useState('')
  const [viText, setViText] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [fullScreenMode, setFullScreenMode] = useState(false)
  const [copied, setCopied] = useState(false)

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!jaText.trim()) {
      setViText('')
      return
    }
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

    setLoading(true)
    debounceTimeout.current = setTimeout(async () => {
      const result = await translateJaToVi(jaText)
      setViText(result)
      setLoading(false)
    }, 400)

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [jaText])

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('お使いのブラウザは音声認識に対応していません。テキスト入力をご利用ください。')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'ja-JP'
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setJaText(transcript)
    }

    recognition.start()
  }

  const handleCopy = () => {
    if (!viText) return
    navigator.clipboard.writeText(viText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overscroll-none">
      <div className="absolute inset-0 bg-[#1a1208]/70 backdrop-blur-sm" onClick={onClose} />

      {/* Fullscreen Display Mode for Merchants */}
      {fullScreenMode ? (
        <div className="relative z-10 w-full h-full bg-[#1a1208] text-white p-6 flex flex-col justify-between items-center text-center rounded-3xl animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => setFullScreenMode(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-2 text-white/60 font-sans text-sm mt-4">
            <Sparkles size={16} className="text-[#c8741a]" />
            店員に見せる拡大画面
          </div>

          <div className="my-auto px-4 max-w-2xl">
            <p className="font-serif text-3xl sm:text-5xl font-normal leading-relaxed text-white text-balance tracking-wide">
              {viText}
            </p>
            {jaText && (
              <p className="font-sans text-base sm:text-lg text-white/60 font-light mt-6 border-t border-white/10 pt-4">
                日本語: {jaText}
              </p>
            )}
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => speak(viText)}
              className="px-6 py-3 rounded-full bg-[#c8741a] hover:bg-[#a85e12] text-white font-sans text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Volume2 size={18} /> ベトナム語で発音
            </button>
            <button
              onClick={handleCopy}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              {copied ? 'コピー完了' : 'テキストをコピー'}
            </button>
          </div>
        </div>
      ) : (
        /* Normal Modal Mode */
        <div className="relative z-10 bg-[#faf8f3] border border-[#e8e0d0] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden text-[#1a1208] animate-in fade-in zoom-in-95 duration-200 my-auto">
          {/* Header */}
          <div className="bg-[#1e1408] p-5 flex items-center justify-between text-white border-b border-[#c8741a]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#c8741a]/20 border border-[#c8741a]/40 flex items-center justify-center text-[#c8741a]">
                <Languages size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-normal text-white flex items-center gap-2">
                  日越リアルタイム翻訳
                </h3>
                <p className="font-sans text-xs text-white/60 font-light">
                  日本語を入力・音声発話するとベトナム語に変換されます
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Input Box */}
            <div className="relative">
              <textarea
                value={jaText}
                onChange={(e) => setJaText(e.target.value)}
                placeholder="日本語で伝えたい言葉を入力..."
                rows={3}
                className="w-full bg-[#f5f1ea] border border-[#e8e0d0] rounded-2xl p-4 text-sm font-sans text-[#1a1208] placeholder-[#7a6447]/60 focus:outline-none focus:border-[#c8741a] transition-all resize-none"
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-[#faf8f3] text-[#7a6447] border border-[#e8e0d0] hover:text-[#c8741a]'
                  }`}
                  title="音声で日本語を入力"
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
              </div>
            </div>

            {/* Presets */}
            <div>
              <div className="font-sans text-[11px] font-medium text-[#7a6447] mb-2 flex items-center gap-1">
                <Sparkles size={12} className="text-[#c8741a]" /> よく使う日常フレーズ
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PHRASES.map((preset) => (
                  <button
                    key={preset.ja}
                    onClick={() => {
                      setJaText(preset.ja)
                      setViText(preset.vi)
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#f5f1ea] border border-[#e8e0d0] text-xs font-sans text-[#4a3728] hover:border-[#c8741a] hover:text-[#c8741a] transition-all cursor-pointer"
                  >
                    {preset.ja}
                  </button>
                ))}
              </div>
            </div>

            {/* Translation Output Box */}
            <div className="bg-[#fffdf9] border-2 border-[#c8741a]/30 rounded-2xl p-4 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-medium text-[#c8741a] uppercase tracking-wider flex items-center gap-1">
                  🇻🇳 ベトナム語訳
                  {loading && <RefreshCw size={12} className="animate-spin text-[#c8741a]" />}
                </span>
                {viText && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speak(viText)}
                      className="p-1.5 rounded-lg bg-[#3d6b63]/10 text-[#3d6b63] hover:bg-[#3d6b63] hover:text-white transition-colors cursor-pointer"
                      title="読み上げ"
                    >
                      <Volume2 size={15} />
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-lg bg-[#c8741a]/10 text-[#c8741a] hover:bg-[#c8741a] hover:text-white transition-colors cursor-pointer"
                      title="コピー"
                    >
                      {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                    </button>
                  </div>
                )}
              </div>

              <div className="font-serif text-xl sm:text-2xl font-normal text-[#1a1208] min-h-[50px] flex items-center leading-relaxed">
                {viText || (
                  <span className="text-sm font-sans text-[#7a6447]/50 font-light italic">
                    日本語を入力すると翻訳がここに表示されます
                  </span>
                )}
              </div>

              {viText && (
                <div className="pt-2 border-t border-[#e8e0d0] flex items-center justify-end gap-2">
                  <button
                    onClick={() => setFullScreenMode(true)}
                    className="px-4 py-2 rounded-full bg-[#c8741a] hover:bg-[#a85e12] text-white font-sans text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Maximize2 size={14} /> 全画面で店員に見せる
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  )
}
