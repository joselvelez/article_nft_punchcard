import { useState } from "react";
import { configuredChain } from "../constants/networks";
import { defaultPunchcardAmount } from "../constants/contractConstants";

export const PunchcardMintBtn = ({ mintPunchcard, currentPrice, currentNetwork, currentChain, configuredNetwork }) => {
    const [isMinting, setIsMinting] = useState(true);

    async function handleMint(_qty, _price) {
        try {
            setIsMinting(true);
            try {
                const _result = mintPunchcard(_qty, _price);
                if (_result) {
                    setIsMinting(false);
                    // do a notification
                } else {
                    setIsMinting(false);
                }
            } catch (e) {
                console.log(e);
                setIsMinting(false);
            }
        } catch (e) {
            console.log(e);
            setIsMinting(false);
        }
    }

    return (
        <>
            {
                currentChain === configuredChain ?
                    <>
                        {
                            isMinting ? 
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
                                                onClick={() => handleMint(defaultPunchcardAmount, (defaultPunchcardAmount * currentPrice))}
                                                className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-2xl font-medium 
                                                rounded-md text-white bg-gray-800 hover:bg-gray-900"
                                            >
                                                Mint
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm p-3">* Comes with {defaultPunchcardAmount} punches</p>
                            </> :
                            <img src="./images/loadingindicator.gif" alt="loading" />
                        }
                    </> :
                    <div>
                        <p className="font-bold text-sm text-red-800">Currently on the</p>
                        <p className="font-bold text-sm text-red-800"></p>
                        <br />
                        <p className="font-bold text-sm text-red-800">Connect to the</p>
                        <p className="font-bold text-sm text-red-800"> network</p>
                    </div>
            }
        </>
    )
}