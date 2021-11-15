import { Link } from "react-router-dom";
import { NavItems } from "./NavItems";
import { WalletContext } from "../context/WalletContext";
import { useContext } from "react";
import { InstallWalletBtn } from "./InstallWalletBtn";

export const Navbar = () => {
    const walletContext = useContext(WalletContext);

    return (
        <div className="flex flex-row justify-between pt-3 px-3 pb-1">
            <div>
                <a href="/" className="font-bold sm:text-sm md:text-lg lg:text-2xl text-gray-800">~ WAGMI Daily ~</a>
            </div>
            <div>
                <button
                    type="button"
                    className="inline-flex items-center mx-1 mb-1 px-2 py-1 border border-transparent text-xs font-medium rounded 
                    shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <Link to="/about">About</Link>
                </button>
                {walletContext.state.walletInstalled ? <NavItems /> : <InstallWalletBtn />}
            </div>
        </div>
    )
}