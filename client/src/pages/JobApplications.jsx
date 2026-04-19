import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, CheckCircle, XCircle, Clock, ArrowLeft, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const JobApplications = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchApplications = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5001/api/applications/job/${jobId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setApplications(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(`http://localhost:5001/api/applications/${id}`, { status }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            toast.success(`Application marked as ${status}`);
            fetchApplications(); // Refresh list
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Accepted':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"><CheckCircle className="w-4 h-4 mr-1" /> Accepted</span>;
            case 'Rejected':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"><XCircle className="w-4 h-4 mr-1" /> Rejected</span>;
            default:
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"><Clock className="w-4 h-4 mr-1" /> Pending</span>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary-600 mb-6 transition">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            <div className="glass p-8 rounded-2xl shadow-xl border border-white/40 mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Job Applications</h1>
                <p className="text-slate-500">Review and manage candidates for this position.</p>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid gap-4">
                    {applications.map(app => (
                        <div key={app._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-50 p-3 rounded-full">
                                    <User className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">{app.applicant?.name}</h3>
                                    <p className="text-slate-500 text-sm flex items-center">
                                        <Mail className="w-3 h-3 mr-1" /> {app.applicant?.email}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4">
                                {app.resume && (
                                    <a
                                        href={`http://localhost:5001/${app.resume}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-sm text-primary-600 hover:text-primary-800 font-medium px-4 py-2 bg-primary-50 rounded-lg transition"
                                    >
                                        <FileText className="w-4 h-4 mr-2" />
                                        Download Resume
                                    </a>
                                )}

                                {getStatusBadge(app.status)}

                                {app.status === 'Applied' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(app._id, 'Accepted')}
                                            className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                                            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {applications.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                            <p className="text-slate-500">No applications received yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobApplications;
