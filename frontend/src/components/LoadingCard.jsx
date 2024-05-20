const LoadingCard = () => {
    return (
        <div className="form p-4 rounded-lg custom-shadow flex flex-col justify-center lg:w-fit w-full">
            <div className="rounded-lg lg:w-[340px] h-48 bg-gray-300 bg-opacity-30 animate-pulse"></div>
            <div className="my-3">
                <div className="h-6 w-3/4 bg-gray-300 bg-opacity-30 animate-pulse"></div>
                <div className="h-4 w-1/2 mt-2 bg-gray-300 bg-opacity-30 animate-pulse"></div>
                <div className="h-6 w-1/4 mt-6 bg-gray-300 bg-opacity-30 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-3">
                <div className="h-4 w-1/4 bg-gray-300 bg-opacity-30 animate-pulse"></div>
                <div className="h-4 w-1/4 bg-gray-300 bg-opacity-30 animate-pulse"></div>
                <div className="h-4 w-1/4 bg-gray-300 bg-opacity-30 animate-pulse"></div>
            </div>
        </div>
    );
};

export default LoadingCard;
