import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { fetchArticle } from "../utils/fetchArticle";
import { WalletContext } from '../context/WalletContext';
import { checkAccessToArticle, getContractProvider } from "../contracts/contractAPI";
import { NoArticleAccess } from "./NoArticleAccess";
import { ArticleContent } from "./ArticleContent";
import { NoArticleAccessWrongChain } from "./NoArticleAccessWrongChain";
import { NoArticleAccessNotConnected } from "./NoArticleAccessNotConnected";

export const Article = () => {
    const walletContext = useContext(WalletContext);
    const { articleId } = useParams();
    const [hasAccess, setHasAccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [article, setArticle] = useState({
        id: null,
        title: null,
        image: null,
        summary: null,
        content: null
    });

    // Fetch the article and save to state
    useEffect(() => {
        const _articleId = articleId;
        let mounted = true;

        if (mounted) {
            loadArticle(_articleId);
        }

        return function cleanup() {
            mounted = false;
        }
    }, [articleId, isProcessing]);

    useEffect(() => {
        let mounted = true;
        
        async function checkAccess(_address, _tokenId) {
            try {
                const _hasAccess = await checkAccessToArticle(_address, _tokenId);
                setHasAccess(_hasAccess);
            } catch (e) {
                console.log("Unable to determine article access")
            }
        }

        if (mounted && walletContext.state.correctNetwork && walletContext.state.accountConnected) {
            checkAccess(walletContext.state.currentAccount, articleId);
        }

        return function cleanup() {
            mounted = false;
        }
    }, [walletContext.state.currentAccount, walletContext.state.correctNetwork, walletContext.state.accountConnected, articleId, isProcessing]);

    useEffect(() => {
        const provider = getContractProvider();
        let mounted = true;

        provider.on('PunchcardUsed', (address, article) => {
            if (mounted) {
                console.log("purchased");
                setIsProcessing(false);
            }
        })

        return function cleanup() {
            mounted = false;
        }
    }, []);

    async function loadArticle(_id) {
        try {
            const _article = await fetchArticle(_id);
            setArticle(_article);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            {(() => {
                if (hasAccess && walletContext.state.correctNetwork) {
                    return <ArticleContent article={article} />
                } else if (walletContext.state.correctNetwork === false) {
                    return <NoArticleAccessWrongChain />
                } else if (hasAccess === false && walletContext.state.correctNetwork && walletContext.state.accountConnected) {
                    return <NoArticleAccess articleId={articleId} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
                } else if (hasAccess === false && walletContext.state.correctNetwork && walletContext.state.accountConnected === false) {
                    return <NoArticleAccessNotConnected />
                }
            })()}
        </div>
    )
}