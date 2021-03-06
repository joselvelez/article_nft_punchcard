import { useContext, useState, useEffect } from "react"
import { WalletContext } from "../context/WalletContext"
import { PurchaseArticle } from "./PurchaseArticle";
import { fetchTokenId, getBalance, checkForPunchcard } from "../contracts/contractAPI";
import { NeedPunchcard } from "./NeedPunchcard";

export const NoArticleAccess = ({ articleId, setIsProcessing, isProcessing }) => {
    const walletContext = useContext(WalletContext);
    const [currentBalance, setCurrentBalance] = useState(null);
    const [tokenId, setTokenId] = useState(null);
    const [hasPunchcard, setHasPunchcard] = useState(null);

    useEffect(() => {
        let mounted = true;
        
        if (mounted && walletContext.state.correctNetwork) {
            checkPunchcard(walletContext.state.currentAccount);
        }

        return function cleanup() {
            mounted = false;
        }
    }, [walletContext.state.correctNetwork, walletContext.state.currentAccount]);

    useEffect(() => {
        let mounted = true;
        
        if (mounted && walletContext.state.correctNetwork) {
            loadBalance(tokenId);
        }

        return function cleanup() {
            mounted = false;
        }
    }, [tokenId, walletContext.state.correctNetwork]);

    useEffect(() => {
        let mounted = true;
        
        if (mounted && walletContext.state.correctNetwork) {
            loadTokenId(walletContext.state.currentAccount);
        }

        return function cleanup() {
            mounted = false;
        }
    }, [walletContext.state.correctNetwork, walletContext.state.currentAccount]);

    const checkPunchcard = async (_address) => {
        try {
            const _result = await checkForPunchcard(_address);
            setHasPunchcard(_result);
        } catch (e) {
            console.log("Unable to get balance");
        }
    }

    const loadTokenId = async (_address) => {
        const _tokenId = await fetchTokenId(_address);
        setTokenId(_tokenId);
    }

    const loadBalance = async (_tokenId) => {
        const _balance = await getBalance(_tokenId);
        setCurrentBalance(parseInt(_balance));
    }

    return (
        <div className="bg-gray-100">
        <div className="pt-10 sm:pt-8 lg:pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-2xl lg:text-3xl">So you wanna read this article?</h2>
                <p className="mt-4 text-lg text-gray-600">
                We've made it easy for you to keep droppin' that ETH on our content.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                    Punch your card and get immediate access to this amazing article.
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
                    <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">Your Account</h3>
                    <div className="mt-6">
                    <div className="flex items-center">
                        <div className="flex-1 border-t-2 pb-4 border-gray-200" /></div>
                        <p className="mt-4 text-lg text-gray-600">Current wallet:</p>
                        <p className="text-lg text-gray-600">{walletContext.state.currentShortAccount}</p>
                        {hasPunchcard ? 
                        <p className="mt-4 text-lg text-gray-600">You currently have {currentBalance} punches.</p> :
                        <p className="mt-4 text-lg text-gray-600">No punchcard found for this wallet</p>
                        }
                    </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                    {hasPunchcard ? <PurchaseArticle articleId={articleId} isProcessing={isProcessing} setIsProcessing={setIsProcessing} /> : <NeedPunchcard />}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}