import React from "react";
import { JOBS, REQUIREMENTS, sourceById } from "../data/dossier";
import type { Coverage } from "../data/dossier";
import { useStore } from "../lib/store";
import { Bar, Callout, CoverageTag, ExtLink, Kicker, NewTag, Reveal, SectionHead, SrcChip, TargetTag, coveragePct } from "../components/ui";

const CYCLE: Coverage[] = ["strong", "working", "learning"];

export default function Careers() {
  const { assess, setCoverage, toast, nav } = useStore();
  const junior = JOBS.find((j) => j.target)!;

  const cycle = (id: string) => {
    const next = CYCLE[(CYCLE.indexOf(assess[id] ?? "working") + 1) % CYCLE.length];
    setCoverage(id, next);
    toast(`Self-assessment updated → ${next}`, "info");
  };

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      <Reveal className="border-b-2 hairline pb-6">
        <Kicker accent>06 · Application</Kicker>
        <h1 className="font-display font-bold text-[34px] sm:text-[46px] tracking-tight leading-none mt-3">Open roles</h1>
        <p className="text-ink2 text-[15px] mt-3 max-w-2xl">Five seats on the Greenhouse EU board at snapshot time — four engineering, one sales. The junior AI/ML seat is the target; below it, a requirement-by-requirement matrix you can self-assess against.</p>
      </Reveal>

      {/* board */}
      <SectionHead num="6.1" title="The board" kicker="Scraped from job-boards.eu.greenhouse.io/tensorops" />
      <Reveal className="card overflow-x-auto">
        <table className="table-dense w-full min-w-[700px]">
          <thead><tr><th>Role</th><th>Dept</th><th>Location</th><th>Band</th><th>Flags</th><th></th></tr></thead>
          <tbody>
            {JOBS.map((j) => (
              <tr key={j.id} className={j.target ? "bg-accent/[0.06]" : ""}>
                <td>
                  <div className="font-semibold">{j.title}</div>
                  <div className="text-[11.5px] text-ink2 mt-0.5 max-w-[300px]">{j.blurb}</div>
                </td>
                <td className="whitespace-nowrap">{j.dept}</td>
                <td className="whitespace-nowrap">{j.location}</td>
                <td className="font-mono text-[12px] whitespace-nowrap">{j.salary ?? "—"}</td>
                <td>
                  <div className="flex gap-1.5">{j.isNew && <NewTag />}{j.target && <TargetTag />}</div>
                </td>
                <td><ExtLink href={j.url} className="!text-[12px] whitespace-nowrap">Apply</ExtLink></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Callout tone="warn" title="Verification required">
        The Greenhouse detail page was rate-limited during ingest, so the matrix below reconstructs requirements from listing mirrors (Bebee, Built In)
        and the firm's public work. Read the live posting line-by-line before submitting — the link is above.
      </Callout>

      {/* target deep-dive */}
      <SectionHead num="6.2" title="Target seat — requirement matrix" kicker={`${junior.title} · ${junior.location} · ${junior.salary} — tap a status to self-assess`} />
      <div className="space-y-3">
        {REQUIREMENTS.map((r, i) => {
          const cov = assess[r.id] ?? r.defaultCoverage;
          return (
            <Reveal key={r.id} delay={Math.min(i, 5) * 55} className="card p-4 sm:p-5">
              <div className="flex flex-wrap items-start gap-x-5 gap-y-3">
                <div className="flex-1 min-w-[240px]">
                  <div className="flex items-start gap-3">
                    <span className="num-chip mt-0.5">R{i + 1}</span>
                    <div className="font-display font-semibold text-[15.5px] leading-snug">{r.text}</div>
                  </div>
                  <p className="text-[12.5px] text-ink2 mt-2 leading-relaxed ml-[38px]">{r.evidence}</p>
                  <div className="ml-[38px] mt-2"><SrcChip id={r.sourceId} /></div>
                </div>
                <div className="w-full sm:w-[190px] shrink-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <CoverageTag c={cov} onClick={() => cycle(r.id)} />
                    <span className="font-mono text-[11px] text-ink2">{coveragePct(cov)}%</span>
                  </div>
                  <Bar value={coveragePct(cov)} color={cov === "strong" ? "var(--ok)" : cov === "working" ? "var(--accent2)" : "var(--warn)"} delay={i * 60} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="card mt-8 p-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-l-4 border-l-accent">
        <div className="flex-1 min-w-[220px]">
          <div className="font-display font-semibold text-[16px]">Ready to fire?</div>
          <p className="text-[13px] text-ink2 mt-1">The matrix feeds straight into your application page — pitch, 30/60/90 and a generated cover note.</p>
        </div>
        <button className="btn btn-solid" onClick={() => nav("application")}>Build my application →</button>
        <ExtLink href={junior.url} className="btn">Open Greenhouse listing</ExtLink>
      </div>
    </div>
  );
}
