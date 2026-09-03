import React, { useMemo } from "react";
import { JOBS, PITCH, PLAN_306090, REQUIREMENTS, SNAPSHOT } from "../data/dossier";
import type { Coverage } from "../data/dossier";
import { useStore } from "../lib/store";
import { Bar, Callout, CopyBtn, CoverageTag, ExtLink, Kicker, Reveal, SectionHead, coveragePct } from "../components/ui";

const CYCLE: Coverage[] = ["strong", "working", "learning"];
const PHASE_COLOR: Record<string, string> = { accent2: "var(--accent2)", accent: "var(--accent)", ok: "var(--ok)" };

export default function Application() {
  const { profile, setProfile, assess, setCoverage, toast, nav } = useStore();
  const junior = JOBS.find((j) => j.target)!;
  const name = profile.name.trim() || "your name";
  const first = profile.name.trim() ? profile.name.trim().split(" ")[0] : "candidate";

  const readiness = useMemo(() => {
    const vals = REQUIREMENTS.map((r) => coveragePct(assess[r.id] ?? r.defaultCoverage));
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [assess]);

  const coverNote = useMemo(() => {
    const lines = REQUIREMENTS.map((r) => {
      const c = assess[r.id] ?? r.defaultCoverage;
      const verb = c === "strong" ? "Strong:" : c === "working" ? "Building:" : "Actively learning:";
      return `  • ${verb} ${r.text}`;
    });
    return [
      `Subject: Junior AI/ML Engineer — application with the homework attached`,
      ``,
      `Hi TensorOps team,`,
      ``,
      `I'm ${name}${profile.email ? ` (${profile.email})` : ""}, applying for the Junior AI/ML Engineer role (${junior.location}).`,
      ``,
      `Instead of a cover letter about potential, I built the work sample: a sourced, Wikipedia-style knowledge base of your company — 12 blog posts indexed, 14 public sources traced, every claim confidence-tagged, uncertainties included. It exports its own dataset as JSON. This message is the README; the dossier is the repo${profile.github ? ` (${profile.github})` : ""}.`,
      ``,
      `Against the role, honestly:`,
      ...lines,
      ``,
      `I've read all twelve blog posts. Harness Engineering and the Job-Card approach to observability are the two ideas I keep returning to — I'd like to argue about both in an interview.`,
      ``,
      `My 30/60/90 plan: absorb the doctrine and ship a reproduced demo in month one; own a bounded client slice with senior review by day 60; present an unprompted, measured improvement by day 90.`,
      ``,
      `Compiled ${SNAPSHOT} · snapshot v4`,
      `— ${name}`,
    ].join("\n");
  }, [name, profile.email, profile.github, assess, junior.location]);

  const field = "w-full bg-panel2/70 border hairline rounded px-3 py-2 text-[13.5px] outline-none focus:border-accent transition-colors placeholder:text-ink2/60";

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
      <Reveal className="border-b-2 hairline pb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker accent>07 · Application</Kicker>
          <h1 className="font-display font-bold text-[34px] sm:text-[46px] tracking-tight leading-none mt-3">My application</h1>
          <p className="text-ink2 text-[15px] mt-3 max-w-2xl">The dossier turns inward: who's applying, how honest the fit matrix is, the first-90-days plan, and a cover note that generates itself from your assessments.</p>
        </div>
        <span className="stamp">For review</span>
      </Reveal>

      {/* profile */}
      <SectionHead num="7.1" title="Candidate profile" kicker="Stored locally in this browser — used across the dossier" />
      <Reveal className="card p-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="block">
            <span className="kicker block mb-1.5">Full name</span>
            <input className={field} placeholder="e.g. Mariana Costa" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </label>
          <label className="block">
            <span className="kicker block mb-1.5">Email</span>
            <input className={field} placeholder="you@domain.dev" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </label>
          <label className="block">
            <span className="kicker block mb-1.5">GitHub / portfolio</span>
            <input className={field} placeholder="github.com/you" value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} />
          </label>
          <label className="block">
            <span className="kicker block mb-1.5">Focus</span>
            <input className={field} value={profile.focus} onChange={(e) => setProfile({ ...profile, focus: e.target.value })} />
          </label>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button className="btn" onClick={() => toast(`Profile saved — dossier now authored by ${first}`)}>Save profile</button>
          <span className="text-[12px] text-ink2">Auto-persists to localStorage; appears in the article header and cover note.</span>
        </div>
      </Reveal>

      {/* pitch */}
      <SectionHead num="7.2" title="The pitch" kicker="Three paragraphs, zero adjectives without evidence" />
      <Reveal className="card p-5 sm:p-7">
        <div className="font-display font-bold text-[22px] sm:text-[26px] tracking-tight leading-tight">“{PITCH.headline}”</div>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          {PITCH.paras.map((p, i) => (
            <div key={i} className="text-[13.5px] text-ink2 leading-relaxed border-l-2 hairline pl-4" style={{ borderColor: i === 0 ? "var(--accent)" : undefined }}>
              {p.replace("This dossier", i === 0 ? `Filed by ${first}, this dossier` : "This dossier")}
            </div>
          ))}
        </div>
      </Reveal>

      {/* readiness matrix */}
      <SectionHead num="7.3" title="Fit matrix, live" kicker={`Readiness ${readiness}% — statuses sync with Open Roles; tap to change`} />
      <Reveal className="card p-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1"><Bar value={readiness} delay={100} /></div>
          <span className="font-display font-bold text-[24px] text-accent">{readiness}%</span>
        </div>
        <div className="space-y-3.5">
          {REQUIREMENTS.map((r, i) => {
            const c = assess[r.id] ?? r.defaultCoverage;
            return (
              <div key={r.id} className="grid sm:grid-cols-[1fr_150px_120px] items-center gap-x-5 gap-y-2">
                <div className="text-[13.5px] font-medium">{r.text}</div>
                <Bar value={coveragePct(c)} color={c === "strong" ? "var(--ok)" : c === "working" ? "var(--accent2)" : "var(--warn)"} delay={i * 50} />
                <div className="justify-self-start sm:justify-self-end">
                  <CoverageTag c={c} onClick={() => { setCoverage(r.id, CYCLE[(CYCLE.indexOf(c) + 1) % CYCLE.length]); toast("Assessment updated — cover note regenerated", "info"); }} />
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* 30/60/90 */}
      <SectionHead num="7.4" title="First 90 days" kicker="The plan a mentor would hope you already had" />
      <div className="grid md:grid-cols-3 gap-4">
        {PLAN_306090.map((p, i) => (
          <Reveal key={p.phase} delay={i * 80} className="card p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: PHASE_COLOR[p.color] }} />
            <div className="kicker" style={{ color: PHASE_COLOR[p.color] }}>{p.phase}</div>
            <div className="font-display font-bold text-[22px] tracking-tight mt-1">{p.label}</div>
            <ul className="mt-3.5 space-y-2.5">
              {p.items.map((it, j) => (
                <li key={j} className="flex gap-2.5 text-[12.5px] text-ink2 leading-relaxed">
                  <span className="font-mono text-[10px] mt-[3px] shrink-0" style={{ color: PHASE_COLOR[p.color] }}>{String(j + 1).padStart(2, "0")}</span>
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* cover note */}
      <SectionHead num="7.5" title="Cover note — generated from the matrix" kicker="Regenerates as you edit profile and assessments" />
      <Reveal>
        <div className="codeblock p-5 whitespace-pre-wrap !text-[12.5px] !leading-[1.75]">{coverNote}</div>
        <div className="flex gap-3 mt-4 flex-wrap">
          <CopyBtn text={coverNote} label="Copy cover note" />
          <CopyBtn text={JSON.stringify({ profile, assessments: assess, readiness, generated: SNAPSHOT }, null, 2)} label="Copy as JSON" />
          <ExtLink href={junior.url} className="btn btn-solid">Apply on Greenhouse</ExtLink>
        </div>
      </Reveal>

      <Callout tone="ok" title="Closing note">
        Ship the dossier link in the application's “anything else?” field, reference one doctrine concept by name in the cover note, and let the
        <button className="text-accent font-semibold hover:underline mx-1" onClick={() => nav("system")}>provenance log</button>
        prove the rigor. The work is the interview.
      </Callout>
    </div>
  );
}
