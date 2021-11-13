import { useNavigate } from "react-router";

export const ArticleSnippet = ({ articleId, image, summary }) => {
    const navigate = useNavigate();

    const handleNavigate = (_id) => {
        navigate(`/article/${_id}`);
    }

    return (
        <div className="sm:py-2 sm:px-2 md:p-3 relative hover:opacity-60 cursor-pointer" onClick={() => handleNavigate(articleId)}>
            <div className="absolute bottom-0 pb-4 pt-1 px-3 bg-white opacity-80 w-full">
                <p className="text-sm font-sans">
                    {summary}
                </p>
            </div>
            <img src={image} className="object-cover w-full h-32 rounded-xl" alt="article" />
        </div>
    )
}