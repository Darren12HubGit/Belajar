import { RiGithubLine, RiExternalLinkLine } from 'react-icons/ri';
import { useAppContext } from '../context/AppContext';

const statusColors = {
  Completed: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'rgba(16,185,129,0.25)' },
  'In Progress': { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
};

export default function ProjectCard({ project }) {
  const { t } = useAppContext();
  const status = statusColors[project.status] || statusColors.Completed;
  const statusLabel = t.projects.status[project.status] || project.status;
  const projectItem = t.projects.items?.[project.id] || project;

  return (
    <div
      className="card-hover p-5 rounded-2xl border space-y-3"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-white text-base leading-tight">
            {projectItem.title || project.title}
          </h3>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {project.year}
          </span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0"
          style={{ background: status.bg, color: status.color, borderColor: status.border }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
        {projectItem.description || project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map(tech => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded-md border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-1">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
            style={{ color: 'var(--text-secondary)' }}
          >
            <RiGithubLine size={15} />
            {t.projects.source}
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <RiExternalLinkLine size={15} />
            {t.projects.liveDemo}
          </a>
        )}
      </div>
    </div>
  );
}
