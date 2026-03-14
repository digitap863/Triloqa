"use client"
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

export const AosInit = () => {
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }, []);

    return null;
}