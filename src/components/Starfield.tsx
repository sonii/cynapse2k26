import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

interface StarfieldProps {
  starCount?: number;
  speed?: number;
  className?: string;
}

const Starfield = ({ starCount = 150, speed = 0.2, className = '' }: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      const dpr = 1; // Use 1x for performance
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    setCanvasSize();

    // Initialize stars
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * 1000,
      size: Math.random() * 1.5 + 0.5,
    }));

    const handleResize = () => {
      setCanvasSize();
      starsRef.current.forEach(star => {
        star.x = Math.random() * width - width / 2;
        star.y = Math.random() * height - height / 2;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      starsRef.current.forEach(star => {
        star.z -= speed;

        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = 1000;
        }

        const scale = 500 / star.z;
        const x = star.x * scale + centerX;
        const y = star.y * scale + centerY;

        if (x < 0 || x > width || y < 0 || y > height) return;

        const brightness = Math.min(1, (1000 - star.z) / 500);
        const size = Math.max(1, star.size * scale * 0.5);

        // Simple circle - no gradient for performance
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(175, 227, 215, ${brightness})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default Starfield;