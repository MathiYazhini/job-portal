import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import JobCard from '../components/JobCard';
import { Briefcase, PlusCircle, CheckCircle, Clock, Bookmark } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileHeader from '../components/ProfileHeader';

const Dashboard = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('applications');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user.role === 'student') {
                    const { data } = await axios.get('http://localhost:5001/api/applications/my', {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    setData(data);
                } else if (user.role === 'recruiter') {
                    const { data } = await axios.get('http://localhost:5001/api/jobs');
                    const myJobs = data.filter(job => job.postedBy && job.postedBy._id === user._id);
                    setData(myJobs);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const getStats = () => {
        if (user.role === 'student') {
            const total = data.length;
            const accepted = data.filter(app => app.status === 'Accepted').length;
            const pending = data.filter(app => app.status === 'Pending').length;
            return [
                { label: 'Total Applications', value: total, icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
                { label: 'Accepted', value: accepted, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
                { label: 'Pending', value: pending, icon: Clock, color: 'bg-yellow-100 text-yellow-600' }
            ];
        } else {
            const total = data.length;
            const active = data.filter(job => true).length; // In future, check job status
            return [
                { label: 'Active Jobs', value: total, icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
                { label: 'Total Applicants', value: '0', icon: CheckCircle, color: 'bg-purple-100 text-purple-600' }, // Placeholder for now
            ];
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            Pending: 'bg-yellow-100 text-yellow-700',
            Accepted: 'bg-green-100 text-green-700',
            Rejected: 'bg-red-100 text-red-700'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
                {status}
            </span>
        );
    };

    const stats = getStats();

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <ProfileHeader user={user} />

            {/* Stats Grid */}
            {!loading && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-up delay-200">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
                            <div className={`p-4 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px] animate-slide-up delay-300">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">
                        {user.role === 'recruiter' ? 'Your Job Postings' : 'Recent Applications'}
                    </h2>
                    {user.role === 'recruiter' && (
                        <Link to="/post-job" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center shadow-md text-sm">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Post New Job
                        </Link>
                    )}
                </div>

                <div className="p-6">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            {user.role === 'student' && (
                                <div className="space-y-6">
                                    {/* Tabs */}
                                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
                                        <button
                                            onClick={() => setActiveTab('applications')}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'applications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            My Applications
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('saved')}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'saved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Saved Jobs ({user.savedJobs?.length || 0})
                                        </button>
                                    </div>

                                    {/* Saved Jobs Content */}
                                    {activeTab === 'saved' && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {user.savedJobs && user.savedJobs.length > 0 ? (
                                                user.savedJobs.map(job => (
                                                    <JobCard key={job._id || job} job={job} />
                                                ))
                                            ) : (
                                                <div className="col-span-full text-center py-20">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <Bookmark className="w-8 h-8 text-gray-300" />
                                                    </div>
                                                    <h3 className="text-lg font-medium text-slate-900">No saved jobs</h3>
                                                    <p className="text-slate-500 mt-1 mb-6">Bookmark jobs you're interested in to view them here.</p>
                                                    <Link to="/jobs" className="text-primary-600 font-semibold hover:underline">Find Jobs</Link>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Applications Content */}
                                    {activeTab === 'applications' && (
                                        <div className="space-y-4">
                                            {data.map(app => (
                                                <div key={app._id} className="group p-4 rounded-2xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/30 transition flex flex-col sm:flex-row justify-between items-center gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-primary-500 transition-colors">
                                                            <Briefcase className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{app.job?.title}</h3>
                                                            <p className="text-sm text-slate-500 font-medium">{app.job?.company}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-sm text-slate-400">
                                                            Applied {new Date(app.createdAt).toLocaleDateString()}
                                                        </div>
                                                        {getStatusBadge(app.status)}
                                                    </div>
                                                </div>
                                            ))}
                                            {data.length === 0 && (
                                                <div className="text-center py-20">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <Briefcase className="w-8 h-8 text-gray-300" />
                                                    </div>
                                                    <h3 className="text-lg font-medium text-slate-900">No applications yet</h3>
                                                    <p className="text-slate-500 mt-1 mb-6">Start applying to jobs to track them here.</p>
                                                    <Link to="/jobs" className="text-primary-600 font-semibold hover:underline">Browse Jobs</Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {user.role === 'recruiter' && (
                                <div className="grid gap-6 md:grid-cols-2">
                                    {data.map(job => (
                                        <div key={job._id} className="flex flex-col h-full">
                                            <JobCard job={job} />
                                            <div className="mt-3 flex justify-end">
                                                <Link
                                                    to={`/applications/job/${job._id}`}
                                                    className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition"
                                                >
                                                    View Applicants
                                                    <span className="ml-2">&rarr;</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                    {data.length === 0 && (
                                        <div className="col-span-full text-center py-20">
                                            <p className="text-slate-500">You haven't posted any jobs yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
