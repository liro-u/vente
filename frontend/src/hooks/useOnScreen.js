import { useEffect, useMemo, useState } from "react"

export default function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState("hidden")

    const observer = useMemo(() => new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting ? "visible" : "hidden")
    ), [])


    useEffect(() => {
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [observer, ref])

return isIntersecting
}