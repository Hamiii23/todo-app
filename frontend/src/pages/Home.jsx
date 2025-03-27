import { useState } from "react";
import AddTodo from "./AddTodo";

export default function Home() {
    const [list, setList] = useState(false)
    return (
        <div className="flex justify-center h-screen items-end">
            {!list ? (<div onClick={() => setList(true)} 
            className="h-16 w-16 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-700 flex justify-center m-2 items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>) : (<div>
                <AddTodo/>
            </div>)}
        </div>
    );
};