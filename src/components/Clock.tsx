'use client'

import React from 'react'
import { format } from 'date-fns-tz'
import AnalogClock from './AnalogClock'

interface ClockProps {
  timezone: string
  cityName: string
  currentTime: Date
  isSelected?: boolean
  onSelect?: () => void
}

export default function Clock({ timezone, cityName, currentTime, isSelected, onSelect }: ClockProps) {
  const zonedTime = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }))
  
  const formattedDate = format(zonedTime, 'yyyy年MM月dd日', { timeZone: timezone })
  const formattedTime = format(zonedTime, 'HH:mm:ss', { timeZone: timezone })
  const dayOfWeek = format(zonedTime, 'EEEE', { timeZone: timezone })
  const japaneseDayOfWeek = {
    'Monday': '月曜日',
    'Tuesday': '火曜日',
    'Wednesday': '水曜日',
    'Thursday': '木曜日',
    'Friday': '金曜日',
    'Saturday': '土曜日',
    'Sunday': '日曜日'
  }[dayOfWeek] || dayOfWeek

  return (
    <div
      className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
          : 'bg-white dark:bg-gray-800 hover:shadow-xl'
      }`}
      onClick={onSelect}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
        {cityName}
      </h2>
      
      <div className="flex flex-col items-center space-y-4">
        <AnalogClock time={zonedTime} />
        
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-gray-900 dark:text-gray-100">
            {formattedTime}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {formattedDate}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {japaneseDayOfWeek}
          </div>
        </div>
      </div>
    </div>
  )
}