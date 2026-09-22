import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config';

export function FinalScene() {
    const containerRef = useRef<HTMLElement>(null);
    const msgTextRef = useRef<HTMLDivElement>(null);
    const endingRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // We animate the personal message fade in/out first
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
            }
        });

        // 1. Personal Message
        tl.fromTo(msgTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
            .to(msgTextRef.current, { opacity: 0, scale: 0.9, duration: 1 }, "+=0.5");

        // 2. Rising camera / ending reveals
        const staggers = endingRefs.current.filter(Boolean);
        staggers.forEach((el, index) => {
            tl.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "+=0.2")
                .to(el, { opacity: 0, y: -20, duration: 1 }, "+=0.5");
        });

        // Final stay for author signature
        const finalEl = staggers[staggers.length - 1];
        if (finalEl) {
            gsap.set(finalEl, { opacity: 0 }); // reset
            tl.fromTo(finalEl, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 2 }, "+=0.5");
        }

        return () => tl.kill();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-subtle-black overflow-hidden flex items-center justify-center">
            {/* Background Sunset Field */}
            <div
                className="absolute inset-0 bg-cover bg-bottom opacity-50 z-0 origin-bottom transition-transform duration-[10000ms] scale-110 hover:scale-100"
                style={{
                    backgroundImage: "url('/images/sunflower-sunset.jpg'), linear-gradient(to top, #451A03, #F59E0B)"
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-subtle-black via-subtle-black/80 to-transparent z-10" />

            {/* Floating particles effect container */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-sunflower/40 blur-sm animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-30 w-full max-w-4xl px-6 text-center space-y-24">

                {/* Personal Message */}
                <div ref={msgTextRef} className="absolute inset-0 flex items-center justify-center w-full px-6 opacity-0">
                    <p className="font-serif text-2xl md:text-4xl text-cream/90 leading-relaxed font-light italic">
                        "{CONFIG.PERSONAL_MESSAGE}"
                    </p>
                </div>

                {/* Ending sequence containers stacked at same pos */}
                <div className="absolute inset-0 flex items-center justify-center w-full px-6">
                    <div ref={el => endingRefs.current[0] = el} className="absolute opacity-0">
                        <h2 className="font-serif text-3xl md:text-5xl text-cream font-light text-shadow">
                            Quizás no pueda enviarte flores físicamente...
                        </h2>
                    </div>

                    <div ref={el => endingRefs.current[1] = el} className="absolute opacity-0">
                        <h2 className="font-serif text-3xl md:text-5xl text-cream font-light text-shadow">
                            ...pero quería construirte un jardín.
                        </h2>
                    </div>

                    <div ref={el => endingRefs.current[2] = el} className="absolute opacity-0">
                        <h1 className="font-serif text-6xl md:text-8xl text-sunflower font-medium text-shadow-xl drop-shadow-2xl">
                            🌻 Para ti, {CONFIG.HER_NAME}.
                        </h1>
                    </div>

                    <div ref={el => endingRefs.current[3] = el} className="absolute opacity-0 flex flex-col items-center gap-6">
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-golden-yellow to-transparent" />
                        <h3 className="font-sans text-xl md:text-2xl text-cream/70 font-light tracking-widest uppercase">
                            Con cariño,<br />
                            <span className="text-white font-medium block mt-2 text-2xl md:text-3xl normal-case font-serif">{CONFIG.MY_NAME}</span>
                        </h3>
                    </div>
                </div>

            </div>
        </section>
    );
}
