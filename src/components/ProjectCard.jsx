import { useRef } from 'react';
import {
  RiGithubLine,
  RiExternalLinkLine,
  RiEyeLine,
  RiStackLine,
} from 'react-icons/ri';
import { useAppContext } from '../context/AppContext';

export default function ProjectCard({ project, onClick }) {
  const { t } = useAppContext();
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const statusLabel = t.projects.status[project.status] || project.status;
  const categoryLabel = t.projects.categories[project.category] || project.category;
  const projectItem = t.projects.items?.[project.id] || project;

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onClick={() => onClick?.(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(project);
        }
      }}
      aria-label={`View project details for ${projectItem.title || project.title}`}
    >
      {/* Visual Mockup Container (Photo UI) */}
      <div className="project-card-img-wrap">
        {/* Subtle Mini Browser Bar */}
        <div className="project-card-browser-bar">
          <div className="project-card-dots">
            <span className="pdot pdot-red" />
            <span className="pdot pdot-yellow" />
            <span className="pdot pdot-green" />
          </div>
          <span className="project-card-domain">
            {project.title.toLowerCase().replace(/\s+/g, '')}.app
          </span>
          <div style={{ width: 32 }} />
        </div>

        {/* Project Visual Image */}
        {project.image ? (
          <img
            src={project.image}
            alt={projectItem.title || project.title}
            className="project-card-img"
            loading="lazy"
          />
        ) : (
          <div className="project-card-placeholder">
            <span>💻</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Project Preview
            </span>
          </div>
        )}

        {/* Top Floating Category & Status Badges */}
        <div className="project-card-badges-top">
          <span className="project-card-category-badge">
            <RiStackLine size={12} />
            <span>{categoryLabel}</span>
          </span>
          <span
            className={`project-card-status-badge ${
              project.status === 'In Progress'
                ? 'status-progress'
                : 'status-completed'
            }`}
          >
            <span className="project-status-dot" />
            <span>{statusLabel}</span>
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="project-card-overlay">
          <span className="project-card-view-pill">
            <RiEyeLine size={15} />
            <span>{t.projects.viewProject || 'Lihat Pratinjau'}</span>
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="project-card-body">
        {/* Title & Year */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="project-card-title">
            {projectItem.title || project.title}
          </h3>
          <span className="project-card-year">{project.year}</span>
        </div>

        {/* Description */}
        <p className="project-card-desc">
          {projectItem.description || project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="project-card-tech-row">
          {project.techStack.map((tech) => (
            <span key={tech} className="project-card-tech-pill">
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Actions Bar */}
        <div className="project-card-footer">
          <button
            type="button"
            className="project-card-detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(project);
            }}
          >
            <RiEyeLine size={14} />
            <span>{t.projects.viewDetail || 'Lihat Detail'}</span>
          </button>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="project-icon-link"
                title={t.projects.source}
                aria-label="GitHub Source Code"
              >
                <RiGithubLine size={16} />
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="project-icon-link active"
                title={t.projects.liveDemo}
                aria-label="Live Demo"
              >
                <RiExternalLinkLine size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
