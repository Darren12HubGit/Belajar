import { useState, useMemo } from 'react';
import { RiFolderLine } from 'react-icons/ri';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { projects, projectCategories } from '../data/projects';
import { useAppContext } from '../context/AppContext';

export default function Projects() {
  const { t } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const countByCategory = (cat) =>
    cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length;

  return (
    <div className="page-enter space-y-6">
      <SectionHeader
        icon={<RiFolderLine />}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {projectCategories.map(cat => {
          const isActive = activeCategory === cat;
          const count = countByCategory(cat);
          const catLabel = t.projects.categories[cat] || cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={
                isActive
                  ? { background: 'var(--accent)', color: '#0d0d0d', border: '1px solid transparent' }
                  : { background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)' }
              }
            >
              <span>{catLabel}</span>
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div
          className="text-center py-12 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          {t.projects.empty}
        </div>
      )}
    </div>
  );
}
