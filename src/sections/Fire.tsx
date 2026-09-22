import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Fire() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: true,
            }
        });

        tl.fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
            .to(textRef.current, { opacity: 0, y: -30, duration: 1 });

        return () => tl.kill();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
            {/* Background dark fire / heat gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-warm-orange/10 via-black to-black" />

            {/* Fire particles simulation - simplified for CSS. In real production, this would be a Canvas noise shader */}
            {/* For now we'll put some glowing blurry orbs */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-warm-orange/20 to-transparent blur-3xl opacity-50" />
            <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-red-900/40 rounded-full blur-[100px] animate-[pulse_4s_infinite]" />
            <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-golden-yellow/20 rounded-full blur-[100px] animate-[pulse_5s_infinite_ease-out]" />

            <div ref={textRef} className="relative z-10 text-center px-6 max-w-3xl">
                <h2 className="font-serif text-3xl md:text-5xl text-cream font-light text-shadow-md leading-relaxed">
                    Hay recuerdos que mantienen encendida la distancia.
                </h2>
            </div>
        </section>
    );
}
