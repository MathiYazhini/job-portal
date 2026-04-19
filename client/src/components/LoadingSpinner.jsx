const LoadingSpinner = ({ fullScreen = false }) => {
    return (
        <div className={`flex justify-center items-center ${fullScreen ? 'min-h-[60vh]' : 'py-20'}`}>
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
