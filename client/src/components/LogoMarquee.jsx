import { Building } from 'lucide-react';

const companies = [
    { name: "Google", color: "text-blue-500" },
    { name: "Microsoft", color: "text-green-500" },
    { name: "Spotify", color: "text-green-400" },
    { name: "Amazon", color: "text-orange-500" },
    { name: "Netflix", color: "text-red-600" },
    { name: "Adobe", color: "text-red-500" },
    { name: "Salesforce", color: "text-blue-400" },
    { name: "Airbnb", color: "text-rose-500" },
];

const LogoMarquee = () => {
    return (
        <div className="py-12 bg-white border-y border-gray-100 overflow-hidden relative">
            <div className="container mx-auto px-4 text-center mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trusted by leading companies</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

                {/* Marquee Content (Original) */}
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8">
                    {companies.map((company, index) => (
                        <div key={index} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer">
                            <Building className={`w-8 h-8 ${company.color}`} />
                            <span className={`text-2xl font-bold ${company.color}`}>{company.name}</span>
                        </div>
                    ))}
                </div>

                {/* Marquee Content (Duplicate for infinite loop) */}
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8 absolute top-0 left-0 translate-x-full">
                    {companies.map((company, index) => (
                        <div key={`dup-${index}`} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer">
                            <Building className={`w-8 h-8 ${company.color}`} />
                            <span className={`text-2xl font-bold ${company.color}`}>{company.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoMarquee;
