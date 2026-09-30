import { useState, useMemo } from 'react';
import { RiCodeSSlashLine } from 'react-icons/ri';
import SectionHeader from '../components/SectionHeader';
import SkillBadge from '../components/SkillBadge';
import { skills, skillCategories } from '../data/skills';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { t } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const countByCategory = (cat) =>
    cat === 'All' ? skills.length : skills.filter(s => s.category === cat).length;

  return (
    <div className="page-enter space-y-10">
      {/* Hero Section */}
      <section className="space-y-5">
        {/* Greeting */}
        <div>
          <h1
            className="text-3xl font-semibold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.home.greeting}
          </h1>
          <ul
            className="flex flex-wrap gap-x-8 gap-y-1 list-disc list-inside text-sm leading-relaxed mt-4"
            style={{ color: 'var(--text-secondary)', marginTop: '16px' }}
          >
            <li>{t.home.location}</li>
            <li>{t.home.role}</li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="divider" />

        {/* Bio */}
        <div className="space-y-4 leading-7 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          <p>
            {t.home.bio1}
          </p>
          <p>
            {t.home.bio2}
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="space-y-5">
        <hr className="divider" />
        <SectionHeader
          icon={<RiCodeSSlashLine />}
          title={t.home.skillsTitle}
          subtitle={t.home.skillsSubtitle}
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {skillCategories.map(cat => {
            const isActive = activeCategory === cat;
            const count = countByCategory(cat);
            const categoryLabel = t.home.categories[cat] || cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none"
                style={
                  isActive
                    ? {
                        background: 'var(--accent)',
                        color: '#0d0d0d',
                        border: '1px solid transparent',
                      }
                    : {
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }
                }
              >
                <span>{categoryLabel}</span>
                <span
                  className="px-1.5 py-0.5 rounded-full font-bold tabular-nums"
                  style={
                    isActive
                      ? { background: 'rgba(0,0,0,0.2)', color: '#0d0d0d', fontSize: '10px' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', fontSize: '10px' }
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-2">
          {filteredSkills.map((skill, i) => (
            <SkillBadge key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
