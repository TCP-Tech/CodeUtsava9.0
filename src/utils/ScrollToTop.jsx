// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // scroll to top of page when pathname changes
        window.scrollTo({ top: 0, behavior: "auto" });
        // if using Lenis:
        if (window.lenis && typeof window.lenis.scrollTo === "function") {
            window.lenis.scrollTo(0);
        }
    }, [pathname]);

    return null;
}
