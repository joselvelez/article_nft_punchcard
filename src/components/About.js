export const About = () => {
    return (
        <div className="sm:p-4 md:p-6 lg:p-8">
            <p className="text-sm pb-2">
                This project is to demonstrate the concept of using NFTs as punch cards to purchase content. I setup this fake news app with fake articles 
                to demonstrate. All of the articles are locked behind a paywall. To access an article, you must connect your wallet and mint a punchcard.
            </p>
            <p className="text-sm pb-2">
                Once a punchcard is minted, you can unlock individual articles. Each article that is unlocked is added to a list of articles you have access to and is
                stored on the blockchain. A punchard is currently configured to have 10 punches loaded by default, but it can be changed in the front end.
            </p>
            <p className="text-sm pb-2">
                The cost of each punchcard, however, is determined onchain and stored in the contract. The contract owner can change the price via an available call. 
                This is not meant to be a fully functioning application (I did this as quickly as I could over a weekend) and there are lots more optimizations and 
                features that could be added.
            </p>
            <p className="text-sm pb-2">
                This is the first web3 application I have built on my own from scratch and I'm very excited to share it. I hope others might find it useful
                in their learning process. This was built with React and Tailwind CSS. 
            </p>
            <p className="text-sm text-red-900 pb-2">
                This application is running on the Rinkeby Testnet. You need to be connected to Rinkeby to access it.
            </p>
        </div>
    )
}