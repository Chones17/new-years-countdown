'use client'
import React, { ChangeEvent, useState, useEffect } from 'react'

function TimeTest(timeZone: string): string {
    const date: Date = new Date()
    const time: string = new Intl.DateTimeFormat('en-US', {timeStyle: 'medium', timeZone: timeZone}).format(date)
    return (time)
}

export default function TimeZoneDisplay(): JSX.Element {
    
    // Set the states for time zone and New Year countdown
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>('')
    const [newYearCountdown, setNewYearCountdown] = useState<string>('')

    const timeZones: string[] = [
        'America/Denver',
        'Asia/Kolkata',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney'
    ];

    const timeZoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeZone(event.target.value)
    };

    useEffect(() => {
        const updateCountdown = () => {
            if (selectedTimeZone) {
                const newYearDate = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0)
                const currentDate = new Date()
                
                // Calculate time until New Year's
                const timeDifference = newYearDate.getTime() - currentDate.getTime();
                const daysUntilNewYear = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hoursUntilNewYear = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutesUntilNewYear = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const secondsUntilNewYear = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
                const countdownString = `${daysUntilNewYear} days ${hoursUntilNewYear} hours ${minutesUntilNewYear} minutes ${secondsUntilNewYear} seconds`;
        
                setNewYearCountdown(countdownString);
            } else {
                setNewYearCountdown('');
            }
        };

        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [selectedTimeZone]);

    return (
        <div>
            <h2>{timeZones[0]}</h2>
            <p>{TimeTest(timeZones[0])}</p>
            <h2>{timeZones[1]}</h2>
            <p>{TimeTest(timeZones[1])}</p>
            <select value={selectedTimeZone} onChange={timeZoneChange}>
                <option value="">--</option>
                {timeZones.map((zone) => (
                    <option key={zone} value={zone}>{zone}</option>
               ))}
            </select>
            <h2>New Year's Countdown</h2>
            <p>{newYearCountdown}</p>
        </div>
    );
}