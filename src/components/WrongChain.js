import { useContext } from "react"
import { WalletContext } from "../context/WalletContext"

export const WrongChain = () => {
    const walletContext = useContext(WalletContext);

    return (
        <div>
            <p className="font-bold text-sm text-red-800">Currently on the</p>
            <p className="font-bold text-sm text-red-800">{walletContext.state.currentNetwork}</p>
            <br />
            <p className="font-bold text-sm text-red-800">Connect to the</p>
            <p className="font-bold text-sm text-red-800">{walletContext.state.configuredNetwork}</p>
        </div>
    )
}