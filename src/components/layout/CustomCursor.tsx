import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', onHoverStart);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onHoverStart);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Outer ring */}
      <div
        className="fixed top-0 left-0 rounded-full border border-white/40 pointer-events-none transition-transform duration-150 ease-out"
        style={{
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
      />
      {/* Center dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none transition-opacity duration-100"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          opacity: isHovered ? 0.3 : 1,
        }}
      />
    </div>
  );
};
