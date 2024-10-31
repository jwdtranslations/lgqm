import { expect, test } from 'vitest';
import { sortFilesNumeric } from './file';

test('file neg', () => {
	const a = 'abc-1';
	const b = 'abc-3';
	const sort = sortFilesNumeric(a, b);
	expect(sort).toBeLessThan(0);
});

test('file pos', () => {
	const a = 'abc-3';
	const b = 'abc-1';
	const sort = sortFilesNumeric(a, b);
	expect(sort).toBeGreaterThan(0);
});
