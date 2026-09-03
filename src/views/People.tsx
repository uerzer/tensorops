import React from "react";
import { PEOPLE } from "../data/dossier";
import { useStore } from "../lib/store";
import { Callout, ConfTag, ExtLink, Kicker, Reveal, SectionHead, SrcChip } from "../components/ui";

const CULTURE = [
  { sig: "“Lisbon, Porto, or wherever life takes you”", read: "Remote-first is a selling point on the careers page, not a footnote. Async discipline is expected, not taught.", src: "s-careers" },
  { sig: "“Infra, AI, and everything in between”", read: "Instagram bio range: they want generalists comfortable across the stack — good news for a junior with breadth.", src: "s-insta" },
  { sig: "Founding Talent Partner hired early", read: "Recruiting is a growth lever, not an afterthought — the junior pipeline is deliberate.", src: "s-linkedin" },
  { sig: "COO teaches the AWS cert publicly", read: "Leaders do the unglamorous teaching work. Mentorship is cultural, not a policy document.", src: "s-blog" },
  { sig: "Mid/Senior hire “mentors a growing junior team”", read: "The mentorship seat for this role is being built right now — join at the moment the structure forms.", src: "s-greenhouse" },
  { sig: "Speakers at MCP Conference Lisbon", read: "Public technical presence; the team tests ideas in the open before publishing them.", src: "s-insta" },
];

export default function People() {
  const { nav } = useStore();
  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      <Reveal className="border-b-2 hairline pb-6">
        <Kicker accent>04 · Intelligence</Kicker>
        <h1 className="font-display font-bold text-[34px] sm:text-[46px] tracking-tight leading-none mt-3">People &amp; culture</h1>
        <p className="text-ink2 text-[15px] mt-3 max-w-2xl">The public org chart — and what the hiring pattern says about how it feels to work there. Names carry confidence tiers; LinkedIn is a source, not a scripture.</p>
      </Reveal>

      <SectionHead num="4.1" title="Public org chart" kicker="Assembled from LinkedIn, blog bylines and directories" />
      <div className="border-t hairline">
        {PEOPLE.map((p, i) => (
          <Reveal key={p.name} delay={i * 50} className="border-b hairline py-4 grid sm:grid-cols-[240px_1fr_auto] gap-2 sm:gap-6 items-baseline">
            <div>
              <div className="font-display font-semibold text-[16px]">{p.name}</div>
              <div className="kicker !text-[10px] text-accent mt-0.5">{p.role}</div>
            </div>
            <p className="text-[13.5px] text-ink2 leading-relaxed">{p.note}</p>
            <div className="flex items-center gap-2.5"><ConfTag c={p.confidence} /><SrcChip id={p.sourceId} /></div>
          </Reveal>
        ))}
      </div>

      <SectionHead num="4.2" title="Culture, read from artifacts" kicker="Signals rather than vibes" />
      <div className="grid md:grid-cols-2 gap-3">
        {CULTURE.map((c, i) => (
          <Reveal key={c.sig} delay={i * 55} className="card p-4">
            <div className="font-mono text-[12.5px] text-accent leading-snug">“{c.sig}”</div>
            <p className="text-[13px] text-ink2 mt-2 leading-relaxed">{c.read}</p>
            <div className="mt-2.5"><SrcChip id={c.src} /></div>
          </Reveal>
        ))}
      </div>

      <Callout tone="ok" title="The junior's actual reporting line">
        The Mid/Senior AI Engineer listing — open right now — exists partly to <em>mentor the growing junior ML team</em>. Whoever takes that seat
        (ex-Microsoft/Meta research lead Carlos Leite's tier of senior) is likely the day-to-day mentor. That's the real comp package of a junior role:
        the slope of the person reviewing your PRs.
      </Callout>

      <div className="flex gap-3 flex-wrap">
        <button className="btn" onClick={() => nav("careers")}>See all five open roles →</button>
        <ExtLink href="https://www.linkedin.com/company/tensorops" className="btn">Company page</ExtLink>
      </div>
    </div>
  );
}
