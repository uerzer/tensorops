# AI Stack Intelligence — data layer

Verified datasets for the leaderboard, price calculator, and GPU price pages. The site (`../site/`) reads these three JSON files; `sources.md` is the human-readable audit trail (every figure → URL → date → confidence). All files verified **2026-10-11**.

## Files

| File | Shape | Contents |
|---|---|---|
| `leaderboard.json` | `{updated, source, models[]}` | Top 40 LLMs by LMArena Elo (style-controlled), with org, votes, license, LMArena-listed $/M + context, and the unstyle-controlled Elo from the open dataset in `extra` |
| `prices.json` | `{updated, models[]}` | 56 per-1M-token API price entries across 10 providers; `confidence: official \| secondary`; long-context tiers, cache pricing, promos in `extra` |
| `gpu.json` | `{updated, offers[]}` | 33 GPU offers across RunPod, Lambda, Modal, Vast.ai (marketplace floor), Azure; on-demand $/GPU-hr |
| `sources.md` | audit trail | figure → URL → date → confidence, plus cross-check notes and known gaps |

## Column meanings

**leaderboard.json.models[n]**
- `rank` — LMArena's published overall style-controlled rank (1 = best).
- `model` — LMArena's display name (e.g. `claude-opus-5.5-high`; suffixes like `-high`/`-max` are reasoning-effort variants).
- `org` — publishing organization (e.g. Anthropic, Google, Meta).
- `elo` — style-controlled Bradley-Terry/Elo rating; 100 points ≈ 64% head-to-head win rate.
- `extra.elo_unstyle_controlled` — same model's rating from the HF open dataset without style control (ranks differently; kept for transparency).
- `extra.votes` — vote count backing the rating (confidence proxy).
- `extra.license` — `Proprietary` or open-weight designation as listed by LMArena.
- `extra.input_usd_per_m` / `output_usd_per_m` / `context_tokens` — **LMArena-listed** API price/context (convenience only; authoritative prices are `prices.json`).
- `extra.release_type` — `pre_release` marks models LMArena flags as preliminary.

**prices.json.models[n]**
- `provider` / `model` — vendor and their model ID.
- `input_per_1m_usd` / `output_per_1m_usd` — USD per 1M tokens, standard tier, headline (short/<=threshold) context. Tiered/long-context rates, batch rates, cache pricing, off-peak rates, and promos are in `extra`.
- `context_tokens` — max context window.
- `source` — object with `url` + `note`; `verified` — YYYY-MM-DD of verification; `confidence` — `official` (provider's own page/API) or `secondary` (reputable aggregator).

**gpu.json.offers[n]**
- `provider`, `gpu_class`, `vram_gb`, `unit_usd_per_hour` — on-demand per-GPU rate.
- Modal's numbers are converted from per-second serverless rates (`extra.per_second_usd` × 3600).
- Vast.ai rows are **marketplace floors** (cheapest live single-GPU offer), not rate-card prices.
- Azure row is per-GPU equivalent of an 8-GPU ND96isr_H100_v5 VM (`extra.vm_usd_per_hour` = 98.32, eastus Linux).

## Refresh procedure

Re-verification is a re-run of the capture steps (no cron wired up yet — BUILD.md Week-2 scope):

1. **Leaderboard** — `GET https://arena.ai/leaderboard/chat/text` and extract the embedded `leaderboard-sets/public/leaderboards/text-overall-style_control/leaderboard-snapshots/latest` JSON from the Next.js flight data (regex on `self.__next_f.push` chunks, bracket-match the `entries` array); or download `https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/resolve/main/text/latest-00000-of-00001.parquet` and read rows where `category == "overall"` (needs `pyarrow`). Cross-check votes between the two.
2. **Prices** — re-fetch each official page in `prices.json[*].source.url`; OpenAI's page also exists as `<url>.md`; Azure-style JSON APIs preferred where they exist. Spot-check against `https://openrouter.ai/api/v1/models`.
3. **GPU** — RunPod/Lambda/Modal need a JS-capable browser read; Vast via `POST https://console.vast.ai/api/v0/bundles/` body `{"query":{}}` (filter client-side); Azure via the retail prices API (see sources.md for the exact filter).
4. Update `updated` / `verified` fields, re-check the promo windows listed in sources.md §5, and log any changed number in sources.md.

Capture tooling from the original run: raw files in `/home/opc/.hermes/cache/scratch/` (may be pruned); the builder script `build_data.py` (same dir) regenerates all three JSON files from those captures.

## Known gaps

- GCP + AWS GPU on-demand rates could not be verified from source (JS-only pages, dead JSON endpoints) — omitted rather than guessed.
- Mistral: only Mistral Large priced officially; other entries secondary.
- Meta: no first-party price page; OpenRouter + LMArena agree, flagged secondary.
- Qwen prices are the International (Singapore) USD rates; other regions differ.
- Leaderboard Elo is a 2026-10-08 snapshot; LMArena updates continuously.

Full details with URLs: `sources.md`.
