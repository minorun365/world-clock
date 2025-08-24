'use client'

import React from 'react'

interface AnalogClockProps {
  time: Date
  size?: number
}

export default function AnalogClock({ time, size = 80 }: AnalogClockProps) {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hourDegrees = (hours % 12) * 30 + minutes * 0.5
  const minuteDegrees = minutes * 6 + seconds * 0.1
  const secondDegrees = seconds * 6

  return (
    <svg
      viewBox="0 0 200 200"
      className="transform -rotate-90 w-full h-auto max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px]"
    >
      <circle
        cx="100"
        cy="100"
        r="98"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        className="text-gray-300 dark:text-gray-700"
      />
      
      {/* Hour markers */}
      {[...Array(12)].map((_, i) => {
        const angle = i * 30
        const x1 = 100 + 85 * Math.cos((angle * Math.PI) / 180)
        const y1 = 100 + 85 * Math.sin((angle * Math.PI) / 180)
        const x2 = 100 + 95 * Math.cos((angle * Math.PI) / 180)
        const y2 = 100 + 95 * Math.sin((angle * Math.PI) / 180)
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={i % 3 === 0 ? 3 : 1}
            className="text-gray-400 dark:text-gray-600"
          />
        )
      })}

      {/* Hour hand */}
      <line
        x1="100"
        y1="100"
        x2={100 + 50 * Math.cos((hourDegrees * Math.PI) / 180)}
        y2={100 + 50 * Math.sin((hourDegrees * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        className="text-gray-900 dark:text-gray-100"
      />

      {/* Minute hand */}
      <line
        x1="100"
        y1="100"
        x2={100 + 70 * Math.cos((minuteDegrees * Math.PI) / 180)}
        y2={100 + 70 * Math.sin((minuteDegrees * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-gray-700 dark:text-gray-300"
      />

      {/* Second hand */}
      <line
        x1="100"
        y1="100"
        x2={100 + 80 * Math.cos((secondDegrees * Math.PI) / 180)}
        y2={100 + 80 * Math.sin((secondDegrees * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-red-500"
      />

      {/* Center dot */}
      <circle
        cx="100"
        cy="100"
        r="6"
        fill="currentColor"
        className="text-gray-900 dark:text-gray-100"
      />
    </svg>
  )
}