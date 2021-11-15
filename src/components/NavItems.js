import { useContext } from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";
import { ConnectBtn } from "./ConnectBtn";

export const NavItems = () => {
    const walletContext = useContext(WalletContext);

    const connect = async () => {
        const ethereum = window.ethereum;

        try {
            await ethereum.request({method: 'eth_requestAccounts'});
        } catch (e) {
            console.log("Unable to request access to wallet");
        }
    }

    return (
        <>
            {
                walletContext.state.currentAccount.length > 0 ?
                    <>
                        <button
                            type="button"
                            className="inline-flex items-center mx-1 mb-1 px-2 py-1 border border-transparent text-xs font-medium rounded 
                            shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            <Link to="/mint">Mint</Link>
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center mx-1 mb-1 px-2 py-1 border border-transparent text-xs font-medium rounded 
                            shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            <Link to="/refill">Refill</Link>
                        </button>
                    </>
                    :
                    <ConnectBtn connect={connect} />
            }
        </>
    )
}