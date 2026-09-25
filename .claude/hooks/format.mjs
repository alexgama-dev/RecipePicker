import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const { tool_input } = JSON.parse(readFileSync(0, 'utf8'));
const relative = path.relative(process.env.CLAUDE_PROJECT_DIR, tool_input.file_path);
const insideProject = !relative.startsWith('..') && !path.isAbsolute(relative);

if (insideProject) {
	execSync(`pnpm exec prettier --write --ignore-unknown "${tool_input.file_path}"`);
}
