import { useState, useEffect } from 'react';

const stats = [
    { label: "Active Students", value: 15000, suffix: "+" },
    { label: "Partner Companies", value: 500, suffix: "+" },
    { label: "Internships Posted", value: 8000, suffix: "+" },
    { label: "Placement Rate", value: 98, suffix: "%" },
];

const CounterItem = ({ end, label, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; // 2 seconds
        const incrementTime = 20;
        const step = Math.ceil(end / (duration / incrementTime));

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [end]);

    return (
        <div className="text-center p-6 glass rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent inline-block">
                {count}{suffix}
            </h3>
            <p className="text-slate-500 font-medium text-lg">{label}</p>
        </div>
    );
};

const StatsCounter = () => {
    return (
        <div className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900">Our Impact in Numbers</h2>
                    <p className="text-slate-500 mt-2">Join a growing community of success stories.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <CounterItem key={index} end={stat.value} label={stat.label} suffix={stat.suffix} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsCounter;
