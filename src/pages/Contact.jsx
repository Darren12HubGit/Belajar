import SectionHeader from '../components/SectionHeader';
import Contact3DCard from '../components/Contact3DCard';
import { useAppContext } from '../context/AppContext';

// ── Real brand SVG paths (rendered inline, no external fetch) ──

// Gmail "M" envelope — official M striped logo shape
const gmailBrandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <path d="M48 128l208 130L464 128" fill="none" stroke="white" stroke-width="28" stroke-linecap="round"/>
  <rect x="48" y="104" width="416" height="304" rx="28" ry="28" fill="none" stroke="white" stroke-width="28"/>
  <path d="M48 128v256" fill="none" stroke="white" stroke-width="28" stroke-linecap="round"/>
  <path d="M464 128v256" fill="none" stroke="white" stroke-width="28" stroke-linecap="round"/>
</svg>`;

const gmailGhostSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <path d="M48 128l208 130L464 128" fill="none" stroke="white" stroke-width="22" stroke-linecap="round"/>
  <rect x="48" y="104" width="416" height="304" rx="28" ry="28" fill="none" stroke="white" stroke-width="22"/>
</svg>`;

// Instagram — camera body with viewfinder circle and top dot, official shape
const instagramBrandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect x="64" y="64" width="384" height="384" rx="100" ry="100" fill="none" stroke="white" stroke-width="32"/>
  <circle cx="256" cy="256" r="100" fill="none" stroke="white" stroke-width="32"/>
  <circle cx="374" cy="138" r="22" fill="white"/>
</svg>`;

const instagramGhostSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect x="64" y="64" width="384" height="384" rx="100" ry="100" fill="none" stroke="white" stroke-width="26"/>
  <circle cx="256" cy="256" r="100" fill="none" stroke="white" stroke-width="26"/>
  <circle cx="374" cy="138" r="22" fill="white"/>
</svg>`;

// GitHub — Octocat head silhouette, simplified clean vector
const githubBrandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
  <path fill="white" d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
</svg>`;

const githubGhostSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
  <path fill="white" d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
</svg>`;

// Telegram — paper plane official shape
const telegramBrandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <path fill="white" d="M256 8C119.04 8 8 119.04 8 256s111.04 248 248 248 248-111.04 248-248S392.96 8 256 8zm110.51 169.96l-42.75 201.47c-3.19 14.17-11.56 17.64-23.42 10.97l-64.71-47.7-31.23 30.07c-3.46 3.47-6.35 6.36-13.02 6.36l4.65-65.92 119.95-108.31c5.22-4.64-1.12-7.23-8.12-2.59L154.79 319.93l-63.28-19.81c-13.75-4.3-14.01-13.74 2.84-20.32l215.38-83.04c11.46-4.1 21.48 2.79 17.78 19.2z"/>
</svg>`;

const telegramGhostSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <path fill="white" d="M256 8C119.04 8 8 119.04 8 256s111.04 248 248 248 248-111.04 248-248S392.96 8 256 8zm110.51 169.96l-42.75 201.47c-3.19 14.17-11.56 17.64-23.42 10.97l-64.71-47.7-31.23 30.07c-3.46 3.47-6.35 6.36-13.02 6.36l4.65-65.92 119.95-108.31c5.22-4.64-1.12-7.23-8.12-2.59L154.79 319.93l-63.28-19.81c-13.75-4.3-14.01-13.74 2.84-20.32l215.38-83.04c11.46-4.1 21.48 2.79 17.78 19.2z"/>
</svg>`;

// ── Brand-accurate themes ──

const emailTheme = {
  // Gmail red — vivid, matches reference image "Stay in Touch" card
  gradient: 'linear-gradient(135deg, #c0392b 0%, #d63031 40%, #e74c3c 100%)',
  boxShadow: '0 8px 28px -6px rgba(192, 57, 43, 0.35), 0 4px 12px rgba(0,0,0,0.45)',
  boxShadowHover: '0 18px 40px -8px rgba(231, 76, 60, 0.55), 0 8px 20px rgba(0,0,0,0.55)',
  badgeBg: 'rgba(255,255,255,0.18)',
};

const instagramTheme = {
  // Instagram gradient: yellow-orange → magenta → purple
  gradient: 'linear-gradient(135deg, #fcaf45 0%, #f56040 18%, #e1306c 45%, #c13584 68%, #833ab4 100%)',
  boxShadow: '0 8px 28px -6px rgba(193, 53, 132, 0.38), 0 4px 12px rgba(0,0,0,0.45)',
  boxShadowHover: '0 18px 40px -8px rgba(193, 53, 132, 0.58), 0 8px 20px rgba(0,0,0,0.55)',
  badgeBg: 'rgba(255,255,255,0.18)',
};

const githubTheme = {
  // GitHub dark navy/charcoal
  gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2128 100%)',
  boxShadow: '0 8px 28px -6px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.45)',
  boxShadowHover: '0 18px 40px -8px rgba(0,0,0,0.7), 0 8px 20px rgba(0,0,0,0.6)',
  badgeBg: 'rgba(255,255,255,0.1)',
};

const telegramTheme = {
  // Telegram blue
  gradient: 'linear-gradient(135deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)',
  boxShadow: '0 8px 28px -6px rgba(0, 119, 182, 0.4), 0 4px 12px rgba(0,0,0,0.45)',
  boxShadowHover: '0 18px 40px -8px rgba(0, 150, 199, 0.6), 0 8px 20px rgba(0,0,0,0.55)',
  badgeBg: 'rgba(255,255,255,0.18)',
};

export default function Contact() {
  const { t } = useAppContext();
  const cards = t.contact.cards || {};

  return (
    <div className="page-enter space-y-8">
      <SectionHeader
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        isPageTitle
      />

      <section className="space-y-3">
        <h2
          className="text-sm font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          {t.contact.findMeOn}
        </h2>

        <div className="flex flex-col gap-3">
          {/* Row 1: Gmail hero */}
          <Contact3DCard
            isHero
            title={cards.email?.title || 'Stay in Touch'}
            description={cards.email?.description || 'Reach out via email for inquiries or collaborations.'}
            buttonText={cards.email?.buttonText || 'Go to Gmail'}
            url="mailto:iqbaldarren12@mail.com"
            brandSvg={gmailBrandSvg}
            ghostSvg={gmailGhostSvg}
            theme={emailTheme}
          />

          {/* Row 2: Instagram + GitHub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Contact3DCard
              title={cards.instagram?.title || 'Follow My Journey'}
              description={cards.instagram?.description || 'Follow my creative journey and tech moments.'}
              buttonText={cards.instagram?.buttonText || 'Go to Instagram'}
              url="https://www.instagram.com/helloworldprint12/"
              brandSvg={instagramBrandSvg}
              ghostSvg={instagramGhostSvg}
              theme={instagramTheme}
            />
            <Contact3DCard
              title={cards.github?.title || 'Explore My Code'}
              description={cards.github?.description || 'Browse my repositories and open-source work.'}
              buttonText={cards.github?.buttonText || 'Go to GitHub'}
              url="https://github.com/Darren12HubGit"
              brandSvg={githubBrandSvg}
              ghostSvg={githubGhostSvg}
              theme={githubTheme}
            />
          </div>

          {/* Row 3: Telegram */}
          <Contact3DCard
            title={cards.telegram?.title || 'Quick Chat'}
            description={cards.telegram?.description || 'Direct instant messaging and quick communication.'}
            buttonText={cards.telegram?.buttonText || 'Go to Telegram'}
            url="https://t.me/darrenraisya"
            brandSvg={telegramBrandSvg}
            ghostSvg={telegramGhostSvg}
            theme={telegramTheme}
          />
        </div>
      </section>
    </div>
  );
}
