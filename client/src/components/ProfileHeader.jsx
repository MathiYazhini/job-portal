import { User, Mail, Briefcase, Calendar, Edit2, Settings } from 'lucide-react';

const ProfileHeader = ({ user }) => {
    // Generate initials for avatar
    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        : 'U';

    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Recently';

    return (
        <div className="relative mb-8 animate-delayed-fade-in">
            {/* Cover Banner */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-700 rounded-3xl relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* Profile Content Container */}
            <div className="px-6 md:px-10 pb-6 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-20 gap-6">

                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center text-4xl md:text-5xl font-bold text-primary-600 bg-gradient-to-br from-primary-50 to-primary-100">
                            {initials}
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="flex-grow pt-2 md:pt-0 md:pb-4 animate-slide-up delay-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
                                    {user.name}
                                    <span className={`px-3 py-1 text-xs md:text-sm rounded-full border ${user.role === 'recruiter'
                                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                                            : 'bg-blue-50 text-blue-700 border-blue-200'
                                        }`}>
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 mt-3 text-slate-500 text-sm md:text-base">
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="w-4 h-4" />
                                        {user.email}
                                    </div>
                                    <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        Joined {joinDate}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <button className="px-5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition flex items-center gap-2 bg-white shadow-sm">
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </button>
                                <button className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition shadow-lg shadow-primary-200 flex items-center gap-2">
                                    <Edit2 className="w-4 h-4" />
                                    <span>Edit Profile</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
