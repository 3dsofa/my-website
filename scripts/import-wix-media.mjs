import { mkdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';

const sourceUrl = 'https://artcinemastudio.wixstudio.com/3design';
const publicRoot = new URL('../public/', import.meta.url).pathname;
const archiveRoot = new URL('../archive/', import.meta.url).pathname;
const imageRoot = join(publicRoot, 'media', 'images');
const videoRoot = join(publicRoot, 'media', 'videos');

const safeName = (value, fallback) => {
  const extension = extname(value).toLowerCase() || extname(fallback).toLowerCase();
  const stem = basename(value, extname(value))
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return `${stem || fallback}${extension}`;
};

const uniqueName = (preferred, id, used) => {
  let name = preferred;
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  const extension = extname(name);
  name = `${basename(name, extension)}-${id.slice(-8)}${extension}`;
  used.add(name);
  return name;
};

const download = async (url, destination) => {
  try {
    if ((await stat(destination)).size > 1024) return;
  } catch {}
  const temporary = `${destination}.part`;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: 'follow' });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      await writeFile(temporary, Buffer.from(await response.arrayBuffer()));
      await rename(temporary, destination);
      return;
    } catch (error) {
      await rm(temporary, { force: true });
      if (attempt === 4) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 800));
    }
  }
};

await Promise.all([
  mkdir(imageRoot, { recursive: true }),
  mkdir(videoRoot, { recursive: true }),
  mkdir(archiveRoot, { recursive: true }),
]);

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Unable to read Wix page: ${response.status}`);
const html = await response.text();
await writeFile(join(archiveRoot, 'artcinemastudio-3design.html'), html);

const decoded = html
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&amp;', '&');

const imageByUri = new Map();
const imagePattern = /"imageData":\{"uri":"([^"]+)","width":(\d+),"height":(\d+),"alt":"(.*?)","name":"([^"]+)"/g;
for (const match of decoded.matchAll(imagePattern)) {
  const [, uri, width, height, alt, originalName] = match;
  if (!imageByUri.has(uri)) {
    imageByUri.set(uri, {
      uri,
      width: Number(width),
      height: Number(height),
      alt: alt.replaceAll('\\"', '"'),
      originalName,
    });
  }
}

const usedImageNames = new Set();
const images = [...imageByUri.values()].map((item) => {
  const fallback = item.uri.split('~')[0].slice(-12);
  const file = uniqueName(safeName(item.originalName, fallback), fallback, usedImageNames);
  return {
    ...item,
    file,
    path: `/media/images/${file}`,
    source: `https://static.wixstatic.com/media/${item.uri}`,
  };
});

const videos = [];
const seenVideos = new Set();
const videoPattern = /videoId":"([0-9a-f_]+)"/g;
for (const match of decoded.matchAll(videoPattern)) {
  const id = match[1];
  if (seenVideos.has(id)) continue;
  seenVideos.add(id);
  const before = decoded.slice(Math.max(0, match.index - 900), match.index);
  const labels = [...before.matchAll(/aria-label="([^"]+?\.mp4) Play video"/gi)];
  const originalName = labels.at(-1)?.[1] || `motion-${id.slice(-8)}.mp4`;
  const after = decoded.slice(match.index, match.index + 1800);
  const qualities = [...after.matchAll(/"quality":"(\d+)p"[^}]+?"url":"([^"]+\.mp4)"/g)]
    .map((quality) => ({ height: Number(quality[1]), relativeUrl: quality[2] }));
  if (!qualities.length) continue;
  const best = qualities.sort((a, b) => b.height - a.height)[0];
  videos.push({
    id,
    originalName,
    file: safeName(originalName, id.slice(-8)),
    path: `/media/videos/${safeName(originalName, id.slice(-8))}`,
    source: `https://video.wixstatic.com/${best.relativeUrl}`,
    height: best.height,
  });
}

const media = [...images, ...videos];
let completed = 0;
const queue = [...media];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const item = queue.shift();
      if (!item) return;
    const destination = join(item.uri ? imageRoot : videoRoot, item.file);
    await download(item.source, destination);
    completed += 1;
    process.stdout.write(`\rDownloaded ${completed}/${media.length}`);
    }
  }),
);
process.stdout.write('\n');

const manifest = {
  sourceUrl,
  importedAt: new Date().toISOString(),
  images,
  videos,
};
await writeFile(join(publicRoot, 'media', 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Imported ${images.length} images and ${videos.length} videos.`);
