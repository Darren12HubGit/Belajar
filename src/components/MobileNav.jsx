import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  RiHome4Line, RiHome4Fill,
  RiUserLine, RiUserFill,
  RiTrophyLine, RiTrophyFill,
  RiFolderLine, RiFolderFill,
  RiContactsLine, RiContactsFill,
  RiLinksLine, RiLinksFill,
  RiMenuLine, RiCloseLine,
  RiSunLine, RiMoonLine,
} from 'react-icons/ri';
import { useAppContext } from '../context/AppContext';

const navLinks = [
  { to: '/',            label: { en: 'Home',         id: 'Beranda'    }, icon: RiHome4Line,    activeIcon: RiHome4Fill    },
  { to: '/about',       label: { en: 'About',        id: 'Tentang'    }, icon: RiUserLine,     activeIcon: RiUserFill     },
  { to: '/achievements',label: { en: 'Achievements', id: 'Pencapaian' }, icon: RiTrophyLine,   activeIcon: RiTrophyFill   },
  { to: '/projects',    label: { en: 'Projects',     id: 'Proyek'     }, icon: RiFolderLine,   activeIcon: RiFolderFill   },
  { to: '/contact',     label: { en: 'Contact',      id: 'Kontak'     }, icon: RiContactsLine, activeIcon: RiContactsFill },
  { to: '/links',       label: { en: 'Links',        id: 'Tautan'     }, icon: RiLinksLine,    activeIcon: RiLinksFill    },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, lang, toggleTheme, toggleLang } = useAppContext();

  const HEADER_HEIGHT = 57; // px — keep in sync with header padding below

  return (
    <>
      {/* ── Sticky top bar ── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between backdrop-blur-md"
        style={{
          height: `${HEADER_HEIGHT}px`,
          padding: '0 20px',
          background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Left: avatar + name */}
        <div className="flex items-center gap-2.5">
          <img
            src="/darren.jpg"
            alt="Darren"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            style={{ border: '1.5px solid var(--border-hover)' }}
          />
          <span
            className="font-semibold"
            style={{ color: 'var(--text-primary)', fontSize: '14px' }}
          >
            Darren
          </span>
        </div>

        {/* Right: theme quick toggle + hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              width: 36,
              height: 36,
              background: 'var(--toggle-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <RiSunLine size={17} /> : <RiMoonLine size={16} />}
          </button>

          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              width: 36,
              height: 36,
              background: 'var(--toggle-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <RiCloseLine size={19} /> : <RiMenuLine size={19} />}
          </button>
        </div>
      </header>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          style={{
            top: HEADER_HEIGHT,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(3px)',
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Slide-down drawer ── */}
      <div
        className="fixed left-0 right-0 z-30"
        style={{
          top: HEADER_HEIGHT,
          padding: '8px 12px 0',
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
          }}
        >
          {/* Nav links */}
          <nav className="flex flex-col p-3" style={{ gap: '3px' }}>
            {navLinks.map(({ to, label, icon: Icon, activeIcon: ActiveIcon }) => {
              const isActive = to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(to);
              const I = isActive ? ActiveIcon : Icon;
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 rounded-xl font-medium transition-all duration-150"
                  style={{
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    fontSize: '13.5px',
                    background: isActive ? 'var(--toggle-active-bg)' : 'transparent',
                    color:      isActive ? 'var(--text-primary)'     : 'var(--text-secondary)',
                  }}
                >
                  <I size={18} style={{ color: isActive ? 'var(--accent)' : 'inherit' }} />
                  {label[lang]}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer controls: language switcher */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              {lang === 'en' ? 'Language' : 'Bahasa'}
            </span>

            {/* Language pill toggle */}
            <div
              className="flex items-center rounded-full"
              style={{
                gap: '2px',
                padding: '3px',
                background: 'var(--toggle-bg)',
                border: '1px solid var(--border)',
              }}
            >
              {['en', 'id'].map(l => (
                <button
                  key={l}
                  onClick={() => toggleLang(l)}
                  className="rounded-full uppercase font-semibold transition-all duration-200"
                  style={{
                    height: 30,
                    padding: '0 12px',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    background: lang === l ? 'var(--toggle-active-bg)' : 'transparent',
                    color:      lang === l ? 'var(--text-primary)'     : 'var(--text-muted)',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
