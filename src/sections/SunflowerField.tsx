import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SunflowerField() {
    const containerRef = useRef<HTMLElement>(null);
    const layer1Ref = useRef<HTMLDivElement>(null);
    const layer2Ref = useRef<HTMLDivElement>(null);
    const layer3Ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=2000",
                scrub: 1,
                pin: true,
            }
        });

        // Parallax zoom effect for cinematic "moving forward"
        tl.to(layer1Ref.current, { scale: 1.5, opacity: 0, duration: 1 }, 0)
            .to(layer2Ref.current, { scale: 1.25, opacity: 0.2, duration: 1 }, 0)
            .to(layer3Ref.current, { scale: 1.1, duration: 1 }, 0)
            .fromTo(textRef.current, { opacity: 0, scale: 0.9, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 }, 0.5)
            .to(textRef.current, { opacity: 0, y: -50, duration: 0.5 }, 0.8);

        return () => tl.kill();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-subtle-black">
            {/* Background Layers for Parallax */}
            <div
                ref={layer3Ref}
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: "url('/images/sunflower-far.jpg'), radial-gradient(ellipse at bottom, #F59E0B 0%, #451A03 100%)"
                }}
            />
            <div
                ref={layer2Ref}
                className="absolute inset-0 bg-cover bg-center z-10 pointer-events-none"
                style={{ backgroundImage: "url('/images/sunflower-mid.png')" }}
            >
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-sunflower/20 to-transparent" />
            </div>
            <div
                ref={layer1Ref}
                className="absolute inset-0 bg-cover bg-center z-20 pointer-events-none"
                style={{ backgroundImage: "url('/images/sunflower-near.png')" }}
            >
                <div className="absolute bottom-[-10%] w-full h-[60%] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-600/40 via-transparent to-transparent pointer-events-none blur-3xl opacity-50" />
            </div>

            <div className="absolute inset-0 z-30 bg-gradient-to-t from-subtle-black via-transparent to-transparent opacity-80" />

            {/* Center Text */}
            <div className="absolute inset-0 z-40 flex items-center justify-center p-6 text-center">
                <h2 ref={textRef} className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream font-light drop-shadow-lg leading-relaxed max-w-4xl">
                    Si pudiera estar ahí contigo,<br />
                    <span className="text-sunflower">te llevaría flores amarillas.</span>
                </h2>
            </div>
        </section>
    );
}
