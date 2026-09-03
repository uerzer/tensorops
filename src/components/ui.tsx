import React, { useEffect, useRef, useState } from "react";
import type { Confidence, Coverage } from "../data/dossier";
import { sourceById } from "../data/dossier";
import { useStore } from "../lib/store";

/* ————— inline icon set ————— */
type IconProps = { size?: number; className?: string; strokeWidth?: number };
const S = ({ size = 15, className = "", strokeWidth = 1.9, d }: IconProps & { d: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{d}</svg>
);
export const IArrowUpRight = (p: IconProps) => <S {...p} d={<><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>} />;
export const ICopy = (p: IconProps) => <S {...p} d={<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>} />;
export const ICheck = (p: IconProps) => <S {...p} d={<path d="m4 12.5 5 5L20 6.5" />} />;
export const ISearch = (p: IconProps) => <S {...p} d={<><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>} />;
export const IMenu = (p: IconProps) => <S {...p} d={<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>} />;
export const IX = (p: IconProps) => <S {...p} d={<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>} />;
export const ISun = (p: IconProps) => <S {...p} d={<><circle cx="12" cy="12" r="4.5" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" /></>} />;
export const IMoon = (p: IconProps) => <S {...p} d={<path d="M20 13.5A8.5 8.5 0 0 1 10.5 4a7.5 7.5 0 1 0 9.5 9.5Z" />} />;
export const IDownload = (p: IconProps) => <S {...p} d={<><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 21h16" /></>} />;
export const IPlay = (p: IconProps) => <S {...p} d={<path d="M7 4.5v15l12-7.5Z" />} />;
export const IChevR = (p: IconProps) => <S {...p} d={<path d="m9 5 7 7-7 7" />} />;
export const IDoc = (p: IconProps) => <S {...p} d={<><path d="M6 2.5h8l4 4V21.5H6Z" /><path d="M14 2.5v4h4" /><path d="M9 12h6M9 16h6" /></>} />;
export const IFlag = (p: IconProps) => <S {...p} d={<><path d="M5 21V4" /><path d="M5 4h13l-2.5 4L18 12H5" /></>} />;
export const IBox = (p: IconProps) => <S {...p} d={<><path d="M12 2.5 21 7v10l-9 4.5L3 17V7Z" /><path d="m3 7 9 4.5L21 7" /><path d="M12 11.5V21.5" /></>} />;

/* ————— scroll reveal ————— */
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ————— typography ————— */
export const Kicker = ({ children, accent = false, className = "" }: { children: React.ReactNode; accent?: boolean; className?: string }) => (
  <div className={`kicker ${accent ? "kicker-accent" : ""} ${className}`}>{children}</div>
);

export function SectionHead({ num, title, kicker }: { num: string; title: string; kicker?: string }) {
  return (
    <div className="mt-12 mb-5 first:mt-0">
      {kicker && <Kicker accent className="mb-2">{kicker}</Kicker>}
      <div className="flex items-baseline gap-3">
        <span className="num-chip shrink-0">{num}</span>
        <h2 className="font-display text-[22px] sm:text-[25px] font-600 font-semibold tracking-tight leading-tight">{title}</h2>
        <div className="flex-1 border-b hairline mb-1.5" />
      </div>
    </div>
  );
}

/* ————— citation sup, scrolls to references ————— */
export function Cit({ n }: { n: number }) {
  return (
    <a
      className="cit"
      href="#references"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("references")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      title="Jump to references"
    >[{n}]</a>
  );
}

/* ————— badges ————— */
const confStyle: Record<Confidence, string> = {
  high: "text-ok border-ok/50 bg-ok/10",
  medium: "text-warn border-warn/50 bg-warn/10",
  low: "text-bad border-bad/50 bg-bad/10",
};
export const ConfTag = ({ c }: { c: Confidence }) => (
  <span className={`tag !normal-case ${confStyle[c]}`} title={`Source confidence: ${c}`}>{c}</span>
);

const covMeta: Record<Coverage, { label: string; cls: string; pct: number }> = {
  strong: { label: "Strong", cls: "text-ok border-ok/50 bg-ok/10", pct: 100 },
  working: { label: "Working on it", cls: "text-accent2 border-accent2/50 bg-accent2/10", pct: 62 },
  learning: { label: "Learning", cls: "text-warn border-warn/50 bg-warn/10", pct: 30 },
};
export const CoverageTag = ({ c, onClick }: { c: Coverage; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!onClick}
    className={`tag !normal-case transition-transform ${covMeta[c].cls} ${onClick ? "cursor-pointer hover:scale-105 active:scale-95" : "cursor-default"}`}
    title={onClick ? "Click to update self-assessment" : undefined}
  >
    {covMeta[c].label}
  </button>
);
export const coveragePct = (c: Coverage) => covMeta[c].pct;

export const NewTag = () => <span className="tag text-accent border-accent/50 bg-accent/10">new</span>;
export const TargetTag = () => <span className="tag !text-[10px] text-accentink bg-accent border-accent">target</span>;

/* ————— source chip ————— */
export function SrcChip({ id }: { id: string }) {
  const s = sourceById(id);
  if (!s) return null;
  return (
    <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-accent2 hover:text-accent hover:underline underline-offset-2" title={s.label}>
      <IArrowUpRight size={11} />{s.id.replace("s-", "")}
    </a>
  );
}

/* ————— callout ————— */
const tones = {
  info: { border: "border-l-accent2", head: "text-accent2", label: "Note" },
  warn: { border: "border-l-warn", head: "text-warn", label: "Caution" },
  ok: { border: "border-l-ok", head: "text-ok", label: "Signal" },
  accent: { border: "border-l-accent", head: "text-accent", label: "Dossier" },
};
export function Callout({ tone = "info", title, children }: { tone?: keyof typeof tones; title?: string; children: React.ReactNode }) {
  const t = tones[tone];
  return (
    <div className={`card border-l-4 ${t.border} px-4 py-3.5 my-5`}>
      <div className={`kicker ${t.head} mb-1`}>{title ?? t.label}</div>
      <div className="text-[13.5px] text-ink2 leading-relaxed">{children}</div>
    </div>
  );
}

/* ————— data display ————— */
export function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-end py-[7px] text-[13px] border-b border-linesoft last:border-0">
      <span className="kicker !text-[10px] shrink-0">{label}</span>
      <span className="dotted-leader" />
      <span className="font-medium text-right sm:text-left">{children}</span>
    </div>
  );
}

export function StatBlock({ value, label, sub, accent = false, delay = 0 }: { value: React.ReactNode; label: string; sub?: string; accent?: boolean; delay?: number }) {
  return (
    <Reveal delay={delay} className="border hairline border-t-2 border-t-accent px-4 py-4 bg-panel" >
      <div className={`font-display text-[26px] sm:text-[30px] font-semibold leading-none tracking-tight ${accent ? "text-accent" : ""}`}>{value}</div>
      <div className="kicker mt-2">{label}</div>
      {sub && <div className="text-[12px] text-ink2 mt-1 leading-snug">{sub}</div>}
    </Reveal>
  );
}

export function Bar({ value, color = "var(--accent)", delay = 0 }: { value: number; color?: string; delay?: number }) {
  return (
    <div className="h-[7px] w-full rounded-full bg-panel2 border border-linesoft overflow-hidden">
      <div className="bar-anim h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color, animationDelay: `${delay}ms` }} />
    </div>
  );
}

/* ————— actions ————— */
export function CopyBtn({ text, label = "Copy" }: { text: string; label?: string }) {
  const { toast } = useStore();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn !py-1.5 !px-2.5 !text-[10.5px]"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
        setDone(true);
        toast("Copied to clipboard");
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? <ICheck size={12} /> : <ICopy size={12} />}
      {done ? "Copied" : label}
    </button>
  );
}

export const ExtLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 text-accent hover:underline underline-offset-2 font-medium ${className}`}>
    {children}<IArrowUpRight size={12} />
  </a>
);

/* ————— modal ————— */
export function Modal({ open, onClose, children, wide = false }: { open: boolean; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/40 anim-fade" style={{ background: "rgba(10,14,20,0.55)", backdropFilter: "blur(2px)" }} />
      <div className={`relative card shadow-2xl w-full ${wide ? "max-w-2xl" : "max-w-lg"} anim-rise max-h-[78vh] overflow-auto`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
