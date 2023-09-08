'use client'
import React, { ChangeEvent, useState, useEffect } from 'react'

export default function TimeZoneDisplay(): JSX.Element {
    
    // Set the states for time zone and New Year countdown
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>('America/Denver')
    const [newYearCountdown, setNewYearCountdown] = useState<string>('')
    const [firstTimeZone, setFirstTimeZone] = useState<string>('')
    const [secondTimeZone, setSecondTimeZone] = useState<string>('')
    const [thirdTimeZone, setThirdTimeZone] = useState<string>('')

    const timeZones: string[] = [
        'America/Denver',
        'Asia/Kolkata',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney'
    ];

    const timeZoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeZone(event.target.value)
    }

    useEffect(() => {
        const updateTime = () => {
            const newYearDate = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0)
            const currentDate = new Date()
            const firstTime: string = new Intl.DateTimeFormat('en-US', {timeStyle: 'medium', timeZone: 'America/Denver'}).format(currentDate)
            const secondTime: string = new Intl.DateTimeFormat('en-US', {timeStyle: 'medium', timeZone: 'Asia/Kolkata'}).format(currentDate)
            const thirdTime: string = new Intl.DateTimeFormat('en-US', {timeStyle: 'medium', timeZone: selectedTimeZone}).format(currentDate)
            
            // Calculate time until New Year's
            const timeDifference = newYearDate.getTime() - currentDate.getTime()
            const daysUntilNewYear = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
            const hoursUntilNewYear = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutesUntilNewYear = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
            const secondsUntilNewYear = Math.floor((timeDifference % (1000 * 60)) / 1000)
    
            const countdownString = `${daysUntilNewYear} days ${hoursUntilNewYear} hours ${minutesUntilNewYear} minutes ${secondsUntilNewYear} seconds`
    
            setNewYearCountdown(countdownString)
            setFirstTimeZone(firstTime)
            setSecondTimeZone(secondTime)
            setThirdTimeZone(thirdTime)
        };

        const interval = setInterval(updateTime, 1000)

        return () => clearInterval(interval)
    }, [selectedTimeZone]);

    return (
        <div>
            <h2 className="font-bold">{timeZones[0]}</h2>
            <p className="mb-5">{firstTimeZone}</p>
            <h2 className="font-bold">{timeZones[1]}</h2>
            <p className="mb-5">{secondTimeZone}</p>
            <select value={selectedTimeZone} onChange={timeZoneChange}>
                {timeZones.map((zone) => (
                    <option key={zone} value={zone}>{zone}</option>
               ))}
            </select>
            <p className="mb-5">{thirdTimeZone}</p>
            <h2 className="font-bold">New Year's Countdown</h2>
            <p>{newYearCountdown}</p>
        </div>
    );
}