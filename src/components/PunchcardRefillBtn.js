import { defaultPunchcardAmount } from "../constants/contractConstants";
import { refillPunchcard } from "../contracts/contractAPI";

export const PunchcardRefillBtn = ({ currentPrice, tokenId, isProcessing, setIsProcessing }) => {

    async function handleMint(amt, price, token) {
        setIsProcessing(true);
        try {
            await refillPunchcard(amt, price, token)
        } catch (e) {
            console.log(e);
            setIsProcessing(false);
        }
    }
    
    return ( isProcessing ? <img src="/images/loadingindicator.gif" alt="loading" className="sm:h-32 md:h-48" /> :
        <>
            <p className="text-lg leading-6 font-medium text-gray-900">Refill your punchcard*</p>
            <div className="mt-4 flex items-center justify-center text-4xl font-extrabold text-gray-900">
                <span>{currentPrice / 1e18}</span>
                <span className="ml-3 text-xl font-medium text-gray-500">ETH</span>
            </div>
            <div className="mt-6">
                <div className="rounded-md shadow">
                <button
                    onClick={() => handleMint(defaultPunchcardAmount, currentPrice, tokenId)}
                    className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-2xl 
                    font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                >
                    Refill
                </button>
                </div>
            </div>
            <p className="text-sm p-3">* Comes with {defaultPunchcardAmount} punches</p>
        </>
    )
}