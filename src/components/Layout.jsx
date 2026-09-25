import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function Layout({ children }) {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg)', transition: 'background-color 0.3s ease' }}
    >
      {/* ── Desktop layout ── */}
      <div className="hidden lg:flex min-h-screen">

        {/* Sidebar — fixed width, full height */}
        <aside
          className="flex-shrink-0 relative"
          style={{
            width: 280,
            borderRight: '1px solid var(--border)',
          }}
        >
          <div
            className="sticky top-0 overflow-y-auto"
            style={{ height: '100vh' }}
          >
            <Sidebar />
          </div>
        </aside>

        {/* Main content */}
        <main
          className="flex-1 min-w-0"
          style={{ padding: '40px 48px' }}
        >
          {children}
        </main>
      </div>

      {/* ── Mobile layout ── */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <MobileNav />
        <main style={{ flex: 1, padding: '24px 20px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
