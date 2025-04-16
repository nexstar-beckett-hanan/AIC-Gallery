import { expect, vi, describe, it } from 'vitest';

import transformArtworkData from '../../src/utils/transformArtworkData';
import * as data from '../../src/mocks/data/sampleData.json';

// Testing real transformArtworkData function on fake API response.
vi.mock('../../src/utils/transformArtworkData', { spy: true });
const artArray = data.data;

describe('mock API data', () => {
	it('correct number of art pieces in sample API response', () => {
		expect(artArray).toHaveLength(6);
	});

	it("correct properties present after processing 1 artwork's sample data", () => {
		const transformedSample = transformArtworkData(artArray[0]);

		expect(transformedSample).toHaveProperty('id');
		expect(transformedSample).toHaveProperty('title');
		expect(transformedSample).toHaveProperty('artist');
		expect(transformedSample).toHaveProperty('altText');
		expect(transformedSample).toHaveProperty('date');
		expect(transformedSample).toHaveProperty('display');
		expect(transformedSample).toHaveProperty('shortDescription');
		expect(transformedSample).toHaveProperty('place');
		expect(transformedSample).toHaveProperty('lastUpdated');
		expect(transformedSample).toHaveProperty('styleTags');
		expect(transformedSample).toHaveProperty('themes');
		expect(transformedSample).toHaveProperty('hasImage');
		expect(transformedSample).toHaveProperty('imgSrc');
	});

	// Todo: Check types here as well, or consider converting project to TypeScript in general.
});
