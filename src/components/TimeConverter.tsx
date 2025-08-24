'use client'

import React, { useState } from 'react'
import { format } from 'date-fns-tz'

interface TimeConverterProps {
  selectedTimezone: string
  timezones: { [key: string]: string }
}

export default function TimeConverter({ selectedTimezone, timezones }: TimeConverterProps) {
  const now = new Date()
  const currentDate = format(now, 'yyyy-MM-dd')
  const currentTime = format(now, 'HH:mm')
  
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [selectedTime, setSelectedTime] = useState(currentTime)
  const [convertedTimes, setConvertedTimes] = useState<{ [key: string]: string }>({})

  const handleConvert = () => {
    if (!selectedDate || !selectedTime) return

    const dateTimeString = `${selectedDate}T${selectedTime}`
    const sourceDate = new Date(dateTimeString)
    
    const converted: { [key: string]: string } = {}
    
    Object.entries(timezones).forEach(([city, tz]) => {
      if (tz !== selectedTimezone) {
        const targetDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: selectedTimezone }))
        const convertedDateTime = format(targetDate, 'yyyy年MM月dd日 HH:mm (EEEE)', { timeZone: tz })
        const japaneseDayOfWeek = convertedDateTime.replace(
          /Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/,
          (match) => ({
            'Monday': '月曜日',
            'Tuesday': '火曜日',
            'Wednesday': '水曜日',
            'Thursday': '木曜日',
            'Friday': '金曜日',
            'Saturday': '土曜日',
            'Sunday': '日曜日'
          }[match] || match)
        )
        converted[city] = japaneseDayOfWeek
      }
    })
    
    setConvertedTimes(converted)
  }

  const selectedCity = Object.entries(timezones).find(([_, tz]) => tz === selectedTimezone)?.[0] || ''

  return (
    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        かんたん日時変換
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          選択中の都市: <span className="font-semibold">{selectedCity}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        />
        
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <button
        onClick={handleConvert}
        disabled={!selectedDate || !selectedTime}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        変換
      </button>

      {Object.keys(convertedTimes).length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300">変換結果:</h4>
          {Object.entries(convertedTimes).map(([city, time]) => (
            <div
              key={city}
              className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
            >
              <div className="font-semibold text-gray-800 dark:text-gray-200">{city}</div>
              <div className="text-gray-600 dark:text-gray-400">{time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}