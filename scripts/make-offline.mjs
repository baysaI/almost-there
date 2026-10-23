import { mkdir, readFile, writeFile } from 'node:fs/promises';

const out = 'web';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function download(url, file) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

await mkdir(`${out}/vendor/fonts`, { recursive: true });
let html = await readFile('index.html', 'utf8');

const threeUrl = html.match(/<script src="(https:\/\/cdnjs\.cloudflare\.com\/[^"]+three[^"]*\.js)"/)[1];
await download(threeUrl, `${out}/vendor/three.min.js`);
html = html.replace(threeUrl, 'vendor/three.min.js');

const cssUrl = html.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com\/[^"]+)">/)[1];
let css = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text();
let n = 0;
for (const [, url] of [...css.matchAll(/url\((https:[^)]+)\)/g)]) {
  const name = `font-${n++}.woff2`;
  await download(url, `${out}/vendor/fonts/${name}`);
  css = css.replace(url, `fonts/${name}`);
}
await writeFile(`${out}/vendor/fonts.css`, css);
html = html
  .replace(/<link rel="preconnect"[^>]*>\n?/, '')
  .replace(`<link rel="stylesheet" href="${cssUrl}">`, '<link rel="stylesheet" href="vendor/fonts.css">');

await writeFile(`${out}/index.html`, html);
console.log(`offline build ready: ${out} (${n} font files)`);
