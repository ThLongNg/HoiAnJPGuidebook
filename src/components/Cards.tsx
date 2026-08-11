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
      className="anim-up p-5 hover:border-[#c8741a] transition-all bg-[#faf8f3]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="font-serif text-xl font-normal text-[#3d6b63]">{vn}</div>
          <div className="font-sans text-xs font-medium mt-1 text-[#7a6447] tracking-[0.06em]">
            {reading}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {meanings.map((m) => (
              <span
                key={m}
                className="font-sans text-xs bg-[#f5f1ea] text-[#1a1208] px-3 py-1 rounded-full border border-[#e8e0d0]"
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
      className="anim-up flex items-center gap-4 rounded-2xl p-4 border border-[#e8e0d0] shadow-2xs hover:border-[#c8741a] transition-all cursor-pointer bg-[#faf8f3]"
      style={{ animationDelay: `${delay}s` } as React.CSSProperties}
      onClick={() => speak(vn)}
    >
      <div className="text-2xl w-11 h-11 flex items-center justify-center bg-[#f5f1ea] rounded-xl flex-shrink-0 border border-[#e8e0d0]">
        {emoji}
      </div>
      <div className="flex-1">
        <div className="font-serif text-lg font-normal text-[#1a1208]">{vn}</div>
        <div className="font-sans text-xs font-medium mt-0.5 text-[#3d6b63] tracking-[0.04em]">{reading}</div>
        <div className="font-sans text-xs font-light text-[#7a6447] mt-0.5">{jp}</div>
      </div>
      <Volume2 size={14} className="text-[#7a6447]/60" />
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
      className="anim-up flex items-center bg-[#faf8f3] rounded-2xl shadow-2xs border border-[#e8e0d0] overflow-hidden hover:border-[#c8741a] transition-all cursor-pointer"
      style={{ animationDelay: `${delay}s` } as React.CSSProperties}
      onClick={() => speak(vn)}
    >
      <div
        className="w-14 h-14 flex items-center justify-center flex-shrink-0 bg-[#c8741a]"
      >
        <span className="font-serif text-xl font-medium text-white">{num}</span>
      </div>
      <div className="flex-1 px-4 py-3">
        <div className="font-serif text-base font-normal text-[#1a1208]">{vn}</div>
        <div className="font-sans text-xs mt-0.5 font-medium text-[#c8741a]">
          {reading}
        </div>
      </div>
      <div className="pr-4 flex items-center gap-2">
        <span className="font-sans text-xs text-[#7a6447]">{count}</span>
        <Volume2 size={14} className="text-[#7a6447]/40" />
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
      className="anim-up p-5 hover:border-[#c8741a] transition-all bg-[#faf8f3]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="font-serif text-lg font-normal text-[#1a1208]">{vn}</div>
          <div className="font-sans text-xs font-medium mt-0.5 text-[#3d6b63]">{reading}</div>
          <div className="font-sans text-xs font-light text-[#7a6447] mt-1">{jp}</div>
        </div>
        <SpeakButton text={vn} size={14} />
      </div>
      {sub && (
        <div className="mt-4 pt-3 border-t border-[#e8e0d0] flex flex-wrap gap-2 items-center">
          <span className="font-sans text-xs bg-[#f5f1ea] text-[#3d6b63] px-2.5 py-1 rounded-full border border-[#e8e0d0]">
            {sub.vn} = {sub.jp}
          </span>
          <ChevronRight size={12} className="text-[#c8741a]" />
          <span className="font-sans text-xs font-medium text-[#1a1208]">{sub.example}</span>
          <span className="font-sans text-xs text-[#7a6447]">{sub.exJp}</span>
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
      className="anim-up overflow-hidden hover:border-[#c8741a] hover:-translate-y-1 transition-all cursor-pointer group bg-[#faf8f3]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative h-48 bg-[#e8e0d0] overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/70 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 font-sans text-xs font-medium text-white bg-[#1a1208]/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
          {num}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="font-serif text-lg font-normal text-[#1a1208]">{name}</div>
          <SpeakButton text={name} size={14} />
        </div>
        <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed">{desc}</p>
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
      className="anim-up overflow-hidden hover:border-[#c8741a] hover:-translate-y-1 transition-all group bg-[#faf8f3]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative h-48 bg-[#e8e0d0] overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 via-[#1a1208]/20 to-transparent" />
        <span className="absolute top-3 left-3 font-sans text-[10px] font-medium text-white bg-[#1a1208]/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 uppercase tracking-wider flex items-center gap-1">
          <MapPin size={10} /> {area}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="font-serif text-white font-normal text-lg leading-tight">{nameJp}</div>
            <div className="font-sans text-white/70 text-xs font-light">{name}</div>
          </div>
          <div className="flex items-center gap-1 bg-[#c8741a] text-white text-xs font-medium px-2 py-0.5 rounded-full">
            <Star size={10} fill="white" /> {rating}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 font-sans text-xs text-[#7a6447]">
          <span className="flex items-center gap-1">
            <Clock size={11} /> {time}
          </span>
        </div>
        <p className="font-sans text-xs font-light text-[#7a6447] leading-relaxed mb-4">{desc}</p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-xs font-medium px-4 py-2 rounded-full transition-all hover:bg-[#c8741a] hover:text-white bg-[#f5f1ea] text-[#c8741a] border border-[#e8e0d0]"
          onClick={(e) => e.stopPropagation()}
        >
          <Navigation size={12} /> Google Mapsで開く
        </a>
      </div>
    </Card>
  )
}

