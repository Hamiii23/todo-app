import { Link } from "react-router-dom"

export default function BottomWarning ({label, navigateTo, to}) {
    return (
        <div className="flex justify-center text-sm m-2">
            <div>
                {label}
            </div>
            <Link className="underline cursor-pointer pl-1 text-blue-600" to={to}>
                {navigateTo}
            </Link>
        </div>
    )
}