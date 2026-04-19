import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, Building } from 'lucide-react';
import toast from 'react-hot-toast';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '', description: '', company: '', location: '', salary: '', type: 'Full-time'
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/jobs', formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            toast.success('Job posted successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Failed to post job');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-slate-800">Post a New Job</h2>
                <p className="text-slate-500 mt-2 text-lg">Reach thousands of eligible candidates with your opportunity.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Job Details Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        Job Details
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
                            <input
                                name="title"
                                placeholder="e.g. Senior Frontend Engineer"
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Job Type</label>
                                <select
                                    name="type"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none appearance-none"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Salary Range</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        name="salary"
                                        placeholder="e.g. $80k - $120k"
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                placeholder="Describe the role responsibilities, requirements, and perks..."
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none h-48 resize-none"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Company & Location Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <Building className="w-5 h-5" />
                        </div>
                        Company & Location
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                            <input
                                name="company"
                                placeholder="e.g. Acme Inc."
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="location"
                                    placeholder="e.g. Remote / San Francisco"
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-xl shadow-primary-200 hover:-translate-y-1 transform">
                        Post Job Opportunity
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;
