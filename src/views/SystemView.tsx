import React, { useEffect, useRef, useState } from "react";
import {
  APP_BUILD, BLOG, FACTS, JOBS, PEOPLE, PIPELINE_SCRIPT, REQUIREMENTS, SNAPSHOT, SOURCES, STACK,
} from "../data/dossier";
import { useStore } from "../lib/store";
import { Callout, CopyBtn, ExtLink, IDownload, IPlay, Kicker, Reveal, SectionHead } from "../components/ui";

export default function SystemView() {
  const { toast, resetAll, assess } = useStore();
  const [lines, setLines] = useState(PIPELINE_SCRIPT.length); // sealed log shown in full by default
  const [running, setRunning] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const run = () => {
    if (running) return;
    setRunning(true);
    setLines(0);
    toast("Ingest replay started", "info");
    PIPELINE_SCRIPT.forEach((_, i) => {
      window.setTimeout(() => {
        setLines(i + 1);
        logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
        if (i === PIPELINE_SCRIPT.length - 1) { setRunning(false); toast("Replay complete — snapshot unchanged"); }
      }, 420 * (i + 1));
    });
  };

  const exportJson = () => {
    const payload = {
      meta: { title: "TensorOps Candidate Dossier", snapshot: SNAPSHOT, rev: 4, generator: "T·DOSSIER v1.0" },
      sources: SOURCES, facts: FACTS, jobs: JOBS, requirements: REQUIREMENTS.map((r) => ({ ...r, selfAssessment: assess[r.id] ?? r.defaultCoverage })),
      stack: STACK, people: PEOPLE, blog: BLOG,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tensorops-dossier.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("Dataset exported — tensorops-dossier.json");
  };

  const statusCls = (s: string) => (s === "ok" ? "text-ok border-ok/40" : s === "partial" ? "text-warn border-warn/40" : "text-ink2");

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      <Reveal className="border-b-2 hairline pb-6">
        <Kicker accent>08 · System</Kicker>
        <h1 className="font-display font-bold text-[34px] sm:text-[46px] tracking-tight leading-none mt-3">Sources &amp; pipeline</h1>
        <p className="text-ink2 text-[15px] mt-3 max-w-2xl">The honesty layer: every source with its fetch status, the ingest run that produced the dataset, a one-click export of the whole knowledge base — and how this app itself is built.</p>
      </Reveal>

      {/* pipeline console */}
      <SectionHead num="8.1" title="Ingest pipeline" kicker="Recon run #4 · 14 targets · replayable" />
      <Reveal className="card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b hairline bg-panel2/60">
          <div className="flex items-center gap-3">
            <span className={`live-dot ${running ? "" : "opacity-40"}`} style={running ? undefined : { animation: "none" }} />
            <span className="font-mono text-[12px]">{running ? "ingesting…" : "sealed"} <span className="text-ink2">· {Math.min(lines, PIPELINE_SCRIPT.length)}/{PIPELINE_SCRIPT.length} events</span></span>
          </div>
          <button className="btn !py-1.5" onClick={run} disabled={running}>
            <IPlay size={11} /> {running ? "Running" : "Replay run"}
          </button>
        </div>
        <div className="h-[7px] bg-panel2"><div className="h-full bg-accent transition-all duration-300" style={{ width: `${(Math.min(lines, PIPELINE_SCRIPT.length) / PIPELINE_SCRIPT.length) * 100}%` }} /></div>
        <div ref={logRef} className="codeblock !rounded-none !border-0 border-t hairline p-4 h-56 overflow-y-auto">
          {PIPELINE_SCRIPT.slice(0, lines).map((l, i) => (
            <div key={i} className={`flex gap-3 whitespace-pre-wrap ${i === lines - 1 && running ? "anim-fade" : ""}`}>
              <span className="text-ink2 shrink-0">[{l.t}]</span>
              <span className={l.tone === "ok" ? "text-ok" : l.tone === "warn" ? "text-warn" : "text-accent2"}>{l.msg}</span>
            </div>
          ))}
          {running && <div className="flex gap-3"><span className="text-ink2">$</span><span className="cursor-blink text-ink2" /></div>}
          {!running && lines >= PIPELINE_SCRIPT.length && (
            <div className="flex gap-3 mt-1"><span className="text-ink2">$</span><span className="text-ink2">dataset frozen · {SNAPSHOT} · awaiting candidate commands</span><span className="cursor-blink" /></div>
          )}
        </div>
      </Reveal>

      {/* provenance table */}
      <SectionHead num="8.2" title="Provenance register" kicker="14 sources · status at ingest time" />
      <Reveal className="card overflow-x-auto">
        <table className="table-dense w-full min-w-[760px]">
          <thead><tr><th>#</th><th>Source</th><th>Kind</th><th>Status</th><th>Ingested</th><th>Field note</th></tr></thead>
          <tbody>
            {SOURCES.map((s, i) => (
              <tr key={s.id}>
                <td className="font-mono text-[11px] text-ink2">{String(i + 1).padStart(2, "0")}</td>
                <td><ExtLink href={s.url} className="!text-[13px]">{s.label}</ExtLink></td>
                <td><span className="tag">{s.kind}</span></td>
                <td><span className={`tag ${statusCls(s.status)}`}>{s.status}</span></td>
                <td className="font-mono text-[12px] whitespace-nowrap">{s.fetched}</td>
                <td className="text-ink2 !text-[12.5px] max-w-[360px]">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* export */}
      <SectionHead num="8.3" title="Take the data with you" kicker="The dossier is portable — that's the point" />
      <Reveal className="card p-5 flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex-1 min-w-[240px]">
          <div className="font-display font-semibold text-[16px]">tensorops-dossier.json</div>
          <p className="text-[13px] text-ink2 mt-1 max-w-xl">Full dataset — sources, facts, roles, stack, people, blog, plus your self-assessments. Feed it to anything: a RAG demo, a fine-tune, a second app.</p>
        </div>
        <button className="btn btn-solid" onClick={exportJson}><IDownload size={13} /> Export dataset</button>
        <CopyBtn text={`https://job-boards.eu.greenhouse.io/tensorops`} label="Copy board URL" />
      </Reveal>

      {/* about the build */}
      <SectionHead num="8.4" title="How this app is built" kicker="The demo is also the résumé" />
      <div className="grid lg:grid-cols-2 gap-5">
        <Reveal className="card overflow-hidden">
          <table className="table-dense w-full">
            <tbody>
              {APP_BUILD.stack.map(([k, v]) => (
                <tr key={k}><td className="kicker !text-[10px] w-32 whitespace-nowrap">{k}</td><td className="!text-[13px]">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal delay={80} className="space-y-4">
          <Callout tone="info" title="Architecture, honestly">
            This is a static React app — no server, no runtime network calls. The “backend” is the recon itself: sources were fetched, cross-checked and
            compiled into a typed dataset at snapshot time. Everything dynamic (search, assessments, progress, export) runs client-side and persists in
            localStorage. If hired, I'd happily rebuild it with a real ingest service — that's a weekend project, and it's in the 30/60/90.
          </Callout>
          <div className="card p-4">
            <div className="kicker mb-3 text-bad">Danger zone</div>
            <div className="flex items-center gap-3 flex-wrap">
              {!confirmReset ? (
                <button className="btn !border-bad/50 !text-bad hover:!border-bad" onClick={() => setConfirmReset(true)}>Reset dossier data</button>
              ) : (
                <>
                  <span className="text-[12.5px] text-ink2">Wipe profile, assessments, progress &amp; theme?</span>
                  <button className="btn !bg-bad !border-bad !text-white hover:!text-white" onClick={() => { resetAll(); }}>Yes, reset</button>
                  <button className="btn" onClick={() => setConfirmReset(false)}>Cancel</button>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 border-t-2 hairline pt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="kicker">T·DOSSIER v1.0 · snapshot {SNAPSHOT} · compiled with rigor, shipped with intent</span>
        <span className="stamp">End of file</span>
      </div>
    </div>
  );
}
