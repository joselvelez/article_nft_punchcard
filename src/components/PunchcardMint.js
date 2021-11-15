import { CheckCircleIcon } from '@heroicons/react/solid';
import { useContext, useEffect, useState } from "react"
import { getCurrentPrice, mintPunchcard, checkForPunchcard } from "../contracts/contractAPI";
import { PunchcardMintBtn } from './PunchcardMintBtn';
import { WalletContext } from '../context/WalletContext';
import { PunchcardMinted } from './PunchcardMinted';

export const PunchcardMint = () => {
  const walletContext = useContext(WalletContext);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [hasPunchcard, setHasPunchcard] = useState(null);
  const currentChain = walletContext.state.currentChain;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      loadCurrentPrice();
      checkPunchcard(walletContext.state.currentAccount);
    }

    return function cleanup() {
      mounted = false;
    }

  }, [walletContext.state.currentAccount]);

  const loadCurrentPrice = async () => {
      const _currentPrice = await getCurrentPrice();
      setCurrentPrice(_currentPrice);
  }

  const checkPunchcard = async (_address) => {
      try {
          const _result = await checkForPunchcard(_address);
          setHasPunchcard(_result);
      } catch (e) {
          console.log("Unable to get balance");
      }
  }

  return (
    <div className="bg-gray-100">
      <div className="pt-10 sm:pt-8 lg:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-2xl lg:text-3xl">Pay only for the content you want</h2>
            <p className="mt-4 text-lg text-gray-600">
              A new way to subscribe. Buy an NFT Punchcard to access only the content that interests you. No more usernames and passwords.
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
                <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">Lifetime Access</h3>
                <p className="mt-6 text-base text-gray-500">
                    With one punchard, you can buy access to individual articles and retain lifetime access to that article.
                </p>
                <div className="mt-6">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                      What's included
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <ul className="mt-6 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4">
                      <li key={1} className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">Discord access</p>
                      </li>

                      <li key={2} className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">Lifetime access</p>
                      </li>

                      <li key={3} className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">A cool NFT</p>
                      </li>

                      <li key={4} className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">Daily 'gm' emails</p>
                      </li>

                  </ul>
                </div>
              </div>
              <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                {hasPunchcard ? <PunchcardMinted /> : <PunchcardMintBtn currentPrice={currentPrice} mintPunchcard={mintPunchcard} currentChain={currentChain} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
