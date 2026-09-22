import React, { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { CONFIG } from '../config';

export function Memories() {
    const [activeMedia, setActiveMedia] = useState<{ type: 'img' | 'video', src: string } | null>(null);

    return (
        <section className="relative min-h-screen w-full bg-[#110d0a] overflow-hidden py-32 px-6">
            <div className="text-center mb-24 relative z-20">
                <h2 className="font-serif text-3xl md:text-5xl text-cream font-light">
                    Y también quería guardar aquí <br className="hidden md:block" />
                    <span className="text-golden-yellow">algunos recuerdos.</span>
                </h2>
            </div>

            {/* Floating gallery container - in real implementation this could use R3F or fancy mouse-pan math. For now static elegant grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {CONFIG.PHOTOS.map((src, i) => (
                    <div
                        key={i}
                        className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-md shadow-2xl transition-transform duration-700 hover:scale-105 hover:z-30 hover:shadow-golden-yellow/20"
                        onClick={() => setActiveMedia({ type: 'img', src })}
                    >
                        <div className="absolute inset-0 bg-subtle-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img
                            src={src}
                            alt="Memory"
                            className="absolute w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            onError={(e) => {
                                // Fallback style if user has no photos yet
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.style.background = '#2c1e16';
                                e.currentTarget.parentElement!.innerHTML = `<div class="absolute inset-0 flex items-center justify-center text-cream/30 z-20 font-sans text-sm">PHOTO_0${i + 1}</div>`;
                            }}
                        />
                    </div>
                ))}

                {/* Video Placeholders */}
                {CONFIG.VIDEOS.map((src, i) => (
                    <div
                        key={`vid-${i}`}
                        className="group relative aspect-video md:aspect-[3/4] cursor-pointer overflow-hidden rounded-md shadow-2xl transition-transform duration-700 hover:scale-105 hover:z-30 hover:shadow-golden-yellow/20 md:col-span-2 lg:col-span-2"
                        onClick={() => setActiveMedia({ type: 'video', src })}
                    >
                        <div className="absolute inset-0 flex items-center justify-center bg-subtle-black/60 group-hover:bg-subtle-black/20 transition-colors duration-500 z-10">
                            <div className="w-16 h-16 rounded-full border-2 border-cream/50 flex items-center justify-center text-cream/80 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                ▶
                            </div>
                        </div>
                        <video
                            src={src}
                            className="absolute w-full h-full object-cover opacity-50 transition-opacity duration-1000 group-hover:opacity-100"
                            muted
                            loop
                            playsInline
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {activeMedia && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-500 cursor-pointer p-4"
                    onClick={() => setActiveMedia(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full border border-white/10 rounded-sm overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        {activeMedia.type === 'img' ? (
                            <img src={activeMedia.src} className="w-full h-full object-contain" alt="Enlarged memory" />
                        ) : (
                            <video src={activeMedia.src} className="w-full h-full object-contain" controls autoPlay playsInline />
                        )}
                        <button
                            className="absolute top-4 right-4 text-white/50 hover:text-white z-50 text-3xl font-light"
                            onClick={() => setActiveMedia(null)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
