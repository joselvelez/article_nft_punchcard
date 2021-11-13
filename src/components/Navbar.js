import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div className="flex flex-row justify-between pt-3 px-3 pb-1">
            <div>
                <a href="/" className="font-bold text-xl text-gray-800">Article NFT Punchcard Concept</a>
            </div>
            <div>
                <Link to="/about">About</Link>
            </div>
        </div>
    )
}