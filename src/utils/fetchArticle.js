import { articles } from "../data/articles";

export const fetchArticle = async (_id) => {
    const _article = articles.find(item => item.id === parseInt(_id));
    return _article;
}