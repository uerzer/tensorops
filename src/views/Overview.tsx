import React from "react";
import { FACTS, JOBS, NAV, SNAPSHOT, SOURCES, sourceById } from "../data/dossier";
import { useStore } from "../lib/store";
import { Callout, Cit, ConfTag, ExtLink, InfoRow, Kicker, Reveal, SectionHead } from "../components/ui";
import { Mark } from "../components/Chrome";

export default function Overview() {
  const { nav, profile } = useStore();
  const junior = JOBS.find((j) => j.target)!;

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      {/* ————— article header ————— */}
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Kicker accent>The dossier · Article 00</Kicker>
            <h1 className="font-display font-bold text-[44px] sm:text-[62px] leading-[0.98] tracking-tight mt-3">TensorOps</h1>
            <p className="text-[17px] sm:text-[19px] text-ink2 max-w-2xl mt-4 leading-relaxed">
              AI engineering firm — taking AI from strategy to production <em className="text-ink font-medium not-italic underline decoration-accent decoration-2 underline-offset-4">in weeks</em>.
              Lisbon · Porto · Remote.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 pt-2">
            <span className="stamp">Independent compilation</span>
            <span className="kicker !text-[9.5px] text-right">Not affiliated with TensorOps</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-6 pb-5 border-b-2 hairline kicker !text-[10px]">
          <span>Last compiled: <span className="text-ink font-semibold">{SNAPSHOT}</span></span>
          <span>Editor: <span className="text-ink font-semibold">{profile.name || "anonymous candidate"}</span></span>
          <span>Rev 4 · 14 sources · 3 confidence tiers</span>
          <span className="text-accent">Target seat: {junior.title}</span>
        </div>
      </Reveal>

      <Callout tone="info" title="Hatnote">
        This article is the entry page of the <strong className="text-ink">TensorOps Candidate Dossier</strong> — a Wikipedia-style knowledge base
        compiled entirely from public sources as an application for the Junior AI/ML Engineer role. Every factual claim carries a numbered citation;
        everything uncertain is flagged. For the analyst's summary, see the <button className="text-accent font-semibold hover:underline" onClick={() => nav("briefing")}>Mission Briefing</button>.
      </Callout>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 items-start">
        {/* ————— article body ————— */}
        <article className="min-w-0">
          <SectionHead num="1" title="Overview" />
          <Reveal className="space-y-4 text-[14.5px] leading-[1.75]">
            <p>
              <strong>TensorOps</strong> is a Europe-based AI engineering firm that positions itself on a single promise: taking AI
              <em> from strategy to production, in weeks</em>.<Cit n={11} /> The company builds production-grade AI systems for enterprise clients —
              its public materials reference Fortune&nbsp;500 engagements<Cit n={11} /> — with named case studies for <strong>Armis</strong> (agentic AI for
              proactive security)<Cit n={9} /> and <strong>Seeking Alpha</strong> (generative AI grounded on proprietary research data).<Cit n={10} />
            </p>
            <p>
              Operationally the firm is remote-first, anchored in <strong>Lisbon and Porto, Portugal</strong>, with careers copy selling “the freedom to do
              your best work from Lisbon, Porto, or wherever life takes you.”<Cit n={7} /> Hiring runs on Greenhouse's EU instance, which at snapshot time
              listed five open roles across Engineering and Sales — including the <strong>Junior AI/ML Engineer (Remote)</strong> seat this dossier
              targets.<Cit n={1} />
            </p>
            <p>
              Leadership, as far as public records show: <strong>Cláudio Fischer Lemos</strong> serves as CEO and co-founder (previously at Data Science
              Portugal — third-party directories only, treat as medium confidence)<Cit n={13} />, with <strong>José Bastos</strong> as COO, who also created
              the company's <em>TensorLearn</em> training product and is its public voice on AWS generative-AI certification.<Cit n={5} />
            </p>
          </Reveal>

          <SectionHead num="2" title="Business model" kicker="How the machine makes money" />
          <Reveal className="space-y-4 text-[14.5px] leading-[1.75]">
            <p>
              The core engine is <strong>high-velocity delivery consulting</strong>: enterprise clients hand TensorOps an AI initiative and the firm ships a
              production system on a weeks-scale cadence.<Cit n={11} /> The Armis case study states the split plainly — <em>“Armis owns the roadmap;
              TensorOps scales delivery”</em> — a capacity-and-expertise play rather than a product-license play.<Cit n={9} />
            </p>
            <p>
              Layered on top are <strong>productized assets</strong> that compound the consulting: <strong>CodeMesh</strong>, described in their own
              writing as an “enterprise hybrid stack” for coding agents,<Cit n={5} /> and <strong>TensorLearn</strong>, an AWS Certified Generative AI
              Developer (AIP-C01) exam-preparation track authored by the COO.<Cit n={5} /> Services fund the flywheel; products capture the repetition.
            </p>
            <p>
              The partnership strategy hedges platforms: in July 2026 TensorOps was named an <strong>OpenAI Select Partner</strong> within the OpenAI
              Partner Network,<Cit n={8} /> while simultaneously hiring an <strong>Alliances &amp; Partnerships Lead (AWS)</strong><Cit n={1} /> —
              platform-agnostic delivery with bets on both hyperscaler ecosystems.
            </p>
          </Reveal>

          <SectionHead num="3" title="Engineering doctrine" kicker="What the blog reveals about how they think" />
          <Reveal className="space-y-4 text-[14.5px] leading-[1.75]">
            <p>
              Unlike most consultancies, TensorOps publishes operating philosophy. Three named concepts recur: <strong>Harness Engineering</strong> — “the
              architecture around the model: the tools, context, state, feedback, and verification that let AI agents work through long tasks on their
              own”;<Cit n={5} /> <strong>Grounded Autonomy</strong>, the protocol that keeps generative answers anchored to proprietary data (built for
              Seeking Alpha);<Cit n={10} /> and <strong>Job Cards</strong>, an observability stance that “documenting the work beats tracing LLM
              calls.”<Cit n={5} />
            </p>
            <p>
              The technical depth is real: nine-step practical guides to agent reinforcement fine-tuning comparing TRL, verl, OpenRLHF, Unsloth and NeMo
              RL with GPU sizing; a sober H200-economics case for hybrid self-hosting; a 2026 field guide to Mixture-of-Experts systems.<Cit n={5} /> A
              junior engineer here would be apprenticing into a <em>doctrine</em>, not a ticket queue.
            </p>
          </Reveal>

          <SectionHead num="4" title="Open questions" kicker="Honest gaps in the record" />
          <Reveal>
            <Callout tone="warn" title="Unverified — ask in the first call">
              Founding year and funding are not public (a Crunchbase profile exists without numbers).<Cit n={12} /> Headcount is undisclosed — LinkedIn
              suggests a compact senior core.<Cit n={11} /> The junior role's exact Greenhouse text was rate-limited during this ingest; the requirement
              matrix in <button className="text-accent font-semibold hover:underline" onClick={() => nav("careers")}>Open Roles</button> is reconstructed
              from listing mirrors and should be verified line-by-line before applying.<Cit n={2} />
            </Callout>
          </Reveal>

          {/* ————— references ————— */}
          <section id="references" className="mt-12 scroll-mt-24">
            <SectionHead num="§" title="References" kicker="Provenance — every claim above traces here" />
            <ol className="space-y-1.5">
              {SOURCES.map((s, i) => (
                <li key={s.id} className="flex items-baseline gap-3 text-[12.5px] leading-snug py-1.5 border-b border-linesoft last:border-0">
                  <span className="num-chip shrink-0">{i + 1}</span>
                  <span className="min-w-0">
                    <ExtLink href={s.url} className="!text-[13px]">{s.label}</ExtLink>
                    <span className="text-ink2"> — {s.note}</span>
                  </span>
                  <span className={`tag shrink-0 ml-auto ${s.status === "ok" ? "text-ok border-ok/40" : s.status === "partial" ? "text-warn border-warn/40" : "text-ink2"}`}>{s.status}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ————— see also navbox ————— */}
          <nav className="card mt-12 p-4">
            <Kicker className="mb-3">See also — continue the dossier</Kicker>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {NAV.flatMap((g) => g.items).filter((it) => it.id !== "overview").map((it) => (
                <button key={it.id} className="navlink !py-2 border hairline rounded-md bg-panel2/50" onClick={() => nav(it.id)}>
                  <span className="font-mono text-[10px] text-accent">{it.num}</span>
                  <span className="flex-1">{it.label}</span>
                  <span className="text-accent">→</span>
                </button>
              ))}
            </div>
          </nav>
        </article>

        {/* ————— infobox ————— */}
        <Reveal delay={120} className="lg:sticky lg:top-24 mt-10 lg:mt-1">
          <div className="card overflow-hidden">
            <div className="px-4 py-3.5 bg-panel2 border-b hairline flex items-center gap-3">
              <Mark size={30} />
              <div>
                <div className="font-display font-bold text-[16px] leading-none tracking-tight">TensorOps</div>
                <div className="kicker !text-[9px] mt-1">Company infobox</div>
              </div>
            </div>
            <div className="px-4 py-2">
              {FACTS.map((f) => (
                <InfoRow key={f.label} label={f.label}>
                  <span className="flex flex-col items-end gap-1">
                    <span className="text-[12.5px] leading-snug max-w-[168px]">{f.value}</span>
                    <span className="flex items-center gap-2">
                      <ConfTag c={f.confidence} />
                      <span className="font-mono text-[9.5px] text-ink2">{sourceById(f.sourceId)?.id.replace("s-", "")}</span>
                    </span>
                  </span>
                </InfoRow>
              ))}
            </div>
            <div className="px-4 py-3 border-t hairline bg-panel2/60">
              <ExtLink href="https://tensorops.ai" className="!text-[12.5px]">tensorops.ai</ExtLink>
              <div className="text-[10.5px] text-ink2 mt-1.5 leading-snug">Confidence tiers: <span className="text-ok">high</span> = primary source, <span className="text-warn">medium</span> = corroborated, <span className="text-bad">low</span> = inference.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
