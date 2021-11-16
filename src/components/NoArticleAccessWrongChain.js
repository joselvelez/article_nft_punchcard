import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { WrongChain } from "./WrongChain";

export const NoArticleAccessWrongChain = () => {
    const walletContext = useContext(WalletContext);

    return (
        <div className="bg-gray-100">
        <div className="pt-10 sm:pt-8 lg:pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-2xl lg:text-3xl">So you wanna read this article?</h2>
                <p className="mt-4 text-lg text-gray-600">
                    You need to be on the correct network access this application
                </p>
            </div>
            </div>
        </div>
        <div className="mt-6 bg-white pb-16 sm:mt-8 sm:pb-12 lg:pb-12">
            <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-100" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                    <div className="flex-1 bg-white px-6 py-8 lg:p-10">
                        <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">Status: Wrong Network</h3>
                        <div className="mt-6">
                        <div className="flex items-center">
                            <div className="flex-1 border-t-2 pb-4 border-gray-200" /></div>
                            <p className="mt-2 text-md text-gray-600">Current wallet:</p>
                            <p className="text-md text-gray-600">{walletContext.state.currentShortAccount}</p>
                        </div>
                    </div>
                    <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                        <WrongChain />
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}