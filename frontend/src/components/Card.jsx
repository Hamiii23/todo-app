
export default function Card ({children}) {
    return (
        <div className="flex justify-center h-screen items-center">
            <div className="flex justify-center p-5 mt-3 shadow-2xl rounded-2xl bg-white">
                <div className="px-10 py-2">
                    {children}
                </div>
            </div>
        </div>
    );
}