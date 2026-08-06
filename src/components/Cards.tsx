import { Volume2, ChevronRight, MapPin, Star, Clock, Navigation } from 'lucide-react'
import { sky } from '@/types'
import { speak } from '@/utils/tts'
import { Card, SpeakButton } from '@/components/Atoms'

export function PhraseCard({
  vn,
  reading,
  meanings,
  delay = 0,
}: {
  vn: string
  reading: string
  meanings: string[]
  delay?: number
}) {
  return (
    <Card
      className="anim-up p-5 hover:shadow-md hover:border-sky-200 transition-all"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="text-xl font-bold text-slate-900">{vn}</div>
          <div className="text-sm font-medium mt-0.5" style={{ color: sky[500] }}>
            {reading}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meanings.map((m) => (
              <span
                key={m}
                className="text-xs bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-100"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <SpeakButton text={vn} />
      </div>
    </Card>
  )
}

export function AddressCard({
  emoji,
  vn,
  reading,
  jp,
  bg,
  delay,
}: {
  emoji: string
  vn: string
  reading: string
  jp: string
  bg: string
  delay: number
}) {
  return (
    <div
      className="anim-up flex items-center gap-4 rounded-2xl p-4 border border-sky-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
      style={{ backgroundColor: bg, animationDelay: `${delay}s` } as React.CSSProperties}
      onClick={() => speak(vn)}
    >
      <div className="text-3xl w-12 h-12 flex items-center justify-center bg-white/70 rounded-xl flex-shrink-0">
        {emoji}
      </div>
      <div className="flex-1">
        <div className="text-lg font-bold text-slate-900">{vn}</div>
        <div className="text-xs font-medium mt-0.5" style={{ color: sky[500] }}>{reading}</div>
        <div className="text-sm text-slate-500 mt-0.5">{jp}</div>
      </div>
      <Volume2 size={14} className="text-slate-400" />
    </div>
  )
}

export function OrderCard({
  num,
  vn,
  reading,
  count,
  delay,
}: {
  num: number
  vn: string
  reading: string
  count: string
  delay: number
}) {
  return (
    <div
      className="anim-up flex items-center bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden hover:shadow-md hover:border-sky-200 transition-all cursor-pointer"
      style={{ animationDelay: `${delay}s` } as React.CSSProperties}
      onClick={() => speak(vn)}
    >
      <div
        className="w-16 h-16 flex items-center justify-center flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${sky[500]}, ${sky[400]})` }}
      >
        <span className="text-2xl font-bold text-white">{num}</span>
      </div>
      <div className="flex-1 px-4 py-3">
        <div className="font-bold text-slate-900">{vn}</div>
        <div className="text-xs mt-0.5 font-medium" style={{ color: sky[500] }}>
          {reading}
        </div>
      </div>
      <div className="pr-4 flex items-center gap-2">
        <span className="text-sm text-slate-400">{count}</span>
        <Volume2 size={14} className="text-slate-300" />
      </div>
    </div>
  )
}

export function ExpressionCard({
  vn,
  reading,
  jp,
  sub,
  delay,
}: {
  vn: string
  reading: string
  jp: string
  delay: number
  sub?: { vn: string; jp: string; example: string; exJp: string }
}) {
  return (
    <Card
      className="anim-up p-5 hover:shadow-md hover:border-sky-200 transition-all"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-lg font-bold text-slate-900">{vn}</div>
          <div className="text-xs font-medium mt-0.5" style={{ color: sky[500] }}>{reading}</div>
          <div className="text-sm text-slate-500 mt-1">{jp}</div>
        </div>
        <SpeakButton text={vn} size={14} />
      </div>
      {sub && (
        <div className="mt-4 pt-4 border-t border-sky-50 flex flex-wrap gap-2 items-center">
          <span className="text-xs bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-100">
            {sub.vn} = {sub.jp}
          </span>
          <ChevronRight size={12} className="text-sky-400" />
          <span className="text-sm font-medium text-slate-700">{sub.example}</span>
          <span className="text-xs text-slate-400">{sub.exJp}</span>
        </div>
      )}
    </Card>
  )
}

export function FoodCard({
  num,
  name,
  desc,
  img,
  delay,
}: {
  num: string
  name: string
  desc: string
  img: string
  delay: number
}) {
  return (
    <Card
      className="anim-up overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative h-52 bg-sky-100 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {num}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-bold text-slate-900">{name}</div>
          <SpeakButton text={name} size={14} />
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </Card>
  )
}

export function SpotCard({
  name,
  nameJp,
  area,
  rating,
  time,
  desc,
  img,
  mapUrl,
  delay,
}: {
  name: string
  nameJp: string
  area: string
  rating: number
  time: string
  desc: string
  img: string
  mapUrl: string
  delay: number
}) {
  return (
    <Card
      className="anim-up overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative h-48 bg-sky-100 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-3 left-3 text-xs font-bold text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
          <MapPin size={10} /> {area}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-white font-bold text-base leading-tight">{nameJp}</div>
            <div className="text-white/70 text-xs">{name}</div>
          </div>
          <div className="flex items-center gap-1 bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            <Star size={10} fill="white" /> {rating}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock size={11} /> {time}
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{desc}</p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:shadow-md"
          style={{ backgroundColor: sky[50], color: sky[600], border: `1px solid ${sky[200]}` }}
          onClick={(e) => e.stopPropagation()}
        >
          <Navigation size={12} /> Google Mapsで開く
        </a>
      </div>
    </Card>
  )
}
