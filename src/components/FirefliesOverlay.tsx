import { useMemo } from 'react'

export default function FirefliesOverlay() {
  const fireflies = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 3.7 + Math.sin(i) * 12 + 5) % 95}%`,
      top: `${50 + (i % 7) * 7 + Math.cos(i) * 5}%`,
      size: `${4 + (i % 4) * 2}px`,
      delay: `${(i * 0.5) % 8}s`,
      duration: `${10 + (i % 6) * 2}s`,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="firefly-particle"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        />
      ))}
    </div>
  )
}
