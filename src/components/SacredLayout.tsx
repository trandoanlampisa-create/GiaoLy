import { Link, NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, ListChecks, PenLine, AlertCircle, Cross } from "lucide-react";
import { ReactNode } from "react";

const nav = [
  { to: "/", label: "Trang chủ", icon: Home },
  { to: "/dashboard", label: "Bảng học", icon: BookOpen },
  { to: "/quiz", label: "Trắc nghiệm", icon: ListChecks },
  { to: "/fill", label: "Điền khuyết", icon: PenLine },
  { to: "/review", label: "Ôn lỗi", icon: AlertCircle },
];

export function SacredLayout({ children }: { children: ReactNode }) {
  const loc = useLocation();
  return (
    <div className="min-h-screen bg-parchment text-foreground">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-ivory/80 border-b border-border/60">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-sacred shadow-soft group-hover:scale-105 transition-transform">
              <Cross className="w-4 h-4 text-ivory" strokeWidth={1.5} />
            </span>
            <div className="leading-tight">
              <div className="font-serif text-lg text-burgundy-deep">Giáo Lý Hôn Nhân</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Sacred Study</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-burgundy text-primary-foreground shadow-soft"
                      : "text-foreground/70 hover:text-burgundy hover:bg-muted"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main key={loc.pathname} className="animate-fade-in pb-28 md:pb-12">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ivory/95 backdrop-blur-lg border-t border-border">
        <div className="grid grid-cols-5">
          {nav.map((n) => {
            const Icon = n.icon;
            return (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                    isActive ? "text-burgundy" : "text-muted-foreground"
                  }`
                }
              >
                <Icon className="w-5 h-5" strokeWidth={1.6} />
                <span className="truncate px-1">{n.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <footer className="hidden md:block border-t border-border/60 mt-12">
        <div className="container py-6 text-xs text-muted-foreground flex items-center justify-between">
          <span>Sacred Study · Học giáo lý hôn nhân Công giáo</span>
          <span className="font-serif italic">Soli Deo Gloria</span>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, right }: { eyebrow?: string; title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="container pt-10 md:pt-14 pb-6 md:pb-10">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          {eyebrow && <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-2">{eyebrow}</div>}
          <h1 className="font-serif text-3xl md:text-5xl text-burgundy-deep text-balance">{title}</h1>
          {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl text-balance">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  );
}

export function ArchOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} fill="none" aria-hidden>
      <path d="M20 240 V 100 a 80 80 0 0 1 160 0 V 240" stroke="currentColor" strokeWidth="1" />
      <path d="M40 240 V 110 a 60 60 0 0 1 120 0 V 240" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <line x1="100" y1="40" x2="100" y2="80" stroke="currentColor" strokeWidth="1" />
      <line x1="84" y1="56" x2="116" y2="56" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}