import { useNavigate } from "react-router-dom";

export const CoverArticle = () => {
    const navigate = useNavigate();

    const handleNavigate = (_id) => {
        navigate(`/article/${_id}`);
    }

    return (
        <div className="relative cursor-pointer hover:opacity-60" onClick={() => handleNavigate(1)}>
            <div className="flex justify-start absolute pl-3 p-1 bottom-0 bg-white opacity-70 w-full">
                <p className="font-sans text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin...
                </p>
            </div>
            <img src="/images/luca-severin-zMecixx58Uw-unsplash.jpg" className="object-cover w-full h-48" alt="news"></img>
        </div>
    )
}