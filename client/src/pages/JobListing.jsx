import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get('http://localhost:5001/api/jobs');
                setJobs(data);
                setFilteredJobs(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        let result = jobs;

        if (searchTerm) {
            result = result.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterType !== 'All') {
            result = result.filter(job => job.type === filterType);
        }

        setFilteredJobs(result);
    }, [searchTerm, filterType, jobs]);

    if (loading) return <LoadingSpinner fullScreen />;

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Latest Opportunities</h2>
                    <p className="text-slate-500 mt-2">Find the best internships and entry-level jobs tailored for you.</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-4">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map(job => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <p className="text-lg text-slate-500">No jobs found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setFilterType('All'); }}
                        className="text-primary-600 font-medium mt-2 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobListing;
