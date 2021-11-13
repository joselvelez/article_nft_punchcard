import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchArticle } from "../utils/fetchArticle";

export const Article = () => {
    const { articleId } = useParams();
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

    return (
        <div>
            <div className="sm:pt-1">
                <h2 className="font-sans text-2xl font-semibold pb-2">{article.title}</h2>
                <img src={article.image} className="h-64 sm:w-1/2 lg:w-full object-cover sm:float-left lg:float-none sm:mr-4" alt="article" />
                <p className="font-sans text-sm leading-relaxed pb-2 px-4">
                    {article.content}
                </p>
                <p className="font-sans text-sm leading-relaxed pb-2 px-4">
                    {article.content}
                </p>
            </div>
        </div>
    )
}