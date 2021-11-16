import {
    CONNECT_WALLET,
    GET_ACCOUNTS,
    GET_SHORT_ACCOUNTS,
    WALLET_INSTALLED,
    GET_CURENT_CHAIN,
    GET_CONFIGURED_CHAIN,
    GET_CURENT_NETWORK,
    GET_CONFIGURED_NETWORK,
    CORRECT_NETWORK,
    ACCOUNT_CONNECTED
    } from './walletActions';

export const walletReducer = (state, action) => {
    switch (action.type) {
        case WALLET_INSTALLED:
            return {
                ...state,
                walletInstalled: action.payload,
            }
        case CONNECT_WALLET:
            return {
                ...state,
                currentAccount: action.payload,
            }
        case GET_ACCOUNTS:
            return {
                ...state,
                currentAccount: action.payload,
            }
        case GET_SHORT_ACCOUNTS:
            return {
                ...state,
                currentShortAccount: action.payload,
            }
        case GET_CURENT_CHAIN:
            return {
                ...state,
                currentChain: action.payload,
            }
        case GET_CONFIGURED_CHAIN:
            return {
                ...state,
                configuredChain: action.payload,
            }
        case GET_CURENT_NETWORK:
            return {
                ...state,
                currentNetwork: action.payload,
            }
        case GET_CONFIGURED_NETWORK:
            return {
                ...state,
                configuredNetwork: action.payload,
            }
        case CORRECT_NETWORK:
            return {
                ...state,
                correctNetwork: action.payload,
            }
        case ACCOUNT_CONNECTED:
            return {
                ...state,
                accountConnected: action.payload,
            }
        default:
            return state;
    }
};