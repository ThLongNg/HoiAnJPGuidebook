import { useState, useEffect } from 'react'
import type { FavoriteItem } from '@/types'

const LOCAL_STORAGE_KEY = 'hoian_guide_favorites_v1'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites))
    } catch (e) {
      console.error('Failed to save favorites to localStorage:', e)
    }
  }, [favorites])

  const isFavorite = (id: string) => favorites.some((item) => item.id === id)

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some((i) => i.id === item.id)
      if (exists) {
        return prev.filter((i) => i.id !== item.id)
      } else {
        return [...prev, item]
      }
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((i) => i.id !== id))
  }

  return { favorites, isFavorite, toggleFavorite, removeFavorite }
}
