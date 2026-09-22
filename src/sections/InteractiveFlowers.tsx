import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import gsap from 'gsap';

const MESSAGES = [
    "Para alegrarte el día.",
    "Para recordarte que alguien piensa en ti.",
    "Una flor más, porque una nunca es suficiente.",
    "Un poquito de luz para tu pantalla.",
    "Amarillo, del color de tu energía."
];

export function InteractiveFlowers() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);

    const handleBloom = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const flower = e.currentTarget;

        // Animate bloom
        gsap.to(flower, {
            scale: 1.2,
            rotation: "+=15",
            ease: "elastic.out(1, 0.3)",
            duration: 1.5
        });

        // Petals effect (simplified DOM approach)
        for (let i = 0; i < 5; i++) {
            const petal = document.createElement('div');
            petal.className = "absolute w-4 h-8 bg-sunflower rounded-full pointer-events-none opacity-80 blur-[1px]";
            petal.style.top = `${e.clientY}px`;
            petal.style.left = `${e.clientX}px`;
            document.body.appendChild(petal);

            gsap.to(petal, {
                y: -100 - Math.random() * 100,
                x: (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                opacity: 0,
                duration: 1 + Math.random(),
                onComplete: () => petal.remove()
            });
        }

        setActiveMessage(MESSAGES[index % MESSAGES.length]);

        setTimeout(() => {
            setActiveMessage(null);
        }, 4000);
    };

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-subtle-black overflow-hidden py-24">
            {/* Background with warm glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-subtle-black via-[#2a1705] to-subtle-black" />

            <div className="relative z-10 container mx-auto px-6 max-w-5xl">
                <h3 className="font-serif text-2xl md:text-4xl text-cream/70 text-center mb-16 font-light">
                    Toca una flor...
                </h3>

                <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center min-h-[40vh]">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="relative cursor-pointer group"
                            onClick={(e) => handleBloom(e, i)}
                        >
                            {/* Glowing Aura */}
                            <div className="absolute inset-0 bg-golden-yellow/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Fake "Flower" shape - a stylized radial burst since we don't have models */}
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-sunflower rounded-full shadow-[0_0_30px_rgba(250,204,21,0.3)] flex items-center justify-center transition-transform hover:scale-105 duration-300">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-deep-brown rounded-full opacity-90" />
                                {/* Decorative petals inside */}
                                <div className="absolute inset-[-10px] border-4 border-dashed border-golden-yellow rounded-full animate-[spin_20s_linear_infinite]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating elegant message */}
            <div className={clsx(
                "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-1000",
                activeMessage ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
            )}>
                <div className="bg-subtle-black/80 backdrop-blur-md border border-golden-yellow/30 px-8 py-6 rounded-2xl shadow-2xl">
                    <p className="font-serif text-2xl text-sunflower drop-shadow-md whitespace-nowrap text-center">
                        {activeMessage}
                    </p>
                </div>
            </div>
        </section>
    );
}
