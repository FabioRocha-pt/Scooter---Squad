/*
  Prepara os assets do hero em public/:
  - move modelos .glb soltos na raiz para public/models/bike.glb
  - descarrega o vídeo de fundo do Higgsfield
  Uso: node scripts/fetch-assets.mjs
*/
import { createWriteStream, existsSync, mkdirSync, renameSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { get } from 'node:https';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// modelos dropados na raiz do projeto → public/models/bike.glb
const LOOSE_MODELS = ['generic_scooter.glb', 'bike.glb', 'scooter.glb'];
const MODEL_DEST = resolve(root, 'public/models/bike.glb');

for (const name of LOOSE_MODELS) {
  const src = resolve(root, name);
  if (!existsSync(src)) continue;
  if (existsSync(MODEL_DEST)) {
    console.log(`✓ modelo já instalado, a ignorar ${name}`);
    break;
  }
  mkdirSync(dirname(MODEL_DEST), { recursive: true });
  renameSync(src, MODEL_DEST);
  console.log(`✓ modelo movido: ${name} → public/models/bike.glb`);
  break;
}

const ASSETS = [
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_3GT4V4DPCET3nckYRoewhwWYkU4/hf_20260713_230643_68274392-e91a-41a2-9d93-38039ddb4e1a.mp4',
    dest: 'public/videos/hero-loop.mp4',
  },
  // adicionar aqui o .glb quando houver URL direto:
  // { url: 'https://…/bike.glb', dest: 'public/models/bike.glb' },
];

function download(url, dest, redirects = 0) {
  return new Promise((ok, fail) => {
    if (redirects > 5) return fail(new Error(`Demasiados redirects: ${url}`));
    get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return download(res.headers.location, dest, redirects + 1).then(ok, fail);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return fail(new Error(`HTTP ${res.statusCode}: ${url}`));
      }
      mkdirSync(dirname(dest), { recursive: true });
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(ok));
      file.on('error', fail);
    }).on('error', fail);
  });
}

for (const { url, dest } of ASSETS) {
  const target = resolve(root, dest);
  if (existsSync(target)) {
    console.log(`✓ já existe: ${dest}`);
    continue;
  }
  console.log(`↓ a descarregar: ${dest}`);
  await download(url, target);
  console.log(`✓ concluído: ${dest}`);
}
