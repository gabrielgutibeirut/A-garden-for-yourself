import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { PHOTOS, PHOTO_CAPTIONS } from '../config';

export function HerMemories() {
    const containerRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Parallax scrolling for individual photos
        itemsRef.current.forEach((item, index) => {
            if (!item) return;
            const speed = 1 + (index % 3) * 0.5; // Varying speeds
            const yOffset = index % 2 === 0 ? 100 : -50;

            gsap.fromTo(item,
                { y: yOffset },
                {
                    y: -150 * speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[150vh] w-full bg-[#1A120B] overflow-hidden py-32 px-6">
            {/* Dynamic light */}
            <div className="absolute top-1/4 left-1/4 w-full h-[50vh] bg-golden-yellow/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center">
                <h2 className="font-serif text-4xl md:text-6xl text-cream font-light text-center mb-32 z-20">
                    Tu rincón.
                </h2>

                {/* Scattered/Floating layout */}
                <div className="relative w-full h-[800px] flex items-center justify-center">
                    {PHOTOS.map((src, i) => {
                        // Calculate some random-looking but fixed positions based on index
                        const positions = [
                            "top-[10%] left-[5%] md:left-[10%] rotate-[-3deg] w-[200px] md:w-[300px]",
                            "top-[20%] right-[10%] md:right-[15%] rotate-[4deg] w-[220px] md:w-[340px]",
                            "bottom-[15%] left-[15%] rotate-[2deg] w-[240px] md:w-[320px]",
                            "bottom-[5%] right-[5%] md:right-[20%] rotate-[-5deg] w-[180px] md:w-[280px]"
                        ];

                        const caption = PHOTO_CAPTIONS[i] || "";

                        return (
                            <div
                                key={i}
                                ref={el => itemsRef.current[i] = el}
                                className={`absolute ${positions[i % positions.length]}  group cursor-pointer group hover:z-50 transition-all duration-500`}
                                style={{ zIndex: i + 10 }}
                            >
                                <div className="p-3 pb-8 md:p-4 md:pb-12 bg-cream rounded-sm shadow-2xl transition-transform duration-500 hover:scale-110">
                                    <div className="overflow-hidden bg-gray-200">
                                        <img
                                            src={src}
                                            className="w-full h-full aspect-[4/5] object-cover filter grayscale-[20%] sepia-[10%] group-hover:grayscale-0 transition-all duration-500"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full aspect-[4/5] bg-gradient-to-br from-[#e0d3c1] to-[#cfc4b4] flex items-center justify-center text-deep-brown font-serif text-sm">Foto</div>';
                                            }}
                                        />
                                    </div>
                                    {caption && (
                                        <p className="font-serif text-deep-brown text-center mt-4 md:mt-6 text-sm md:text-lg italic tracking-wide opacity-80">
                                            {caption}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
