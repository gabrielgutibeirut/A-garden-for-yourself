import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Opening() {
    const sectionRef = useRef<HTMLElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const text3Ref = useRef<HTMLDivElement>(null);
    const text4Ref = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
            }
        });

        // Dark screen initially
        tl.to(bgRef.current, { opacity: 0, duration: 1 })

            // First text
            .fromTo(text1Ref.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
            .to(text1Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "+=0.5")

            // Second text
            .fromTo(text2Ref.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
            .to(text2Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "+=0.5")

            // Bring in the warm sunflower field background
            .to(bgRef.current, { opacity: 1, duration: 2 })

            // Third text
            .fromTo(text3Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
            .to(text3Ref.current, { opacity: 0, y: -20, duration: 1 }, "+=0.5")

            // Fourth text (Final reveal)
            .fromTo(text4Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5 })
            .to(text4Ref.current, { opacity: 0, y: -50, duration: 1 }, "+=1");

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-subtle-black">
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 opacity-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/sunflower-bg-1.jpg'), radial-gradient(circle at center, #F59E0B, #451A03, #110d0a)",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-orange/20 to-subtle-black/80"></div>
            </div>

            {/* Floating particles (simulated via CSS or Canvas later. Adding simple CSS animations for now) */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-50">
                {/* Particles can go here */}
            </div>

            {/* Texts Container */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                <div ref={text1Ref} className="absolute opacity-0">
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream font-light tracking-wide">
                        Hay algo que quería darte...
                    </h2>
                </div>

                <div ref={text2Ref} className="absolute opacity-0">
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream font-light tracking-wide">
                        pero la distancia no me dejó.
                    </h2>
                </div>

                <div ref={text3Ref} className="absolute opacity-0">
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream drop-shadow-lg font-light">
                        Así que hice esto para ti.
                    </h2>
                </div>

                <div ref={text4Ref} className="absolute opacity-0">
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-sunflower drop-shadow-2xl font-medium tracking-wider">
                        Bienvenida a tu jardín.
                    </h1>
                </div>
            </div>
        </section>
    );
}
