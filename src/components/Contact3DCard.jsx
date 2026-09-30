import { useRef, useState } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

export default function Contact3DCard({
  title,
  description,
  buttonText,
  url,
  brandSvg,
  ghostSvg,
  theme,
  className = '',
  isHero = false,
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * (isHero ? -5 : -7);
    const rotateY = ((x - centerX) / centerX) * (isHero ? 5 : 7);
    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px) scale3d(1.01, 1.01, 1.01)`
    );
    setGlare({ opacity: 0.22, x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)');
    setGlare({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`contact-3d-card group relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      style={{
        transform,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.2s ease'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease',
        background: theme.gradient,
        boxShadow: isHovered ? theme.boxShadowHover : theme.boxShadow,
        minHeight: isHero ? 140 : 160,
      }}
    >
      {/* Specular glare — follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
        }}
      />

      {/* Ghost watermark logo — large, faint, right-side */}
      {ghostSvg && (
        <div
          className="pointer-events-none absolute z-0 select-none"
          style={{
            right: isHero ? '60px' : '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.08,
            width: isHero ? 200 : 160,
            height: isHero ? 200 : 160,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          dangerouslySetInnerHTML={{ __html: ghostSvg }}
        />
      )}

      {/* Content row */}
      <div
        className="relative z-10 flex items-center justify-between gap-4 h-full"
        style={{
          padding: isHero ? '28px 32px' : '24px 28px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Left: text + button */}
        <div
          className="flex-1 min-w-0"
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
        >
          <h3
            className="font-bold text-white leading-snug"
            style={{ fontSize: isHero ? '1.35rem' : '1.1rem' }}
          >
            {title}
          </h3>
          <p
            className="text-white/75 leading-relaxed mt-1.5"
            style={{ fontSize: isHero ? '0.9rem' : '0.82rem' }}
          >
            {description}
          </p>

          {/* CTA Button — only this element navigates */}
          <div className="mt-5" style={{ transform: 'translateZ(10px)' }}>
            <a
              href={url}
              target={url.startsWith('mailto:') ? undefined : '_blank'}
              rel={url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              onClick={(e) => e.stopPropagation()}
              className="contact-3d-btn inline-flex items-center gap-1.5 font-semibold rounded-xl transition-all duration-200"
              style={{
                padding: isHero ? '8px 18px' : '7px 15px',
                fontSize: isHero ? '0.85rem' : '0.8rem',
                background: 'rgba(255,255,255,0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.36)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                textDecoration: 'none',
              }}
            >
              <span>{buttonText}</span>
              <RiArrowRightUpLine
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Right: brand badge (3D floating) */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            transform: isHovered
              ? 'translateZ(50px) scale(1.1)'
              : 'translateZ(28px) scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="relative flex items-center justify-center rounded-2xl overflow-hidden"
            style={{
              width: isHero ? 80 : 66,
              height: isHero ? 80 : 66,
              background: theme.badgeBg,
              border: '1.5px solid rgba(255,255,255,0.30)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.45), inset 0 1.5px 1px rgba(255,255,255,0.45)',
            }}
          >
            {/* top gloss edge */}
            <div className="absolute inset-x-2 top-0 h-[1.5px] bg-white/40 rounded-t-full pointer-events-none" />
            {/* brand SVG icon */}
            {brandSvg && (
              <div
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: isHero ? 46 : 38,
                  height: isHero ? 46 : 38,
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                }}
                dangerouslySetInnerHTML={{ __html: brandSvg }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
