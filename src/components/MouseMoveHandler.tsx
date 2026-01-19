'use client';
import { useEffect, useState } from 'react';

export default function MouseMoveHandler() {
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollWidth(scrolled);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const moveHandler = (e: MouseEvent) => {
            // Update Cursor Position
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Update Global Mouse Variables for Spotlight Effect
            // We use clientX/Y but cards will use their own relative calculation if we do it right,
            // or we can just update cards individually. Let's do a global approach for performance.
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };

        window.addEventListener('mousemove', moveHandler, { passive: true });
        return () => {
            window.removeEventListener('mousemove', moveHandler);
            document.body.removeChild(cursor);
        };
    }, []);

    return (
        <>
            <div className="scroll-progress" style={{ width: `${scrollWidth}%` }} />
            <style jsx global>{`
                .custom-cursor {
                    width: 24px;
                    height: 24px;
                    background: var(--primary);
                    border-radius: 50%;
                    position: fixed;
                    pointer-events: none;
                    z-index: 10001;
                    mix-blend-mode: difference;
                    transition: transform 0.15s cubic-bezier(0.23, 1, 0.32, 1);
                    transform: translate(-50%, -50%);
                    opacity: 0.15;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                
                /* Magnetic Buttons & Links */
                a:hover ~ .custom-cursor,
                button:hover ~ .custom-cursor {
                    transform: translate(-50%, -50%) scale(2.5);
                    background: white;
                    opacity: 0.1;
                }
            `}</style>
        </>
    );
}
