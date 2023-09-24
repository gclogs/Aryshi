import { Link, useLocation } from "@remix-run/react";
import { useMemo } from "react";
import FooterTabItem from "./FooterTabItem";

const paths = ["", "write", "message", "profile"] as const;
const mode = ["_active", "_disable"];

function isValidPath(path: string): path is typeof paths[number] {
    return path.includes(path);
} 

export default function Footer() {
    const location = useLocation();

    const cntPage = useMemo(() => {
        const path = location.pathname.split('/')[1]
        if(isValidPath(path)) {
            return path;
        }
        return 'home'
    }, [location.pathname])
    
    return (
        <footer className="w-full">
            <div className="flex justify-center border-t-2 border-gray-200">
                <FooterTabItem vector={"home"} isActive={cntPage === ''} to="/" />
                <FooterTabItem vector={"write"} isActive={cntPage === 'write'} to="/write" style="w-7" />
                <FooterTabItem vector={"message"} isActive={cntPage === 'message'} to="/message" />
                <FooterTabItem vector={"profile"} isActive={cntPage === 'profile'} to="/profile" style="w-6" />
            </div>
        </footer>
    )
}
