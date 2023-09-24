import { Link } from "@remix-run/react";

interface Props {
    vector: string
    style?: string
    to?: string
    isActive?: boolean
}

export default function FooterTabItem({isActive, vector, style="w-8", to}: Props) {
    return (
            <button className="px-5 py-3">
                <Link to={to}>
                    <VectorItem 
                        isActive={isActive} 
                        vector={vector} 
                        style={style} 
                    />
                </Link>
            </button>
    )
}

const VectorItem = ({vector, style="w-8", isActive=false}: Props) => {
    if(isActive) {
        vector = vector + "_active";
    } else {
        vector = vector + "_disable"
    }

    return (
        <img
            className={style}
            src={`/assets/${vector}.svg`}
        />
    )
}