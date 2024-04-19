const LoadingSpinner = () => {
    return ( 
        <div
        className='flex flex-col items-center justify-center fixed backdrop-blur-lg border-2 rounded-lg p-4 pb-5 text-gray-700 brightness-95
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        lg:w-1/4
        md:w-1/2
        xs:w-5/6 xs:border-gray-500/30 xs:bg-gray-300/50'>
            <span className="loading loading-infinity w-20"></span>
            <p>We're fetching your conversations!</p>
        </div>
    );
}
 
export default LoadingSpinner;