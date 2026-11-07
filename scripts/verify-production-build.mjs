import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const timeoutMs = Number(process.env.BUILD_VERIFY_TIMEOUT_MS ?? 180000);
const resultsDir = path.resolve("docs/audits/results");
const logPath = path.join(resultsDir, "build.log");
const resultPath = path.join(resultsDir, "build-result.json");
fs.mkdirSync(resultsDir, { recursive: true });
const startedAt = new Date();
const log = fs.createWriteStream(logPath);
const command = process.platform === "win32" ? "npm.cmd" : "npm";
const child = spawn(command, ["run", "build"], { cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"], detached: false });
child.stdout.pipe(process.stdout); child.stdout.pipe(log);
child.stderr.pipe(process.stderr); child.stderr.pipe(log);
let timedOut = false;
const timer = setTimeout(() => { timedOut = true; child.kill("SIGTERM"); }, timeoutMs);
child.once("error", (error) => finish(null, null, error));
child.once("close", (code, signal) => finish(code, signal));
function finish(code, signal, error) {
  clearTimeout(timer); log.end();
  const endedAt = new Date();
  const result = { command: "npm run build", startedAt: startedAt.toISOString(), endedAt: endedAt.toISOString(), durationMs: endedAt - startedAt, exitCode: code, signal: signal ?? null, timedOut, error: error?.message ?? null, verified: !timedOut && !error && code === 0, logPath: "docs/audits/results/build.log" };
  fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.verified ? 0 : 1;
}
