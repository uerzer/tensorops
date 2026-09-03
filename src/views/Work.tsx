import React from "react";
import { BLOG } from "../data/dossier";
import { useStore } from "../lib/store";
import { Callout, ExtLink, Kicker, Reveal, SectionHead, SrcChip } from "../components/ui";

const PILLARS = [
  {
    n: "I", title: "Delivery consulting — the engine",
    body: "Enterprise AI shipped on a weeks-scale cadence: strategy in, production system out. The Armis engagement states the model plainly — client owns the roadmap, TensorOps scales delivery. This is the revenue core and the training ground the junior seat plugs into.",
    src: "s-armis",
  },
  {
    n: "II", title: "Products — the compounding layer",
    body: "CodeMesh: an “enterprise hybrid stack” for coding agents, positioned against Claude Code on price. TensorLearn: AWS Certified Generative AI Developer (AIP-C01) exam prep authored by the COO. Repetition from consulting gets captured as product.",
    src: "s-blog",
  },
  {
    n: "III", title: "Doctrine — the moat",
    body: "Named, published operating philosophy: Harness Engineering (the architecture around the model), Grounded Autonomy (answers anchored to proprietary data), Job Cards (observability by documenting the work). A vocabulary clients and hires both buy into.",
    src: "s-blog",
  },
];

const JUDGMENTS = [
  { stance: "Hybrid inference is the answer", detail: "Self-host GPUs for high-volume private workloads (H200 economics + quantization); API for the frontier. Not ideology — arithmetic.", post: "Is It Time to Self-Host LLMs Already?" },
  { stance: "Prompt engineering has a ceiling", detail: "When it stops being enough, agent reinforcement fine-tuning is the next lever — with a nine-step practical guide to prove they've done it.", post: "Agent RFT, Practical Guide" },
  { stance: "Trace the work, not the calls", detail: "Job Cards and “Agent Bureaucracy”: observability that survives contact with real agent behavior.", post: "AgentOps & LLM Observability, Explained" },
  { stance: "MoE is the production default", detail: "GPT-4 → Kimi K2 all route through Mixture-of-Experts; the trade-offs are systems problems, and systems problems are their business.", post: "LLM Mixture of Experts Explained" },
];

export default function Work() {
  const { nav } = useStore();
  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      <Reveal className="border-b-2 hairline pb-6">
        <Kicker accent>02 · Intelligence</Kicker>
        <h1 className="font-display font-bold text-[34px] sm:text-[46px] tracking-tight leading-none mt-3">What they build</h1>
        <p className="text-ink2 text-[15px] mt-3 max-w-2xl">Three revenue layers, two public case files, and a set of technical judgments extracted from the blog — the clearest window into what a junior engineer would actually spend days on.</p>
      </Reveal>

      {/* pillars — asymmetric ledger, not equal cards */}
      <div className="mt-8 border-t hairline">
        {PILLARS.map((p, i) => (
          <Reveal key={p.n} delay={i * 70} className="border-b hairline py-6 grid sm:grid-cols-[90px_260px_1fr] gap-3 sm:gap-6 items-baseline group">
            <div className="font-display font-bold text-[30px] text-panel2 group-hover:text-accent transition-colors leading-none" style={{ WebkitTextStroke: "1.5px var(--accent)" }}>{p.n}</div>
            <div>
              <div className="font-display font-semibold text-[18px] leading-tight">{p.title}</div>
              <div className="mt-2"><SrcChip id={p.src} /></div>
            </div>
            <p className="text-[14px] text-ink2 leading-relaxed">{p.body}</p>
          </Reveal>
        ))}
      </div>

      {/* case files */}
      <SectionHead num="2.1" title="Case files" kicker="Named, public, production-grade" />
      <div className="grid md:grid-cols-2 gap-5">
        <Reveal className="card p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <Kicker accent>File A — Security</Kicker>
            <span className="tag">agentic ai</span>
          </div>
          <div className="font-display font-bold text-[22px] tracking-tight mt-2.5">Armis × TensorOps</div>
          <div className="text-[13.5px] text-ink2 mt-2 leading-relaxed flex-1">
            A multi-agent platform closing the loop between detection and action across enterprise security environments.
          </div>
          <div className="mt-4 space-y-2 text-[13px]">
            <div className="flex gap-2"><span className="kicker shrink-0 w-20">Model</span><span>Armis owns the roadmap; TensorOps scales delivery.</span></div>
            <div className="flex gap-2"><span className="kicker shrink-0 w-20">Proves</span><span className="text-ink2">Agents are in production, not in demos — and delivery capacity is the product.</span></div>
          </div>
          <div className="mt-4"><ExtLink href="https://tensorops.ai/blog/armis-scaling-agentic-ai-for-proactive-security" className="!text-[13px]">Read the case study</ExtLink></div>
        </Reveal>
        <Reveal delay={80} className="card p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <Kicker accent>File B — Fintech data</Kicker>
            <span className="tag">grounded autonomy</span>
          </div>
          <div className="font-display font-bold text-[22px] tracking-tight mt-2.5">“Ask Seeking Alpha”</div>
          <div className="text-[13.5px] text-ink2 mt-2 leading-relaxed flex-1">
            A multi-agent router plus a “Grounded Autonomy” protocol connecting generative AI to proprietary research data — minimizing hallucinations, keeping answers fresh.
          </div>
          <div className="mt-4 space-y-2 text-[13px]">
            <div className="flex gap-2"><span className="kicker shrink-0 w-20">Model</span><span>GenAI over a proprietary corpus with freshness guarantees.</span></div>
            <div className="flex gap-2"><span className="kicker shrink-0 w-20">Proves</span><span className="text-ink2">They ship retrieval + routing + evaluation stacks, not chat wrappers.</span></div>
          </div>
          <div className="mt-4"><ExtLink href="https://tensorops.ai/blog/building-ask-seeking-alpha" className="!text-[13px]">Read the case study</ExtLink></div>
        </Reveal>
      </div>

      {/* technical judgments */}
      <SectionHead num="2.2" title="Technical judgment, extracted" kicker="Where their engineering opinions land — from the blog" />
      <div className="grid sm:grid-cols-2 gap-3">
        {JUDGMENTS.map((j, i) => {
          const post = BLOG.find((b) => b.title === j.post);
          return (
            <Reveal key={j.stance} delay={i * 60} className="card p-4">
              <div className="flex items-start gap-3">
                <span className="num-chip mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="font-display font-semibold text-[15px]">{j.stance}</div>
                  <p className="text-[13px] text-ink2 mt-1.5 leading-relaxed">{j.detail}</p>
                  {post && <ExtLink href={post.url} className="!text-[12px] mt-2">{post.title}</ExtLink>}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Callout tone="accent" title="Why this matters for the application">
        In an interview, reference the doctrine by name — ask how <em>Harness Engineering</em> changes what a junior ships in week one, or how Job Cards
        are used on live client work. Then pivot to the evidence base: the <button className="text-accent font-semibold hover:underline" onClick={() => nav("stack")}>stack analysis</button> and
        the <button className="text-accent font-semibold hover:underline" onClick={() => nav("blog")}>full blog digest</button>.
      </Callout>
    </div>
  );
}
