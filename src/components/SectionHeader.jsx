export default function SectionHeader({ icon, title, subtitle, isPageTitle = false }) {
  const HeadingTag = isPageTitle ? 'h1' : 'h2';

  return (
    <div className={isPageTitle ? 'mb-8 sm:mb-10' : 'mb-6'}>
      <div className="flex items-center gap-2.5">
        {icon && !isPageTitle && (
          <span className="text-lg" style={{ color: 'var(--accent)' }}>
            {icon}
          </span>
        )}
        <HeadingTag
          className={
            isPageTitle
              ? 'text-2xl sm:text-[28px] font-bold tracking-tight capitalize leading-tight'
              : 'text-xl font-semibold capitalize leading-snug'
          }
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </HeadingTag>
      </div>
      {subtitle && (
        <p
          className={`text-sm sm:text-[15px] leading-relaxed ${
            isPageTitle ? 'mt-4 sm:mt-4.5' : 'mt-2.5'
          }`}
          style={{
            color: 'var(--text-secondary)',
            marginTop: isPageTitle ? '16px' : '10px',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
