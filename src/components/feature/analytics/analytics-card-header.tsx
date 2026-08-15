import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi"

type Props = {
    title: string;
    onBack?: () => void;
    onNext?: () => void;
}

const navButtonClasses = "flex items-center justify-center bg-primary text-primary-foreground border border-primary rounded-lg w-7 max-[800px]:w-6 h-7 max-[800px]:h-6 hover:opacity-90 disabled:bg-transparent disabled:border-transparent disabled:text-transparent cursor-pointer focus:outline-none focus-visible:outline-ring transition-colors ease-in-out transform active:scale-90 duration-100"

function AnalyticsCardHeader({ title, onBack, onNext }: Props) {
    return (
        <div className="flex justify-center items-center gap-5 max-[800px]:gap-3 text-foreground text-xl max-[800px]:text-lg max-[500px]:text-base tracking-wide">
            <button onClick={onBack} disabled={!onBack} className={navButtonClasses}>
                <HiArrowSmLeft />
            </button>

            <h2 className="tracking-wide">{title}</h2>

            <button onClick={onNext} disabled={!onNext} className={navButtonClasses}>
                <HiArrowSmRight />
            </button>
        </div>
    )
}

export default AnalyticsCardHeader;
