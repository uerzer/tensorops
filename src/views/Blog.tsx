import React, { useMemo, useState } from "react";
import { BLOG, BLOG_TAGS } from "../data/dossier";
import { ExtLink, Kicker, Reveal, SectionHead } from "../components/ui";

const MUST_READ = [
  "Harness Engineering: The Architecture Around the Model",
  "Agent RFT, Practical Guide",
  "Building “Ask Seeking Alpha”",
];

export default function Blog() {
  const [tag, setTag] = useState<string>("All");
  const posts = useMemo(() => BLOG.filter((b) => tag === "All" || b.tags.includes(tag)), [tag]);

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      <Reveal className="border-b-2 hairline pb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker accent>05 · Intelligence</Kicker>
          <h1 className="font-display font-bold text-[34px] sm:text-[46px] tracking-tight leading-none mt-3">Blog digest</h1>
          <p className="text-ink2 text-[15px] mt-3 max-w-2xl">All twelve posts ingested from tensorops.ai/blog during the recon pass — dated, tagged and summarized. This is the reading list an interviewer assumes nobody finished.</p>
        </div>
        <div className="font-mono text-[12px] text-ink2">{posts.length}/{BLOG.length} shown · May–Jul 2026</div>
      </Reveal>

      {/* tag filter */}
      <div className="flex gap-2 flex-wrap mt-7">
        {["All", ...BLOG_TAGS].map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`tag !text-[11px] !py-1.5 transition-all cursor-pointer ${tag === t ? "!bg-accent !text-accentink !border-accent scale-105" : "hover:border-accent hover:text-accent"}`}
          >
            {t} <span className="opacity-70">{t === "All" ? BLOG.length : BLOG.filter((b) => b.tags.includes(t)).length}</span>
          </button>
        ))}
      </div>

      {/* digest list */}
      <div className="border-t hairline mt-6">
        {posts.map((b, i) => {
          const must = MUST_READ.includes(b.title);
          return (
            <Reveal key={b.title} delay={Math.min(i, 6) * 45} className={`border-b hairline py-5 grid sm:grid-cols-[110px_1fr_auto] gap-2 sm:gap-6 items-start group ${must ? "bg-accent/[0.045] -mx-3 px-3 rounded" : ""}`}>
              <div>
                <div className="font-mono text-[12px] text-ink2">{b.date}</div>
                <div className="flex gap-1.5 flex-wrap mt-2">
                  {b.tags.map((t) => <span key={t} className="tag !text-[9.5px]">{t}</span>)}
                </div>
                {must && <div className="kicker kicker-accent !text-[9px] mt-2">★ interview fuel</div>}
              </div>
              <div>
                <div className="font-display font-semibold text-[17px] leading-snug group-hover:text-accent transition-colors">{b.title}</div>
                <p className="text-[13.5px] text-ink2 mt-1.5 leading-relaxed max-w-3xl">{b.summary}</p>
              </div>
              <ExtLink href={b.url} className="!text-[12px] shrink-0 mt-1">Read</ExtLink>
            </Reveal>
          );
        })}
      </div>

      <SectionHead num="5.1" title="If you only read three" kicker="Maximum interview leverage per minute" />
      <div className="grid md:grid-cols-3 gap-3">
        {MUST_READ.map((t, i) => {
          const p = BLOG.find((b) => b.title === t)!;
          return (
            <Reveal key={t} delay={i * 70} className="card p-4 flex flex-col">
              <span className="num-chip self-start">{i + 1}</span>
              <div className="font-display font-semibold text-[14.5px] mt-2.5 leading-snug">{t}</div>
              <p className="text-[12px] text-ink2 mt-2 leading-relaxed flex-1">{p.summary}</p>
              <ExtLink href={p.url} className="!text-[12px] mt-3">Open post</ExtLink>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
