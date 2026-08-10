import React from 'react'
import {
  Home,
  MessageCircle,
  UtensilsCrossed,
  Camera,
  Gift,
  AlertTriangle,
  Flame,
  Moon,
  Heart,
  Sparkles,
  Compass,
  MapPin,
  Languages,
  Banknote,
} from 'lucide-react'

interface IconBadgeProps {
  size?: number
  className?: string
}

// Styled Glass Icon Badge Wrapper using lucide-react icons
export const HomeTownIcon: React.FC<IconBadgeProps> = ({ size = 20, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white p-1 shadow-2xs ${className}`}>
    <Home size={size - 4} strokeWidth={2.2} />
  </div>
)

export const ChatBubbleIcon: React.FC<IconBadgeProps> = ({ size = 20, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-indigo-600 text-white p-1 shadow-2xs ${className}`}>
    <MessageCircle size={size - 4} strokeWidth={2.2} />
  </div>
)

export const FoodBowlIcon: React.FC<IconBadgeProps> = ({ size = 20, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white p-1 shadow-2xs ${className}`}>
    <UtensilsCrossed size={size - 4} strokeWidth={2.2} />
  </div>
)

export const SpotCameraIcon: React.FC<IconBadgeProps> = ({ size = 20, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white p-1 shadow-2xs ${className}`}>
    <Camera size={size - 4} strokeWidth={2.2} />
  </div>
)

export const GiftBoxIcon: React.FC<IconBadgeProps> = ({ size = 20, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 text-white p-1 shadow-2xs ${className}`}>
    <Gift size={size - 4} strokeWidth={2.2} />
  </div>
)

export const CautionShieldIcon: React.FC<IconBadgeProps> = ({ size = 20, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white p-1 shadow-2xs ${className}`}>
    <AlertTriangle size={size - 4} strokeWidth={2.2} />
  </div>
)

export const LanternIcon: React.FC<IconBadgeProps> = ({ size = 20, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-red-600 text-white p-1 shadow-2xs ${className}`}>
    <Flame size={size - 4} strokeWidth={2.2} />
  </div>
)
