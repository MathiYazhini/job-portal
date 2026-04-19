import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent mb-4 inline-block">
                            Intersy
                        </Link>
                        <p className="text-slate-500 leading-relaxed mb-6">
                            Connecting ambitious students with world-class opportunities. Your career journey starts here.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">For Candidates</h3>
                        <ul className="space-y-4">
                            <li><Link to="/jobs" className="text-slate-500 hover:text-primary-600 transition">Browse Jobs</Link></li>
                            <li><Link to="/jobs" className="text-slate-500 hover:text-primary-600 transition">Browse Internships</Link></li>
                            <li><Link to="/dashboard" className="text-slate-500 hover:text-primary-600 transition">My Dashboard</Link></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary-600 transition">Job Alerts</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">For Recruiters</h3>
                        <ul className="space-y-4">
                            <li><Link to="/post-job" className="text-slate-500 hover:text-primary-600 transition">Post a Job</Link></li>
                            <li><Link to="/dashboard" className="text-slate-500 hover:text-primary-600 transition">Manage Applications</Link></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary-600 transition">Pricing Plans</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary-600 transition">Recruiter Resources</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start text-slate-500">
                                <Mail className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                                <span>mathiyazhini2007@gmail.com</span>
                            </li>
                            <li className="text-slate-500">
                                1/122 north strret coimbatore
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Intersy. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-primary-600 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-primary-600 transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
