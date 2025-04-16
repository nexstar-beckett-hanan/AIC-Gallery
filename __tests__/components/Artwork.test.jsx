import React from 'react';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import { renderWithClient } from '../testUtils';
import Artwork from '../../src/components/Artwork';
import * as data from '../../src/mocks/data/sampleData.json';

vi.mock('../../src/utils/transformArtworkData', { spy: true });

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
	...vi.requireActual('react-router-dom'),
	useNavigate: () => mockUsedNavigate,
}));

const page = 1;
const artArray = data.data;
const artwork = artArray[0];
const configUrl = data.config.iiif_url;

describe('Artwork Component', () => {
	it('shows 2 headings', async () => {
		const result = renderWithClient(
			<BrowserRouter>
				<Artwork
					artwork={artwork}
					configUrl={configUrl}
					page={page}
				/>
			</BrowserRouter>
		);

		expect(await result.findAllByRole('heading')).toHaveLength(2);
	});

	it('shows the title of the artwork if available', async () => {
		const result = renderWithClient(
			<BrowserRouter>
				<Artwork
					artwork={artwork}
					configUrl={configUrl}
					page={page}
				/>
			</BrowserRouter>
		);

		expect(await result.findByText(/Bordighera/i)).toBeInTheDocument();
	});

	it('shows "Untitled" if the title of the artwork if not available', async () => {
		artwork.title = null;
		const result = renderWithClient(
			<BrowserRouter>
				<Artwork
					artwork={artwork}
					configUrl={configUrl}
					page={page}
				/>
			</BrowserRouter>
		);

		expect(await result.findByText(/Untitled/i)).toBeInTheDocument();
	});

	it("shows the artwork artist's name if available", async () => {
		const result = renderWithClient(
			<BrowserRouter>
				<Artwork
					artwork={artwork}
					configUrl={configUrl}
					page={page}
				/>
			</BrowserRouter>
		);

		expect(await result.findByText(/Claude Monet/i)).toBeInTheDocument();
	});

	it('shows the image of the artwork if available', async () => {
		const result = renderWithClient(
			<BrowserRouter>
				<Artwork
					artwork={artwork}
					configUrl={configUrl}
					page={page}
				/>
			</BrowserRouter>
		);

		expect(await result.findByRole('img')).toBeInTheDocument();
	});

	it('has alt text if an image is present', async () => {
		const result = renderWithClient(
			<BrowserRouter>
				<Artwork
					artwork={artwork}
					configUrl={configUrl}
					page={page}
				/>
			</BrowserRouter>
		);

		expect(
			result.getByAltText(
				/Bright landscape painting featuring spindly trees with lush leaves surrounded by light-green foliage, a small town visible between the trees at center, and a calm blue sea in the background\./i
			)
		).toBeInTheDocument();
	});

	it('shows "by Unknown" if the artwork artist\'s name if not available', async () => {
		artwork.artist_title = null;
		const result = renderWithClient(
			<BrowserRouter>
				<Artwork
					artwork={artwork}
					configUrl={configUrl}
					page={page}
				/>
			</BrowserRouter>
		);

		expect(await result.findByText(/by Unknown/i)).toBeInTheDocument();
	});

	it('shows a message if image is not available', async () => {
		artwork.image_id = null;
		const result = renderWithClient(
			<BrowserRouter>
				<Artwork
					artwork={artwork}
					configUrl={configUrl}
					page={page}
				/>
			</BrowserRouter>
		);

		expect(await result.findByText(/No image available/i)).toBeInTheDocument();
	});
});
