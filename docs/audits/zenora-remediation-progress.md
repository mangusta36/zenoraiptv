# Zenora remediation progress

| Finding | Root cause | Planned correction | Dependency | Status |
|---|---|---|---|---|
| F-001 | Client-only demo handlers; no provider boundary | Preserved truthful unavailable states; provider-backed implementation remains required | Live payment/delivery/order provider credentials and approved rules | PARTIALLY FIXED / BLOCKED |
| F-002 | Business/legal facts unavailable | Retain explicit release block; clarify non-operational status | Owner and legal approval | BLOCKED |
| F-003 | Hard-coded sitemap omitted setup children | Centralized public setup slugs in sitemap and added static coverage test | None | FIXED |
| F-004 | No maintained browser suite | Static regression coverage added; browser suite still requires a healthy dependency install | Browser binary/install execution | PARTIALLY FIXED / NOT VERIFIED |
| F-005 | Semver ranges allow drift | Pinned verified framework/runtime package versions | None | FIXED |
| F-006 | No measurable budget | Added raw shared-JS build-budget verification script | None | PARTIALLY FIXED |
| F-007 | Shared metadata lacks Twitter object | Added matching Twitter metadata/image to helpers and static test | None | FIXED |
