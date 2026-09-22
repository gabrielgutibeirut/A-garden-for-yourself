import React, { useRef, useState, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { CONFIG } from '../config';

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Attempt to set volume lower for subtlety
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // Handle potential autoplay blocking
                audioRef.current.play().catch(console.error);
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <audio
                ref={audioRef}
                src={CONFIG.BACKGROUND_MUSIC}
                loop
            />
            <button
                onClick={togglePlay}
                className="flex items-center gap-2 rounded-full border border-cream/20 bg-subtle-black/40 px-4 py-2 text-sm font-medium text-cream backdrop-blur-md transition-all hover:bg-subtle-black/60 hover:border-cream/40 overflow-hidden group"
            >
                <span className="relative z-10 flex items-center gap-2">
                    {isPlaying ? <Pause size={16} /> : <Music size={16} />}
                    <span>{isPlaying ? 'Pausa' : 'Música'}</span>
                </span>
                {/* Subtle glowing background effect */}
                {isPlaying && (
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-golden-yellow/20 to-transparent flex translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                )}
            </button>
        </div>
    );
}
