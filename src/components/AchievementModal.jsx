import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  RiCloseLine,
  RiExternalLinkLine,
  RiCalendarLine,
  RiShieldCheckLine,
  RiCheckLine,
  RiFileCopyLine,
  RiAwardLine,
  RiZoomInLine,
} from 'react-icons/ri';
import { useAppContext } from '../context/AppContext';

export default function AchievementModal({ achievement, onClose }) {
  const { t } = useAppContext();
  const [copied, setCopied] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);

  const item = t.achievements.items?.[achievement?.id] || achievement;

  // Lock body scroll & ESC to close
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

  if (!achievement) return null;

  const handleCopyId = () => {
    if (!achievement.credentialId) return;
    navigator.clipboard.writeText(achievement.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const typeLabel = t.achievements.types[achievement.type] || achievement.type;
  const categoryLabel = t.achievements.categories[achievement.category] || achievement.category;

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-achievement-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <RiCloseLine size={20} />
        </button>

        {/* LEFT: Enlarged Certificate Image */}
        <div className="modal-img-panel">
          <div className="modal-img-container">
            {achievement.image ? (
              <img
                src={achievement.image}
                alt={item.title || achievement.title}
                className={imgZoomed ? 'zoomed' : ''}
                onClick={() => setImgZoomed(!imgZoomed)}
                title="Click to toggle zoom"
              />
            ) : (
              <div className="modal-no-img">
                <span style={{ fontSize: 56 }}>📜</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Pratinjau sertifikat tidak tersedia
                </span>
              </div>
            )}

            {achievement.image && (
              <button
                type="button"
                className="modal-zoom-hint"
                onClick={() => setImgZoomed(!imgZoomed)}
              >
                <RiZoomInLine size={13} /> {imgZoomed ? t.achievements.zoomOut : t.achievements.zoomIn}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Explanation Section (Section Penjelasan) */}
        <div className="modal-detail-panel">
          {/* Header Tag / Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <span className="modal-pill modal-pill-type">
              <RiAwardLine size={13} /> {typeLabel}
            </span>
            <span className="modal-pill modal-pill-cat">
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h2 id="modal-achievement-title" className="modal-title">
            {item.title || achievement.title}
          </h2>

          {/* Issuer & Date info */}
          <div className="modal-meta-row">
            <span className="modal-issuer">{item.issuer || achievement.issuer}</span>
            <span className="modal-bullet">•</span>
            <span className="modal-date">
              <RiCalendarLine size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
              {item.date || achievement.date}
            </span>
          </div>

          {/* Credential ID Card */}
          {achievement.credentialId && (
            <div className="modal-cred-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RiShieldCheckLine size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    {t.achievements.credentialId}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#f4f4f5', fontWeight: 600 }}>
                    {achievement.credentialId}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="modal-copy-btn"
                onClick={handleCopyId}
                title="Copy Credential ID"
              >
                {copied ? <RiCheckLine size={14} color="#10b981" /> : <RiFileCopyLine size={14} />}
                <span>{copied ? t.achievements.copied : t.achievements.copy}</span>
              </button>
            </div>
          )}

          {/* Explanation / Description Section */}
          <div className="modal-section">
            <h4 className="modal-section-title">
              {t.achievements.descriptionTitle}
            </h4>
            <p className="modal-desc-text">
              {item.description || achievement.description}
            </p>
          </div>

          {/* Key Skills */}
          {achievement.skills && achievement.skills.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                {t.achievements.skillsTitle}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {achievement.skills.map((skill, idx) => (
                  <span key={idx} className="modal-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verify / View Credential Link */}
          {achievement.credentialUrl && achievement.credentialUrl !== '#' && (
            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <a
                href={achievement.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-verify-btn"
              >
                <RiExternalLinkLine size={16} />
                <span>{t.achievements.verifyBtn}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
