import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VolumeX, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLDivElement>(null);
  const headingLine2Ref = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse parallax state
  const mousePos = useRef({ x: 0, y: 0 });

  // Generative subtle ambient audio
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Create gentle atmospheric drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNodeRef.current = gain;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      setIsPlayingAudio(true);
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
        setIsPlayingAudio(true);
      } else if (audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
        setIsPlayingAudio(false);
      }
    }
  };

  useEffect(() => {
    // Hand Video Animation: plays once on entry and stops at the final iconic hand pose
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        // Stop cleanly at the end of the gesture (approx 2.95s - 3.0s)
        if (video.currentTime >= 2.95) {
          video.pause();
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.play().catch(() => {});

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse parallax listener on desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      mousePos.current = { x: normX, y: normY };

      if (handWrapperRef.current) {
        gsap.to(handWrapperRef.current, {
          x: -normX * 18,
          y: -normY * 14,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [handWrapperRef.current, eyebrowRef.current, headingLine1Ref.current, headingLine2Ref.current, bottomBarRef.current, scrollRef.current],
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state
      gsap.set(handWrapperRef.current, { scale: 1.12, opacity: 0 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });
      gsap.set([headingLine1Ref.current, headingLine2Ref.current], { opacity: 0, y: 35, filter: 'blur(6px)' });
      gsap.set(bottomBarRef.current, { opacity: 0, y: 20 });
      gsap.set(scrollRef.current, { opacity: 0 });

      // Cinematic entrance timeline
      tl.to(handWrapperRef.current, {
        opacity: 1,
        scale: 1.05,
        duration: 2.2,
        ease: 'power2.out',
      })
      .to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
      }, '-=1.5')
      .to([headingLine1Ref.current, headingLine2Ref.current], {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.16,
        ease: 'expo.out',
      }, '-=1.0')
      .to(bottomBarRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
      }, '-=0.6')
      .to(scrollRef.current, {
        opacity: 1,
        duration: 1.0,
      }, '-=0.4');

      // Scroll-driven hand animation: zooms and travels down as you scroll through hero
      if (handWrapperRef.current) {
        gsap.to(handWrapperRef.current, {
          yPercent: 18,
          scale: 1.22,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const scrollToCollection = () => {
    const target = document.getElementById('collection-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] max-h-[1400px] overflow-hidden bg-[#050505] flex items-end select-none"
      aria-label="Hero Introduction"
    >
      {/* Background Cinematic Hand Motion (Active Video & Fallback Image) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={handWrapperRef}
          className="w-[110%] h-[110%] -left-[5%] -top-[5%] relative transition-transform will-change-transform"
        >
          {/* Active Hand Motion Video matching 00:00 to 00:03 of reference */}
          <video
            ref={videoRef}
            src="./assets/video/obsidia.webm"
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover object-[center_35%] md:object-center brightness-[0.88] contrast-[1.08]"
          />

          {/* Static Fallback Poster behind video */}
          <img
            src="./assets/images/hero-hand.jpg"
            alt="Hand with black nails wearing oxidized gothic silver and garnet rings"
            className="w-full h-full object-cover object-[center_35%] md:object-center brightness-[0.88] contrast-[1.08] absolute inset-0 -z-10"
            loading="eager"
          />
        </div>

        {/* Ambient Pulsing Burgundy Aura Orb */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8E1734]/15 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />

        {/* Overlays matching reference mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-[#050505]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 vignette-radial pointer-events-none opacity-60" />
      </div>

      {/* Floating Bottom-Left Audio Control with animated waveform equalizer */}
      <div className="absolute left-6 sm:left-10 md:left-16 bottom-8 z-30 flex items-center space-x-3">
        <button
          onClick={toggleAudio}
          className="group w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#8A8780] hover:text-[#F2EEE7] hover:border-[#8E1734] transition-all duration-300 focus:outline-none"
          aria-label={isPlayingAudio ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
          title="Toggle ambient atmosphere"
          data-cursor-text={isPlayingAudio ? 'MUTE' : 'SOUND'}
        >
          {isPlayingAudio ? (
            <div className="flex items-end space-x-0.5 h-3">
              <span className="w-0.5 bg-[#8E1734] h-full animate-[bounce_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-[#A31838] h-2/3 animate-[bounce_1.1s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 bg-[#8E1734] h-4/5 animate-[bounce_0.9s_ease-in-out_infinite_0.4s]" />
            </div>
          ) : (
            <VolumeX size={13} className="group-hover:scale-110 transition-transform" />
          )}
        </button>

        <span className="text-[9px] tracking-[0.25em] font-mono text-[#52504D] uppercase hidden sm:inline-block">
          {isPlayingAudio ? 'ATMOSPHERE: ACTIVE' : 'ATMOSPHERE: MUTED'}
        </span>
      </div>

      {/* Hero Typography & Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 pb-20 sm:pb-24 md:pb-28">
        <div className="max-w-3xl">
          
          {/* Eyebrow with elegant dashes matching frame 00:00 */}
          <div
            ref={eyebrowRef}
            className="flex items-center space-x-2 mb-4 sm:mb-6 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#8A8780] font-mono"
          >
            <span>—</span>
            <span>AUTUMN / WINTER</span>
            <span>—</span>
            <span>VOL. I</span>
            <span>—</span>
          </div>

          {/* Heading: Worn Like / a Vow with luxury shimmer */}
          <h1 className="font-editorial text-[#F2EEE7] font-light leading-[0.92] tracking-[-0.02em] mb-8">
            <div ref={headingLine1Ref} className="overflow-hidden">
              <span className="block text-[clamp(54px,8.4vw,130px)] hover:text-white transition-colors duration-500">
                Worn Like
              </span>
            </div>
            <div ref={headingLine2Ref} className="overflow-hidden">
              <span className="block text-[clamp(54px,8.4vw,130px)]">
                <span className="text-[#8E1734] italic font-serif-luxury font-normal transition-all duration-500 hover:text-[#A31838] hover:drop-shadow-[0_0_20px_rgba(142,23,52,0.5)]">a</span> Vow
              </span>
            </div>
          </h1>

          {/* Bottom Row: CTA Button + Stacked 2-line Description */}
          <div
            ref={bottomBarRef}
            className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
          >
            {/* Minimal Pill CTA with interactive magnetic hover */}
            <button
              onClick={scrollToCollection}
              className="group inline-flex items-center space-x-3 px-7 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-[11px] uppercase tracking-[0.25em] text-[#F2EEE7] transition-all duration-300 hover:border-[#8E1734] hover:bg-black/70 hover:shadow-[0_0_20px_rgba(142,23,52,0.25)] focus:outline-none w-max"
              data-cursor-text="EXPLORE"
            >
              <span>DISCOVER</span>
              <ArrowRight size={12} className="text-[#8E1734] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Stacked Description */}
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8A8780] font-sans leading-relaxed">
              <p className="text-[#C4C4C2]">HANDMADE GOTHIC FINE JEWELRY.</p>
              <p className="text-[#8A8780]">OXIDIZED SILVER · GARNET · BLACKENED STONE.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Right Scroll Indicator matching frame 00:00 */}
      <div
        ref={scrollRef}
        onClick={scrollToCollection}
        className="absolute right-6 sm:right-10 md:right-16 bottom-16 sm:bottom-20 z-10 flex flex-col items-center space-y-3 cursor-pointer group select-none opacity-80 hover:opacity-100 transition-opacity"
        role="button"
        aria-label="Scroll to collection"
        data-cursor-text="DOWN"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#8A8780] font-mono group-hover:text-[#F2EEE7] transition-colors">
          SCROLL
        </span>
        <div className="w-[1px] h-10 bg-white/15 relative overflow-hidden">
          <div className="w-full h-1/2 bg-[#8E1734] animate-[translateY_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
