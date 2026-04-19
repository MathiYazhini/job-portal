import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Briefcase, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5001/api/jobs/${id}`);
                setJob(data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load job details');
            }
        };
        fetchJob();
    }, [id]);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleApply = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('jobId', id);
        if (resume) {
            formData.append('resume', resume);
        } else {
            toast.error('Please upload your resume');
            return;
        }

        try {
            await axios.post('http://localhost:5001/api/applications', formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Applied successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to apply');
        }
    };

    if (!job) return <LoadingSpinner fullScreen />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="glass rounded-3xl p-8 md:p-12 shadow-xl border border-white/40">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-100 pb-8 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">{job.title}</h1>
                        <p className="text-2xl text-primary-600 font-medium">{job.company}</p>
                    </div>
                    {user?.role === 'student' && (
                        <div className="flex flex-col gap-3 items-end">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary-50 file:text-primary-700
                                hover:file:bg-primary-100"
                            />
                            <button onClick={handleApply} className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 font-semibold text-lg transition shadow-lg shadow-primary-200 transform hover:-translate-y-1">
                                Apply Now
                            </button>
                        </div>
                    )}
                    {!user && (
                        <button onClick={handleApply} className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 font-semibold text-lg transition shadow-lg shadow-primary-200 transform hover:-translate-y-1">
                            Login to Apply
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-sm">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="block text-slate-400 mb-1 flex items-center"><MapPin className="w-4 h-4 mr-1" /> Location</span>
                        <span className="text-slate-800 font-semibold text-base">{job.location}</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="block text-slate-400 mb-1 flex items-center"><Briefcase className="w-4 h-4 mr-1" /> Type</span>
                        <span className="text-slate-800 font-semibold text-base">{job.type}</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="block text-slate-400 mb-1 flex items-center"><DollarSign className="w-4 h-4 mr-1" /> Salary</span>
                        <span className="text-slate-800 font-semibold text-base">{job.salary || 'Not specified'}</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="block text-slate-400 mb-1 flex items-center"><Calendar className="w-4 h-4 mr-1" /> Posted</span>
                        <span className="text-slate-800 font-semibold text-base">{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="prose prose-slate max-w-none">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-primary-500" />
                        Job Description
                    </h3>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
