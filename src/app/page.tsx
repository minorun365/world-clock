'use client'

import React, { useState, useEffect } from 'react'
import Clock from '@/components/Clock'
import TimeConverter from '@/components/TimeConverter'

const timezones = {
  '東京': 'Asia/Tokyo',
  'マルセイユ': 'Europe/Paris',
  'シアトル': 'America/Los_Angeles'
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimezone, setSelectedTimezone] = useState(timezones['東京'])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          みのるん世界時計
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(timezones).map(([city, timezone]) => (
            <Clock
              key={city}
              cityName={city}
              timezone={timezone}
              currentTime={currentTime}
              isSelected={selectedTimezone === timezone}
              onSelect={() => setSelectedTimezone(timezone)}
            />
          ))}
        </div>

        <TimeConverter
          selectedTimezone={selectedTimezone}
          timezones={timezones}
        />
      </div>
    </main>
  )
}
