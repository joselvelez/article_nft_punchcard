import { useContext, useEffect } from "react";
import { WalletContext } from "../context/WalletContext";
import { getContractProvider, purchaseArticle } from "../contracts/contractAPI";
import loadingIndicator from '../data/loadingIndicator.gif';

export const PurchaseArticle = ({ articleId, isProcessing, setIsProcessing }) => {
    const walletContext = useContext(WalletContext);

    useEffect(() => {
        let mounted = true;

        const provider = getContractProvider();

        provider.on('PunchcardUsed', (address, article) => {
            if (mounted) {
                console.log("purchased");
                setIsProcessing(false);
            }
        })

        return function cleanup() {
            mounted = false;
        }
    }, [walletContext.state.walletInstalled]);

    async function handlePurchase() {
        setIsProcessing(true);
        try {
            const result = await purchaseArticle(articleId);
            if (result === false) {
                setIsProcessing(false);
            }
        } catch (e) {
            console.log(e);
            setIsProcessing(false);
        }
    }

    return (
        isProcessing ? <img src={loadingIndicator} alt="loading" className="sm:h-32 md:h-48" /> :
            <>
                <p className="text-lg leading-6 font-medium text-gray-900">Pay once, own it forever</p>
                <div className="mt-4 flex items-center justify-center text-4xl font-extrabold text-gray-900">
                    <span>1</span>
                    <span className="ml-3 text-xl font-medium text-gray-500">Punch</span>
                </div>
                <div className="mt-6">
                    <div className="rounded-md shadow">
                        <button
                                onClick={() => handlePurchase()}
                                className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-2xl font-medium 
                                rounded-md text-white bg-gray-800 hover:bg-gray-900"
                            >
                                Purchase
                        </button>
                    </div>
                </div>
            </>
    )
}

