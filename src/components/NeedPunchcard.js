import { ExclamationIcon } from '@heroicons/react/solid';

export const NeedPunchcard = () => {
    return (
        <div className="flex flex-col items-center">
            <ExclamationIcon className="h-24 w-24 text-yellow-400" aria-hidden="true" />
            <p className="mt-6 text-base text-gray-500">You need to buy a punchcard!</p>
        </div>
    )
}