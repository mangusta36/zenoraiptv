# Zenora IPTV topical map

Evidence basis: `src/data/guides.ts:40-3619`, `src/components/pages.tsx:22-26`, `src/app/page.tsx`, and the article renderer. “Pillar” means a page that actually performs hub/navigation work in this repository; it is not a claim of Google authority.

```text
IPTV decision and support
├── Commercial orientation (PARTIAL)
│   ├── /, /pricing, /trial, /features, /channels, /how-it-works
│   └── /faq, /support, /contact
├── Fundamentals (PARTIAL; archive hub only)
│   ├── What Is IPTV
│   ├── M3U Playlists Explained
│   └── What Is an IPTV Player?
├── Device compatibility and setup (STRONG)
│   ├── /devices → /setup → device-specific setup routes
│   ├── Device Compatibility
│   ├── Fire TV, Android/Google TV, Samsung, Apple TV
│   └── Fire TV vs Android TV
├── Playback and troubleshooting (STRONG)
│   ├── /troubleshooting
│   ├── General troubleshooting and streaming quality
│   ├── Buffering and Ethernet vs Wi-Fi
│   ├── EPG, M3U loading, black screen/no sound
│   └── Login/authentication errors
└── Safety and subscription choice (PARTIAL)
    ├── Security, privacy, legal considerations
    ├── Subscription evaluation
    └── Login/authentication errors
```

## Cluster map and priorities

| Cluster | Existing hierarchy | Missing/weak relationship | Priority |
|---|---|---|---|
| Fundamentals | `/blog` archive → three guides | A named “start here” pillar and explicit follow-up route into player/device setup | P1 |
| Device setup | `/devices` and `/setup` → eight setup routes + six articles | Consistent contextual links from every device setup route to the corresponding long-form article | P2 |
| Troubleshooting | `/troubleshooting` → seven issue-specific guides | A symptom selector/parent explanation and query-boundary statements between network, buffering, general troubleshooting and black screen | P1 |
| Safety/subscription | individual guides → `/support`/`/pricing` indirectly | A safety/decision hub joining privacy, legitimate service evaluation, renewal and account recovery | P1 |
| Commercial | homepage → pricing/trial/features/channels | Clearer factual service-scope, entitlement, compatibility and support relationships | P2 |

## Recommended connections

| Source | Destination | Why |
|---|---|---|
| Fundamentals pillar/hub | M3U, player, device compatibility | Moves readers from definition to the components they must evaluate. |
| Troubleshooting hub | buffering, EPG, M3U loading, black screen, login | Routes by observed symptom instead of repeating generic fixes. |
| Device setup route | matching platform guide | Links concise instructions to compatibility reasoning and device-specific caveats. |
| Security/privacy | subscription evaluation and login errors | Creates a safe pre-purchase → account-protection journey. |
| Pricing/trial | compatibility, subscription evaluation, terms/refunds | Separates technical suitability, commercial terms and legal/service verification. |

## Material content gaps

P1: named hub pages/sections and reciprocal relationships, not a large new-article program. P2: a clearly scoped support/entitlement explanation, model/region availability decision guidance, and a controlled distinction between setup, import, authentication and playback faults. P3: accessibility/remote-navigation and home-network glossary integration where user testing shows need.

## Implemented architecture

The map is now executable rather than documentary: `src/data/topic-architecture.ts` defines the 19 article paths, `/blog` renders the four navigable topic pathways (including Fundamentals and Safety), `/troubleshooting` routes users by symptom, and each article renders its applicable starting point, prerequisite, successor, and cross-cluster decision link. The remaining opportunities above are content/business-fact or external-evidence work, not missing internal architecture.
