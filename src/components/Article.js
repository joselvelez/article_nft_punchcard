import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchArticle } from "../utils/fetchArticle";
import { WalletContext } from '../context/WalletContext';
import { useContext } from "react";
import { checkAccessToArticle } from "../contracts/contractAPI";
import { NoArticleAccess } from "./NoArticleAccess";
import { ArticleContent } from "./ArticleContent";

export const Article = () => {
    const walletContext = useContext(WalletContext);
    const { articleId } = useParams();
    const [hasAccess, setHasAccess] = useState(null);
    const [article, setArticle] = useState({
        id: null,
        title: null,
        image: null,
        summary: null,
        content: null
    });

    useEffect(() => {
        const _articleId = articleId;

        async function loadArticle(_id) {
            try {
                const _article = await fetchArticle(_id);
                setArticle(_article);
            } catch (e) {
                console.log(e);
            }
        }

        loadArticle(_articleId);
    }, [articleId]);

    useEffect(() => {
        async function checkAccess(_address, _tokenId) {
            try {
                const _hasAccess = await checkAccessToArticle(_address, _tokenId);
                setHasAccess(_hasAccess);
            } catch (e) {
                console.log("Unable to determine article access")
            }
        }

        checkAccess(walletContext.state.currentAccount, articleId);
    }, [walletContext.state.currentAccount, articleId]);

    return (
        <div>
            {hasAccess ? <ArticleContent article={article} /> : <NoArticleAccess articleId={articleId} />}
        </div>
    )
}