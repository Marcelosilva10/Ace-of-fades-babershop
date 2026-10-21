import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const children = [
  spawn(process.execPath, ['server.js'], { cwd: rootDir, stdio: 'inherit' }),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '0.0.0.0'], {
    cwd: rootDir,
    stdio: 'inherit',
  }),
];

function stopChildren() {
  for (const child of children) {
    if (child.exitCode === null) child.kill('SIGTERM');
  }
}

process.on('SIGINT', stopChildren);
process.on('SIGTERM', stopChildren);

for (const child of children) {
  child.on('error', (error) => {
    console.error(error);
    stopChildren();
    process.exitCode = 1;
  });
  child.on('exit', (code) => {
    if (code && code !== 0) {
      process.exitCode = code;
      stopChildren();
    }
  });
}