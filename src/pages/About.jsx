import { RiUserLine, RiGraduationCapLine, RiBriefcaseLine } from 'react-icons/ri';
import SectionHeader from '../components/SectionHeader';
import { useAppContext } from '../context/AppContext';

function TimelineCard({ children, period }) {
  return (
    <div className="relative pl-4 border-l pb-6" style={{ borderColor: 'var(--border)' }}>
      <div
        className="absolute rounded-full border-2"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg)', width: '10px', height: '10px', left: '-5px', top: '6px' }}
      />
      <span className="text-xs mb-2 block" style={{ color: 'var(--text-muted)' }}>{period}</span>
      {children}
    </div>
  );
}

export default function About() {
  const { t } = useAppContext();

  const education = [
    {
      ...t.about.educationItems[0],
      gpa: '3.8/4.00',
      logo: null,
      logoBg: '#e65c00',
      logoText: 'SUT',
    },
    {
      ...t.about.educationItems[1],
      logo: '/metland.jpg',
      logoBg: '#1e3a5f',
      logoText: 'SMK',
    },
  ];

  const experience = [
    {
      ...t.about.experienceItems[0],
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      ...t.about.experienceItems[1],
      tech: ['React', 'Next.js', 'Node.js', 'MySQL'],
    },
  ];

  return (
    <div className="page-enter space-y-10">
      {/* Overview */}
      <section className="space-y-4">
        <SectionHeader
          icon={<RiUserLine />}
          title={t.about.title}
          subtitle={t.about.subtitle}
        />
        <div className="space-y-3 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
          <p>
            {t.about.bio1}
          </p>
          <p>
            {t.about.bio2}
          </p>
        </div>
      </section>

      <hr className="divider" />

      {/* Education */}
      <section className="space-y-5">
        <SectionHeader
          icon={<RiGraduationCapLine />}
          title={t.about.educationTitle}
          subtitle={t.about.educationSubtitle}
        />
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-2xl border"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {/* Logo */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: edu.logo ? 'var(--bg)' : edu.logoBg,
                  border: edu.logo ? '1px solid var(--border)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                {edu.logo ? (
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                    {edu.logoText}
                  </span>
                )}
              </div>

              {/* Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <span
                  className="font-semibold text-base text-white"
                  style={{ lineHeight: 1.3 }}
                >
                  {edu.school}
                </span>

                {/* Degree line */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '6px',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span>{edu.type}</span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span>{edu.major}</span>
                  {edu.gpa && (
                    <>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <span>{t.about.gpaLabel}: &nbsp;<strong style={{ color: 'var(--text-primary)' }}>{edu.gpa}</strong></span>
                    </>
                  )}
                </div>

                {/* Period + location */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '6px',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginTop: 2,
                  }}
                >
                  <span>{edu.period}</span>
                  <span>•</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* Experience */}
      <section className="space-y-5">
        <SectionHeader
          icon={<RiBriefcaseLine />}
          title={t.about.experienceTitle}
          subtitle={t.about.experienceSubtitle}
        />
        <div>
          {experience.map((exp, i) => (
            <TimelineCard key={i} period={exp.period}>
              <h3 className="font-semibold text-sm text-white">{exp.role}</h3>
              <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--accent)' }}>{exp.company}</p>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map(tKey => (
                  <span
                    key={tKey}
                    className="text-xs px-2 py-0.5 rounded-md border"
                    style={{
                      background: 'rgba(16,185,129,0.07)',
                      borderColor: 'rgba(16,185,129,0.2)',
                      color: 'var(--accent)',
                    }}
                  >
                    {tKey}
                  </span>
                ))}
              </div>
            </TimelineCard>
          ))}
        </div>
      </section>
    </div>
  );
}
