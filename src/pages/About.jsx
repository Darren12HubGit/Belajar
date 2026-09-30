import {
  RiGraduationCapLine,
  RiBriefcaseLine,
} from "react-icons/ri";
import SectionHeader from "../components/SectionHeader";
import ExperienceCard from "../components/ExperienceCard";
import { useAppContext } from "../context/AppContext";

export default function About() {
  const { t } = useAppContext();

  const education = [
    {
      ...t.about.educationItems[0],
      logo: "/images.jpg",
      logoBg: "#1e3a5f",
      logoText: "SMP",
    },
    {
      ...t.about.educationItems[1],
      logo: "/metland.jpg",
      logoBg: "#1e3a5f",
      logoText: "SMK",
    },
  ];

  const experienceItems = t.about.experienceItems || [];

  return (
    <div className="page-enter space-y-10">
      {/* Overview */}
      <section className="space-y-4">
        <SectionHeader
          title={t.about.title}
          subtitle={t.about.subtitle}
          isPageTitle
        />
        <div
          className="space-y-4 text-sm leading-7"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>{t.about.bio1}</p>
          <p>{t.about.bio2}</p>
          {t.about.bio3 && <p>{t.about.bio3}</p>}
        </div>
      </section>

      <hr className="divider" />

      {/* Education */}
      <section className="space-y-5">
        <SectionHeader
          icon={<RiGraduationCapLine />}
          title={t.about.educationTitle}
          subtitle={t.about.educationSubtitle}
        />
        <div className="space-y-3">
          {education.map((edu, i) => (
            <div
              key={i}
              className="card-hover flex gap-4 p-4 rounded-2xl border"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              {/* Logo */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: edu.logo ? "var(--bg)" : edu.logoBg,
                  border: edu.logo ? "1px solid var(--border)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                {edu.logo ? (
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {edu.logoText}
                  </span>
                )}
              </div>

              {/* Info */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minWidth: 0,
                }}
              >
                <span
                  className="font-semibold text-base text-white"
                  style={{ lineHeight: 1.3 }}
                >
                  {edu.school}
                </span>

                {/* Degree line */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "6px",
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>{edu.type}</span>
                  {edu.major && (
                    <>
                      <span style={{ color: "var(--text-muted)" }}>•</span>
                      <span>{edu.major}</span>
                    </>
                  )}
                  {edu.gpa && (
                    <>
                      <span style={{ color: "var(--text-muted)" }}>•</span>
                      <span>
                        {t.about.gpaLabel}: &nbsp;
                        <strong style={{ color: "var(--text-primary)" }}>
                          {edu.gpa}
                        </strong>
                      </span>
                    </>
                  )}
                </div>

                {/* Period + location */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "6px",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  <span>{edu.period}</span>
                  <span>•</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* Experience */}
      <section className="space-y-5">
        <SectionHeader
          icon={<RiBriefcaseLine />}
          title={t.about.experienceTitle}
          subtitle={t.about.experienceSubtitle}
        />
        <div className="space-y-4">
          {experienceItems.map((exp, i) => (
            <ExperienceCard
              key={exp.id || i}
              experience={exp}
              defaultExpanded={i === 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
