'use client';
import { useEffect, useRef } from 'react';

export default function GeminiBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Blob configuration
        const blobs = [
            { x: 0.3, y: 0.3, radius: 0.25, color: 'rgba(255, 77, 0, 0.15)', speed: 0.0003, phase: 0 },
            { x: 0.7, y: 0.4, radius: 0.3, color: 'rgba(110, 56, 255, 0.2)', speed: 0.0004, phase: 2 },
            { x: 0.5, y: 0.7, radius: 0.28, color: 'rgba(0, 26, 255, 0.12)', speed: 0.00035, phase: 4 },
            { x: 0.2, y: 0.6, radius: 0.22, color: 'rgba(255, 77, 0, 0.1)', speed: 0.00045, phase: 1 },
            { x: 0.8, y: 0.8, radius: 0.2, color: 'rgba(110, 56, 255, 0.15)', speed: 0.0005, phase: 3 },
        ];

        const drawBlob = (blob: typeof blobs[0], t: number) => {
            const { width, height } = canvas;
            const centerX = width * (blob.x + Math.sin(t * blob.speed * 1000 + blob.phase) * 0.1);
            const centerY = height * (blob.y + Math.cos(t * blob.speed * 800 + blob.phase) * 0.08);
            const radius = Math.min(width, height) * blob.radius;

            // Create organic blob shape using bezier curves
            ctx.beginPath();
            const points = 8;
            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const wobble = 1 + Math.sin(t * 0.001 + angle * 3 + blob.phase) * 0.15;
                const r = radius * wobble;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    const prevAngle = ((i - 1) / points) * Math.PI * 2;
                    const prevWobble = 1 + Math.sin(t * 0.001 + prevAngle * 3 + blob.phase) * 0.15;
                    const prevR = radius * prevWobble;
                    const cpX = centerX + Math.cos(prevAngle + 0.3) * prevR * 1.2;
                    const cpY = centerY + Math.sin(prevAngle + 0.3) * prevR * 1.2;
                    ctx.quadraticCurveTo(cpX, cpY, x, y);
                }
            }
            ctx.closePath();

            // Gradient fill
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
            gradient.addColorStop(0, blob.color);
            gradient.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, '0.05)'));
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        };

        const drawParticles = (t: number) => {
            const { width, height } = canvas;
            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {
                const x = (Math.sin(t * 0.0002 + i * 0.5) * 0.5 + 0.5) * width;
                const y = ((t * 0.00005 + i * 0.1) % 1) * height;
                const size = 1 + Math.sin(i) * 0.5;
                const alpha = 0.1 + Math.sin(t * 0.001 + i) * 0.05;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(110, 56, 255, ${alpha})`;
                ctx.fill();
            }
        };

        const drawConnections = (t: number) => {
            const { width, height } = canvas;

            // Draw flowing lines
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(110, 56, 255, ${0.02 + i * 0.01})`;
                ctx.lineWidth = 1;

                const startX = 0;
                const startY = height * (0.2 + i * 0.15);
                ctx.moveTo(startX, startY);

                for (let x = 0; x <= width; x += 50) {
                    const wave = Math.sin(x * 0.005 + t * 0.001 + i) * 30;
                    const wave2 = Math.cos(x * 0.003 + t * 0.0008) * 20;
                    ctx.lineTo(x, startY + wave + wave2);
                }

                ctx.stroke();
            }
        };

        const animate = () => {
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw flowing connections
            drawConnections(time);

            // Draw blobs with blur effect
            ctx.filter = 'blur(60px)';
            blobs.forEach(blob => drawBlob(blob, time));
            ctx.filter = 'none';

            // Draw particles
            drawParticles(time);

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: 0.7
                }}
            />
            <style jsx>{`
                canvas {
                    background: transparent;
                }
            `}</style>
        </>
    );
}
