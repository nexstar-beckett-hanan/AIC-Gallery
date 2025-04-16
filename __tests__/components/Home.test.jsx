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

		it('renders the title as a heading', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Home />
				</BrowserRouter>
			);

			expect(result.getByRole('heading')).toBeInTheDocument();
		});
	});
});
