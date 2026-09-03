import React from "react";
import { JOBS, PIPELINE_SCRIPT, ROUTES, SIGNALS, SNAPSHOT, UNKNOWNS, sourceById } from "../data/dossier";
import { useStore } from "../lib/store";
import { Bar, Callout, ExtLink, Kicker, Reveal, SectionHead, SrcChip, StatBlock, coveragePct } from "../components/ui";

export default function Briefing() {
  const { nav, visited, assess, profile } = useStore();
  const junior = JOBS.find((j) => j.target)!;
  const readiness = Math.round(
    Object.values(assess).reduce((a, c) => a + coveragePct(c), 0) / Math.max(1, Object.values(assess).length)
  );

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 hairline pb-6">
          <div>
            <Kicker accent>01 · Mission briefing</Kicker>
            <h1 className="font-display font-bold text-[34px] sm:text-[46px] tracking-tight leading-none mt-3">Situation board</h1>
            <p className="text-ink2 text-[15px] mt-3 max-w-xl">The analyst's one-pager: what TensorOps is, where the signals are, what's unknown, and whether the target seat is worth firing at.</p>
          </div>
          <div className="text-right">
            <div className="kicker flex items-center gap-2 justify-end"><span className="live-dot" />snapshot sealed</div>
            <div className="font-mono text-[12px] text-ink2 mt-1">{SNAPSHOT}</div>
          </div>
        </div>
      </Reveal>

      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-line border hairline mt-8">
        <StatBlock value="5" label="Open roles" sub="4 Engineering · 1 Sales — Greenhouse EU" />
        <StatBlock value="€30–35k" label="Junior band" sub="Per listing mirrors; verify on Greenhouse" delay={40} />
        <StatBlock value="12" label="Blog posts" sub="May–Jul 2026, all indexed + tagged" delay={80} />
        <StatBlock value="14" label="Sources traced" sub="12 full · 2 partial · 0 failed" delay={120} />
        <StatBlock value={readiness + "%"} label="Req. coverage" sub="Your self-assessment — editable in Open Roles" accent delay={160} />
        <StatBlock value={`${visited.length}/${ROUTES.length}`} label="Articles read" sub="Progress persists in this browser" delay={200} />
      </div>

      {/* target strip */}
      <Reveal className="mt-8">
        <div className="card border-l-4 border-l-accent p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <Kicker accent>Target seat</Kicker>
                <span className="tag">engineering</span><span className="tag">{junior.location}</span><span className="tag text-ok border-ok/40">{junior.salary}</span>
              </div>
              <div className="font-display font-bold text-[24px] sm:text-[28px] tracking-tight mt-2">{junior.title}</div>
              <p className="text-[13.5px] text-ink2 mt-1.5 max-w-2xl">{junior.blurb}</p>
            </div>
            <div className="flex flex-col gap-2.5 shrink-0">
              <button className="btn btn-solid" onClick={() => nav("careers")}>Open role matrix →</button>
              <button className="btn" onClick={() => nav("application")}>My application</button>
            </div>
          </div>
          <div className="mt-5 max-w-xl">
            <div className="flex justify-between kicker mb-1.5"><span>Requirement coverage (self-assessed)</span><span className="text-accent font-semibold">{readiness}%</span></div>
            <Bar value={readiness} delay={150} />
          </div>
        </div>
      </Reveal>

      {/* signals vs unknowns */}
      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        <div>
          <SectionHead num="A" title="Bull case — why apply" kicker="Signals" />
          <div className="space-y-3">
            {SIGNALS.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} className="card p-4 flex gap-3.5 border-l-2 border-l-ok">
                <span className="font-mono text-[11px] text-ok font-semibold pt-0.5">S{i + 1}</span>
                <div>
                  <div className="font-display font-semibold text-[15px]">{s.title}</div>
                  <p className="text-[13px] text-ink2 mt-1 leading-relaxed">{s.body}</p>
                  <div className="mt-2"><SrcChip id={s.src} /></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <SectionHead num="B" title="Known unknowns" kicker="Risk register" />
          <div className="space-y-3">
            {UNKNOWNS.map((u, i) => (
              <Reveal key={u.title} delay={i * 60} className="card p-4 flex gap-3.5 border-l-2 border-l-warn">
                <span className="font-mono text-[11px] text-warn font-semibold pt-0.5">U{i + 1}</span>
                <div>
                  <div className="font-display font-semibold text-[15px]">{u.title}</div>
                  <p className="text-[13px] text-ink2 mt-1 leading-relaxed">{u.body}</p>
                  <div className="mt-2"><SrcChip id={u.src} /></div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={280}>
            <Callout tone="accent" title="Analyst's note">
              The unknowns are normal for a private, compact firm — and every one converts into a smart first-call question.
              A candidate who asks <em>“how does the strategy-to-production cadence actually hold up on the Armis engagement?”</em> has already
              separated from the pile{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}.
            </Callout>
          </Reveal>
        </div>
      </div>

      {/* ingest tail */}
      <SectionHead num="C" title="Last ingest run" kicker="Data pipeline tail — full log in Sources & Pipeline" />
      <Reveal className="codeblock p-4">
        {PIPELINE_SCRIPT.slice(-5).map((l, i) => (
          <div key={i} className="flex gap-3 whitespace-pre-wrap">
            <span className="text-ink2 shrink-0">[{l.t}]</span>
            <span className={l.tone === "ok" ? "text-ok" : l.tone === "warn" ? "text-warn" : "text-accent2"}>{l.msg}</span>
          </div>
        ))}
        <div className="flex gap-3 mt-1"><span className="text-ink2">$</span><span className="cursor-blink text-ink2">snapshot sealed — dataset frozen at {SNAPSHOT}</span></div>
      </Reveal>
      <div className="flex gap-3 mt-4 flex-wrap">
        <button className="btn" onClick={() => nav("system")}><span className="text-accent">▸</span> Full pipeline log</button>
        <ExtLink href="https://job-boards.eu.greenhouse.io/tensorops" className="btn">Live job board</ExtLink>
      </div>
    </div>
  );
}
