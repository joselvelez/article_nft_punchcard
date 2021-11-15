export const ArticleContent = ({ article }) => {
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