import { useState, useMemo } from 'react';
import { RiTrophyLine, RiSearchLine } from 'react-icons/ri';
import SectionHeader from '../components/SectionHeader';
import AchievementCard from '../components/AchievementCard';
import AchievementModal from '../components/AchievementModal';
import { achievements, achievementTypes, achievementCategories } from '../data/achievements';
import { useAppContext } from '../context/AppContext';

export default function Achievements() {
  const { t } = useAppContext();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const filtered = useMemo(() => {
    return achievements.filter(a => {
      const q = search.trim().toLowerCase();
      const matchSearch = !q
        || a.title.toLowerCase().includes(q)
        || a.issuer.toLowerCase().includes(q)
        || (a.credentialId && a.credentialId.toLowerCase().includes(q))
        || (a.skills && a.skills.some(s => s.toLowerCase().includes(q)))
        || a.category.toLowerCase().includes(q)
        || a.type.toLowerCase().includes(q);

      const matchType = filterType === 'All' || a.type.toLowerCase() === filterType.toLowerCase();
      const matchCategory = filterCategory === 'All' || a.category.toLowerCase() === filterCategory.toLowerCase();

      return matchSearch && matchType && matchCategory;
    });
  }, [search, filterType, filterCategory]);

  return (
    <div className="page-enter space-y-6">
      <SectionHeader
        icon={<RiTrophyLine />}
        title={t.achievements.title}
        subtitle={t.achievements.subtitle}
      />

      <hr className="divider" style={{ borderStyle: 'dashed' }} />

      {/* Search + Filters row: 3 columns matching the reference */}
      <div className="ach-controls-grid">
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <RiSearchLine
            size={16}
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            className="ach-search"
            placeholder={t.achievements.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 38 }}
          />
        </div>

        {/* Filter by Type */}
        <div>
          <select
            className="ach-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {achievementTypes.map(typeKey => (
              <option key={typeKey} value={typeKey}>
                {t.achievements.types[typeKey] || typeKey}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Category */}
        <div>
          <select
            className="ach-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {achievementCategories.map(catKey => (
              <option key={catKey} value={catKey}>
                {t.achievements.categories[catKey] || catKey}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Total count display */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ color: '#a1a1aa', fontSize: '0.9rem', fontWeight: 500 }}>
          {t.achievements.total} <span style={{ color: '#f4f4f5', fontWeight: 600 }}>{filtered.length}</span>
        </p>
        {(search || filterType !== 'All' || filterCategory !== 'All') && (
          <button
            onClick={() => {
              setSearch('');
              setFilterType('All');
              setFilterCategory('All');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {t.achievements.reset}
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <AchievementCard
            key={item.id}
            achievement={item}
            onClick={setSelectedAchievement}
          />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          className="text-center py-16 text-sm"
          style={{
            background: 'var(--bg-card)',
            borderRadius: 16,
            border: '1px dashed var(--border)',
            padding: 40,
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ fontSize: '1.75rem', marginBottom: 8 }}>🔍</p>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
            {t.achievements.emptyTitle}
          </p>
          <p style={{ fontSize: '0.85rem' }}>
            {t.achievements.emptyDesc}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedAchievement && (
        <AchievementModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
    </div>
  );
}
