import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const { tool_input } = JSON.parse(readFileSync(0, 'utf8'));
execSync(`pnpm exec prettier --write --ignore-unknown "${tool_input.file_path}"`);
