import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

test('tracked project text contains no legacy presentation label', () => {
  const forbidden = ['mani', 'festo'].join('');
  const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter((file) => /\.(?:css|html|js|json|md|mjs|ts|tsx)$/.test(file));
  const offenders = files.filter((file) =>
    readFileSync(file, 'utf8').toLowerCase().includes(forbidden),
  );

  assert.deepEqual(offenders, []);
});
