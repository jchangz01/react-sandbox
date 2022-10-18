import { useEffect, useState } from 'react';
import './index.css';

export default function TimeOverlay(props) {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div> 
            <div className="time-container">
                <h2>{time}</h2>
            </div>
            {props.children}
        </div>
    )
}