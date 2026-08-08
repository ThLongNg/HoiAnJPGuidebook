import { useState, useEffect, useRef } from 'react'
import { Volume2, Maximize2, Mic, MicOff, Copy, Check, X, Send, Sparkles, RefreshCw } from 'lucide-react'
import { LanguageIcon, SpeakerWaveIcon, MicrophoneIcon } from '@heroicons/react/24/outline'
import { speak } from '@/utils/tts'
import { sky } from '@/types'

// Pre-defined quick tourist phrases for 1-tap translation (using polite Vietnamese pronouns & particles)
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

  // 1. Replace rigid pronoun "Tôi" with polite "Em" for tourist-to-merchant context
  text = text.replace(/^Tôi /i, 'Em ')
  text = text.replace(/ tôi /gi, ' em ')
  text = text.replace(/ cho tôi/gi, ' cho em')
  text = text.replace(/^Cho tôi /i, 'Cho em ')

  // 2. Refine common verbs
  text = text.replace(/^Cho em cái này/i, 'Cho em xin cái này')
  if (text.toLowerCase().includes('tính tiền') && !text.toLowerCase().includes('giúp em')) {
    text = text.replace(/tính tiền/i, 'tính tiền giúp em')
  }

  // 3. Add polite particle "ạ" if Japanese sentence has polite form (desu, masu, kudasai, etc.)
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

  // Capitalize first letter
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export async function translateJaToVi(text: string): Promise<string> {
  if (!text.trim()) return ''
  // 1. Check preset phrases first
  const foundPreset = PRESET_PHRASES.find((p) => p.ja === text.trim())
  if (foundPreset) return foundPreset.vi

  // 2. Fetch Google Translate GTX endpoint (Free & No API key needed)
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

  return 'Dịch tự động (Cần kết nối mạng)'
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

  // Handle translation on text change with debounce
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

  // Speech Recognition (Web Speech API)
  const handleToggleListening = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('ご使用のブラウザは音声認識に対応していません。（Safari / Chrome をお試しください）')
      return
    }

    if (isListening) {
      setIsListening(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = 'ja-JP'
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setJaText(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (e) {
      console.error(e)
      setIsListening(false)
    }
  }

  const handleCopy = () => {
    if (!viText) return
    navigator.clipboard.writeText(viText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* ─── Standard Translator Modal ─── */}
      {!fullScreenMode && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md anim-in overscroll-none"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-sky-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                  <LanguageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">日越 リアルタイム翻訳</h3>
                  <p className="text-xs text-slate-400">日本語 ➔ ベトナム語 即時翻訳</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Quick Presets */}
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                  <Sparkles size={12} className="text-sky-500" /> よく使う旅行フレーズ:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_PHRASES.slice(0, 6).map((p) => (
                    <button
                      key={p.ja}
                      onClick={() => setJaText(p.ja)}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-sky-100 hover:text-sky-700 text-slate-700 transition-colors font-medium"
                    >
                      {p.ja}
                    </button>
                  ))}
                </div>
              </div>

              {/* Japanese Input Area */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 focus-within:border-sky-400 focus-within:bg-white transition-all relative">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>🇯🇵 日本語を入力 / 音声入力</span>
                  {jaText && (
                    <button onClick={() => setJaText('')} className="text-slate-400 hover:text-slate-600">
                      クリア
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={jaText}
                  onChange={(e) => setJaText(e.target.value)}
                  placeholder="例: 「こんにちは」「これを一つください」「辛くしないでください」"
                  className="w-full bg-transparent text-base text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
                />

                {/* Voice Input Button */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleToggleListening}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-600'
                      }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff size={14} /> 音声聞き取り中...
                      </>
                    ) : (
                      <>
                        <MicrophoneIcon className="w-4 h-4 text-sky-500" /> 音声で入力
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Translation Output Area */}
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl p-5 shadow-lg space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-medium text-white/80">
                  <span>🇻🇳 ベトナム語訳結果</span>
                  {loading && (
                    <span className="flex items-center gap-1 text-[11px]">
                      <RefreshCw size={12} className="animate-spin" /> 翻訳中...
                    </span>
                  )}
                </div>

                <div className="min-h-[60px] flex items-center">
                  <p className="text-xl font-bold leading-relaxed break-words">
                    {viText || (jaText ? '...' : 'ここにベトナム語訳が表示されます')}
                  </p>
                </div>

                {/* Actions: Full Screen Showcase & Audio & Copy */}
                {viText && (
                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <button
                      onClick={() => speak(viText)}
                      className="flex items-center gap-1.5 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <SpeakerWaveIcon className="w-4 h-4 text-white" /> 音声で再生
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        title="コピー"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>

                      {/* 🔍 HUGE FULL SCREEN SHOWCASE BUTTON */}
                      <button
                        onClick={() => setFullScreenMode(true)}
                        className="flex items-center gap-1.5 text-xs font-extrabold bg-amber-400 text-slate-900 hover:bg-amber-300 px-4 py-2 rounded-full shadow-md transition-all active:scale-95"
                      >
                        <Maximize2 size={14} /> 店員に見せる (全画面)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Full-Screen Merchant Showcase Mode ─── */}
      {fullScreenMode && (
        <div className="fixed inset-0 z-[110] bg-amber-400 text-slate-950 flex flex-col justify-between p-6 sm:p-10 select-none anim-in overscroll-none pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {/* Top Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setFullScreenMode(false)}
              className="flex items-center gap-2 bg-slate-950 text-white font-bold text-sm px-4 py-2.5 rounded-full shadow-lg hover:bg-slate-800 active:scale-95 transition-all"
            >
              <X size={18} /> 閉じる (戻る)
            </button>

            <button
              onClick={() => speak(viText)}
              className="flex items-center gap-2 bg-slate-950 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg hover:bg-slate-800 active:scale-95 transition-all"
            >
              <SpeakerWaveIcon className="w-5 h-5 text-amber-400" /> 音声再生 🔊
            </button>
          </div>

          {/* Huge Main Vietnamese Text */}
          <div className="flex-1 flex flex-col justify-center items-center text-center px-4 my-auto">
            <span className="text-sm font-black uppercase tracking-widest text-slate-800 bg-amber-300/80 px-4 py-1 rounded-full mb-6 border border-slate-900/20">
              VUI LÒNG ĐỌC CÂU NÀY
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-slate-950 max-w-4xl drop-shadow-xs">
              {viText}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-slate-800 mt-8 max-w-2xl border-t border-slate-950/20 pt-4">
              🇯🇵 {jaText}
            </p>
          </div>

          {/* Bottom Notice */}
          <div className="text-center text-xs sm:text-sm font-bold text-slate-800/80 bg-amber-300/60 py-3 rounded-2xl border border-slate-900/10">
            この画面を店員さんやタクシーの運転手さんに見せてあげましょう。
          </div>
        </div>
      )}
    </>
  )
}
