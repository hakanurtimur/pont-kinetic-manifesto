import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

test('production build creates a Vercel-compatible Next.js artifact', () => {
  rmSync('.next', { recursive: true, force: true });

  const build = spawnSync('pnpm', ['build'], { encoding: 'utf8' });

  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
  assert.equal(existsSync('.next/BUILD_ID'), true);

  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.match(
    packageJson.scripts.build,
    /clean-next-cache\.mjs/,
    'Vercel builds must clear restored Next.js output before compiling',
  );

  const cssFiles = readdirSync('.next/static/css')
    .map((file) => join('.next/static/css', file))
    .filter((file) => statSync(file).isFile() && file.endsWith('.css'));
  const compiledCss = cssFiles.map((file) => readFileSync(file, 'utf8')).join('\n');

  assert.match(compiledCss, /\.robot-network/);
  assert.match(compiledCss, /\.cover-proposition/);
});
