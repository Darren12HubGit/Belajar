import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  RiCloseLine,
  RiExternalLinkLine,
  RiGithubLine,
  RiZoomInLine,
  RiZoomOutLine,
  RiCheckboxCircleLine,
  RiCodeSSlashLine,
  RiStackLine,
  RiCalendarLine,
} from 'react-icons/ri';
import { useAppContext } from '../context/AppContext';

export default function ProjectModal({ project, onClose }) {
  const { t } = useAppContext();
  const [imgZoomed, setImgZoomed] = useState(false);

  const item = t.projects.items?.[project?.id] || project;
  const statusLabel = t.projects.status[project?.status] || project?.status;
  const categoryLabel = t.projects.categories[project?.category] || project?.category;
  const features = item.features || project?.features || [];

  // Lock body scroll & ESC key to close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="project-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="project-modal-close-btn"
          aria-label="Close modal"
        >
          <RiCloseLine size={20} />
        </button>

        {/* Modal Header */}
        <div className="project-modal-header">
          <div className="project-modal-tags">
            <span className="project-modal-cat-tag">
              <RiStackLine size={13} /> {categoryLabel}
            </span>
            <span
              className={`project-modal-status-tag ${
                project.status === 'In Progress' ? 'status-progress' : 'status-completed'
              }`}
            >
              <span className="project-status-dot" /> {statusLabel}
            </span>
            <span className="project-modal-year-tag">
              <RiCalendarLine size={13} /> {project.year}
            </span>
          </div>

          <h2 id="project-modal-title" className="project-modal-title">
            {item.title || project.title}
          </h2>
        </div>

        {/* Project Showcase Window (Browser Frame) */}
        <div className="project-showcase-frame">
          {/* Top Browser Bar */}
          <div className="project-browser-bar">
            <div className="project-window-dots">
              <span className="window-dot dot-red" />
              <span className="window-dot dot-yellow" />
              <span className="window-dot dot-green" />
            </div>
            <div className="project-browser-url">
              {project.title.toLowerCase().replace(/\s+/g, '')}.app
            </div>
            <div style={{ width: 44 }} />
          </div>

          {/* Image Display */}
          <div className="project-showcase-img-wrap">
            {project.image ? (
              <img
                src={project.image}
                alt={item.title || project.title}
                className={`project-showcase-img ${imgZoomed ? 'zoomed' : ''}`}
                onClick={() => setImgZoomed(!imgZoomed)}
                title="Click to toggle zoom"
              />
            ) : (
              <div className="project-no-img">
                <RiCodeSSlashLine size={48} />
                <span>Pratinjau proyek tidak tersedia</span>
              </div>
            )}

            {project.image && (
              <button
                type="button"
                className="project-zoom-btn"
                onClick={() => setImgZoomed(!imgZoomed)}
              >
                {imgZoomed ? (
                  <>
                    <RiZoomOutLine size={14} /> {t.projects.zoomOut}
                  </>
                ) : (
                  <>
                    <RiZoomInLine size={14} /> {t.projects.zoomIn}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Quick Action Buttons Row */}
        <div className="project-action-row">
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn-primary"
            >
              <RiExternalLinkLine size={16} />
              <span>{t.projects.liveDemo}</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn-secondary"
            >
              <RiGithubLine size={16} />
              <span>{t.projects.source}</span>
            </a>
          )}
        </div>

        {/* Details & Features Grid */}
        <div className="project-details-grid">
          {/* Overview */}
          <div className="project-detail-section">
            <h4 className="project-section-title">
              {t.projects.projectOverview}
            </h4>
            <p className="project-desc-text">
              {item.description || project.description}
            </p>
          </div>

          {/* Key Features */}
          {features.length > 0 && (
            <div className="project-detail-section">
              <h4 className="project-section-title">
                {t.projects.keyFeatures}
              </h4>
              <ul className="project-features-list">
                {features.map((feat, idx) => (
                  <li key={idx} className="project-feature-item">
                    <RiCheckboxCircleLine
                      size={16}
                      className="project-feature-icon"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="project-detail-section">
              <h4 className="project-section-title">
                {t.projects.technologies}
              </h4>
              <div className="project-tech-tags">
                {project.techStack.map((tech) => (
                  <span key={tech} className="project-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
