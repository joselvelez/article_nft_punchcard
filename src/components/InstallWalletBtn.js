export const InstallWalletBtn = () => {
    return (
        <>
            <button
                type="button"
                onClick={window.open('https://metamask.io/')}
                className="inline-flex items-center mx-1 mb-1 px-2 py-1 border border-transparent text-xs font-medium rounded 
                shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                Get MetaMask
            </button>
        </>
    )
}