'use client';
import React, { ChangeEvent, useState, useEffect } from 'react'

export default function TimeZoneDisplay(): JSX.Element {
    
    // Set the states for time zone and New Year countdown
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>('');
    const [newYearCountdown, setNewYearCountdown] = useState<string>('');

    const timeZones: string[] = [
        'America/Denver',
        'Asia/Kolkata',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney'
    ];

    const newYearDate = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0);

    const timeZoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeZone(event.target.value);
    };

    useEffect(() => {
        const updateCountdown = () => {
            if (selectedTimeZone) {
                const currentDate = new Date();
                
                // Calculate time until New Year's
                const timeDifference = newYearDate.getTime() - currentDate.getTime();
                const daysUntilNewYear = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hoursUntilNewYear = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutesUntilNewYear = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const secondsUntilNewYear = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
                const countdownString = `${daysUntilNewYear}d ${hoursUntilNewYear}h ${minutesUntilNewYear}m ${secondsUntilNewYear}s`;
        
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
            <h2>America/Denver</h2>
            <h2>Asia/Kolkata</h2>
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