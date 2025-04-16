import React from 'react';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import { renderWithClient } from '../testUtils';
import { SEARCH_TERM } from '../../src/constants/constants';
import Home from '../../src/components/Home';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
	...vi.requireActual('react-router-dom'),
	useNavigate: () => mockUsedNavigate,
}));

describe('Home Component', () => {
	describe('on success', () => {
		it('shows the page title', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Home />
				</BrowserRouter>
			);

			expect(
				await result.findByText(/Art Institute of Chicago Gallery/i)
			).toBeInTheDocument();
		});

		it('shows the instructions text', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Home />
				</BrowserRouter>
			);

			expect(
				await result.findByText(/Click any piece of art for more details\./i)
			).toBeInTheDocument();
		});

		it('shows the "Current Search Term" text', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Home />
				</BrowserRouter>
			);

			expect(
				await result.findByText(/Current Search Term:/i)
			).toBeInTheDocument();
		});

		it('shows the current search term as defined in constants', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Home />
				</BrowserRouter>
			);

			expect(
				await result.findByText(new RegExp(SEARCH_TERM, 'i'))
			).toBeInTheDocument();
		});

		it('renders 2 headings', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Home />
				</BrowserRouter>
			);

			expect(result.getByRole('heading')).toBeInTheDocument();
		});
	});
});
