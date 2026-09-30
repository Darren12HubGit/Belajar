import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiLaravel,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiGithub,
  SiDocker,
  SiFigma,
  SiLinux,
} from 'react-icons/si';

const skillIconMap = {
  'JavaScript': SiJavascript,
  'React': SiReact,
  'Node.js': SiNodedotjs,
  'Python': SiPython,
  'HTML': SiHtml5,
  'CSS': SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Bootstrap': SiBootstrap,
  'PHP': SiPhp,
  'Laravel': SiLaravel,
  'Firebase': SiFirebase,
  'Supabase': SiSupabase,
  'Git': SiGit,
  'GitHub': SiGithub,
  'Docker': SiDocker,
  'Figma': SiFigma,
  'Linux': SiLinux,
};

export default function SkillBadge({ skill, index = 0 }) {
  const IconComponent = skillIconMap[skill.name];

  return (
    <div
      className="badge-pop group relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium cursor-default select-none overflow-hidden transition-all duration-200 hover:scale-105"
      style={{
        background: skill.bg,
        borderColor: skill.color + '30',
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* subtle tinted bg glow */}
      <span
        className="absolute inset-0 opacity-10 rounded-full"
        style={{ background: skill.color }}
        aria-hidden="true"
      />

      {/* Tech stack logo or fallback dot */}
      {IconComponent ? (
        <IconComponent
          size={15}
          className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ color: skill.color }}
          aria-hidden="true"
        />
      ) : (
        <span
          className="relative w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{
            background: skill.color,
            boxShadow: `0 0 6px ${skill.color}80`,
          }}
        />
      )}

      <span
        className="relative whitespace-nowrap"
        style={{ color: 'var(--text-primary)' }}
      >
        {skill.name}
      </span>
    </div>
  );
}
