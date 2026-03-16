const { promises: fs } = require("fs");

const SOUTENANCE_DATE = process.env.SOUTENANCE_DATE || "2026-09-15T14:00:00";

function getCountdown() {
  const soutenance = new Date(SOUTENANCE_DATE);
  const now = new Date();
  const diff = soutenance.getTime() - now.getTime();

  if (diff <= 0) {
    return "🎉 **Thesis successfully defended!** 🎓";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const parts = [];
  if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);

  const timeStr = parts.length ? parts.join(", ") : "less than a minute";
  return `⏳ **${timeStr}** before my thesis defense! 🎓`;
}

async function main() {
  const countdown = getCountdown();

  const readme = await fs.readFile("./README.md", "utf-8");

  const replacement = `<!-- COUNTDOWN:START -->\n${countdown}\n<!-- COUNTDOWN:END -->`;
  const updated = readme.replace(
    /<!-- COUNTDOWN:START -->[\s\S]*?<!-- COUNTDOWN:END -->/,
    replacement,
  );

  await fs.writeFile("./README.md", updated);

  console.log("README updated!");
  console.log(countdown);
}

main();
