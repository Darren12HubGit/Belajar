import { RiCodeBoxLine, RiGithubLine, RiExternalLinkLine } from 'react-icons/ri';
import SectionHeader from '../components/SectionHeader';
import { useAppContext } from '../context/AppContext';

const baseCreations = [
  {
    id: 1,
    tech: ['React', 'Vite', 'CSS', 'React Router'],
    github: 'https://github.com/Darren12HubGit',
    live: '#',
    icon: '🌐',
    color: '#10b981',
    type: 'Website',
  },
  {
    id: 2,
    tech: ['React', 'TypeScript', 'Storybook'],
    github: 'https://github.com/darren',
    live: null,
    icon: '🧩',
    color: '#8b5cf6',
    type: 'Library',
  },
  {
    id: 3,
    tech: ['VS Code Extension', 'JSON'],
    github: 'https://github.com/darren',
    live: 'https://marketplace.visualstudio.com',
    icon: '🎨',
    color: '#007ACC',
    type: 'Extension',
  },
  {
    id: 4,
    tech: ['Technical Writing', 'Web Dev', 'AI'],
    github: null,
    live: '#',
    icon: '✍️',
    color: '#3b82f6',
    type: 'Content',
  },
];

const typeColors = {
  Website: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  Library: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)' },
  Extension: { color: '#007ACC', bg: 'rgba(0,122,204,0.1)', border: 'rgba(0,122,204,0.25)' },
  Content: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)' },
};

export default function Creations() {
  const { t } = useAppContext();

  return (
    <div className="page-enter space-y-6">
      <SectionHeader
        icon={<RiCodeBoxLine />}
        title={t.creations.title}
        subtitle={t.creations.subtitle}
      />

      <div className="space-y-4">
        {baseCreations.map((item) => {
          const typeStyle = typeColors[item.type] || typeColors.Website;
          const translated = t.creations.items?.[item.id] || {};
          const typeLabel = t.creations.types?.[item.type] || item.type;

          return (
            <div
              key={item.id}
              className="card-hover p-5 rounded-2xl border flex gap-4"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: item.color + '18',
                  border: `1px solid ${item.color}35`,
                }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm text-white">{translated.title || item.title}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full border font-medium"
                    style={{ background: typeStyle.bg, color: typeStyle.color, borderColor: typeStyle.border }}
                  >
                    {typeLabel}
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {translated.description || item.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map(tKey => (
                    <span
                      key={tKey}
                      className="text-xs px-2 py-0.5 rounded-md border"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {tKey}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-1">
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <RiGithubLine size={14} />
                      {t.creations.source}
                    </a>
                  )}
                  {item.live && item.live !== '#' && (
                    <a
                      href={item.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: 'var(--accent)' }}
                    >
                      <RiExternalLinkLine size={14} />
                      {t.creations.view}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
