import { NavLink, useLocation } from 'react-router-dom';
import {
  RiHome4Line, RiHome4Fill,
  RiUserLine, RiUserFill,
  RiCodeBoxLine, RiCodeBoxFill,
  RiTrophyLine, RiTrophyFill,
  RiFolderLine, RiFolderFill,
  RiContactsLine, RiContactsFill,
  RiLinksLine, RiLinksFill,
  RiSunLine, RiMoonLine,
  RiLayoutLine,
} from 'react-icons/ri';
import { useAppContext } from '../context/AppContext';

const navLinks = [
  { to: '/',             label: { en: 'Home',         id: 'Beranda'    }, icon: RiHome4Line,    activeIcon: RiHome4Fill    },
  { to: '/about',        label: { en: 'About',        id: 'Tentang'    }, icon: RiUserLine,     activeIcon: RiUserFill     },
  { to: '/creations',    label: { en: 'Creations',    id: 'Kreasi'     }, icon: RiCodeBoxLine,  activeIcon: RiCodeBoxFill  },
  { to: '/achievements', label: { en: 'Achievements', id: 'Pencapaian' }, icon: RiTrophyLine,   activeIcon: RiTrophyFill   },
  { to: '/projects',     label: { en: 'Projects',     id: 'Proyek'     }, icon: RiFolderLine,   activeIcon: RiFolderFill   },
  { to: '/contact',      label: { en: 'Contact',      id: 'Kontak'     }, icon: RiContactsLine, activeIcon: RiContactsFill },
  { to: '/links',        label: { en: 'Links',        id: 'Tautan'     }, icon: RiLinksLine,    activeIcon: RiLinksFill    },
];

export default function Sidebar() {
  const location = useLocation();
  const { theme, lang, toggleTheme, toggleLang } = useAppContext();

  /* ── reusable pill wrapper ── */
  const pillStyle = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 99,
    padding: '4px',
    gap: 2,
    background: 'var(--toggle-bg)',
    border: '1px solid var(--border)',
  };

  const ctrlBtn = (active, onClick, children, title, extraPad) => (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 99,
        height: 34,
        minWidth: 34,
        padding: extraPad ? '0 12px' : '0',
        border: 'none',
        cursor: 'pointer',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.05em',
        transition: 'all 0.2s',
        background: active ? 'var(--ctrl-active-bg)' : 'transparent',
        color: active ? 'var(--ctrl-active-color)' : 'var(--text-muted)',
      }}
    >
      {children}
    </button>
  );

  return (
    <aside
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--sidebar-bg)',
        userSelect: 'none',
        width: '100%',
      }}
    >
      {/* ═══ PROFILE BLOCK ═══ */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 24px 24px',
          gap: 0,
        }}
      >
        {/* Avatar */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <img
            src="/puki.jpg"
            alt="Darren"
            style={{
              width: 108,
              height: 108,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2.5px solid var(--border-hover)',
              display: 'block',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              width: 13,
              height: 13,
              borderRadius: '50%',
              background: '#10b981',
              border: '2px solid var(--sidebar-bg)',
            }}
          />
        </div>

        {/* Name + verified */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.015em',
            }}
          >
            Darren Raisya
          </span>
          <svg viewBox="0 0 24 24" width="17" height="17" fill="#60a5fa" style={{ flexShrink: 0 }}>
            <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
          </svg>
        </div>

        {/* Status badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '6px 16px',
            borderRadius: 99,
            background: '#212500ff',
            border: '1px solid #ffee00ff',
            marginBottom: 20,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#fbbf24',
              flexShrink: 0,
              boxShadow: '0 0 6px #fbbf2488',
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#fde68a',
              letterSpacing: '0.02em',
            }}
          >
            {lang === 'en' ? 'Building Cool Stuff' : 'Sedang Berkarya'}
          </span>
        </div>

        {/* ── Controls: 3 separate pill groups ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {/* Group 1: Language */}
          <div style={pillStyle}>
            {ctrlBtn(lang === 'en', () => toggleLang('en'), 'EN', 'English', true)}
            {ctrlBtn(lang === 'id', () => toggleLang('id'), 'ID', 'Indonesian', true)}
          </div>

          {/* Group 2: Theme */}
          <div style={pillStyle}>
            {ctrlBtn(theme === 'light', () => toggleTheme('light'), <RiSunLine size={15}/>, 'Light mode')}
            {ctrlBtn(theme === 'dark',  () => toggleTheme('dark'),  <RiMoonLine size={14}/>, 'Dark mode')}
          </div>

          {/* Group 3: Layout (decorative, matches reference) */}
          <div style={pillStyle}>
            {ctrlBtn(false, () => {}, <RiLayoutLine size={14}/>, 'Layout')}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ padding: '0 20px', marginBottom: 8 }}>
        <div style={{ height: 1, background: 'var(--border)' }} />
      </div>

      {/* ═══ NAVIGATION ═══ */}
      <nav
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 12px',
          gap: 2,
        }}
      >
        {navLinks.map(({ to, label, icon: Icon, activeIcon: ActiveIcon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 14px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.15s ease, color 0.15s ease, transform 0.15s ease',
              background: isActive ? 'var(--toggle-active-bg)' : 'transparent',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
            })}
            className="group"
          >
            {({ isActive }) => {
              const I = isActive ? ActiveIcon : Icon;
              return (
                <>
                  <I
                    size={18}
                    style={{
                      flexShrink: 0,
                      color: isActive ? 'var(--accent)' : 'inherit',
                    }}
                  />
                  <span style={{ flex: 1, lineHeight: 1 }}>{label[lang]}</span>
                  {isActive && (
                    <svg
                      width="14" height="14"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      style={{ opacity: 0.4, flexShrink: 0 }}
                    >
                      <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                  )}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>

      {/* ── Divider ── */}
      <div style={{ padding: '0 20px', marginTop: 8 }}>
        <div style={{ height: 1, background: 'var(--border)' }} />
      </div>

      {/* ═══ FOOTER ═══ */}
      <div
        style={{
          padding: '16px 24px 20px',
          textAlign: 'center',
          fontSize: 11,
          color: 'var(--text-muted)',
          lineHeight: 1.7,
        }}
      >
        COPYRIGHT © {new Date().getFullYear()}<br />
        Darren. All rights reserved.
      </div>
    </aside>
  );
}
