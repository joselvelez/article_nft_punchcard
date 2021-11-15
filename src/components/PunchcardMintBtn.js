import { defaultPunchcardAmount } from "../constants/contractConstants"

export const PunchcardMintBtn = ({ mintPunchcard, currentPrice }) => {
    return (
        <>
            <p className="text-lg leading-6 font-medium text-gray-900">Mint a Punchcard*</p>
            <p className="text-lg leading-6 font-medium text-gray-900">Pay once, own it forever</p>
            <div className="mt-4 flex items-center justify-center text-4xl font-extrabold text-gray-900">
                <span>{currentPrice / 1e18}</span>
                <span className="ml-3 text-xl font-medium text-gray-500">ETH</span>
            </div>
            <div className="mt-6">
                <div className="rounded-md shadow">
                    <button
                            onClick={() => mintPunchcard(defaultPunchcardAmount, (defaultPunchcardAmount * currentPrice))}
                            className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-2xl font-medium 
                            rounded-md text-white bg-gray-800 hover:bg-gray-900"
                        >
                            Mint
                    </button>
                </div>
            </div>
            <p className="text-sm p-3">* Comes with {defaultPunchcardAmount} punches</p>
        </>
    )
}