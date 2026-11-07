export type TopicCluster = "fundamentals" | "setup" | "performance" | "safety";

export type ArticleRelationship = {
  cluster: TopicCluster;
  pillar: string;
  prerequisites: string[];
  successor?: string;
  supporting: string[];
  crossCluster: string[];
  primaryQuery: string;
  secondaryQuery: string;
  excludedQuery: string;
};

export const clusterJourneys: Record<TopicCluster, {
  name: string;
  hub: string;
  summary: string;
  nextStep: string;
}> = {
  fundamentals: {
    name: "IPTV fundamentals",
    hub: "/blog?category=fundamentals",
    summary: "Start by separating the delivery method, playlist or connection format, player, device, and service terms before changing settings.",
    nextStep: "Move from the basics to the exact player and device you plan to use.",
  },
  setup: {
    name: "Device compatibility and setup",
    hub: "/devices",
    summary: "Confirm the exact model, software version, official player listing, and documented connection method before attempting setup.",
    nextStep: "Use the matching platform guide, then test one authorized title on the target device.",
  },
  performance: {
    name: "Streaming performance and troubleshooting",
    hub: "/troubleshooting",
    summary: "Classify the observed symptom first, then change one variable at a time across the player, device, local network, and delivery path.",
    nextStep: "Choose the symptom-specific guide instead of applying unrelated network or account fixes.",
  },
  safety: {
    name: "Safety, privacy, and subscription evaluation",
    hub: "/blog?category=safety",
    summary: "Evaluate terms, rights, account protection, trial conditions, and verified support separately from a player or device claim.",
    nextStep: "Review subscription terms before payment and use verified private support for account recovery.",
  },
};

// This is the single relationship layer. Article content continues to live in guides.ts.
export const articleRelationships: Record<string, ArticleRelationship> = {
  "what-is-iptv": { cluster: "fundamentals", pillar: "what-is-iptv", prerequisites: [], successor: "m3u-playlists-explained", supporting: ["what-is-an-iptv-player", "device-compatibility"], crossCluster: ["choosing-an-iptv-subscription"], primaryQuery: "what is IPTV", secondaryQuery: "how IPTV works", excludedQuery: "IPTV troubleshooting" },
  "m3u-playlists-explained": { cluster: "fundamentals", pillar: "what-is-iptv", prerequisites: ["what-is-iptv"], successor: "what-is-an-iptv-player", supporting: ["m3u-playlist-not-loading"], crossCluster: ["iptv-epg-not-working"], primaryQuery: "what is an M3U playlist", secondaryQuery: "M3U versus M3U8", excludedQuery: "M3U playlist not loading" },
  "what-is-an-iptv-player": { cluster: "fundamentals", pillar: "what-is-iptv", prerequisites: ["what-is-iptv", "m3u-playlists-explained"], successor: "device-compatibility", supporting: ["device-compatibility"], crossCluster: ["iptv-security-privacy"], primaryQuery: "IPTV player vs provider", secondaryQuery: "what is an IPTV player", excludedQuery: "player installation steps" },
  "device-compatibility": { cluster: "setup", pillar: "device-compatibility", prerequisites: ["what-is-an-iptv-player"], successor: "android-tv-google-tv-iptv", supporting: ["fire-tv-setup-checklist", "samsung-smart-tv-iptv", "apple-tv-iptv-compatibility"], crossCluster: ["iptv-troubleshooting"], primaryQuery: "IPTV device compatibility", secondaryQuery: "compatible IPTV devices", excludedQuery: "device-specific installation" },
  "fire-tv-setup-checklist": { cluster: "setup", pillar: "device-compatibility", prerequisites: ["device-compatibility"], successor: "fire-tv-vs-android-tv", supporting: ["fire-tv-vs-android-tv"], crossCluster: ["iptv-login-authentication-errors"], primaryQuery: "IPTV setup on Firestick", secondaryQuery: "Fire TV IPTV setup checklist", excludedQuery: "Fire TV versus Android TV comparison" },
  "android-tv-google-tv-iptv": { cluster: "setup", pillar: "device-compatibility", prerequisites: ["device-compatibility"], successor: "fire-tv-vs-android-tv", supporting: ["fire-tv-vs-android-tv"], crossCluster: ["iptv-login-authentication-errors"], primaryQuery: "IPTV on Android TV and Google TV", secondaryQuery: "Android TV IPTV compatibility", excludedQuery: "Fire TV setup" },
  "samsung-smart-tv-iptv": { cluster: "setup", pillar: "device-compatibility", prerequisites: ["device-compatibility"], successor: "iptv-troubleshooting", supporting: ["apple-tv-iptv-compatibility"], crossCluster: ["iptv-black-screen-no-sound"], primaryQuery: "Samsung Smart TV IPTV compatibility", secondaryQuery: "Samsung Tizen IPTV setup", excludedQuery: "Android TV app installation" },
  "apple-tv-iptv-compatibility": { cluster: "setup", pillar: "device-compatibility", prerequisites: ["device-compatibility"], successor: "iptv-troubleshooting", supporting: ["samsung-smart-tv-iptv"], crossCluster: ["iptv-black-screen-no-sound"], primaryQuery: "Apple TV IPTV compatibility", secondaryQuery: "Apple TV IPTV setup", excludedQuery: "iOS phone setup" },
  "fire-tv-vs-android-tv": { cluster: "setup", pillar: "device-compatibility", prerequisites: ["device-compatibility"], successor: "iptv-troubleshooting", supporting: ["fire-tv-setup-checklist", "android-tv-google-tv-iptv"], crossCluster: ["ethernet-vs-wifi-streaming"], primaryQuery: "Fire TV vs Android TV IPTV", secondaryQuery: "Firestick versus Android TV box", excludedQuery: "platform-specific setup" },
  "iptv-troubleshooting": { cluster: "performance", pillar: "iptv-troubleshooting", prerequisites: [], successor: "iptv-buffering-causes", supporting: ["iptv-buffering-causes", "iptv-black-screen-no-sound", "iptv-login-authentication-errors"], crossCluster: ["device-compatibility"], primaryQuery: "IPTV troubleshooting", secondaryQuery: "IPTV not working", excludedQuery: "single-symptom diagnosis" },
  "improve-streaming-quality": { cluster: "performance", pillar: "iptv-troubleshooting", prerequisites: ["iptv-troubleshooting"], successor: "iptv-buffering-causes", supporting: ["ethernet-vs-wifi-streaming"], crossCluster: ["device-compatibility"], primaryQuery: "improve IPTV streaming quality", secondaryQuery: "improve streaming stability", excludedQuery: "diagnose repeated buffering" },
  "iptv-buffering-causes": { cluster: "performance", pillar: "iptv-troubleshooting", prerequisites: ["iptv-troubleshooting", "improve-streaming-quality"], successor: "ethernet-vs-wifi-streaming", supporting: ["ethernet-vs-wifi-streaming"], crossCluster: ["device-compatibility"], primaryQuery: "IPTV buffering fix", secondaryQuery: "IPTV buffering causes", excludedQuery: "general picture-quality optimization" },
  "ethernet-vs-wifi-streaming": { cluster: "performance", pillar: "iptv-troubleshooting", prerequisites: ["iptv-buffering-causes"], successor: "iptv-black-screen-no-sound", supporting: ["improve-streaming-quality"], crossCluster: ["device-compatibility"], primaryQuery: "Ethernet vs Wi-Fi for streaming", secondaryQuery: "wired versus Wi-Fi IPTV", excludedQuery: "universal buffering fix" },
  "iptv-epg-not-working": { cluster: "performance", pillar: "iptv-troubleshooting", prerequisites: ["m3u-playlists-explained"], successor: "m3u-playlist-not-loading", supporting: ["m3u-playlist-not-loading"], crossCluster: ["iptv-security-privacy"], primaryQuery: "IPTV EPG not working", secondaryQuery: "blank IPTV guide", excludedQuery: "video playback buffering" },
  "m3u-playlist-not-loading": { cluster: "performance", pillar: "iptv-troubleshooting", prerequisites: ["m3u-playlists-explained"], successor: "iptv-login-authentication-errors", supporting: ["iptv-epg-not-working"], crossCluster: ["iptv-security-privacy"], primaryQuery: "M3U playlist not loading", secondaryQuery: "M3U import error", excludedQuery: "what is an M3U playlist" },
  "iptv-black-screen-no-sound": { cluster: "performance", pillar: "iptv-troubleshooting", prerequisites: ["iptv-troubleshooting"], successor: "iptv-login-authentication-errors", supporting: ["iptv-buffering-causes"], crossCluster: ["device-compatibility"], primaryQuery: "IPTV black screen no sound", secondaryQuery: "black screen with audio", excludedQuery: "general IPTV troubleshooting" },
  "iptv-login-authentication-errors": { cluster: "performance", pillar: "iptv-troubleshooting", prerequisites: ["iptv-troubleshooting"], successor: "iptv-security-privacy", supporting: ["m3u-playlist-not-loading"], crossCluster: ["choosing-an-iptv-subscription"], primaryQuery: "IPTV login authentication errors", secondaryQuery: "IPTV login failed", excludedQuery: "playlist parsing errors" },
  "iptv-security-privacy": { cluster: "safety", pillar: "iptv-security-privacy", prerequisites: [], successor: "choosing-an-iptv-subscription", supporting: ["choosing-an-iptv-subscription", "iptv-login-authentication-errors"], crossCluster: ["what-is-an-iptv-player"], primaryQuery: "IPTV security and privacy", secondaryQuery: "protect IPTV account", excludedQuery: "subscription pricing" },
  "choosing-an-iptv-subscription": { cluster: "safety", pillar: "iptv-security-privacy", prerequisites: ["iptv-security-privacy"], successor: "iptv-login-authentication-errors", supporting: ["iptv-login-authentication-errors"], crossCluster: ["device-compatibility"], primaryQuery: "how to choose an IPTV subscription", secondaryQuery: "IPTV subscription checklist", excludedQuery: "technical playback troubleshooting" },
};
