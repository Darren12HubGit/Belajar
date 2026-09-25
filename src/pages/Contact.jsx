import {
  RiContactsLine,
  RiGithubLine,
  RiLinkedinBoxLine,
  RiInstagramLine,
  RiTelegramLine,
  RiMailLine,
} from 'react-icons/ri';
import SectionHeader from '../components/SectionHeader';
import { socialLinks } from '../data/links';
import { useAppContext } from '../context/AppContext';

const iconMap = {
  github: RiGithubLine,
  linkedin: RiLinkedinBoxLine,
  instagram: RiInstagramLine,
  telegram: RiTelegramLine,
  email: RiMailLine,
};

export default function Contact() {
  const { t } = useAppContext();

  return (
    <div className="page-enter space-y-8">
      <SectionHeader
        icon={<RiContactsLine />}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      {/* CTA Section */}
      <div
        className="p-6 rounded-2xl border space-y-3"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(16,185,129,0.02) 100%)',
          borderColor: 'var(--accent-border)',
        }}
      >
        <h2 className="text-lg font-semibold text-white">{t.contact.ctaTitle}</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t.contact.ctaDesc}
        </p>
        <a
          href="mailto:darreniqbal12@gmail.com"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105"
          style={{ background: 'var(--accent)', color: '#0d0d0d' }}
        >
          <RiMailLine size={16} />
          {t.contact.ctaBtn}
        </a>
      </div>

      <hr className="divider" />

      {/* Social Links */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {t.contact.findMeOn}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map(link => {
            const Icon = iconMap[link.icon] || RiMailLine;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-3 p-4 rounded-2xl border group"
                style={{ background: link.bg, borderColor: link.border }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: link.color + '18',
                    border: `1px solid ${link.color}30`,
                  }}
                >
                  <Icon size={19} style={{ color: link.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{link.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {link.handle}
                  </p>
                </div>
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="opacity-30 group-hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
