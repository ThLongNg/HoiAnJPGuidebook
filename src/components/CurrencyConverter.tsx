import { useState, useEffect } from 'react'
import { ArrowRightLeft, RefreshCw, AlertCircle, Check, Edit2, X, Coins, Banknote, Sparkles } from 'lucide-react'

const CACHE_KEY = 'hoian_exchange_rate_data'
const DEFAULT_JPY_TO_VND = 165 // Fallback: 1 JPY = 165 VND

export interface ExchangeRateData {
  rate: number // 1 JPY = X VND
  lastUpdated: string
  isLive: boolean
}

export async function fetchExchangeRate(): Promise<ExchangeRateData> {
  const formatTime = () => new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })

  // 1. Try Primary Open ER API (v6)
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/JPY')
    if (res.ok) {
      const data = await res.json()
      if (data && data.rates && data.rates.VND) {
        const rate = data.rates.VND
        const result: ExchangeRateData = {
          rate,
          lastUpdated: formatTime(),
          isLive: true,
        }
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(result)) } catch {}
        return result
      }
    }
  } catch (err) {
    console.warn('Primary exchange rate API failed, trying fallback API:', err)
  }

  // 2. Try Secondary ExchangeRate-API (v4)
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/JPY')
    if (res.ok) {
      const data = await res.json()
      if (data && data.rates && data.rates.VND) {
        const rate = data.rates.VND
        const result: ExchangeRateData = {
          rate,
          lastUpdated: formatTime(),
          isLive: true,
        }
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(result)) } catch {}
        return result
      }
    }
  } catch (err) {
    console.warn('Secondary exchange rate API failed:', err)
  }

  // 3. Try LocalStorage Cache
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      return { ...parsed, isLive: false }
    }
  } catch {}

  // 4. Default Fallback
  return {
    rate: DEFAULT_JPY_TO_VND,
    lastUpdated: 'デフォルト',
    isLive: false,
  }
}

interface CurrencyConverterProps {
  onClose?: () => void
}

export default function CurrencyConverter({ onClose }: CurrencyConverterProps) {
  const [isJpyTop, setIsJpyTop] = useState(true)
  const [topVal, setTopVal] = useState<string>('1,000')
  const [bottomVal, setBottomVal] = useState<string>('')

  const [rateData, setRateData] = useState<ExchangeRateData>({
    rate: DEFAULT_JPY_TO_VND,
    lastUpdated: '読込中...',
    isLive: false,
  })
  const [loading, setLoading] = useState(false)
  const [isEditingRate, setIsEditingRate] = useState(false)
  const [customRate, setCustomRate] = useState<string>('165')

  const loadRates = async () => {
    setLoading(true)
    const data = await fetchExchangeRate()
    setRateData(data)
    setCustomRate(data.rate.toFixed(2))
    recalculateFromTop(topVal, isJpyTop, data.rate)
    setLoading(false)
  }

  useEffect(() => {
    loadRates()
  }, [])

  const currentRate = parseFloat(customRate) || rateData.rate

  const parseNum = (str: string): number => {
    const cleaned = str.replace(/,/g, '').trim()
    return parseFloat(cleaned) || 0
  }

  const formatNum = (num: number): string => {
    if (isNaN(num) || num === 0) return ''
    return Math.round(num).toLocaleString('en-US')
  }

  const recalculateFromTop = (valStr: string, jpyIsTop: boolean, rate: number) => {
    const val = parseNum(valStr)
    if (val === 0) {
      setBottomVal('')
      return
    }
    if (jpyIsTop) {
      const vnd = val * rate
      setBottomVal(formatNum(vnd))
    } else {
      const jpy = val / rate
      setBottomVal(formatNum(jpy))
    }
  }

  const recalculateFromBottom = (valStr: string, jpyIsTop: boolean, rate: number) => {
    const val = parseNum(valStr)
    if (val === 0) {
      setTopVal('')
      return
    }
    if (jpyIsTop) {
      const jpy = val / rate
      setTopVal(formatNum(jpy))
    } else {
      const vnd = val * rate
      setTopVal(formatNum(vnd))
    }
  }

  const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const parsed = parseNum(raw)
    const formatted = raw === '' ? '' : parsed.toLocaleString('en-US')
    setTopVal(formatted)
    recalculateFromTop(raw, isJpyTop, currentRate)
  }

  const handleBottomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const parsed = parseNum(raw)
    const formatted = raw === '' ? '' : parsed.toLocaleString('en-US')
    setBottomVal(formatted)
    recalculateFromBottom(raw, isJpyTop, currentRate)
  }

  const handleSwap = () => {
    const nextJpyTop = !isJpyTop
    setIsJpyTop(nextJpyTop)
    const oldTop = topVal
    setTopVal(bottomVal)
    setBottomVal(oldTop)
  }

  const handlePresetJpy = (amount: number) => {
    const formatted = amount.toLocaleString('en-US')
    if (isJpyTop) {
      setTopVal(formatted)
      recalculateFromTop(formatted, true, currentRate)
    } else {
      setBottomVal(formatted)
      recalculateFromBottom(formatted, false, currentRate)
    }
  }

  const handlePresetVnd = (amount: number) => {
    const formatted = amount.toLocaleString('en-US')
    if (!isJpyTop) {
      setTopVal(formatted)
      recalculateFromTop(formatted, false, currentRate)
    } else {
      setBottomVal(formatted)
      recalculateFromBottom(formatted, true, currentRate)
    }
  }

  const handleSaveCustomRate = () => {
    setIsEditingRate(false)
    recalculateFromTop(topVal, isJpyTop, currentRate)
  }

  return (
    <div className="bg-[#faf8f3] border border-[#e8e0d0] rounded-2xl shadow-xl p-5 font-sans relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#e8e0d0] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#c8741a]/10 border border-[#c8741a]/30 text-[#c8741a] flex items-center justify-center">
            <Coins size={18} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-[#1a1208]">ベトナムドン リアルタイム計算機</h3>
            <p className="font-sans text-[10px] text-[#7a6447]">自動でリアルタイム為替レートを取得・現場で簡単入力</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f1ea] hover:bg-[#e8e0d0] text-[#1a1208] flex items-center justify-center transition-colors cursor-pointer border border-[#e8e0d0]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Exchange Rate Status & Edit Bar */}
      <div className="mb-4 bg-[#f5f1ea] border border-[#e8e0d0] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[#1a1208]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            1 JPY = {currentRate.toFixed(2)} VND
          </span>
          <span className="font-sans text-[10px] text-[#7a6447]">
            ({rateData.isLive ? `ライブ更新 ${rateData.lastUpdated}` : `参考レート`})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingRate(!isEditingRate)}
            className="font-sans text-xs text-[#c8741a] hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <Edit2 size={12} /> {isEditingRate ? '完了' : 'レート手動変更'}
          </button>
          <button
            onClick={loadRates}
            disabled={loading}
            className="w-7 h-7 rounded-lg bg-[#faf8f3] border border-[#e8e0d0] text-[#7a6447] hover:text-[#1a1208] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
            title="最新レートを再取得"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Manual Rate Editor Drawer */}
      {isEditingRate && (
        <div className="mb-4 p-3 bg-[#fffdf9] border-l-4 border-l-[#c8741a] border border-[#e8e0d0] rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <span className="font-sans text-xs text-[#1a1208] font-medium whitespace-nowrap">カスタムレート (1円=):</span>
            <input
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              className="w-24 bg-[#faf8f3] border border-[#e8e0d0] rounded-lg px-2.5 py-1 font-sans text-xs font-medium text-[#1a1208] focus:outline-none focus:border-[#c8741a]"
            />
            <span className="font-sans text-xs text-[#7a6447]">VND</span>
          </div>
          <button
            onClick={handleSaveCustomRate}
            className="px-3 py-1 bg-[#c8741a] text-white rounded-lg font-sans text-xs font-medium hover:bg-[#a85e12] transition-colors cursor-pointer"
          >
            保存
          </button>
        </div>
      )}

      {/* Inputs Area */}
      <div className="space-y-3">
        {/* Top Input Box */}
        <div className="bg-[#f5f1ea] border border-[#e8e0d0] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg">{isJpyTop ? '🇯🇵' : '🇻🇳'}</span>
            <span className="font-serif text-sm font-medium text-[#1a1208]">{isJpyTop ? '日本円 (JPY)' : 'ベトナムドン (VND)'}</span>
          </div>
          <input
            type="text"
            value={topVal}
            onChange={handleTopChange}
            placeholder="0"
            className="text-right font-serif text-xl font-medium bg-transparent text-[#1a1208] focus:outline-none w-36"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleSwap}
            className="w-9 h-9 rounded-full bg-[#c8741a] text-white shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="入れ替え"
          >
            <ArrowRightLeft size={16} className="rotate-90" />
          </button>
        </div>

        {/* Bottom Input Box */}
        <div className="bg-[#f5f1ea] border border-[#e8e0d0] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg">{!isJpyTop ? '🇯🇵' : '🇻🇳'}</span>
            <span className="font-serif text-sm font-medium text-[#1a1208]">{!isJpyTop ? '日本円 (JPY)' : 'ベトナムドン (VND)'}</span>
          </div>
          <input
            type="text"
            value={bottomVal}
            onChange={handleBottomChange}
            placeholder="0"
            className="text-right font-serif text-xl font-medium bg-transparent text-[#c8741a] focus:outline-none w-44"
          />
        </div>
      </div>

      {/* Quick Amount Presets */}
      <div className="mt-4 pt-3 border-t border-[#e8e0d0]">
        <div className="font-sans text-[11px] text-[#7a6447] font-medium mb-2">クイック選択（クリックで即計算）</div>

        <div className="space-y-2">
          {/* JPY Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-sans text-[10px] text-[#7a6447] w-8">円:</span>
            {[100, 500, 1000, 3000, 5000, 10000].map((amt) => (
              <button
                key={amt}
                onClick={() => handlePresetJpy(amt)}
                className="px-2.5 py-1 rounded-full font-sans text-xs font-medium bg-[#f5f1ea] text-[#1a1208] border border-[#e8e0d0] hover:bg-[#c8741a] hover:text-white transition-colors cursor-pointer"
              >
                ¥{amt.toLocaleString()}
              </button>
            ))}
          </div>

          {/* VND Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-sans text-[10px] text-[#7a6447] w-8">ドン:</span>
            {[20000, 50000, 100000, 200000, 500000].map((amt) => (
              <button
                key={amt}
                onClick={() => handlePresetVnd(amt)}
                className="px-2.5 py-1 rounded-full font-sans text-xs font-medium bg-[#f5f1ea] text-[#3d6b63] border border-[#e8e0d0] hover:bg-[#3d6b63] hover:text-white transition-colors cursor-pointer"
              >
                {(amt / 1000).toLocaleString()}k
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
