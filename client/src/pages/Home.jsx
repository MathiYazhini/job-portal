import { Link } from 'react-router-dom';
import { ArrowRight, Search, TrendingUp, Users, Building, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';

import LogoMarquee from '../components/LogoMarquee';
import StatsCounter from '../components/StatsCounter';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="w-full bg-slate-50 pb-12">
                <HeroCarousel />
            </div>

            {/* Stats Counter Section */}
            <StatsCounter />

            {/* Trusted By Section (Marquee) */}
            <LogoMarquee />

            {/* How It Works Section */}
            <div className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">How Intersy Works</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Your path to the perfect career match is simple and streamlined.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:shadow-lg transition cursor-pointer">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <Search className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Search Opportunities</h3>
                            <p className="text-slate-500 leading-relaxed">Browse thousands of curated internships and full-time roles tailored just for students.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:shadow-lg transition cursor-pointer">
                            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                                <ArrowRight className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Apply with Ease</h3>
                            <p className="text-slate-500 leading-relaxed">Create your profile once and apply to multiple top-tier companies with a single click.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:shadow-lg transition cursor-pointer">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                                <TrendingUp className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Get Hired</h3>
                            <p className="text-slate-500 leading-relaxed">Track your applications, ace your interviews, and launch your dream career.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 container mx-auto px-4">
                <div className="relative rounded-3xl p-12 overflow-hidden text-center">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&q=80"
                            alt="Office background"
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-indigo-900 mix-blend-multiply"></div>
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-4xl font-bold text-white">Ready to start your journey?</h2>
                        <p className="text-primary-100 text-lg">Join thousands of students who have found their dream internships through Intersy.</p>
                        <div className="pt-4">
                            <Link to="/register" className="inline-block bg-white text-primary-700 font-bold py-4 px-10 rounded-full hover:bg-gray-50 transition shadow-xl transform hover:-translate-y-1">
                                Get Started for Free
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
