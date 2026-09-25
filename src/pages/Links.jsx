import {
  RiLinksLine,
  RiGithubLine,
  RiLinkedinBoxLine,
  RiInstagramLine,
  RiTelegramLine,
  RiMailLine,
  RiExternalLinkLine,
  RiGlobalLine,
} from 'react-icons/ri';
import SectionHeader from '../components/SectionHeader';
import { useAppContext } from '../context/AppContext';

const iconMap = {
  portfolio: RiGlobalLine,
  github: RiGithubLine,
  linkedin: RiLinkedinBoxLine,
  instagram: RiInstagramLine,
  telegram: RiTelegramLine,
  email: RiMailLine,
};

const rawLinks = [
  {
    id: 'portfolio',
    url: '/',
    icon: 'portfolio',
    color: '#10b981',
    badge: 'Active',
  },
  {
    id: 'github',
    url: 'https://github.com/Darren12HubGit',
    icon: 'github',
    color: '#ffffff',
    badge: null,
  },
  {
    id: 'linkedin',
    url: 'https://linkedin.com',
    icon: 'linkedin',
    color: '#0A66C2',
    badge: null,
  },
  {
    id: 'instagram',
    url: 'https://www.instagram.com/helloworldprint12',
    icon: 'instagram',
    color: '#E1306C',
    badge: null,
  },
  {
    id: 'telegram',
    url: 'https://t.me/darrenraisya',
    icon: 'telegram',
    color: '#229ED9',
    badge: null,
  },
  {
    id: 'email',
    url: 'mailto:darreniqbal12@gmail.com',
    icon: 'email',
    color: '#10b981',
    badge: null,
  },
];

export default function Links() {
  const { t } = useAppContext();

  return (
    <div className="page-enter space-y-6">
      <SectionHeader
        icon={<RiLinksLine />}
        title={t.links.title}
        subtitle={t.links.subtitle}
      />

      {/* Profile mini-card */}
      <div
        className="flex items-center gap-4 p-4 rounded-2xl border"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <img
          src="/darren.jpg"
          alt="Darren Raisya"
          className="w-14 h-14 rounded-full object-cover border-2"
          style={{ borderColor: 'var(--border-hover)' }}
        />
        <div>
          <h2 className="font-bold text-white text-base">Darren Raisya</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t.links.role}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {t.links.location}
          </p>
        </div>
      </div>

      {/* Links list */}
      <div className="space-y-2.5">
        {rawLinks.map(link => {
          const Icon = iconMap[link.icon] || RiExternalLinkLine;
          const isInternal = link.url.startsWith('/');
          const itemText = t.links.items?.[link.id] || {};

          return (
            <a
              key={link.id}
              href={link.url}
              target={isInternal ? undefined : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              className="card-hover flex items-center gap-4 p-4 rounded-2xl border group"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: link.color + '18',
                  border: `1px solid ${link.color}30`,
                }}
              >
                <Icon size={20} style={{ color: link.color }} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{itemText.label || link.id}</span>
                  {link.badge && (
                    <span
                      className="px-1.5 py-0.5 rounded-full border font-medium"
                      style={{
                        background: link.color + '18',
                        color: link.color,
                        borderColor: link.color + '40',
                        fontSize: '10px',
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                  {itemText.description || ''}
                </p>
              </div>

              {/* Arrow */}
              <RiExternalLinkLine
                size={16}
                className="opacity-30 group-hover:opacity-70 transition-opacity flex-shrink-0"
                style={{ color: 'var(--text-secondary)' }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
