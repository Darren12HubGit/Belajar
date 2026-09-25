import { useRef } from 'react';
import { RiAddLine, RiLinksLine, RiZoomInLine } from 'react-icons/ri';
import { useAppContext } from '../context/AppContext';

export default function AchievementCard({ achievement, onClick }) {
  const { t } = useAppContext();
  const cardRef = useRef(null);
  const item = t.achievements.items?.[achievement.id] || achievement;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const typeLabel = t.achievements.types[achievement.type] || achievement.type;
  const categoryLabel = t.achievements.categories[achievement.category] || achievement.category;

  return (
    <div
      ref={cardRef}
      className="cert-card"
      onMouseMove={handleMouseMove}
      onClick={() => onClick?.(achievement)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(achievement);
        }
      }}
      aria-label={`View details for ${item.title || achievement.title}`}
    >
      {/* Certificate Image Preview */}
      <div className="cert-img-wrap">
        {achievement.image ? (
          <img
            src={achievement.image}
            alt={item.title || achievement.title}
            loading="lazy"
          />
        ) : (
          <div className="cert-placeholder">
            <span>📜</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Certificate</span>
          </div>
        )}

        {/* Hover overlay indicator */}
        <div className="cert-img-overlay">
          <span className="cert-view-badge">
            <RiZoomInLine size={15} /> {t.achievements.viewDetail}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 2 }}>
        {/* Credential ID */}
        <p className="cert-credential-id">
          {achievement.credentialId}
        </p>

        {/* Title */}
        <h3 className="cert-title">
          {item.title || achievement.title}
        </h3>

        {/* Issuer */}
        <p className="cert-issuer">
          {item.issuer || achievement.issuer}
        </p>

        {/* Badges (Pills) */}
        <div className="cert-badges-row">
          <span className="cert-pill">
            {typeLabel}
          </span>
          <span className="cert-pill">
            {categoryLabel}
          </span>
        </div>

        {/* Divider & Footer */}
        <div className="cert-footer">
          <span className="cert-date">
            {t.achievements.issuedOn} {item.date || achievement.date}
          </span>
          {achievement.credentialUrl && achievement.credentialUrl !== '#' && (
            <a
              href={achievement.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="cert-link-btn"
              title="View Credential Link"
            >
              <RiLinksLine size={15} />
            </a>
          )}
        </div>

        {/* Bottom plus action */}
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            className="cert-plus-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(achievement);
            }}
            aria-label="View detail"
            title={t.achievements.viewDetail}
          >
            <RiAddLine size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
