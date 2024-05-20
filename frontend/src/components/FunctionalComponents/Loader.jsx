const Loader = () => {
    return (
        <div className="h-dvh w-dvw flex items-center justify-center glass">
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-secondary animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-secondary animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    );
};

export default Loader;
