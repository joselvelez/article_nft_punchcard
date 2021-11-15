import { useReducer, useEffect } from "react";
import { shortenAddress } from "../constants/contractConstants";
import { GET_ACCOUNTS, GET_SHORT_ACCOUNTS, GET_CHAIN, WALLET_INSTALLED } from "./walletActions";
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
    }
    const [state, dispatch] = useReducer(walletReducer, initialState);

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', () => {
            console.log("Changing account");
            getAccount();
        });
    
        window.ethereum.on('chainChanged', (chainId) => {
            console.log(`Switching chains to ${chainId}`);
            getChain();
            window.location.reload();
        });
    }

    useEffect(() => {
        walletInstalled();
        if (window.ethereum) {
            getChain();
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
            } else {
                console.log("No authorized account found");
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
            } else {
                console.log("No authorized account found");
            }
        } catch (e) {
            console.log("Unable to fetch account");
        }
    };

    // dispatch method to retrieve the current network
    const getChain = async () => {
        try {
            const _currentChain = await fetchChain();
            console.log(`Current chain: ${_currentChain}`);

            dispatch({
                type: GET_CHAIN,
                payload: _currentChain,
            });
        } catch (e) {
            console.log("Unable to fetch network information", e);
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