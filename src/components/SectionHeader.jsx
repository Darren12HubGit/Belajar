export default function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="space-y-1 mb-6">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-lg" style={{ color: 'var(--accent)' }}>
            {icon}
          </span>
        )}
        <h2
          className="text-xl font-semibold capitalize"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
