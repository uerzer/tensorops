import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BLOG, FACTS, JOBS, NAV, PEOPLE, REQUIREMENTS, ROUTES, SNAPSHOT, STACK, sourceById,
} from "../data/dossier";
import type { Route } from "../data/dossier";
import { useStore } from "../lib/store";
import { ICheck, IMenu, IMoon, ISearch, ISun, IX, Modal } from "./ui";

/* ————— wordmark ————— */
export const Mark = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="6" fill="var(--ink)" />
    <path d="M8 10h16M16 10v14" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="24" cy="24" r="3" fill="var(--accent2)" />
  </svg>
);

/* ————— signal ticker ————— */
const TICKS = [
  "OPENAI SELECT PARTNER — JUL 2026", "5 ROLES OPEN ON GREENHOUSE", "TARGET: JUNIOR AI/ML ENGINEER · REMOTE · €30–35K",
  "PRODUCTS: CODEMESH + TENSORLEARN", "CASE FILES: ARMIS · SEEKING ALPHA", "12 BLOG POSTS INDEXED", "14 SOURCES TRACED · 3 CONFIDENCE TIERS",
  "HOUSE DOCTRINE: HARNESS ENGINEERING · GROUNDED AUTONOMY · JOB CARDS", "AWS ALLIANCES LEAD HIRING ⇒ AWS IS THE HOUSE CLOUD",
];
export function Ticker() {
  const row = (key: string) => (
    <div key={key} className="flex items-center">
      {TICKS.map((t, i) => (
        <span key={i} className="flex items-center font-mono text-[10px] tracking-[0.14em] text-ink2 whitespace-nowrap">
          <span className="px-5">{t}</span>
          <span className="text-accent">◆</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-b hairline bg-panel overflow-hidden select-none" aria-hidden="true">
      <div className="ticker-track py-[5px]">{row("a")}{row("b")}</div>
    </div>
  );
}

/* ————— top bar ————— */
export function TopBar() {
  const { theme, toggleTheme, setSearchOpen, setMobileNav, visited } = useStore();
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-paper/90" style={{ backdropFilter: "blur(8px)" }}>
      <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
        <button className="btn !p-2 lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><IMenu size={16} /></button>
        <div className="flex items-center gap-2.5 min-w-0">
          <Mark />
          <div className="leading-none min-w-0">
            <div className="font-display font-bold text-[15px] tracking-tight">T·DOSSIER</div>
            <div className="kicker !text-[9px] mt-0.5 hidden sm:block">TensorOps Candidate Knowledge Base</div>
          </div>
        </div>
        <div className="flex-1" />
        <button
          className="hidden sm:flex items-center gap-2.5 border hairline rounded-md px-3 py-1.5 text-[12.5px] text-ink2 hover:text-ink hover:border-accent transition-colors w-56 lg:w-72"
          onClick={() => setSearchOpen(true)}
        >
          <ISearch size={13} />
          <span className="flex-1 text-left">Search the dossier…</span>
          <kbd className="font-mono text-[10px] border hairline rounded px-1.5 py-0.5">⌘K</kbd>
        </button>
        <button className="btn !p-2 sm:hidden" onClick={() => setSearchOpen(true)} aria-label="Search"><ISearch size={15} /></button>
        <div className="hidden md:flex flex-col items-end leading-none">
          <span className="font-mono text-[10px] text-ink2 tracking-wider">SNAP {SNAPSHOT.slice(0, 10)}</span>
          <span className="font-mono text-[10px] text-ok mt-1 tracking-wider flex items-center gap-1.5"><span className="live-dot" />{visited.length}/{ROUTES.length} READ</span>
        </div>
        <button className="btn !p-2" onClick={toggleTheme} aria-label="Toggle theme" title={theme === "light" ? "Switch to Console (dark)" : "Switch to Document (light)"}>
          {theme === "light" ? <IMoon size={15} /> : <ISun size={15} />}
        </button>
      </div>
    </header>
  );
}

/* ————— sidebar ————— */
export function Sidebar({ className = "" }: { className?: string }) {
  const { route, nav, visited, progressPct, profile } = useStore();
  return (
    <aside className={`flex flex-col w-[264px] shrink-0 border-r hairline bg-panel ${className}`}>
      <div className="px-4 pt-5 pb-2">
        <div className="kicker mb-3">Index of articles</div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {NAV.map((g) => (
          <div key={g.group} className="mb-4">
            <div className="kicker !text-[9.5px] px-2.5 mb-1.5 text-ink2/80">{g.group}</div>
            {g.items.map((it) => (
              <button key={it.id} className={`navlink ${route === it.id ? "navlink-active" : ""}`} onClick={() => nav(it.id)}>
                <span className="font-mono text-[10px] text-accent w-5 shrink-0">{it.num}</span>
                <span className="flex-1 truncate">{it.label}</span>
                {visited.includes(it.id) && <ICheck size={11} className="text-ok shrink-0" />}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t hairline p-4 space-y-3">
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="kicker">Reading progress</span>
            <span className="font-mono text-[11px] text-accent font-semibold">{progressPct}%</span>
          </div>
          <div className="h-[6px] rounded-full bg-panel2 border border-linesoft overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="stamp">Candidate copy</span>
          <span className="font-mono text-[10px] text-ink2">{profile.name ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase() : "UNSET"}</span>
        </div>
      </div>
    </aside>
  );
}

/* ————— search ————— */
interface Entry { title: string; sub: string; route: Route; kind: string; hay: string; }
function buildIndex(): Entry[] {
  const add = (title: string, sub: string, route: Route, kind: string, extra = ""): Entry => ({
    title, sub, route, kind, hay: `${title} ${sub} ${kind} ${extra}`.toLowerCase(),
  });
  const out: Entry[] = [];
  NAV.flatMap((g) => g.items).forEach((it) => out.push(add(it.label, "Dossier article", it.id, "article")));
  BLOG.forEach((b) => out.push(add(b.title, b.summary, "blog", "blog post", b.tags.join(" "))));
  JOBS.forEach((j) => out.push(add(j.title, `${j.dept} · ${j.location}${j.salary ? " · " + j.salary : ""}`, "careers", "open role")));
  STACK.forEach((s) => out.push(add(`${s.layer}: ${s.tech}`, s.evidence, "stack", "stack evidence")));
  PEOPLE.forEach((p) => out.push(add(p.name, `${p.role} — ${p.note}`, "people", "person")));
  FACTS.forEach((f) => out.push(add(f.label, f.value, "overview", "company fact")));
  REQUIREMENTS.forEach((r) => out.push(add(r.text, r.evidence, "application", "requirement")));
  return out;
}

export function SearchModal() {
  const { searchOpen, setSearchOpen, nav } = useStore();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  useEffect(() => { if (searchOpen) { setQ(""); setActive(0); window.setTimeout(() => inputRef.current?.focus(), 30); } }, [searchOpen]);

  const results = useMemo(() => {
    const toks = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!toks.length) return index.slice(0, 7);
    return index.filter((e) => toks.every((t) => e.hay.includes(t))).slice(0, 12);
  }, [q, index]);

  const hi = (text: string) => {
    const toks = q.trim().split(/\s+/).filter((t) => t.length > 1);
    if (!toks.length) return text;
    const re = new RegExp(`(${toks.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
    // split with a single capture group alternates: odd indices are the matches
    return text.split(re).map((part, i) => (i % 2 === 1 ? <mark key={i} className="bg-accent/25 text-inherit rounded-[2px] px-0.5">{part}</mark> : part));
  };

  return (
    <Modal open={searchOpen} onClose={() => setSearchOpen(false)} wide>
      <div className="p-4 border-b hairline flex items-center gap-3">
        <ISearch size={16} className="text-ink2 shrink-0" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === "Enter" && results[active]) nav(results[active].route);
          }}
          placeholder="Search articles, roles, claims, people…"
          className="flex-1 bg-transparent outline-none font-body text-[15px] placeholder:text-ink2/70"
        />
        <button className="btn !p-1.5" onClick={() => setSearchOpen(false)} aria-label="Close"><IX size={13} /></button>
      </div>
      <div className="p-2 max-h-[52vh] overflow-y-auto">
        {results.length === 0 && (
          <div className="p-6 text-center">
            <div className="font-display font-semibold text-[15px]">No matches in the dossier</div>
            <div className="text-[13px] text-ink2 mt-1">Try “agent”, “AWS”, “salary”, “mentorship”…</div>
          </div>
        )}
        {results.map((r, i) => (
          <button
            key={i}
            className={`w-full text-left px-3 py-2.5 rounded-md flex items-start gap-3 transition-colors ${i === active ? "bg-panel2" : "hover:bg-panel2/60"}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => nav(r.route)}
          >
            <span className="tag mt-0.5 shrink-0">{r.kind}</span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold leading-snug">{hi(r.title)}</span>
              <span className="block text-[12px] text-ink2 truncate">{hi(r.sub)}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t hairline flex gap-4 kicker !text-[9.5px]">
        <span>↑↓ navigate</span><span>↵ open</span><span>esc close</span>
      </div>
    </Modal>
  );
}

/* ————— toasts ————— */
export function Toasts() {
  const { toasts } = useStore();
  const toneColor = { ok: "var(--ok)", warn: "var(--warn)", info: "var(--accent2)" };
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="anim-rise card px-4 py-2.5 shadow-xl flex items-center gap-2.5 pointer-events-auto" style={{ borderLeft: `3px solid ${toneColor[t.tone]}` }}>
          <span className="font-mono text-[12px] font-medium">{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
