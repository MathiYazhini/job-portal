import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-8">
                <div className="w-64 h-64 bg-primary-50 rounded-full flex items-center justify-center animate-blob">
                    <span className="text-9xl font-bold text-primary-200">404</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="w-24 h-24 text-primary-600 drop-shadow-lg" />
                </div>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
            <p className="text-slate-600 text-lg max-w-md mb-8">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link
                to="/"
                className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
