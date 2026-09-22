import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Opening } from './sections/Opening';
import { SunflowerField } from './sections/SunflowerField';
import { InteractiveFlowers } from './sections/InteractiveFlowers';
import { Memories } from './sections/Memories';
import { Fire } from './sections/Fire';
import { GiantSunflower } from './sections/GiantSunflower';
import { HerMemories } from './sections/HerMemories';
import { FinalScene } from './sections/FinalScene';
import { AudioPlayer } from './components/AudioPlayer';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simple load delay for cinematic start
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
    }, []);

    if (!isLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-subtle-black">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-deep-brown">
                    <div className="h-full w-full origin-left bg-golden-yellow animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full bg-subtle-black">
            <AudioPlayer />
            <Opening />
            <SunflowerField />
            <InteractiveFlowers />
            <Memories />
            <Fire />
            <GiantSunflower />
            <HerMemories />
            <FinalScene />
        </div>
    );
}

export default App;
