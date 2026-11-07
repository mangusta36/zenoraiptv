# Zenora editorial research evidence — checkpoint

Status: **in progress.** `what-is-iptv`, `m3u-playlists-explained`, `device-compatibility`, and `fire-tv-setup-checklist` are complete and independently verified below; 15 articles remain incomplete. Access date for newly completed research: 2026-11-06. Research-derived questions are explicitly not represented as Google PAA.

## Completed article: IPTV Device Compatibility Guide

- URL / primary keyword / intent: `/blog/device-compatibility` · `IPTV device compatibility` · informational.
- Competitor inspection, November 6, 2026:
  - [OTTV — IPTV Device Compatibility: Find the Right App](https://www.ottv.org/tools/device-compatibility) uses a device selector, an app recommendation, claimed setup difficulty/time, and multi-device FAQs. Its gap is that broad device families and preferred apps are treated as conclusive; Zenora instead requires the exact model, store region, publisher, operating-system version, and authorized-service method.
  - [Nightmare TV — Supported Devices: IPTV Player Compatibility (2026)](https://nightmaretv.net/devices) provides a proprietary matrix of RAM, codecs, HDR, remotes, and known issues. Its gap is that one vendor's product-specific claims cannot establish a different player's or service's compatibility; Zenora uses the matrix idea without presenting one vendor's measurements as universal facts.
  - [iTechGuides — Best TV Box for IPTV: Compatibility, Setup and Legal Buying Guide](https://www.itechguides.com/best-tv-box-for-iptv-how-to-choose-the-right-streaming-player/) covers authorized-service support, region, HDMI/HDCP, network, and official app listings. Zenora extends this with a test sequence that distinguishes store availability, sign-in, catalogue loading, media decode, and local network failure.
- Research-derived related questions (not represented as Google PAA): Does a phone listing prove Android TV support? Does Fire TV support prove Android TV support? What does a successful installation actually prove? Which device details should support receive? Does a 4K display guarantee playback of every 4K stream? The article's setup guidance and FAQ answer these questions without making unverified product claims.
- Semantic coverage verified in source: Android TV, Google TV, Fire TV, Smart TV, official app store, App Store, Google Play, operating-system version, codec support, D-pad/remote navigation, device model, and app-store region. Long-tail variations: `how to check IPTV device compatibility before subscribing`; `does a phone app listing work on Android TV`.
- Independently verified visible findings:
  1. [Android Developers — TV app quality](https://developer.android.com/docs/quality-guidelines/tv-app-quality), updated June 29, 2026 and accessed November 6, 2026: Android TV functionality must be navigable with five-way D-pad controls. Integrated in the shared rendered research callout with direct attribution.
  2. [Android Developers — TV app quality](https://developer.android.com/docs/quality-guidelines/tv-app-quality), updated June 29, 2026 and accessed November 6, 2026: compliant TV apps appear in the Play Store on TV devices. Integrated with a precise limitation: it is an availability check, not proof of entitlement or media-format support.
- Editorial change: added the two source-linked facts to the visible body and a FAQ clarifying that a phone listing does not prove TV support. Existing 2,500+ word depth, figures, responsive table, schema, canonical metadata, internal links, and exact visible in-body `Zenora IPTV` homepage link were retained.

## Completed article: IPTV Troubleshooting Guide

- URL / primary keyword / intent: `/blog/iptv-troubleshooting` · `IPTV troubleshooting` · informational.
- Competitor inspection: [IPTV Americas](https://www.iptv-americas.tv/iptv-troubleshooting/) groups buffering, playlist, login, guide, and device symptoms but makes unsupported universal speed/device assertions; [LiveSportsIPTV](https://livesportsiptv.com/iptv-troubleshooting/) uses a useful scope-first and alternate-connection workflow; [Televo IPTV](https://televouk.com/tools/iptv-troubleshooter) offers a symptom wizard for buffering, login, playlist, EPG, audio, and crashes. Zenora's differentiator is a controlled, rights-aware one-variable workflow that never asks a reader to expose a tokenized URL or assumes one failed stream identifies the cause.
- Research-derived questions (not Google PAA): Is a single failed item different from a service-wide failure? Does buffering prove a Wi-Fi problem? What differs between a Media and Master Playlist? Should cache be cleared first? What non-sensitive evidence should support receive? Existing sections and FAQs answer each.
- Semantic coverage: buffering, HLS, M3U, Media Playlist, Master Playlist, EPG, codec, app cache, account entitlement, and controlled comparison. Long-tail variations: `IPTV troubleshooting checklist for buffering and login errors`; `how to identify an IPTV playlist versus network problem`.
- Visible findings: [Apple HTTP Live Streaming](https://developer.apple.com/documentation/http-live-streaming), undated and accessed November 6, 2026, supports adaptive switching according to network conditions; [IETF RFC 8216](https://datatracker.ietf.org/doc/html/rfc8216), August 2017 and accessed November 6, 2026, distinguishes Media and Master Playlists. Both appear as direct links in the rendered callout.
- Verification: `npm run validate` passed; production build completed; focused mobile Chromium source-callout test passed (1/1). Shared metadata, images, table, FAQ/schema, canonical, and exact in-body `Zenora IPTV` homepage-link requirements remain intact.

## Completed articles: Improve IPTV Streaming Quality; IPTV Security, Privacy, and Legal Considerations

- **Streaming quality** competitors inspected: [IPTVBase](https://iptvbase.org/improve-iptv-picture-quality/) emphasizes bandwidth/DNS/picture modes and includes unsupported support statistics; [IPTV Commons](https://iptvcommons.com/guides/router-settings-for-streaming) covers router/QoS controls; [Viking IPTV HD](https://www.vikingiptvhd.com/blog/how-to-improve-iptv-streaming-stability) separates preventive stability from reactive troubleshooting and avoids fixed speed promises. Zenora's gap response is a source-backed explanation that HLS adapts to connection conditions and that device decoding depends on more than a display label. Research-derived questions cover speed versus stability, Ethernet tests, forcing quality, codec support, and source bottlenecks. Semantic terms: throughput, latency, jitter, packet loss, adaptive streaming, Wi-Fi placement, Ethernet, bitrate, codec. Long tails: `improve IPTV streaming quality without changing providers`; `how to improve streaming stability on a TV device`. Visible sources: [Apple HLS](https://developer.apple.com/streaming/) (undated; accessed November 6, 2026) and [MDN MediaCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities) (last modified October 8, 2024; accessed November 6, 2026).
- **Security/privacy/legal** competitors inspected: [DualIPTV](https://www.dualiptv.com/guide/do-iptv-apps-collect-your-data) distinguishes ISP from provider visibility; [CatchON TV](https://www.mycatchontv.com/blog/iptv-application) lists safe installation and suspicious permissions; [IPTVitec](https://iptvitec.com/blog/legitimate-iptv-provider/) provides an operator/terms/payment checklist. Zenora extends these with token recovery/redaction and jurisdiction-aware legal limits. Research-derived questions cover VPN limits, unusual permissions, playlist-token protection, provider identity, and rights. Semantic terms: MFA, phishing-resistant authentication, app provenance, permissions, token rotation, privacy notice, content rights, renewal, cancellation. Long tails: `IPTV security and privacy checklist before installing a player`; `how to protect an IPTV playlist URL and account`. Visible sources: [CISA IAM recommended practices](https://www.cisa.gov/sites/default/files/2023-12/ESF%20IDENTITY%20AND%20ACCESS%20MANAGEMENT%20RECOMMENDED%20BEST%20PRACTICES%20FOR%20ADMINISTRATORS%20PP-23-0248_508C.pdf) (December 2023; accessed November 6, 2026) and [CISA Protecting your digital home](https://www.cisa.gov/sites/default/files/publications/NCSAM_YourDigitalHome_2020.pdf) (2020; accessed November 6, 2026).
- Batch verification: `npm run validate` and production build passed; the two focused mobile Chromium source-callout tests passed (2/2). Existing metadata, figures, tables, FAQ/schema, canonical metadata, internal links, and exact in-body `Zenora IPTV` homepage link were retained.

## Completed article: How to Evaluate an IPTV Subscription

- Competitors inspected: [Plume](https://shop.plume.com/blogs/news/iptv-subscription-checklist) offers a 12-point price/renewal/device checklist but mixes unsupported market claims with advice; [Streamy](https://streamtechnology.hu/en/iptv/iptv-szolgaltato-valasztasa) compares legality, channels, devices, features, cost, and contract terms; [CanadianIPTV](https://canadianiptv.ca/blog/iptv-free-trial-checklist) provides a representative-use trial worksheet. Zenora retains the practical checklist approach while separating trial performance from licensing and consumer terms.
- Research-derived questions (not Google PAA): What must a trial disclose? Can a fee-based “free” trial be trusted? How should a renewal notice be verified? Are installed devices the same as concurrent streams? What should the household test before paying? Semantic terms: trial period, auto-renewal, cancellation, refund terms, concurrent connections, supported device, payment record, authorization. Long tails: `how to evaluate an IPTV subscription before paying`; `IPTV free trial checklist for device and renewal terms`.
- Visible findings: [FTC free trials and auto-renewals guidance](https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions), undated and accessed November 6, 2026, says to confirm trial terms/length/cancellation and to scrutinize renewal notices for expected price or suspicious card requests. Both facts are direct links in the rendered callout.
- Verification: `npm run validate`, production build, and 1/1 focused mobile Chromium source-callout regression passed. Shared metadata, figures, table, FAQ/schema, canonical, internal links, and exact in-body `Zenora IPTV` homepage anchor were retained.

## Completed article: What Is an IPTV Player?

- Competitors inspected: [KR Technology](https://kr-shop.eureka.com/blogs/news/iptv-player-explained) covers source formats, guide matching, decode paths, and player limits; [Apollo Group TV](https://www.apollostv.com/blog/iptv-player) contrasts an app with a provider; [IPTV Journal](https://iptvjournal.com/iptv-player-app-setup/) explains playlist, guide, and setup steps. Zenora extends the comparison with a clear delivery/entitlement boundary and avoids provider/login recommendations.
- Research-derived questions: Does a player include channels? What differs between player and provider? Does a phone listing prove TV use? Can a player prove authorization? Which layer causes an EPG versus playback failure? Semantic terms: player, provider, M3U, EPG, HLS, codec, D-pad, remote navigation, App Store, Google Play. Long tails: `what is an IPTV player versus provider`; `does an IPTV player include channels`.
- Visible sources: [Apple HLS](https://developer.apple.com/streaming/) (undated; accessed November 6, 2026) and [Android TV app quality](https://developer.android.com/docs/quality-guidelines/tv-app-quality) (updated June 29, 2026; accessed November 6, 2026). Both source links render in the article callout.
- Verification: `npm run validate`, production build, and focused mobile Chromium source-callout regression passed (1/1); shared structural SEO checks are preserved.

## Completed article: IPTV on Android TV and Google TV

- Competitors inspected: [IPTV Rich](https://iptvrich.ca/installation-guide/android-tv/) provides an Android/Google TV device/setup matrix and specific player instructions; [Hello Sky](https://hellosky.tv/blog/iptv-android-tv-google-tv-setup) uses a baseline-first workflow; [MegaOTT](https://megaott.app/blog/iptv-android-google-tv-setup/) covers TV-friendly interfaces, storage, permissions, and decoder checks. Zenora preserves model-specific, official-store verification while avoiding their player/login/subscription claims.
- Research-derived questions (not Google PAA): Is Google TV the same as Android TV? Does a phone listing prove TV support? When is sideloading appropriate? Why check Play Store on the device? What does installation prove? Semantic terms: Android TV, Google TV, Google Play, D-pad, remote navigation, TV-ready app, decoder, storage, system version. Long tails: `IPTV on Android TV and Google TV compatibility checklist`; `does a phone Android app work on Google TV`.
- Visible findings: [Android TV app quality](https://developer.android.com/docs/quality-guidelines/tv-app-quality), updated June 29, 2026 and accessed November 6, 2026, documents five-way D-pad navigation and Play Store availability on TV devices for compliant apps. These two distinct findings are direct links in the rendered callout.
- Verification: `npm run validate`, production build, and focused mobile Chromium source-callout regression passed (1/1). The article retains required figures, table, FAQ/schema, canonical metadata, internal links, and exact in-body `Zenora IPTV` anchor.

## Completed article: Fire TV IPTV Setup Checklist

- URL / primary keyword / intent: `/blog/fire-tv-setup-checklist` · `IPTV Setup on Firestick` · how-to.
- Competitor inspection, November 6, 2026:
  - [IPTVZ — Which devices are supported?](https://help.iptvz.net/article/which-devices-are-supported/) groups Fire OS support, input methods, 4K guidance, and connection limits. Its gap is that it makes service-specific support assertions; Zenora keeps account entitlement and player availability as independently verified checks.
  - [IMPlayer IPTV — Set up IMPlayer](https://implayer.org/setup-guide/) covers device-specific store locations, typed credentials, QR/device-code entry, M3U/Xtream selection, and symptom tables. Zenora preserves the useful distinction between a player and a service while avoiding a recommendation for a proprietary login method.
  - [FirestickTVStream — Fire TV Remote App: Setup, Features & Fixes](https://www.firesticktvstream.com/fire-tv-remote-app-guide/) uses a prerequisite checklist and symptom-first remote/network troubleshooting. Zenora's gap coverage is a safer first-playback test that separates app availability, account details, and playback rather than treating remote setup as player compatibility.
- Research-derived questions (not represented as Google PAA): Which Fire TV model and software version should I record? Does Android app compatibility mean a player is available in the Appstore? What should be tested before entering private credentials? What does a successful installation prove? How should remote navigation and network placement be checked? Existing headings and FAQs answer these questions.
- Semantic terms present: Fire TV Stick, Fire OS, Amazon Appstore, Alexa Voice Remote, player availability, operating-system version, remote navigation, Wi-Fi placement, Ethernet adapter, and authorized service. Long-tail variations: `safe IPTV setup on Firestick`; `how to check Fire TV player compatibility before entering credentials`.
- Independently verified visible findings: [Amazon Fire OS Overview](https://developer.amazon.com/docs/fire-tv/fire-os-overview.html) documents distinct Fire OS generations and underlying Android API levels; [Amazon Get Started with Fire TV](https://developer.amazon.com/docs/fire-tv/get-started-with-fire-tv.html) documents Android, HTML5 web, and React Native app support. Both were accessed November 6, 2026, integrated as direct links in the visible callout, and verified by the focused mobile Chromium test (2/2 selected article tests passed).

## Completed article: What Is IPTV?

- Article / keyword / intent: `/blog/what-is-iptv` · `what is IPTV` · informational beginner education.
- Audience: readers comparing internet-delivered television with cable, satellite, or other streaming delivery and deciding what to verify before setup.
- Semantic terms checked in the article: Internet Protocol Television; live TV; video on demand; HTTP Live Streaming (HLS); adaptive streaming; M3U playlist; electronic program guide (EPG); streaming device. All appear naturally in visible body copy.
- Long-tail variations checked: `what is IPTV and how does it work`; `IPTV vs cable, satellite, and OTT streaming`. The latter is an H2; the former is addressed by the answer-first opening and delivery explanation.

### Competitor inspection

| Competitor | Actual coverage inspected | Gap/opportunity implemented in Zenora |
|---|---|---|
| [IPTV Commons: What Is IPTV?](https://iptvcommons.com/guides/what-is-iptv) | Four-component setup checklist; encoding, packaging, delivery, and playback flow; EPG as an optional part. | Zenora already separated service, player, device, and network; the delivery explanation now adds primary-source-backed HLS details rather than relying on a generic checklist. |
| [Channel Haven: What is IPTV?](https://channelhaventv.com/blog/what-is-iptv-us-guide/) | Plain-language IP delivery, channel-list/EPG flow, and comparison with cable. | Zenora adds a clearer managed-IPTV versus public-internet distinction and avoids its unsupported device/service generalizations. |
| [EagleCast: What Is IPTV?](https://eagle-cast.tv/what-is-iptv/) | Player, M3U, EPG, and speed-test questions in a practical guide. | Zenora expands the explanation of playlist, portal, and EPG roles and keeps authorization separate from technical compatibility. |

### Related questions (research-derived, not verified Google PAA)

| Question | Evidence source | Existing/implemented answer |
|---|---|---|
| What is IPTV and how does it work? | IPTV Commons; Channel Haven; EagleCast | Answer-first opening and delivery sections. |
| Is IPTV the same as a streaming app? | IPTV Commons; EagleCast | Visible FAQ answers this directly. |
| Does IPTV always mean live TV? | IPTV Commons; Channel Haven | Visible FAQ explains live and on-demand delivery. |
| Do I need a special box to use IPTV? | IPTV Commons device checklist | Added visible FAQ with a device/OS/player-format check. |
| What is the difference between IPTV, cable, satellite, and OTT? | Channel Haven comparison; IPTV Commons delivery explanation | Existing comparison section covers it without asserting that all services are equivalent. |

### Verified findings integrated into visible body

| Finding | Source / date | Where integrated |
|---|---|---|
| HLS supports live broadcasts and video on demand and can select alternate streams in response to network bandwidth. | [Apple: HTTP Live Streaming](https://developer.apple.com/documentation/http-live-streaming), undated documentation; accessed 2026-11-06 | New **Verified delivery details** callout below “How live channels and video on demand travel to your screen.” |
| HLS Media and Master Playlists are UTF-8 text files; Media Playlists list media segments and Master Playlists list other playlists. | [IETF RFC 8216](https://datatracker.ietf.org/doc/html/rfc8216), August 2017; accessed 2026-11-06 | Same visible callout, with direct IETF citation. |

Files changed: `src/data/article-research.ts`, `src/app/blog/[slug]/page.tsx`, and `src/data/guides.ts`. The existing in-body exact `Zenora IPTV` homepage link is preserved.

Focused verification: `npm run validate`, `npm run typecheck`, `npm run lint`, and `npm run verify:build` all exited 0 after the implementation; the production build completed in 47,682 ms. `npx playwright test tests/e2e/article-seo.spec.ts --project=desktop` executed 20 checks (the 19 required homepage-link checks plus the new source-callout check): 20 passed, 0 failed, 0 skipped. Result artifact: `docs/audits/results/browser/article-seo-after-what-is-iptv.json`.

## Completed article: M3U Playlists Explained

- Article / keyword / intent: `/blog/m3u-playlists-explained` · `what is an M3U playlist` · informational.
- Semantic terms verified in visible copy: M3U; M3U8; UTF-8; HLS manifest; Media Playlist; Master Playlist; `EXTM3U`; `EXTINF`; EPG mapping. Long-tail coverage: `what is an M3U playlist`; `M3U versus M3U8 and HLS manifests`.
- Research-derived related questions (not verified Google PAA): Is M3U the same as M3U8? Can any player open an M3U file? Why does a playlist import but a channel fail? Why is guide data blank? Is a tokenized playlist URL safe to share? Each has a visible FAQ or dedicated section.

| Inspected competitor | Actual coverage | Zenora gap response |
|---|---|---|
| [AquaR Player: M3U playlist](https://www.aquarplayer.com/blog/what-is-m3u-playlist) | Header/entry explanation, categories, and guide identifiers. | Zenora adds an explicit distinction between syntax success, authorization, media delivery, and device decoding. |
| [UniPlayer: M3U format reference](https://uniplayer.net/docs/specs/m3u/) | Attributes, EPG/catch-up conventions, and non-standard fields. | Zenora explains that player-recognized attributes are conventions, not cross-player guarantees. |
| [OTTV: M3U playlist guide](https://www.ottv.org/blog/m3u-playlist-guide) | URL-versus-file workflow, EPG relationship, and player fields. | Zenora adds a privacy-first handling path and a controlled diagnostic order rather than player-specific sales advice. |

| Verified finding integrated in visible body | Source / date |
|---|---|
| HLS uses ordinary web servers/CDNs and adapts to wired and wireless conditions. | [Apple: HTTP Live Streaming](https://developer.apple.com/documentation/http-live-streaming), undated; accessed 2026-11-06 |
| HLS playlists are UTF-8 and `EXTM3U` must be first in Media and Master Playlists. | [IETF RFC 8216](https://datatracker.ietf.org/doc/html/rfc8216), August 2017; accessed 2026-11-06 |

The two findings render in the source-linked **Verified delivery details** callout. The exact in-body Zenora homepage link remains unchanged.

## Verified primary-source findings

| Topic group | Finding | Source | Source date / access | Applicable guides |
|---|---|---|---|---|
| HLS and playlists | HLS supports live and on-demand delivery, alternative streams, and switching according to network conditions. | [Apple: HTTP Live Streaming](https://developer.apple.com/documentation/http-live-streaming) | undated documentation; accessed 2026-11-05 | what-is-iptv; m3u-playlists-explained; what-is-an-iptv-player; iptv-buffering-causes; m3u-playlist-not-loading; iptv-black-screen-no-sound |
| M3U8 syntax | RFC 8216 specifies UTF-8 playlists; `#EXTM3U` is required first in Media and Master Playlists, and invalid playlists must fail parsing. | [IETF RFC 8216](https://datatracker.ietf.org/doc/html/rfc8216) | August 2017; accessed 2026-11-05 | m3u-playlists-explained; m3u-playlist-not-loading; what-is-iptv |
| Fire TV | Amazon’s test criteria call out Fire TV remote/device capability behavior and playback checks; they are not a guarantee that any third-party service works. | [Amazon: Test Criteria for Appstore Apps](https://developer.amazon.com/docs/app-testing/test-criteria.html) | updated October 2026 search index; accessed 2026-11-05 | fire-tv-setup-checklist; fire-tv-vs-android-tv; device-compatibility |
| Android/Google TV | Android TV app-quality criteria require TV-oriented remote navigation and distinguish TV-ready/optimized experiences; Android TV apps can appear on Google TV when quality criteria are met. | [Android TV app quality](https://developer.android.com/docs/quality-guidelines/tv-app-quality), [Distribute to Android TV](https://developer.android.com/training/tv/publishing/distribute) | updated June 2026 / undated; accessed 2026-11-05 | android-tv-google-tv-iptv; fire-tv-vs-android-tv; device-compatibility; what-is-an-iptv-player |
| Samsung | Samsung support directs users with a missing/freezing/crashing app to check the exact model, software, app reinstall, and Smart Hub. | [Samsung support](https://www.samsung.com/us/support/troubleshoot/TSG10000062/) | undated; accessed 2026-11-05 | samsung-smart-tv-iptv; device-compatibility |
| Apple TV | Apple advises checking device compatibility when an app is unavailable and updating apps/devices when playback fails. | [Apple Support: compatible device setup](https://support.apple.com/en-ie/102472), [Apple Support: streaming troubleshooting](https://support.apple.com/en-ie/118405) | published 2026 search index; accessed 2026-11-05 | apple-tv-iptv-compatibility; device-compatibility; iptv-black-screen-no-sound |
| Account security | CISA states MFA reduces password-only attacks such as brute-force guessing and credential stuffing; it also distinguishes phishing-resistant MFA from weaker methods. | [CISA: IAM recommended practices](https://www.cisa.gov/sites/default/files/2023-12/ESF%20IDENTITY%20AND%20ACCESS%20MANAGEMENT%20RECOMMENDED%20BEST%20PRACTICES%20FOR%20ADMINISTRATORS%20PP-23-0248_508C.pdf) | December 2023; accessed 2026-11-05 | iptv-security-privacy; iptv-login-authentication-errors; choosing-an-iptv-subscription |

## Article processing register

| Article | Primary keyword | Intent | Existing source set inspected | Live primary source matched | PAA | Competitor pages inspected | Article-specific findings integrated | Status |
|---|---|---|---|---|---|---:|---|---|
| what-is-iptv | what is IPTV | Informational | Apple, IETF, FTC | Apple + IETF | Not verified Google PAA | 0 | Existing factual explanation only | BLOCKED |
| m3u-playlists-explained | what is an M3U playlist | Informational | Apple, IETF | Apple + IETF | Not verified Google PAA | 0 | Existing factual explanation only | BLOCKED |
| device-compatibility | IPTV device compatibility | Informational | Amazon, Android, Samsung, Apple, Microsoft | Android + Samsung | Not verified Google PAA | 1 | Existing factual explanation only | BLOCKED |
| fire-tv-setup-checklist | IPTV Setup on Firestick | Informational | Amazon | Amazon | Not verified Google PAA | 1 | Existing factual explanation only | BLOCKED |
| iptv-troubleshooting | IPTV troubleshooting | Informational | Apple, Amazon | Apple | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| improve-streaming-quality | improve IPTV streaming quality | Informational | CISA, Apple, Google, MDN | Apple | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| iptv-security-privacy | IPTV security and privacy | Informational | CISA, Google, Apple, FTC | CISA | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| choosing-an-iptv-subscription | how to choose an IPTV subscription | Commercial investigation | CISA, FTC | CISA | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| what-is-an-iptv-player | IPTV player vs provider | Informational | Apple, Android, Google | Apple + Android | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| android-tv-google-tv-iptv | IPTV on Android TV and Google TV | Informational | Android, Google | Android | Not verified Google PAA | 0 | Existing factual explanation only | BLOCKED |
| iptv-buffering-causes | IPTV Buffering Fix | Informational | Google, Apple, FCC | Apple | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| ethernet-vs-wifi-streaming | Ethernet vs Wi-Fi for streaming | Informational | CISA, IEEE, Apple, FCC | no new source inspection | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| samsung-smart-tv-iptv | Samsung Smart TV IPTV compatibility | Informational | Samsung | Samsung | Not verified Google PAA | 0 | Existing factual explanation only | BLOCKED |
| apple-tv-iptv-compatibility | Apple TV IPTV compatibility | Informational | Apple | Apple | Not verified Google PAA | 0 | Existing factual explanation only | BLOCKED |
| iptv-epg-not-working | IPTV EPG not working | Informational | XMLTV, Apple, Google | no new source inspection | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| m3u-playlist-not-loading | M3U playlist not loading | Informational | Apple, IETF, MDN | IETF | Not verified Google PAA | 0 | Existing factual explanation only | BLOCKED |
| iptv-black-screen-no-sound | IPTV black screen no sound | Informational | Apple | Apple | Not verified Google PAA | 0 | No new findings added | BLOCKED |
| fire-tv-vs-android-tv | Fire TV vs Android TV IPTV | Commercial investigation | Amazon, Android | Amazon + Android | Not verified Google PAA | 0 | Existing factual explanation only | BLOCKED |
| iptv-login-authentication-errors | IPTV login authentication errors | Informational | IETF, CISA, Android, Amazon | CISA | Not verified Google PAA | 0 | No new findings added | BLOCKED |

## Concrete remaining work

Each row requires three inspected informational competitors, research-derived related questions, five to eight article-specific semantic terms and two long-tail variants, and two source-supported findings explicitly incorporated into visible article copy. This checkpoint does not claim those items are complete.

## Completed article: IPTV Buffering Fix

- Article / keyword / intent: `/blog/iptv-buffering-causes` · `IPTV Buffering Fix` · informational.
- Related questions researched from the inspected guides: What causes buffering on only one channel? Does a high speed-test result rule out Wi-Fi or decoding? Is Ethernet a useful diagnostic comparison? Does increasing a player buffer solve a missing segment? Why can quality change before a pause?
- Semantic terms verified: adaptive streaming, media segments, playback buffer, Wi-Fi interference, Ethernet comparison, decoder, bitrate, and peak-hour congestion. Long-tail variations: `how to diagnose IPTV buffering without changing everything`; `does Ethernet fix IPTV buffering`.

| Inspected competitor | Actual coverage | Zenora gap response |
|---|---|---|
| [CyberIPTV: buffering checks](https://cyberiptv.net/4k/blog/fix-iptv-buffering-2026/) | Separates source scope, Ethernet/Wi-Fi, router load, cache, decoder, and support evidence. | Zenora retains the scope-first diagnostic order while explicitly rejecting an inference from a single comparison to a definitive source cause. |
| [iTechGuides: buffering and streaming quality](https://www.itechguides.com/how-to-improve-iptv-buffering-and-streaming-quality/) | Compares one stream, devices, services, time, and device-location tests; calls a speed test a snapshot. | Zenora adds media-segment and decoding explanations plus a reproducible, privacy-safe escalation record. |
| [IPTV Commons: buffering fix](https://iptvcommons.com/guides/iptv-buffering-fix) | Ordered tests for Ethernet, Wi-Fi band/placement, buffer size, decoder, cache, and updates. | Zenora makes each comparison conditional and explains why it cannot prove every upstream cause. |

| Verified finding integrated in visible body | Source / date |
|---|---|
| HLS adapts playback to available wired and wireless connection speed, so a pause alone does not identify its failed layer. | [Apple: HTTP Live Streaming](https://developer.apple.com/streaming/), undated; accessed 2026-11-06 |
| Decode capability depends on codec, profile, resolution, and bitrate and can be assessed for smooth, power-efficient playback. | [MDN: MediaCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities), modified 2024-10-08; accessed 2026-11-06 |

## Completed article: Samsung Smart TV IPTV Compatibility

- Competitors inspected: [OTTV](https://www.ottv.org/docs/setup-iptv-on-smart-tv) distinguishes Samsung Tizen from Android-based TV setup; [IPTV Commons](https://iptvcommons.com/guides/smart-tv-iptv-apps-samsung-lg) explains the Tizen/Android player distinction; [DualIPTV](https://www.dualiptv.com/guide/iptv-on-samsung-smart-tv) presents store-app and connected-streamer paths. Zenora's gap response is a model- and account-safe diagnostic order rather than a player or service recommendation.
- Related questions: Is a Samsung TV an Android TV? Does a successful install prove format/account support? What is a cold boot? What is lost during reinstall or Smart Hub reset? When should a user contact the app developer?
- Semantic terms: Tizen, Smart Hub, firmware, cold boot, app reinstall, remote interface, app availability, credentials. Long-tail variations: `Samsung Smart TV IPTV compatibility checklist`; `what to do before resetting Samsung Smart Hub`.

| Verified finding integrated in visible body | Source / date |
|---|---|
| Samsung's recovery order for a missing, freezing, loading, or crashing app is cold boot, software update, reinstall, then Smart Hub reset. | [Samsung: app troubleshooting](https://www.samsung.com/us/support/troubleshoot/TSG10000062/), accessed 2026-11-06 |
| Reinstalling a third-party app and resetting Smart Hub sign users out, so credentials must be recoverable first. | [Samsung: app troubleshooting](https://www.samsung.com/us/support/troubleshoot/TSG10000062/), accessed 2026-11-06 |

## Completed article: Ethernet vs. Wi-Fi for Streaming

- Competitors inspected: [TV Empire](https://tvempire.net/guides/is-ethernet-or-wifi-better-for-iptv/) recommends cable or 5 GHz/mesh alternatives; [The IPTV Shop](https://theiptvshop.com/wifi-vs-ethernet-iptv/) focuses on stability at the playback device; [IPTV Rich](https://iptvrich.ca/blog/wifi-vs-ethernet-iptv/) proposes same-device comparison measurements. Zenora preserves controlled comparison but avoids their universal bitrate and outcome assertions.
- Related questions: Is Ethernet always better? Can strong Wi-Fi be sufficient? Which local conditions weaken Wi-Fi? Does a cable test the whole delivery path? Why vary testing by time and device location?
- Semantic terms: Ethernet, Wi-Fi interference, access point, packet loss, latency, router placement, mesh backhaul, throughput. Long-tail variations: `Ethernet versus Wi-Fi streaming test at the TV`; `does Ethernet improve live streaming stability`.

| Verified finding integrated in visible body | Source / date |
|---|---|
| Ethernet may provide a better connection than Wi-Fi; physical obstacles and electrical equipment can weaken or interfere with Wi-Fi. | [Ofcom: improving your Wi-Fi experience](https://www.ofcom.org.uk/phones-and-broadband/coverage-and-speeds/improving-your-wifi-experience), accessed 2026-11-06 |
| Actual speeds vary with time, concurrent devices, and the wired/Wi-Fi connection choice. | [Ofcom: choosing a broadband provider](https://www.ofcom.org.uk/phones-and-broadband/service-quality/quality-of-service?language=en), accessed 2026-11-06 |

## Final six article evidence

| Article | Competitors inspected / coverage gap addressed | Related questions, semantic terms, and long-tail variations | Visible authoritative findings |
|---|---|---|---|
| Apple TV compatibility | [OTTV](https://www.ottv.org/docs/setup-iptv-on-apple-tv) contrasts native tvOS and AirPlay; [IPTVTips](https://www.iptvtips.com/iptv-on-apple-tv) covers App Store/player setup; [IPTV Gold](https://iptvgold.ca/setup-guides/apple-tv/) covers on-device account entry. Zenora avoids player recommendations and adds compatibility and reset-safety checks. | Related questions: Does an App Store result on another device prove support? What does a reset remove? Does region affect availability? Is AirPlay the same as native playback? What must be checked before a reset? Terms: tvOS, App Store, device compatibility, region, Apple Account, reset, native player, AirPlay. Long tails: `Apple TV IPTV compatibility checklist`; `what an Apple TV app reset removes`. | [Apple Support](https://support.apple.com/en-ie/102472): compatibility/availability can vary; reset removes personal information. |
| EPG not working | [OTTV](https://www.ottv.org/blog/iptv-epg-not-showing) covers source, matching, and offset; [IPTVTips](https://www.iptvtips.com/iptv-epg-not-loading) covers blank/wrong guides; [IPTV Commons](https://iptvcommons.com/guides/epg-xmltv-guide) explains XMLTV matching. Zenora distinguishes guide data from playback. | Questions: Why can playback work with a blank guide? What must match? Why can time be wrong? Is first load complete? What does a guide refresh change? Terms: EPG, XMLTV, channel ID, programme, time offset, refresh, cache, playlist, mapping. Long tails: `why IPTV EPG is blank while channels play`; `XMLTV channel ID matching checklist`. | [XMLTV format](https://wiki.xmltv.org/index.php/XMLTVFormat) and [DTD](https://github.com/XMLTV/xmltv/blob/master/xmltv.dtd): unified channel/programme data and defined programme records. |
| M3U not loading | [iiPTV](https://iiptv.app/help/playlist-load-errors) separates retrieval and parsing; [Redixel](https://redixel.com/m3u-playlist-not-loading) uses one-change tests; [M3U.codes](https://m3u.codes/guides/m3u-playlist-not-loading/) covers URL/header errors. Zenora adds specification-backed stage separation. | Questions: Is it retrieval, parsing, or playback? What should the first line be? What does a 401/403 imply? Is an HTML response a playlist? When should credentials stay private? Terms: M3U, UTF-8, EXTM3U, manifest, URL, parsing, HTTP response, import. Long tails: `M3U playlist not loading HTML response`; `how to distinguish M3U import from playback failure`. | [RFC 8216](https://datatracker.ietf.org/doc/html/rfc8216): UTF-8/EXTM3U; [Apple HLS](https://developer.apple.com/streaming/): ordinary web-server delivery. |
| Black screen or no sound | [IPTVLinux](https://www.iptvlinux.com/en/blog/iptv-black-screen-fix) splits sound/no-sound symptoms; [IPTVitec](https://iptvitec.com/blog/iptv-black-screen/) separates decoder, format, and source checks; [StreamQ](https://streamq.co.uk/blog/how-to-fix-iptv-black-screen-no-sound) includes output-path checks. Zenora avoids diagnostic certainty from one symptom. | Questions: Does audio alter the next test? Can a decoder fail at one format? Does a 4K label prove decode support? Can network variation be the only explanation? What should be tested first? Terms: decoder, codec, bitrate, profile, HDMI, audio track, rendering, adaptive delivery. Long tails: `IPTV black screen with sound diagnosis`; `no sound streaming decoder versus delivery test`. | [MDN MediaCapabilities](https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities) lists codec/profile/resolution/bitrate factors; [Apple HLS](https://developer.apple.com/streaming/) documents adaptation. |
| Fire TV vs Android TV | [Redixel](https://redixel.com/android-tv-vs-fire-tv-for-iptv) compares setup flexibility; [BestIPTV4K](https://bestiptv4k.org/blog/fire-tv-vs-android-tv-for-iptv/) compares stores/interface; [Atlas Stream](https://atlasstreamlive.com/blog/firestick-vs-android-box-uk/) compares ports and device fit. Zenora replaces generic rankings with model/remote checks. | Questions: Is Fire OS the same as Android TV? Does a generic Android app prove TV usability? Which model/OS matters? Can an app listing prove support? What test belongs on the target device? Terms: Fire OS, Android TV, Google TV, Appstore, Play Store, D-pad, remote, API level. Long tails: `Fire TV versus Android TV compatibility checklist`; `does an Android app listing work on Fire TV`. | [Amazon Fire OS overview](https://developer.amazon.com/docs/fire-tv/fire-os-overview.html): version/API differences; [Android TV quality](https://developer.android.com/docs/quality-guidelines/tv-app-quality): D-pad navigation. |
| Login/authentication errors | [IPTVitec](https://iptvitec.com/blog/iptv-login-failed/) covers URL, fields, account state and second-device test; [Ultra 8K](https://ultra-8k-iptv.com/help/iptv-login-failed/) covers typo/expiry/connection limits; [M3U.codes](https://m3u.codes/guides/m3u-playlist-not-loading/) distinguishes response failures. Zenora adds standards-based status-code caution and credential safety. | Questions: What does a 401 require? Is a generic login error conclusive? Which fields must match exactly? Can a connection limit matter? What may be shared with support? Terms: authentication, 401, challenge, credentials, token, MFA, account state, connection limit. Long tails: `IPTV login failed 401 safe troubleshooting`; `what to send support without exposing playlist credentials`. | [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110): 401/challenge; [CISA IAM guidance](https://www.cisa.gov/sites/default/files/2023-12/ESF%20IDENTITY%20AND%20ACCESS%20MANAGEMENT%20RECOMMENDED%20BEST%20PRACTICES%20FOR%20ADMINISTRATORS%20PP-23-0248_508C.pdf): MFA mitigates credential attacks. |
