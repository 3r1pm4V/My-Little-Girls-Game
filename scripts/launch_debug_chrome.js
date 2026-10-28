const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SRC_USER_DATA = "C:\\Users\\nghiabh\\AppData\\Local\\Google\\Chrome\\User Data";
const DST_USER_DATA = "C:\\Users\\nghiabh\\.chrome-flow-profile";

console.log("1. Closing running Chrome processes...");
try {
  execSync('powershell -Command "Stop-Process -Name chrome -Force -ErrorAction SilentlyContinue"');
} catch(e) {}

setTimeout(() => {
  console.log("2. Copying essential login session files...");
  if (!fs.existsSync(DST_USER_DATA)) fs.mkdirSync(DST_USER_DATA, { recursive: true });

  try {
    fs.copyFileSync(path.join(SRC_USER_DATA, "Local State"), path.join(DST_USER_DATA, "Local State"));
    console.log("Copied Local State");
  } catch(e) { console.error("Local state copy err:", e.message); }

  const dstDefault = path.join(DST_USER_DATA, "Default");
  if (!fs.existsSync(dstDefault)) fs.mkdirSync(dstDefault, { recursive: true });

  const filesToCopy = [
    "Preferences", "Secure Preferences", "Web Data",
    "Network\\Cookies", "Network\\Cookies-journal",
    "Login Data", "Login Data-journal"
  ];

  filesToCopy.forEach(rel => {
    const s = path.join(SRC_USER_DATA, "Default", rel);
    const d = path.join(dstDefault, rel);
    const dir = path.dirname(d);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    try {
      if (fs.existsSync(s)) {
        fs.copyFileSync(s, d);
        console.log("Copied", rel);
      }
    } catch(err) {
      console.warn("Skip/Err", rel, err.message);
    }
  });

  console.log("3. Launching Chrome with remote debugging on port 9222...");
  const child = spawn(CHROME_PATH, [
    "--remote-debugging-port=9222",
    "--remote-allow-origins=*",
    `--user-data-dir=${DST_USER_DATA}`,
    "https://flow.google.com"
  ], { detached: true, stdio: "ignore" });
  child.unref();

  console.log("Done! Chrome launched with dev profile and port 9222.");
  process.exit(0);
}, 1500);
