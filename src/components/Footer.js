import { contractAddress } from '../constants/contractConstants.js';

export const Footer = () => {
    return (
        <div className="flex flex-row justify-between px-3 py-1 w-full">
            <div>
                Front End: <a  href="https://github.com/joselvelez/article_nft_punchcard" 
                className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer"
                >
                    GitHub Repo
                </a>
            </div>
            <div>
                <a  href={`https://rinkeby.etherscan.io/address/${contractAddress}`} 
                className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer"
                >
                    Contract Address
                </a>
            </div>
            <div>
                Contract: <a  href="https://github.com/joselvelez/article_nft_punchcard_contract"
                className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer"
                >
                    GitHub Repo
                </a>
            </div>
        </div>
    )
}