import { ethers } from "ethers";
import { contractABI, contractAddress } from "../constants/contractConstants";

export const getContractSigner = () => {
    try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = _provider.getSigner();
        const _contractSigner = new ethers.Contract(contractAddress, contractABI, _signer);
        return _contractSigner;
    } catch (e) {
        console.log("No provider is available");
    }
}

export const getContractProvider = () => {
    try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const _contractProvider = new ethers.Contract(contractAddress, contractABI, _provider);
        return _contractProvider;
    } catch (e) {
        console.log("No provider is available");
    }
}

// Contract Methods

export const checkForPunchcard = async (_address) => {
    try {
        let _provider = getContractProvider();
        let result = await _provider.hasPunchcard(_address);
        return result;
    } catch (e) {
        console.log("Unable to check for a punchcard");
    }
}

export const getBalance = async () => {
    try {
        let _provider = getContractProvider();
        let _balance = await _provider.getBalance(1);
        return _balance;
    } catch (e) {
        console.log("Unable to get balance");
    }
}

export const getCurrentPrice = async () => {
    try {
        let _provider = getContractProvider();
        let _currentPrice = await _provider.getCurrentPrice();
        return _currentPrice;
    } catch (e) {
        console.log("Unable to get current price");
    }
}

// Get punchcard token for current address
export const fetchTokenId = async (_address) => {
    try {
        let _provider = getContractProvider();
        let _tokenId = await _provider.getTokenId(_address);
        return _tokenId;
    } catch (e) {
        console.log("Unable to get token id");
    }
}

export const checkAccessToArticle = async (_address, _articleId) => {
    try {
        let _provider = getContractProvider();
        let _hasArticleAccess = await _provider.accessToArticle(_address, _articleId);
        return _hasArticleAccess;
    } catch (e) {
        console.log("Unable to check article access");
    }
}

export const mintPunchcard = async (_qty, _price) => {
    try {
        let _signer = getContractSigner();
        await _signer.purchasePunchcard(_qty, {value: _price});
        return true;
    } catch (e) {
        console.log("Unable to purchase a punchcard");
        return false;
    }
}

export const refillPunchcard = async (_qty, _price, _tokenId) => {
    try {
        let _signer = getContractSigner();
        await _signer.addRedemptions(_qty, _tokenId, {value: (_price * _qty)});
    } catch (e) {
        console.log("Unable to purchase a punchcard");
    }
}

export const purchaseArticle = async (_articleId) => {
    try {
        let _signer = getContractSigner();
        await _signer.assignAccessToArticle(_articleId);
        return true;
    } catch (e) {
        console.log("Unable to purchase a punchcard");
        return false;
    }
}