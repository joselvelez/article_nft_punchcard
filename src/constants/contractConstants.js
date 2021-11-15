import abi from '../contracts/ArticlePunchcard.json';
export const contractAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'
export const contractABI = abi.abi;

export function shortenAddress(address) {
    return `${address.substring(0,6)}...${address.substring(address.length -  4)}`;
}

export const defaultPunchcardAmount = 10;