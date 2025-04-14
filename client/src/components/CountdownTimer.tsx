import { useState, useEffect } from 'react';

type CountdownTimerProps = {
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Event has passed
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div id="countdown" className="flex space-x-5 text-white">
      <div className="countdown-item flex flex-col items-center relative">
        <span className="text-3xl md:text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider">Days</span>
      </div>
      <div className="countdown-item flex flex-col items-center relative after:content-[':'] after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2 after:text-3xl after:text-[#F0C987]">
        <span className="text-3xl md:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider">Hours</span>
      </div>
      <div className="countdown-item flex flex-col items-center relative after:content-[':'] after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2 after:text-3xl after:text-[#F0C987]">
        <span className="text-3xl md:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider">Minutes</span>
      </div>
      <div className="countdown-item flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider">Seconds</span>
      </div>
    </div>
  );
}
