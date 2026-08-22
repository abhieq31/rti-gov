import { readFile, writeFile } from 'node:fs/promises';

const [sourcePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !outputPath) throw new Error('Usage: node scripts/sync-authorities.mjs <official-html> <output-json>');

const html = await readFile(sourcePath, 'utf8');
const decode = (value) => value
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/\s+/g, ' ')
  .trim();

const records = [...html.matchAll(/<tr[^>]*data-level="(\d+)"[^>]*data-id="(\d+)"[^>]*data-parent="([^"]*)"[^>]*>[\s\S]*?<td>([\s\S]*?)<\/td>[\s\S]*?<\/tr>/gi)]
  .map((match) => ({
    id: match[2],
    parentId: match[3] || null,
    level: Number(match[1]),
    name: decode(match[4]),
  }))
  .filter((record) => record.name);

await writeFile(outputPath, `${JSON.stringify({
  source: 'https://rtionline.gov.in/request/allpa.php',
  retrieved: '2026-08-22',
  count: records.length,
  authorities: records,
}, null, 2)}\n`);

console.log(`Wrote ${records.length} official public-authority records to ${outputPath}`);
