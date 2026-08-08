import { useState, useEffect } from 'react'
import { ArrowRightLeft, RefreshCw, AlertCircle, Check, Edit2, X, Coins } from 'lucide-react'
import { BanknotesIcon, ArrowsRightLeftIcon, CurrencyYenIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { sky } from '@/types'

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

  // Recalculate bottom value based on top value
  const recalculateFromTop = (valStr: string, jpyTop: boolean, currentRate: number) => {
    const clean = valStr.replace(/,/g, '')
    const num = parseFloat(clean)
    if (isNaN(num) || num <= 0) {
      setBottomVal('')
      return
    }
    if (jpyTop) {
      // JPY -> VND
      const res = Math.round(num * currentRate)
      setBottomVal(res.toLocaleString('en-US'))
    } else {
      // VND -> JPY
      const res = Math.round(num / currentRate)
      setBottomVal(res.toLocaleString('en-US'))
    }
  }

  // Recalculate top value based on bottom value
  const recalculateFromBottom = (valStr: string, jpyTop: boolean, currentRate: number) => {
    const clean = valStr.replace(/,/g, '')
    const num = parseFloat(clean)
    if (isNaN(num) || num <= 0) {
      setTopVal('')
      return
    }
    if (jpyTop) {
      // Bottom is VND -> calculate JPY for Top
      const res = Math.round(num / currentRate)
      setTopVal(res.toLocaleString('en-US'))
    } else {
      // Bottom is JPY -> calculate VND for Top
      const res = Math.round(num * currentRate)
      setTopVal(res.toLocaleString('en-US'))
    }
  }

  const handleTopChange = (val: string) => {
    const clean = val.replace(/,/g, '')
    if (clean === '') {
      setTopVal('')
      setBottomVal('')
      return
    }
    const formatted = parseFloat(clean).toLocaleString('en-US')
    setTopVal(formatted)
    recalculateFromTop(clean, isJpyTop, rateData.rate)
  }

  const handleBottomChange = (val: string) => {
    const clean = val.replace(/,/g, '')
    if (clean === '') {
      setBottomVal('')
      setTopVal('')
      return
    }
    const formatted = parseFloat(clean).toLocaleString('en-US')
    setBottomVal(formatted)
    recalculateFromBottom(clean, isJpyTop, rateData.rate)
  }

  // 🔄 Swap button handler: Swaps top/bottom currencies and their values!
  const handleSwap = () => {
    setIsJpyTop((prev) => !prev)
    const oldTop = topVal
    const oldBottom = bottomVal
    setTopVal(oldBottom)
    setBottomVal(oldTop)
  }

  const handleApplyCustomRate = () => {
    const parsed = parseFloat(customRate)
    if (!isNaN(parsed) && parsed > 0) {
      const newRateData = {
        rate: parsed,
        lastUpdated: '手動設定',
        isLive: false,
      }
      setRateData(newRateData)
      setIsEditingRate(false)
      recalculateFromTop(topVal, isJpyTop, parsed)
    }
  }

  const quickAmounts = [
    { label: '20,000 đ', vnd: 20000, note: '灯籠 / 飲料' },
    { label: '40,000 đ', vnd: 40000, note: 'カオラウ' },
    { label: '120,000 đ', vnd: 120000, note: '旧市街チケット' },
    { label: '200,000 đ', vnd: 200000, note: 'ボート体験' },
  ]

  const topCurrencyLabel = isJpyTop ? '日本円 (JPY)' : 'ベトナムドン (VND)'
  const topBadgeIcon = isJpyTop ? (
    <span className="flex items-center gap-1 text-slate-700 font-bold bg-amber-100/70 px-2 py-0.5 rounded-md border border-amber-200">
      <CurrencyYenIcon className="w-3.5 h-3.5 text-amber-600" /> 円
    </span>
  ) : (
    <span className="flex items-center gap-1 text-slate-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200">
      <BanknotesIcon className="w-3.5 h-3.5 text-emerald-600" /> ドン
    </span>
  )

  const bottomCurrencyLabel = isJpyTop ? 'ベトナムドン (VND)' : '日本円 (JPY)'
  const bottomBadgeIcon = isJpyTop ? (
    <span className="flex items-center gap-1 text-slate-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200">
      <BanknotesIcon className="w-3.5 h-3.5 text-emerald-600" /> ドン
    </span>
  ) : (
    <span className="flex items-center gap-1 text-slate-700 font-bold bg-amber-100/70 px-2 py-0.5 rounded-md border border-amber-200">
      <CurrencyYenIcon className="w-3.5 h-3.5 text-amber-600" /> 円
    </span>
  )

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-sky-100 rounded-3xl p-6 shadow-xl relative">
      {/* Optional Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <X size={16} />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4 pr-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
            <ArrowsRightLeftIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">通貨両替計算機</h3>
        </div>

        {/* Live indicator & Refresh */}
        <div className="flex items-center gap-2">
          <button
            onClick={loadRates}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 transition-colors shadow-2xs"
            title="レートを更新"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin text-sky-500' : ''} />
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${rateData.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              {rateData.isLive ? 'リアルタイム' : 'キャッシュ'}
            </span>
          </button>
        </div>
      </div>

      {/* Rate notice */}
      <div className="flex items-center justify-between text-xs text-slate-500 bg-sky-50/70 border border-sky-100 px-3 py-2 rounded-2xl mb-4">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-700">1 JPY ≈ {rateData.rate.toFixed(2)} VND</span>
          <span className="text-[10px] text-slate-400">({rateData.lastUpdated})</span>
        </div>
        <button
          onClick={() => setIsEditingRate(!isEditingRate)}
          className="text-sky-600 hover:underline flex items-center gap-1 font-medium"
        >
          <Edit2 size={11} /> レート変更
        </button>
      </div>

      {/* Custom rate editor */}
      {isEditingRate && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mb-4 space-y-2 anim-in">
          <div className="text-xs text-amber-800 font-semibold flex items-center gap-1">
            <AlertCircle size={13} className="text-amber-600" /> 両替所の実際レートを手動入力
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">1 JPY =</span>
            <input
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              className="w-24 px-2 py-1 bg-white border border-amber-300 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <span className="text-xs text-slate-600">VND</span>
            <button
              onClick={handleApplyCustomRate}
              className="px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-amber-600 transition-colors"
            >
              <Check size={12} /> 適用
            </button>
          </div>
        </div>
      )}

      {/* Input controls */}
      <div className="space-y-3">
        {/* Top Field */}
        <div className="bg-slate-50 border border-slate-200 focus-within:border-sky-400 focus-within:bg-white rounded-2xl p-3.5 transition-all">
          <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-between">
            <span>{topCurrencyLabel}</span>
            {topBadgeIcon}
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={topVal}
            onChange={(e) => handleTopChange(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent text-xl font-bold text-slate-800 focus:outline-none"
          />
        </div>

        {/* Switch direction button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleSwap}
            className="w-10 h-10 bg-white border-2 border-sky-300 rounded-full flex items-center justify-center text-sky-600 shadow-md hover:bg-sky-50 hover:scale-110 active:scale-95 transition-all"
            title="通貨と金額を入れ替え (Swap)"
          >
            <ArrowRightLeft size={16} className="rotate-90 text-sky-500" />
          </button>
        </div>

        {/* Bottom Field */}
        <div className="bg-slate-50 border border-slate-200 focus-within:border-sky-400 focus-within:bg-white rounded-2xl p-3.5 transition-all">
          <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-between">
            <span>{bottomCurrencyLabel}</span>
            {bottomBadgeIcon}
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={bottomVal}
            onChange={(e) => handleBottomChange(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent text-xl font-bold text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      {/* Quick preset buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="text-xs text-slate-400 font-medium mb-2">よく使う金額（タップで計算）:</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickAmounts.map((q) => (
            <button
              key={q.vnd}
              onClick={() => {
                if (isJpyTop) {
                  setBottomVal(q.vnd.toLocaleString('en-US'))
                  recalculateFromBottom(q.vnd.toString(), true, rateData.rate)
                } else {
                  setTopVal(q.vnd.toLocaleString('en-US'))
                  recalculateFromTop(q.vnd.toString(), false, rateData.rate)
                }
              }}
              className="text-left bg-sky-50/70 hover:bg-sky-100 border border-sky-100 rounded-xl p-2 transition-all active:scale-95"
            >
              <div className="font-bold text-xs text-slate-800">{q.label}</div>
              <div className="text-[10px]" style={{ color: sky[600] }}>
                ≈ {Math.round(q.vnd / rateData.rate).toLocaleString()} JPY
              </div>
              <div className="text-[9px] text-slate-400 truncate mt-0.5">{q.note}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
