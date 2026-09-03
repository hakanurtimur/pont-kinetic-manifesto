import assert from 'node:assert/strict';
import { existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

test('production build creates a Vercel-compatible Next.js artifact', () => {
  rmSync('.next', { recursive: true, force: true });

  const build = spawnSync(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'build'],
    { encoding: 'utf8' },
  );

  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
  assert.equal(existsSync('.next/BUILD_ID'), true);
});
