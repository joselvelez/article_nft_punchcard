import abi from '../contracts/ArticlePunchcard.json';
export const contractAddress = '0x476CeC23b27a1AdBA216176122800D5B75223Bcf'
export const contractABI = abi.abi;

export function shortenAddress(address) {
    return `${address.substring(0,6)}...${address.substring(address.length -  4)}`;
}

export const defaultPunchcardAmount = 10;