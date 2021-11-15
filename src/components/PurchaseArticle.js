import { purchaseArticle } from "../contracts/contractAPI"

export const PurchaseArticle = ({ articleId }) => {
    return (
        <>
            <p className="text-lg leading-6 font-medium text-gray-900">Pay once, own it forever</p>
            <div className="mt-4 flex items-center justify-center text-4xl font-extrabold text-gray-900">
                <span>1</span>
                <span className="ml-3 text-xl font-medium text-gray-500">Punch</span>
            </div>
            <div className="mt-6">
                <div className="rounded-md shadow">
                    <button
                            onClick={() => purchaseArticle(articleId)}
                            className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-2xl font-medium 
                            rounded-md text-white bg-gray-800 hover:bg-gray-900"
                        >
                            Purchase
                    </button>
                </div>
            </div>
        </>
    )
}