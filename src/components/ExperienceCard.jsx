import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiCheckboxCircleLine,
  RiCheckLine,
  RiLightbulbLine,
  RiRocketLine,
} from 'react-icons/ri';
import { useAppContext } from '../context/AppContext';

export default function ExperienceCard({ experience, defaultExpanded = false }) {
  const { t } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`exp-card card-hover ${isExpanded ? 'expanded' : ''}`}
      style={{
        background: 'var(--bg-card)',
        borderColor: isExpanded ? 'rgba(255, 255, 255, 0.2)' : 'var(--border)',
      }}
    >
      {/* Clickable Header Area */}
      <div
        className="exp-header"
        onClick={toggleExpand}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand();
          }
        }}
      >
        {/* Company Logo / Monogram */}
        <div
          className="exp-logo-box"
          style={{
            background: experience.logoBg || 'var(--bg)',
            color: experience.logoColor || 'var(--accent)',
            border: `1px solid ${experience.logoColor ? experience.logoColor + '30' : 'var(--border)'}`,
          }}
        >
          {experience.logo ? (
            <img
              src={experience.logo}
              alt={experience.company}
              className="w-full h-full object-cover rounded-[13px]"
            />
          ) : (
            <span>{experience.logoText || 'XP'}</span>
          )}
        </div>

        {/* Header Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="exp-role-title">
              {experience.role}
            </h3>
          </div>

          <p className="exp-company-text">
            <span>{experience.company}</span>
            {experience.location && (
              <>
                <span className="exp-bullet">•</span>
                <span>{experience.location}</span>
              </>
            )}
          </p>

          {/* Metadata badges row */}
          <div className="exp-meta-row">
            <span>{experience.period}</span>
            {experience.duration && (
              <>
                <span className="exp-bullet">•</span>
                <span>{experience.duration}</span>
              </>
            )}
            {experience.workType && (
              <>
                <span className="exp-bullet">•</span>
                <span className="exp-badge-pill">{experience.workType}</span>
              </>
            )}
            {experience.workModel && (
              <span className="exp-badge-pill">
                <span className="exp-model-dot" />
                {experience.workModel}
              </span>
            )}
          </div>

          {/* Toggle Action Trigger */}
          <button
            type="button"
            className="exp-toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            aria-label={isExpanded ? t.about.hideDetails || 'Hide details' : t.about.showDetails || 'Show details'}
          >
            <span>
              {isExpanded
                ? t.about.hideDetails || 'Hide details'
                : t.about.showDetails || 'Show details'}
            </span>
            <RiArrowDownSLine
              size={17}
              className={`exp-chevron ${isExpanded ? 'rotated' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Accordion Expandable Details */}
      <div className={`exp-body-grid ${isExpanded ? 'open' : ''}`}>
        <div className="exp-body-inner">
          <div className="exp-content-wrap">
            <hr className="divider" />

            {/* Section 1: Key Responsibilities */}
            {experience.responsibilities && experience.responsibilities.length > 0 && (
              <div>
                <h4 className="exp-section-title">
                  <RiCheckboxCircleLine
                    size={16}
                    style={{ color: 'var(--accent)' }}
                  />
                  <span>{t.about.responsibilities || 'Responsibilities'}</span>
                </h4>
                <ul className="exp-bullet-list">
                  {experience.responsibilities.map((resp, idx) => (
                    <li key={idx} className="exp-bullet-item">
                      <RiCheckLine size={16} className="exp-check-icon" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 2: Two-column grid (What I Learned & Key Impact) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Column 1: What I Learned */}
              {experience.whatILearned && experience.whatILearned.length > 0 && (
                <div>
                  <h4 className="exp-section-title">
                    <RiLightbulbLine
                      size={16}
                      style={{ color: '#fbbf24' }}
                    />
                    <span>{t.about.whatILearned || 'What I Learned'}</span>
                  </h4>
                  <ul className="exp-bullet-list">
                    {experience.whatILearned.map((item, idx) => (
                      <li key={idx} className="exp-bullet-item">
                        <RiCheckLine size={16} className="exp-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Column 2: Key Impact */}
              {experience.impact && experience.impact.length > 0 && (
                <div>
                  <h4 className="exp-section-title">
                    <RiRocketLine
                      size={16}
                      style={{ color: '#38bdf8' }}
                    />
                    <span>{t.about.impact || 'Key Impact'}</span>
                  </h4>
                  <ul className="exp-bullet-list">
                    {experience.impact.map((item, idx) => (
                      <li key={idx} className="exp-bullet-item">
                        <RiCheckLine size={16} className="exp-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Section 3: Technologies Used */}
            {experience.tech && experience.tech.length > 0 && (
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {experience.tech.map((tKey) => (
                    <span
                      key={tKey}
                      className="text-xs px-2.5 py-1 rounded-md border font-medium transition-colors"
                      style={{
                        background: 'rgba(16,185,129,0.07)',
                        borderColor: 'rgba(16,185,129,0.22)',
                        color: 'var(--accent)',
                      }}
                    >
                      {tKey}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
