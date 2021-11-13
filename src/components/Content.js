import { ArticleSnippet } from "./ArticleSnippet";
import { CoverArticle } from "./CoverArticle";
import { articles } from "../data/articles";

export const Content = () => {
    return (
        <div className="bg-white">
            <CoverArticle />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
                {articles.map(item => {
                    return (
                        <ArticleSnippet key={item.id} articleId={item.id} image={item.image} summary={item.summary} />
                    )
                })}
            </div>
        </div>
    )
}