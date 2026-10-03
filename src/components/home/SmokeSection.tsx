import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SmokeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Scroll reveal for the centered statement
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'center center',
            scrub: false,
          },
        }
      );
    }, containerRef);

    // Canvas smoke puffs & ember particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Ember particle class
    interface Ember {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const embers: Ember[] = [];
    const emberCount = 42;

    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.2 + 1,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: 0,
        maxOpacity: Math.random() * 0.6 + 0.3,
        color: Math.random() > 0.4 ? '#8E1734' : '#C21B42',
        life: Math.random() * 100,
        maxLife: Math.random() * 220 + 160,
      });
    }

    // Atmospheric smoke clouds
    interface SmokeCloud {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }

    const clouds: SmokeCloud[] = [
      { x: width * 0.2, y: height * 0.6, radius: 280, speedX: 0.08, speedY: -0.04, opacity: 0.18 },
      { x: width * 0.5, y: height * 0.5, radius: 360, speedX: -0.06, speedY: -0.05, opacity: 0.22 },
      { x: width * 0.8, y: height * 0.7, radius: 320, speedX: 0.05, speedY: -0.03, opacity: 0.16 },
      { x: width * 0.35, y: height * 0.3, radius: 260, speedX: -0.04, speedY: -0.02, opacity: 0.14 },
    ];

    const render = () => {
      ctx2d.clearRect(0, 0, width, height);

      // Render drifting smoke clouds
      for (const c of clouds) {
        c.x += c.speedX;
        c.y += c.speedY;

        if (c.x < -c.radius) c.x = width + c.radius;
        if (c.x > width + c.radius) c.x = -c.radius;
        if (c.y < -c.radius) c.y = height + c.radius;

        const grad = ctx2d.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.radius);
        grad.addColorStop(0, `rgba(45, 45, 45, ${c.opacity})`);
        grad.addColorStop(0.5, `rgba(30, 30, 30, ${c.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(5, 5, 5, 0)');

        ctx2d.fillStyle = grad;
        ctx2d.beginPath();
        ctx2d.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx2d.fill();
      }

      // Render glowing embers with cursor turbulence physics
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      for (const ember of embers) {
        // Distance to cursor
        const dx = ember.x - mx;
        const dy = ember.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const force = (1 - dist / 140) * 1.5;
          ember.vx += (dx / dist) * force;
          ember.vy += (dy / dist) * force;
        }

        // Dampen velocity
        ember.vx *= 0.94;
        ember.vy *= 0.94;

        ember.y += ember.speedY + ember.vy;
        ember.x += ember.speedX + ember.vx + Math.sin(ember.y * 0.02) * 0.2;
        ember.life++;

        // Fade in and out
        if (ember.life < ember.maxLife * 0.2) {
          ember.opacity = (ember.life / (ember.maxLife * 0.2)) * ember.maxOpacity;
        } else if (ember.life > ember.maxLife * 0.7) {
          ember.opacity = (1 - (ember.life - ember.maxLife * 0.7) / (ember.maxLife * 0.3)) * ember.maxOpacity;
        }

        if (ember.life >= ember.maxLife || ember.y < 0) {
          ember.x = Math.random() * width;
          ember.y = height + 10;
          ember.vx = 0;
          ember.vy = 0;
          ember.life = 0;
          ember.opacity = 0;
        }

        ctx2d.save();
        ctx2d.fillStyle = ember.color;
        ctx2d.shadowColor = ember.color;
        ctx2d.shadowBlur = 10;
        ctx2d.globalAlpha = Math.max(0, Math.min(1, ember.opacity));
        ctx2d.beginPath();
        ctx2d.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx2d.fill();
        ctx2d.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      ctx.revert();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      data-cursor-text="ALCHEMY"
      className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#050505] border-t border-b border-white/[0.08]"
      aria-label="Artisan Atmosphere"
    >
      {/* Background Macro Jewelry Video / Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="./assets/video/obsidia.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-[0.4] contrast-[1.2] scale-105"
        />
        <img
          src="./assets/images/smoke-craft.jpg"
          alt="Gothic oxidized silver ring in subterranean smoke and embers"
          className="w-full h-full object-cover brightness-[0.45] contrast-[1.15] scale-105 absolute inset-0 -z-10"
          loading="lazy"
        />
        {/* Soft dark vignette and circular focus matching Frame 00:15 */}
        <div className="absolute inset-0 bg-[#050505]/50" />
        <div className="absolute inset-0 vignette-radial" />
      </div>

      {/* Atmospheric Smoke & Ember Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Centered Statement */}
      <div
        ref={textRef}
        className="relative z-20 max-w-4xl mx-auto px-6 sm:px-12 text-center select-none py-16"
      >
        <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.35em] uppercase text-[#8E1734] font-mono mb-6">
          <span className="animate-spin" style={{ animationDuration: '8s' }}>✦</span>
          <span>THE ALCHEMY</span>
          <span className="animate-spin" style={{ animationDuration: '8s' }}>✦</span>
        </div>

        <blockquote className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F2EEE7] italic font-light leading-[1.18] tracking-tight">
          “Forged in smoke — <br className="hidden sm:inline" />
          <span className="text-[#C4C4C2]">no two vows alike.”</span>
        </blockquote>

        <p className="mt-6 text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8A8780] uppercase font-mono max-w-md mx-auto">
          Single-pour lost-wax alchemy · Hand-oxidized patinas
        </p>
      </div>
    </section>
  );
};
