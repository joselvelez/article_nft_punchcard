export const fetchAccounts = async () => {
    try {
        const _accounts = await window.ethereum.request({ method: 'eth_accounts'});
        console.log("Fetching account");
        return _accounts;
    } catch (e) {
        console.log("No wallet detected");
    };
};

export const fetchShortAccounts = async () => {
    try {
        const _accounts = await window.ethereum.request({ method: 'eth_accounts'});
        return _accounts;
    } catch (e) {
        console.log("No wallet detected");
    };
};

export const fetchChain = async () => {
    try {
        const _chain = await window.ethereum.request({method: 'eth_chainId'});
        console.log("Fetching network information");
        return _chain;
    } catch (e) {
        console.log("No chain found");
    }
}