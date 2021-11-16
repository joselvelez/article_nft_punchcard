import { useReducer, useEffect } from "react";
import { shortenAddress } from "../constants/contractConstants";
import { configuredChain, networks } from "../constants/networks";
import {
    GET_ACCOUNTS,
    GET_SHORT_ACCOUNTS,
    GET_CURENT_CHAIN,
    WALLET_INSTALLED,
    GET_CONFIGURED_CHAIN,
    GET_CURENT_NETWORK,
    GET_CONFIGURED_NETWORK,
    CORRECT_NETWORK,
    ACCOUNT_CONNECTED
    } from "./walletActions";
import { fetchAccounts, fetchChain } from "./walletAPI";
import { WalletContext } from "./WalletContext";
import { walletReducer } from "./walletReducer";

const WalletProvider = ({ children }) => {
    // Initial App state
    const initialState = {
        walletInstalled: false,
        currentAccount: [],
        currentShortAccount: [],
        currentChain: null,
        configuredChain: null,
        currentNetwork: null,
        configuredNetwork: null,
        correctNetwork: null,
        accountConnected: null,
    }
    const [state, dispatch] = useReducer(walletReducer, initialState);

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', () => {
            console.log("Changing account");
            getAccount();
        });
    
        window.ethereum.on('chainChanged', (chainId) => {
            console.log(`Switching chains to ${chainId}`);
            getCurrentChain();
            window.location.reload();
        });
    }

    useEffect(() => {
        walletInstalled();
        if (window.ethereum) {
            getCurrentChain();
            getConfiguredChain();
            getCurrentNetwork();
            getConfiguredNetwork();
            checkForCorrectNetwork();
            getAccount();
            getShortAccount();
        }
    }, []);

    // dispatch method to check if a wallet is installed
    const walletInstalled = () => {

        const { ethereum } = window;

        if (!ethereum) {
            console.log("No wallet installed");
        } else {
            console.log("Wallet found");
            dispatch({
                type: WALLET_INSTALLED,
                payload: true,
            });
        }
    };

    // dispatch method to retrieve the accounts array
    const getAccount = async () => {
        try {
            const _accounts = await fetchAccounts();

            if (_accounts.length !== 0) {
                const _account = _accounts[0];
                console.log(`found account ${_account}`);

                dispatch({
                    type: GET_ACCOUNTS,
                    payload: _account,
                });

                dispatch({
                    type: ACCOUNT_CONNECTED,
                    payload: true,
                });
            } else {
                console.log("No authorized account found");

                dispatch({
                    type: ACCOUNT_CONNECTED,
                    payload: false,
                });
            }
        } catch (e) {
            console.log("Unable to fetch account");
        }
    };

    // dispatch method to retrieve the shortened account
    const getShortAccount = async () => {
        try {
            const _accounts = await fetchAccounts();

            if (_accounts.length !== 0) {
                const _account = _accounts[0];
                const _shortenedAccount = shortenAddress(_account);

                dispatch({
                    type: GET_SHORT_ACCOUNTS,
                    payload: _shortenedAccount,
                });
            }
        } catch (e) {
            console.log("Unable to fetch account");
        }
    };

    // dispatch method to retrieve the current chain
    const getCurrentChain = async () => {
        try {
            const _currentChain = await fetchChain();
            console.log(`Current chain: ${_currentChain}`);

            dispatch({
                type: GET_CURENT_CHAIN,
                payload: _currentChain,
            });
        } catch (e) {
            console.log("Unable to fetch network information", e);
        }
    };

    // dispatch method to retrieve the configured chain
    const getConfiguredChain = async () => {
        try {
            const _configuredChain = configuredChain;

            dispatch({
                type: GET_CONFIGURED_CHAIN,
                payload: _configuredChain,
            });
        } catch (e) {
            console.log("Unable to get configured chain information", e);
        }
    };

    // dispatch method to retrieve the current network
    const getCurrentNetwork = async () => {
        try {
            const _currentChain = await fetchChain();
            const _currentNetwork = networks.find(i => i.hex === _currentChain)
            const _currentNetworkName = _currentNetwork.name;

            dispatch({
                type: GET_CURENT_NETWORK,
                payload: _currentNetworkName,
            });
        } catch (e) {
            console.log("Unable to get current network information", e);
        }
    };

    // dispatch method to retrieve the configured network
    const getConfiguredNetwork = async () => {
        try {
            const _configuredChain = configuredChain;
            const _configuredNetwork = networks.find(i => i.hex === _configuredChain);
            const _configuredNetworkName = _configuredNetwork.name;

            dispatch({
                type: GET_CONFIGURED_NETWORK,
                payload: _configuredNetworkName,
            });
        } catch (e) {
            console.log("Unable to get configured network information", e);
        }
    };

    // dispatch method to check for correct network
    const checkForCorrectNetwork = async () => {
        try {
            const _configuredChain = configuredChain;
            const _currentChain = await fetchChain();
            let _correctNetwork;

            if (_configuredChain === _currentChain) {
                _correctNetwork = true;
            } else {
                _correctNetwork = false;
            }

            dispatch({
                type: CORRECT_NETWORK,
                payload: _correctNetwork,
            });
        } catch (e) {
            console.log("Unable to get configured network information", e);
        }
    };

    const walletContext = {state, walletInstalled};

    return (
        <WalletContext.Provider value={walletContext}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletProvider;