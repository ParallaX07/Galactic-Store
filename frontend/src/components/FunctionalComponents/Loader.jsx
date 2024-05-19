const Loader = () => {
    return (
        <div className="mt-32 h-dvh w-dvw flex items-center justify-center dark:bg-primary bg-opacity-30">
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-secondary animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-secondary animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    );
};

export default Loader;
