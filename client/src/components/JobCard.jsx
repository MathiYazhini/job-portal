import { Link } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobCard = ({ job }) => {
    const { user, setUser } = useAuth();

    const isSaved = user?.savedJobs?.some(savedJob =>
        (typeof savedJob === 'string' ? savedJob : savedJob._id) === job._id
    );

    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.error('Please login to save jobs');
            return;
        }

        try {
            const { data } = await axios.put(
                `http://localhost:5001/api/auth/save/${job._id}`,
                {},
                { headers: { Authorization: `Bearer ${user.token}` } }
            );

            // data returned is the updated savedJobs array
            setUser({ ...user, savedJobs: data });

            if (isSaved) {
                toast.success('Job removed from saved');
            } else {
                toast.success('Job saved successfully');
            }
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Something went wrong';
            toast.error(message);
        }
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">{job.title}</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1">{job.company}</p>
                    </div>

                    <div className="flex gap-2">
                        {job.type && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100 whitespace-nowrap">
                                {job.type}
                            </span>
                        )}
                        <button
                            onClick={handleSave}
                            className={`p-1.5 rounded-full transition-colors ${isSaved ? 'text-primary-600 bg-primary-50' : 'text-slate-400 hover:text-primary-600 hover:bg-slate-50'}`}
                        >
                            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                        {job.location}
                    </div>
                    {job.salary && (
                        <div className="flex items-center text-sm text-slate-500">
                            <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                            {job.salary}
                        </div>
                    )}
                    <div className="flex items-center text-sm text-slate-500">
                        <Clock className="w-4 h-4 mr-2 text-slate-400" />
                        Posted recently
                    </div>
                </div>

                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {job.description}
                </p>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <Link to={`/jobs/${job._id}`} className="text-sm font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center group-hover:underline">
                    View Details
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
