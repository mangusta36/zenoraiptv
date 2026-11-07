export type ResearchFinding = {
  claim: string;
  sourceLabel: string;
  href: string;
  sourceDate: string;
};

export const articleResearch: Record<string, ResearchFinding[]> = {
  "what-is-iptv": [
    {
      claim: "Apple documents HLS as supporting both live broadcasts and video on demand, with alternate streams that can switch in response to network bandwidth.",
      sourceLabel: "Apple: HTTP Live Streaming",
      href: "https://developer.apple.com/documentation/http-live-streaming",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
    {
      claim: "RFC 8216 defines HLS playlists as UTF-8 text files and distinguishes Media Playlists, which list media segments, from Master Playlists, which list other playlists.",
      sourceLabel: "IETF: RFC 8216",
      href: "https://datatracker.ietf.org/doc/html/rfc8216",
      sourceDate: "August 2017; accessed November 6, 2026",
    },
  ],
  "m3u-playlists-explained": [
    {
      claim: "Apple describes HLS as using ordinary web servers and content delivery networks, and as adapting playback to available wired and wireless network conditions.",
      sourceLabel: "Apple: HTTP Live Streaming",
      href: "https://developer.apple.com/documentation/http-live-streaming",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
    {
      claim: "RFC 8216 requires an HLS playlist to be UTF-8 and says the EXTM3U tag must be the first line of every Media Playlist and Master Playlist.",
      sourceLabel: "IETF: RFC 8216",
      href: "https://datatracker.ietf.org/doc/html/rfc8216",
      sourceDate: "August 2017; accessed November 6, 2026",
    },
  ],
  "device-compatibility": [
    {
      claim: "Google's Android TV quality guidance says a TV app's functionality must be navigable with five-way D-pad controls, reflecting the remote-first TV interface rather than a touch-only phone experience.",
      sourceLabel: "Android Developers: TV app quality",
      href: "https://developer.android.com/docs/quality-guidelines/tv-app-quality",
      sourceDate: "updated June 29, 2026; accessed November 6, 2026",
    },
    {
      claim: "Google also states that TV apps which meet the publishing requirements appear in the Play Store on TV devices; this makes the listing shown on the target device a meaningful availability check, not a guarantee of service entitlement or playback-format support.",
      sourceLabel: "Android Developers: TV app quality",
      href: "https://developer.android.com/docs/quality-guidelines/tv-app-quality",
      sourceDate: "updated June 29, 2026; accessed November 6, 2026",
    },
  ],
  "fire-tv-setup-checklist": [
    {
      claim: "Amazon documents Fire OS as a fork of Android and lists multiple Fire OS generations with different underlying Android API levels; the exact Fire TV model and software version therefore matter when checking a player's requirements.",
      sourceLabel: "Amazon: Fire OS Overview",
      href: "https://developer.amazon.com/docs/fire-tv/fire-os-overview.html",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
    {
      claim: "Amazon says Fire TV supports Android, HTML5 web, and React Native apps, but this platform capability does not prove that a particular player is available in the Appstore or supported by an authorized service.",
      sourceLabel: "Amazon: Get Started with Fire TV",
      href: "https://developer.amazon.com/docs/fire-tv/get-started-with-fire-tv.html",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
  ],
  "iptv-troubleshooting": [
    {
      claim: "Apple documents HLS as adapting playback to available wired and wireless network conditions by switching among alternate streams; a pause alone therefore does not identify the failed layer.",
      sourceLabel: "Apple: HTTP Live Streaming",
      href: "https://developer.apple.com/documentation/http-live-streaming",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
    {
      claim: "RFC 8216 distinguishes a Media Playlist, which lists media segments, from a Master Playlist, which lists other playlists; a playlist-format issue should be investigated separately from a player, account, or network symptom.",
      sourceLabel: "IETF: RFC 8216",
      href: "https://datatracker.ietf.org/doc/html/rfc8216",
      sourceDate: "August 2017; accessed November 6, 2026",
    },
  ],
  "improve-streaming-quality": [
    {
      claim: "Apple says HLS dynamically adapts playback to available wired and wireless connection speed, so improving stability is more useful than forcing an unsupported picture-quality setting.",
      sourceLabel: "Apple: HTTP Live Streaming",
      href: "https://developer.apple.com/streaming/",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
    {
      claim: "MDN documents that MediaCapabilities can query decoding support using codecs, profile, resolution, and bitrate, illustrating why a display-resolution label alone cannot establish smooth playback on a particular device.",
      sourceLabel: "MDN: MediaCapabilities",
      href: "https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities",
      sourceDate: "last modified October 8, 2024; accessed November 6, 2026",
    },
  ],
  "iptv-security-privacy": [
    {
      claim: "CISA's identity-and-access guidance explains that multi-factor authentication mitigates password attacks such as credential stuffing and brute-force guessing; it is strongest when the method resists phishing.",
      sourceLabel: "CISA: IAM recommended practices",
      href: "https://www.cisa.gov/sites/default/files/2023-12/ESF%20IDENTITY%20AND%20ACCESS%20MANAGEMENT%20RECOMMENDED%20BEST%20PRACTICES%20FOR%20ADMINISTRATORS%20PP-23-0248_508C.pdf",
      sourceDate: "December 2023; accessed November 6, 2026",
    },
    {
      claim: "CISA recommends changing default credentials and applying updates for connected devices, which supports treating the player, television or streamer, and home router as separate security boundaries.",
      sourceLabel: "CISA: Protecting your digital home",
      href: "https://www.cisa.gov/sites/default/files/publications/NCSAM_YourDigitalHome_2020.pdf",
      sourceDate: "2020 publication; accessed November 6, 2026",
    },
  ],
  "choosing-an-iptv-subscription": [
    {
      claim: "The FTC advises confirming a trial's terms, length, and cancellation method before signing up; if those details are unclear, it advises not to sign up.",
      sourceLabel: "FTC: free trials and auto-renewals",
      href: "https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions",
      sourceDate: "undated consumer guidance; accessed November 6, 2026",
    },
    {
      claim: "The FTC also advises consumers to review renewal notices for the expected price and to treat a notice requesting card information cautiously, because it may be a scam rather than a bill.",
      sourceLabel: "FTC: free trials and auto-renewals",
      href: "https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions",
      sourceDate: "undated consumer guidance; accessed November 6, 2026",
    },
  ],
  "what-is-an-iptv-player": [
    {
      claim: "Apple describes HLS as delivering live and on-demand media using ordinary web servers and CDNs, while adaptation responds to available network conditions; this describes delivery, not an entitlement to content.",
      sourceLabel: "Apple: HTTP Live Streaming",
      href: "https://developer.apple.com/streaming/",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
    {
      claim: "Android's TV quality guidance requires app functionality to be navigable with five-way D-pad controls, showing why a phone-oriented player listing does not automatically establish a usable TV-player experience.",
      sourceLabel: "Android Developers: TV app quality",
      href: "https://developer.android.com/docs/quality-guidelines/tv-app-quality",
      sourceDate: "updated June 29, 2026; accessed November 6, 2026",
    },
  ],
  "android-tv-google-tv-iptv": [
    {
      claim: "Android's TV app-quality criteria require functionality to be navigable using five-way D-pad controls, so a phone-oriented Android app is not evidence of a usable television interface.",
      sourceLabel: "Android Developers: TV app quality",
      href: "https://developer.android.com/docs/quality-guidelines/tv-app-quality",
      sourceDate: "updated June 29, 2026; accessed November 6, 2026",
    },
    {
      claim: "Android says TV apps that meet the publishing requirements appear in Play Store on TV devices, making the listing offered on the target television a more meaningful check than a phone-store result.",
      sourceLabel: "Android Developers: TV app quality",
      href: "https://developer.android.com/docs/quality-guidelines/tv-app-quality",
      sourceDate: "updated June 29, 2026; accessed November 6, 2026",
    },
  ],
  "iptv-buffering-causes": [
    {
      claim: "Apple says HLS dynamically adapts playback to the available speed of wired and wireless connections. A pause therefore identifies a playback shortage, not by itself the network, device, player, or upstream layer that caused it.",
      sourceLabel: "Apple: HTTP Live Streaming",
      href: "https://developer.apple.com/streaming/",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
    {
      claim: "MDN documents that decoding capability depends on codec, profile, resolution, and bitrate and can be assessed for smooth, power-efficient playback. A resolution label or a speed-test result alone cannot establish that a particular device will decode a stream smoothly.",
      sourceLabel: "MDN: MediaCapabilities",
      href: "https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities",
      sourceDate: "last modified October 8, 2024; accessed November 6, 2026",
    },
  ],
  "ethernet-vs-wifi-streaming": [
    {
      claim: "Ofcom says Ethernet cables often provide a better internet connection than Wi-Fi, while Wi-Fi signals can weaken through objects and be affected by nearby electrical equipment. A wired comparison is therefore a useful local-link test, not proof about every part of the delivery path.",
      sourceLabel: "Ofcom: improving your Wi-Fi experience",
      href: "https://www.ofcom.org.uk/phones-and-broadband/coverage-and-speeds/improving-your-wifi-experience",
      sourceDate: "consumer guidance; accessed November 6, 2026",
    },
    {
      claim: "Ofcom advises that actual speed can vary with time of day, simultaneous people and devices, and whether the device uses Wi-Fi or a wired connection. Test the same device at the viewing location instead of treating an advertised plan speed as a playback result.",
      sourceLabel: "Ofcom: choosing a broadband provider",
      href: "https://www.ofcom.org.uk/phones-and-broadband/service-quality/quality-of-service?language=en",
      sourceDate: "consumer guidance; accessed November 6, 2026",
    },
  ],
  "samsung-smart-tv-iptv": [
    {
      claim: "Samsung says that an app which freezes, does not load, is missing, or crashes should be checked by cold-booting the TV, updating its software, reinstalling the app, and only then resetting Smart Hub. App availability and a successful installation are separate from a service's authorization or format support.",
      sourceLabel: "Samsung: app troubleshooting",
      href: "https://www.samsung.com/us/support/troubleshoot/TSG10000062/",
      sourceDate: "Samsung support guidance; accessed November 6, 2026",
    },
    {
      claim: "Samsung warns that deleting or reinstalling a third-party app signs the user out, and that a Smart Hub reset signs the user out of Samsung and app accounts. Record recoverable login details before taking those destructive troubleshooting steps.",
      sourceLabel: "Samsung: app troubleshooting",
      href: "https://www.samsung.com/us/support/troubleshoot/TSG10000062/",
      sourceDate: "Samsung support guidance; accessed November 6, 2026",
    },
  ],
  "apple-tv-iptv-compatibility": [
    {
      claim: "Apple says that an unavailable Apple TV app should be checked against the target device's compatibility, and that availability and supported devices can vary by country or region. A store result on another device is not a compatibility guarantee.",
      sourceLabel: "Apple Support: compatible device setup",
      href: "https://support.apple.com/en-ie/102472",
      sourceDate: "published February 19, 2026; accessed November 6, 2026",
    },
    {
      claim: "Apple says resetting the Apple TV app removes personal information and restores original settings. Record recoverable sign-in details and use a reset only after less destructive checks.",
      sourceLabel: "Apple Support: compatible device setup",
      href: "https://support.apple.com/en-ie/102472",
      sourceDate: "published February 19, 2026; accessed November 6, 2026",
    },
  ],
  "iptv-epg-not-working": [
    {
      claim: "The XMLTV project documents a unified XML listing with channel and programme records, including programme metadata and broadcast details. A visible guide depends on data being available and interpretable, not merely on successful video playback.",
      sourceLabel: "XMLTV: file format",
      href: "https://wiki.xmltv.org/index.php/XMLTVFormat",
      sourceDate: "project documentation; accessed November 6, 2026",
    },
    {
      claim: "XMLTV's published DTD defines the programme element and its attributes, so a player needs matching, valid guide data rather than a guessed time offset or unrelated playlist edit.",
      sourceLabel: "XMLTV: published DTD",
      href: "https://github.com/XMLTV/xmltv/blob/master/xmltv.dtd",
      sourceDate: "project source; accessed November 6, 2026",
    },
  ],
  "m3u-playlist-not-loading": [
    {
      claim: "RFC 8216 specifies that an HLS playlist is UTF-8 and that EXTM3U must be its first line. A response that is an HTML login page or an access-denied message is not a usable HLS playlist.",
      sourceLabel: "IETF: RFC 8216",
      href: "https://datatracker.ietf.org/doc/html/rfc8216",
      sourceDate: "August 2017; accessed November 6, 2026",
    },
    {
      claim: "Apple describes HLS as using ordinary web servers and CDNs. Import failure can therefore occur before playback, at URL access or playlist parsing, and should be isolated from video decoding.",
      sourceLabel: "Apple: HTTP Live Streaming",
      href: "https://developer.apple.com/streaming/",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
  ],
  "iptv-black-screen-no-sound": [
    {
      claim: "MDN documents that decoding support depends on codecs, profile, resolution, and bitrate. A black picture with otherwise responsive controls warrants a decoding or output-path comparison rather than an assumption that bandwidth is the cause.",
      sourceLabel: "MDN: MediaCapabilities",
      href: "https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities",
      sourceDate: "last modified October 8, 2024; accessed November 6, 2026",
    },
    {
      claim: "Apple says HLS adapts playback to available wired and wireless speed. Network variation can affect delivery, but it does not make an audio/video symptom a conclusive diagnosis without controlled comparison.",
      sourceLabel: "Apple: HTTP Live Streaming",
      href: "https://developer.apple.com/streaming/",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
  ],
  "fire-tv-vs-android-tv": [
    {
      claim: "Amazon documents Fire OS as a fork of Android with several generations tied to different Android API levels. The Fire TV device model and OS version must therefore be checked separately from a generic Android label.",
      sourceLabel: "Amazon: Fire OS Overview",
      href: "https://developer.amazon.com/docs/fire-tv/fire-os-overview.html",
      sourceDate: "undated documentation; accessed November 6, 2026",
    },
    {
      claim: "Android's TV quality criteria require functionality to be navigable with five-way D-pad controls. A usable TV-player comparison should test target-device remote navigation, not only a phone app listing or marketing claim.",
      sourceLabel: "Android Developers: TV app quality",
      href: "https://developer.android.com/docs/quality-guidelines/tv-app-quality",
      sourceDate: "updated June 29, 2026; accessed November 6, 2026",
    },
  ],
  "iptv-login-authentication-errors": [
    {
      claim: "RFC 9110 defines 401 Unauthorized as requiring user authentication and requires a WWW-Authenticate challenge in that response. An app's generic login-failed message does not by itself reveal whether credentials, account state, or transport caused the failure.",
      sourceLabel: "IETF: RFC 9110",
      href: "https://datatracker.ietf.org/doc/html/rfc9110",
      sourceDate: "June 2022; accessed November 6, 2026",
    },
    {
      claim: "CISA explains that multi-factor authentication mitigates password attacks including credential stuffing and brute-force guessing. Never put a playlist URL, password, or one-time code in a public support request while diagnosing sign-in.",
      sourceLabel: "CISA: IAM recommended practices",
      href: "https://www.cisa.gov/sites/default/files/2023-12/ESF%20IDENTITY%20AND%20ACCESS%20MANAGEMENT%20RECOMMENDED%20BEST%20PRACTICES%20FOR%20ADMINISTRATORS%20PP-23-0248_508C.pdf",
      sourceDate: "December 2023; accessed November 6, 2026",
    },
  ],
};
