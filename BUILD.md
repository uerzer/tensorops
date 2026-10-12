# BUILD — Week 1 work order (AI Stack Intelligence)

Status: ACTIVE — owner said go (Oct 11, 2026).
Rule: every projection in THESIS.md is a hypothesis with a kill gate. The only metric that counts is collected revenue.

## Deliverables this week
1. `data/` — verified model leaderboard + API price table (real sources, dated)
2. `site/` — production-quality static site (leaderboard, price calculator, 5 comparison pages), builds clean, deploy bundle ready

## Data contracts
`data/leaderboard.json`
```json
{"updated": "YYYY-MM-DD", "source": "LMArena open dataset (CC-BY-4.0) <url>", "models": [{"rank": 1, "model": "...", "org": "...", "elo": 1400, "extra": {}}]}
```
`data/prices.json`
```json
{"updated": "YYYY-MM-DD", "models": [{"provider": "openai", "model": "...", "input_per_1m_usd": 1.25, "output_per_1m_usd": 10.0, "context_tokens": 400000, "source": "<official pricing url>", "verified": "YYYY-MM-DD", "confidence": "official|secondary"}]}
```
`data/gpu.json` — same shape, `unit_usd_per_hour`, provider, gpu_class, source.
`data/sources.md` — every figure → URL → date → confidence (official page vs secondary).

## File ownership (no cross-writes)
- Data agent: `/home/opc/ai-media-ventures/data/` only.
- Site agent: `/home/opc/ai-media-ventures/site/` only; reads `../data/*.json` via the contracts above; if a file is missing, build against the contract with sample fixtures in `site/fixtures/`.

## Owner checklist (15 minutes, unblocks deploy + revenue plumbing)
1. GitHub PAT for the VM → deploys this site AND unblocks the pouredart IndexNow push (same standing blocker).
2. beehiiv account (free → Scale at 2,500 subs).
3. SparkLoop (attach to beehiiv).
4. PartnerStack + affiliate applications: Jasper, Writesonic, ElevenLabs, RunPod.
