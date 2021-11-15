import { useContext, useEffect, useState } from "react"
import { fetchTokenId, getBalance, getCurrentPrice, refillPunchcard } from "../contracts/contractAPI";
import { WalletContext } from "../context/WalletContext";
import { defaultPunchcardAmount } from "../constants/contractConstants";

export const PunchcardRefill = () => {
    const walletContext = useContext(WalletContext);
    const [currentBalance, setCurrentBalance] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [tokenId, setTokenId] = useState(null);

    useEffect(() => {
        let mounted = true;
        
        if (mounted) {
            loadBalance(tokenId);            
        }

        return function cleanup() {
            mounted = false;
        }
    }, [tokenId]);

    useEffect(() => {
        loadTokenId(walletContext.state.currentAccount);
        loadCurrentPrice();
    }, [walletContext.state.currentAccount]);

    const loadCurrentPrice = async () => {
        const _currentPrice = await getCurrentPrice();
        setCurrentPrice(_currentPrice);
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
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-2xl lg:text-3xl">Empty already? Somebody likes our content!</h2>
            <p className="mt-4 text-lg text-gray-600">
              We've made it easy for you to keep droppin' that ETH on our content.
            </p>
            <p className="mt-4 text-lg text-gray-600">
                Just refill your punchcard and continue getting your fix. :)
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
                    <p className="mt-4 text-lg text-gray-600">You currently have {currentBalance} punches.</p>
                </div>
              </div>
              <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                <p className="text-lg leading-6 font-medium text-gray-900">Refill your punchcard*</p>
                <div className="mt-4 flex items-center justify-center text-4xl font-extrabold text-gray-900">
                    <span>{currentPrice / 1e18}</span>
                    <span className="ml-3 text-xl font-medium text-gray-500">ETH</span>
                </div>
                <div className="mt-6">
                    <div className="rounded-md shadow">
                    <button
                        onClick={() => refillPunchcard(defaultPunchcardAmount, currentPrice, tokenId)}
                        className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-2xl 
                        font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                    >
                        Refill
                    </button>
                    </div>
                </div>
                <p className="text-sm p-3">* Comes with {defaultPunchcardAmount} punches</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
