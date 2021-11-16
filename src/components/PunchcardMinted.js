import { CheckCircleIcon } from '@heroicons/react/solid';

export const PunchcardMinted = () => {

    return (
            <>
                <div className="flex flex-col items-center">
                    <CheckCircleIcon className="h-24 w-18 text-green-400" aria-hidden="true" />
                    <p className="mt-6 text-base text-gray-500">You already have a punchcard!</p>
                </div>
            </>
    )
}