# Sources — AI Stack Intelligence data foundation

Every figure in `leaderboard.json`, `prices.json`, and `gpu.json`, with the URL it came from, the date it was verified (2026-10-11 unless noted), and a confidence flag. **Official** = the provider's own page or API. **Secondary** = a reputable third party (aggregator, open dataset) used when the provider publishes no first-party price. Nothing in these files was invented; anything that could not be verified was left out.

Verification environment note: the VM's IP is datacenter-flagged; most provider pages were fetched successfully via curl / server-rendered docs / public APIs. Pages that render prices only via client-side JS were read with a real browser.

---

## 1. Leaderboard (`leaderboard.json`) — 40 models

| What | Source | URL | Confidence |
|---|---|---|---|
| Rank, model, org, Elo (style-controlled), votes, license, listed $/M input+output, context | LMArena Text Arena, overall style-controlled leaderboard snapshot, captured 2026-10-11 | https://arena.ai/leaderboard/chat/text (lmarena.ai/leaderboard/text redirects here) — embedded leaderboard JSON extracted from the served HTML | official |
| Elo cross-check (unstyle-controlled ratings, per-category rows incl. `overall`) | Hugging Face dataset `lmarena-ai/leaderboard-dataset`, file `text/latest-00000-of-00001.parquet` (10,974 rows; publish date 2026-10-08) | https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset — rev `e16f9023298691b4596eca61b4e31161dff31200`, license CC-BY-4.0, last modified 2026-10-10 | official (CC-BY-4.0) |

Cross-check result: **all 40 captured models matched** by model name to the HF dataset rows; vote counts agree between both surfaces. Differences between the two Elo columns are expected and by design: the `elo` field is the style-controlled Bradley-Terry rating (LMArena's default display), `extra.elo_unstyle_controlled` is the raw rating from the open dataset.

Notes:
- LMArena lists API prices on the board itself ($/M in/out per model). Those numbers are kept in `extra.input_usd_per_m` / `extra.output_usd_per_m` as LMArena-listed values; authoritative per-provider pricing lives in `prices.json`.
- `extra.context_tokens` on the leaderboard is LMArena-listed context; same caveat.
- The `elo` snapshot used is dated 2026-10-08 (publish date); captured 2026-10-11.

## 2. Model API prices (`prices.json`) — 56 entries

### OpenAI — official
- URL: https://developers.openai.com/api/docs/pricing (markdown mirror of https://platform.openai.com/docs/pricing), fetched 2026-10-11; context window for gpt-5.5 from https://developers.openai.com/api/docs/models/gpt-5.5
- Covers: gpt-5.5 ($5/$30; long-context >272K: $10/$45), gpt-5.5-pro ($30/$180; LC $60/$270), gpt-5.4 ($2.50/$15; LC $5/$22.50), gpt-5.4-mini ($0.75/$4.50), gpt-5.4-nano ($0.20/$1.25), gpt-5.6-sol ($4/$20, promo through 2026-11-21), gpt-5.6-terra ($2/$12), gpt-5.6-luna ($0.20/$1.20), gpt-6-astra ($10/$50), gpt-6.1-sol ($2/$10), gpt-6-luna ($0.10/$0.50). All "standard tier, short context (≤272K)" rates; long-context rates in `extra.long_context`.
- Context windows not stated on the pricing page were taken from OpenRouter (see secondary section below) and flagged in `extra.ctx_note`.

### Anthropic — official
- URL: https://docs.anthropic.com/en/docs/about-claude/pricing ("For the most current pricing information, visit claude.com/pricing"), fetched 2026-10-11
- Covers: Fable 5.1 ($10/$50), Opus 5.5 ($4/$20, fast mode $8/$40), Sonnet 5.5 ($2/$10), Haiku 5.5 ($0.10/$0.50 for prompts ≤100K; $0.50/$2.50 >100K), Fable 5 ($10/$50), Opus 5 ($5/$25, fast mode $10/$50), Opus 4.8/4.7/4.6/4.5 ($5/$25), Sonnet 4.6 ($3/$15), Sonnet 4.5 ($3/$15), Haiku 4.5 ($1/$5). Page states Claude 4.6+ models include the full 1M-token context window at standard pricing; pre-4.6 context windows from OpenRouter, flagged.
- Extras captured: prompt-cache write/read multipliers where listed.

### Google — official
- URL: https://ai.google.dev/gemini-api/docs/pricing (page footer: "Last updated 2026-10-09 UTC"), fetched 2026-10-11
- Covers: gemini-3.8-flash ($0.75/$3.75 promo through 2026-12-31; $1.50/$7.50 from 2027-01-01), gemini-3.6-flash (same), gemini-3.5-flash-lite ($0.30/$2.50), gemini-3-flash-preview ($0.50/$3.00), gemini-3.1-pro-preview ($2/$12 ≤200K prompt; $4/$18 >200K), gemini-2.5-pro ($1.25/$10 ≤200K; $2.50/$15 >200K), gemini-2.5-flash ($0.30/$1.50).

### xAI — official
- URL: https://docs.x.ai/docs/models (markdown mirror), fetched 2026-10-11
- Covers: grok-4.7, grok-4.6, grok-4.5 ($2/$6 <200K prompt; $4/$12 ≥200K; context 500K), grok-4.20-0309-reasoning ($1.25/$2.50 <200K; $2.50/$5 ≥200K; context 1M).

### DeepSeek — official
- URL: https://api-docs.deepseek.com/quick_start/pricing, fetched 2026-10-11
- Covers: deepseek-v4-pro-0813 (peak $1.32/$3.96; off-peak $0.66/$1.98; context 1M), deepseek-flash = DeepSeek-V4.1-Flash (peak $0.30/$1.20; off-peak $0.15/$0.60; context 1M). Peak hours 01:00–04:00 & 06:00–10:00 UTC Mon–Fri. Cache-hit input prices in `extra`.

### Z.ai (Zhipu) — official
- URL: https://docs.z.ai/guides/overview/pricing, fetched 2026-10-11
- Covers: GLM-5.3 ($1.40/$4.40), GLM-5.3-Flash ($0.15/$0.50), GLM-5.3-FlashX ($0.37/$1.25), GLM-5.2 ($1.40/$4.40). Context 1,048,576 per LMArena listing.

### Moonshot AI — official
- URL: https://platform.moonshot.ai/docs/pricing/chat, fetched 2026-10-11
- Covers: kimi-k3 ($3.00/$15.00, cache write $3.00 5-min TTL / $6.00 1-hr TTL, cache hit $0.30, context 1,048,576), kimi-k2.7-code ($0.95/$4.00, ctx 262,144), kimi-k2.6 ($0.95/$4.00, ctx 262,144). (K2 cache-hit inputs: $0.19 / $0.16.)

### Alibaba Cloud (Qwen) — official
- URL: https://www.alibabacloud.com/help/en/model-studio/model-pricing (page: "Last Updated: Oct 11, 2026"), fetched 2026-10-11
- Covers, International (Singapore) deployment, standard rates: qwen3.8-max ($2/$6, batch half), qwen3.8-flash ($0.15/$0.47), qwen3.7-max ($2.50/$7.50), qwen3.7-plus ($0.40/$1.60 ≤256K; $1.20/$4.80 >256K; limited-time 20% off list at capture). Context 1M per the same page's tier rows.

### Mistral — official + secondary
- Official: https://mistral.ai/pricing, fetched 2026-10-11 — pricing-page FAQ states: "Mistral Large costs $0.5 /M tokens in and $1.5 /M tokens out" (batch −50%, cached input up to −90%). Applied to `mistral-large-2512` (Mistral Large 3, the current Large per docs.mistral.ai model list).
- Secondary (OpenRouter, https://openrouter.ai/api/v1/models, fetched 2026-10-11): mistral-medium-3.5 ($1.50/$7.50, ctx 262,144), ministral-3-8b-2512 ($0.15 flat), ministral-3-14b-2512 ($0.20 flat). Mistral's own docs (docs.mistral.ai) list the models but not per-token prices on any static page we could reach.

### Meta — secondary
- Meta publishes no public per-token API price page. OpenRouter (URL above, fetched 2026-10-11): muse-spark-1.3 / 1.2 / 1.1 at $1.25/$4.25, ctx 1,048,576 — identical to the prices LMArena's board lists for the same models, so flagged `secondary` with two agreeing sources.

### Open-weight (hosted by OpenRouter) — secondary
- openai/gpt-oss-120b: $0.037/$0.17, ctx 131,072 (131,072 context confirmed by OpenAI's model doc https://developers.openai.com/api/docs/models/gpt-oss-120b; price from OpenRouter because OpenAI publishes no hosted price for the open-weight release).

### Cross-checks performed
- Every official price above was compared against OpenRouter's public models JSON where the model exists there. Matches observed (no contradictions): gpt-5.5 $5/$30 ✓, gpt-5.5-pro $30/$180 ✓, claude-opus-5.5 $4/$20 ✓, gemini-3.8-flash $0.75/$3.75 ✓, grok-4.7 $2/$6 ✓, deepseek-v4-pro-0813 $0.66/$1.98 (= DeepSeek off-peak) ✓, glm-5.3 (OR "prime" variant differs; official base used) ✓, kimi-k3 $0.80/$10 on OR vs official $3/$15 — **flagged**: OpenRouter's kimi-k3 is a discounted reseller rate; the official Moonshot price is used, glm-5.3-flash $0.15/$0.50 ✓, qwen3.8-max $2/$6 ✓, mistral-large-2512 $0.5/$1.5 ✓ (matches the Mistral FAQ too).

## 3. GPU compute (`gpu.json`) — 33 offers

### RunPod — official
- URL: https://runpod.io/pricing ("Updated September 27, 2026"), read with a real browser 2026-10-11; Secure Cloud on-demand Pods column.
- B300 $8.99, B200 $7.99, H200 $5.29, H100 NVL $3.19, H100 PCIe $2.89, H100 SXM $3.99, A100 SXM $1.79, A100 PCIe $1.79, RTX PRO 6000 $2.49, RTX 5090 $1.19, L40S $1.09, RTX 4090 $0.89 (all $/hr). Community Cloud is cheaper (B200 $2.49) but interruptible/host-dependent; not included as headline rates.

### Lambda — official
- URL: https://lambda.ai/pricing, read with a real browser 2026-10-11; 1-Click on-demand, per-GPU-hr.
- B200 SXM6 $6.69, H100 SXM $3.99, A100 SXM 80GB $2.79, A100 SXM 40GB $1.99, V100 $0.79. (Reserved B200 clusters from $8.87–$9.36/GPU-hr at 16–256+ GPUs.)

### Modal — official
- URL: https://modal.com/pricing, read with a real browser 2026-10-11; serverless per-second rates ×3600.
- B300 $7.099/hr, B200 $6.250/hr, H200 SXM $4.540/hr, H100 SXM5 $3.949/hr, RTX PRO 6000 $3.031/hr, A100-80GB $2.498/hr, A100-40GB $2.099/hr, L40S $1.951/hr, L4 $0.799/hr, T4 $0.590/hr. Billed per second, no idle charges; per-second source values in `extra.per_second_usd`.

### Vast.ai — secondary (live marketplace, not a rate card)
- Source: public API `POST https://console.vast.ai/api/v0/bundles/` with body `{"query":{}}` (64 offers returned), fetched 2026-10-11; values are the **cheapest single-GPU on-demand offer** (`dph_total`) per class at capture time — a marketplace floor, not a guaranteed price.
- H100 SXM floor $1.57, H100 NVL floor $1.98, A100 PCIe floor $0.27, RTX 5090 floor $0.21, RTX 4090 floor $0.12.

### Microsoft Azure — official
- Source: Microsoft Retail Prices API `https://prices.azure.com/api/retail/prices` filtered to `serviceName='Virtual Machines'`, `armSkuName='Standard_ND96isr_H100_v5'`, `priceType='Consumption'`, fetched 2026-10-11.
- Standard_ND96isr_H100_v5 (8× H100 NVL, 640GB vRAM), Linux, East US: **$98.32/VM-hr = $12.29/GPU-hr** (same API returns $21.80–$146.98/VM-hr across other regions/Windows SKUs; East US Linux used as the reference).

### GCP / AWS — not included (see Known gaps)
- GCP's GPU pricing page (cloud.google.com/compute/gpus-pricing) loads its price tables in a way we could not extract (no static content, no reachable price elements in DOM after render); the legacy pricelist JSON endpoint returned 404.
- AWS: the public `b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ec2/...` JSON endpoints returned 404/NoSuchKey; the aws.amazon.com/ec2/pricing page requires JS we could not execute for extraction. Rather than quote stale third-party numbers, both were omitted — priced H100 clouds above cover the comparison need.

## 4. Cross-source agreement summary
- LMArena HTML board ↔ HF open dataset: 40/40 models matched by name and votes.
- Official price pages ↔ OpenRouter: consistent everywhere except kimi-k3 (reseller discount on OR; official used) — documented above.
- LMArena-listed model prices ↔ official provider pages: claude-opus-5.5-high ($4/$20) ✓, gpt-5.5 ($5/$30) ✓, gemini-3.8-flash-high ($0.75/$3.75) ✓, muse-spark family ($1.25/$4.25) ✓, kimi-k3-max ($3/$15) ✓.

## Known gaps (honest list)
1. **GCP and AWS GPU on-demand rates**: not verified from the source on this run (JS-only pages, dead JSON endpoints). No placeholder entries were added.
2. **Mistral per-model official table**: only Mistral Large's price is stated on mistral.ai/pricing; other Mistral models are secondary-sourced.
3. **Meta API pricing**: no first-party page exists; OpenRouter + LMArena agree, flagged secondary.
4. **Qwen region variance**: US (Virginia) and China (Beijing) deployments price differently (and in CNY); only the International (Singapore) USD rates are recorded.
5. **Promotional windows embedded in official pages** (Gemini 3.x Flash through 2026-12-31; GPT-5.6 Sol through ≥2026-11-21; Qwen 20% off) are recorded in `extra` — refresh scripts should re-check them.
6. **Elo is a snapshot** (publish date 2026-10-08; LMArena updates continuously).
