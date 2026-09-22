import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function GiantSunflower() {
    const containerRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const flowerImgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Parallax zoom through the center of the giant sunflower
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=2000",
                scrub: 1,
                pin: true,
            }
        });

        tl.to(wrapperRef.current, {
            scale: 5,
            rotation: 45,
            opacity: 0,
            duration: 2,
            ease: "power2.inOut"
        });

        return () => tl.kill();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-subtle-black overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-subtle-black to-[#2A1705]" />

            {/* Light ray from top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-full bg-gradient-to-b from-golden-yellow/20 to-transparent blur-[100px] pointer-events-none transform -skew-x-[20deg]" />

            <div ref={wrapperRef} className="relative z-10 w-full max-w-4xl flex items-center justify-center pointer-events-none">
                <img
                    ref={flowerImgRef}
                    src="/images/giant-sunflower.png"
                    alt="Giant Sunflower"
                    className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] object-cover rounded-full"
                    style={{ transformOrigin: 'center center' }}
                    onError={(e) => {
                        // Fallback if image not generated yet
                        e.currentTarget.style.display = 'none';
                    }}
                />
                {/* Placeholder if image missing */}
                <div
                    className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-golden-yellow/30 bg-sunflower/20 flex items-center justify-center -z-10 animate-pulse blur-sm"
                    style={{ boxShadow: '0 0 100px rgba(245, 158, 11, 0.4)' }}
                />
            </div>
        </section>
    );
}
