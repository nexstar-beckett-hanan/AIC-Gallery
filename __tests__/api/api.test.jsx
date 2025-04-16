import { describe, it, expect } from 'vitest';
import * as data from '../../src/mocks/data/sampleData.json';
import { ART_LIMIT_PER_PAGE, FIELDS } from '../../src/constants/constants';

describe('mocked API response', () => {
	it('to contain the correct config url', async () => {
		expect(data.config.iiif_url).toEqual('https://www.artic.edu/iiif/2');
	});

	it('to have pagination data', async () => {
		expect(data).toHaveProperty('pagination');
	});

	it('to have pagination detail properties', async () => {
		expect(data.pagination).toHaveProperty('total');
		expect(data.pagination).toHaveProperty('limit');
		expect(data.pagination).toHaveProperty('offset');
		expect(data.pagination).toHaveProperty('total_pages');
		expect(data.pagination).toHaveProperty('current_page');
	});

	it('to contain an array of length 6 (based on current mocked data)', async () => {
		expect(data.pagination.limit).toBe(6);
	});
});

describe('first artwork in array', () => {
	// all artwork should have these properties, even if they're set to null or empty array in some cases
	it('to have art detail properties matching the fields requested from the API', async () => {
		FIELDS.forEach((field) => {
			expect(data.data[0]).toHaveProperty(field);
		});
	});
});
