import abi from '../contracts/ArticlePunchcard.json';
export const contractAddress = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'
export const contractABI = abi.abi;

export function shortenAddress(address) {
    return `${address.substring(0,6)}...${address.substring(address.length -  4)}`;
}

export const defaultPunchcardAmount = 10;