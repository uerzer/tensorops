import React from "react";
import { STACK } from "../data/dossier";
import { useStore } from "../lib/store";
import { Callout, ConfTag, Kicker, Reveal, SectionHead, SrcChip } from "../components/ui";

const GAPS = [
  { gap: "AWS depth (Bedrock, SageMaker)", why: "House cloud by all signals; my self-assessment says “learning” — the 30/60/90 plan fixes this in month one.", tone: "warn" as const },
  { gap: "Kubernetes / orchestration", why: "Low-confidence row in the stack, but self-hosting economics implies it. Cheap to verify, useful to know.", tone: "info" as const },
  { gap: "Agent RFT frameworks hands-on", why: "They teach TRL/verl/OpenRLHF — reading their guides is table stakes; running one small RFT is a differentiator.", tone: "info" as const },
];

export default function Stack() {
  const { nav } = useStore();
  const counts = { high: 0, medium: 0, low: 0 };
  STACK.forEach((r) => counts[r.confidence]++);

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      <Reveal className="border-b-2 hairline pb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker accent>03 · Intelligence</Kicker>
          <h1 className="font-display font-bold text-[34px] sm:text-[46px] tracking-tight leading-none mt-3">Technology &amp; stack</h1>
          <p className="text-ink2 text-[15px] mt-3 max-w-2xl">No vendor will hand a candidate their stack diagram — so this one is reconstructed from fingerprints, with every row carrying its evidence and a confidence tier.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="tag text-ok border-ok/40">{counts.high} high</span>
          <span className="tag text-warn border-warn/40">{counts.medium} medium</span>
          <span className="tag text-bad border-bad/40">{counts.low} low</span>
        </div>
      </Reveal>

      <Callout tone="info" title="Method">
        High = directly observable primary source. Medium = strong corroboration across sources. Low = plausible inference, unverified.
        Rows marked low are interview questions wearing a table row's clothing.
      </Callout>

      {/* fingerprint card */}
      <Reveal className="card p-5 mt-2 border-l-4 border-l-accent2">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="min-w-0 flex-1">
            <Kicker accent>Exhibit A — the accidental confession</Kicker>
            <div className="font-display font-semibold text-[17px] mt-1.5">tensorops.ai runs Next.js</div>
            <p className="text-[13px] text-ink2 mt-1 leading-relaxed">Every blog OG-image URL routes through <code className="font-mono text-[12px] bg-panel2 border border-linesoft rounded px-1 py-0.5">/_next/image</code> — the Next.js image optimizer. Their own web platform is React/Next, so frontend literacy speaks their language.</p>
          </div>
          <div className="codeblock px-4 py-3 !text-[11.5px] max-w-full">
            <span className="text-ink2">GET</span> tensorops.ai<span className="text-accent">/_next/image</span>?url=…openai-partner.png&amp;w=3840<br />
            <span className="text-ok">200</span> <span className="text-ink2">image/webp — Next.js ImageOptimizer</span>
          </div>
        </div>
      </Reveal>

      {/* stack table */}
      <SectionHead num="3.1" title="Reconstructed stack" kicker={`${STACK.length} layers · evidence-linked`} />
      <Reveal className="card overflow-x-auto">
        <table className="table-dense w-full min-w-[720px]">
          <thead><tr><th>Layer</th><th>Technology</th><th>Evidence</th><th>Conf.</th><th>Src</th></tr></thead>
          <tbody>
            {STACK.map((r, i) => (
              <tr key={r.layer}>
                <td className="font-mono text-[12px] text-ink2 whitespace-nowrap">{r.layer}</td>
                <td className="font-semibold whitespace-nowrap">{r.tech}</td>
                <td className="text-ink2 !text-[12.5px] max-w-[380px]">{r.evidence}</td>
                <td><ConfTag c={r.confidence} /></td>
                <td><SrcChip id={r.sourceId} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* doctrine */}
      <SectionHead num="3.2" title="The harness, diagrammed" kicker="Their architecture doctrine in one breath" />
      <Reveal className="card p-5 sm:p-7 overflow-x-auto">
        <svg viewBox="0 0 760 150" className="w-full min-w-[640px]" role="img" aria-label="Harness engineering diagram: tools, context, state, feedback and verification around the model">
          {["TOOLS", "CONTEXT", "STATE", "FEEDBACK", "VERIFICATION"].map((w, i) => (
            <g key={w}>
              <rect x={8 + i * 150} y={14} width={134} height={34} rx={4} fill="var(--panel2)" stroke="var(--line)" />
              <text x={75 + i * 150} y={36} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="1.5" fill="var(--ink2)">{w}</text>
              <path d={`M ${75 + i * 150} 48 V 72`} stroke="var(--line)" strokeDasharray="3 4" className="dash-anim" style={{ animationDelay: `${i * 120}ms` }} />
            </g>
          ))}
          <rect x={205} y={74} width={350} height={44} rx={5} fill="var(--accent)" opacity={0.12} stroke="var(--accent)" strokeWidth={1.4} />
          <text x={380} y={101} textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="16" fontWeight="700" fill="var(--accent)" letterSpacing="2">THE MODEL</text>
          <text x={380} y={140} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="1.2" fill="var(--ink2)">“THE ARCHITECTURE AROUND THE MODEL” — HARNESS ENGINEERING, TENSOROPS BLOG, JUL 2026</text>
        </svg>
      </Reveal>

      {/* gap analysis */}
      <SectionHead num="3.3" title="Gap analysis — what this means for me" kicker="Stack rows converted into a study list" />
      <div className="grid md:grid-cols-3 gap-3">
        {GAPS.map((g, i) => (
          <Reveal key={g.gap} delay={i * 70} className={`card p-4 border-l-2 ${g.tone === "warn" ? "border-l-warn" : "border-l-accent2"}`}>
            <div className="font-display font-semibold text-[15px]">{g.gap}</div>
            <p className="text-[12.5px] text-ink2 mt-1.5 leading-relaxed">{g.why}</p>
          </Reveal>
        ))}
      </div>
      <div className="flex gap-3 mt-6 flex-wrap">
        <button className="btn" onClick={() => nav("application")}>See how gaps map to my 30/60/90 →</button>
        <button className="btn" onClick={() => nav("blog")}>Primary evidence: blog digest</button>
      </div>
    </div>
  );
}
