'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current && glowRef.current) {
                // Direct DOM manipulation for buttery smooth performance (skips React cycles)
                const x = e.clientX;
                const y = e.clientY;

                cursorRef.current.style.transform = `translate3d(${x - (isHovering ? 30 : 10)}px, ${y - (isHovering ? 30 : 10)}px, 0)`;
                glowRef.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.card') ||
                target.classList.contains('btn')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isHovering]);

    return (
        <>
            {/* Ambient Glow - Optimized with will-change and translate3d */}
            <div
                ref={glowRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(110, 56, 255, 0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    willChange: 'transform',
                }}
            />

            {/* Reactive Cursor - Optimized */}
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: isHovering ? '60px' : '20px',
                    height: isHovering ? '60px' : '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(255, 255, 255, 0.5)', // Increased border for visibility without blend mode
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    willChange: 'transform',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'width 0.3s cubic-bezier(0.2, 1, 0.3, 1), height 0.3s cubic-bezier(0.2, 1, 0.3, 1), background-color 0.3s ease',

                }}
            >
                <div style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    opacity: isHovering ? 0 : 1,
                    transition: 'opacity 0.2s',
                }} />
            </div>
        </>
    );
}
