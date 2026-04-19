import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const carouselData = [
    {
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Find Your Dream Internship Here",
        subtitle: "Connect with top companies and kickstart your career. We bridge the gap between talent and opportunity."
    },
    {
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Launch Your Career Journey",
        subtitle: "Discover thousands of opportunities tailored for students and fresh graduates."
    },
    {
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Get Hired by Industry Leaders",
        subtitle: "Your skills matter. Let us help you find the perfect place to showcase them."
    }
];

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselData.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[600px] overflow-hidden rounded-3xl shadow-2xl mx-auto max-w-[95%] mt-6">
            {/* Slides */}
            {carouselData.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-transform duration-1000 ease-in-out w-full h-full ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover brightness-50"
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
                        <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                            {slide.title}
                        </h1>
                        <p className={`text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed transition-all duration-700 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                            {slide.subtitle}
                        </p>
                        <div className={`transition-all duration-700 delay-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                            <Link
                                to="/jobs"
                                className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-primary-50 transition transform hover:-translate-y-1 shadow-lg"
                            >
                                Browse Opportunities
                                <Search className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {carouselData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
