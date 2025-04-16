import React from 'react';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom/vitest';
import { waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';

import { renderWithClient } from '../testUtils';
import { mockServer } from '../../vitest-setup';
import Gallery from '../../src/components/Gallery';

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
	...vi.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

const newPage = 1;
describe('Gallery Component', () => {
  describe('on success', () => {
    it('should show a "main" section', async () => {
      const result = renderWithClient(
        <BrowserRouter>
          <Gallery newPage={newPage} />
        </BrowserRouter>
      );
  
      expect(await result.findByRole('main')).toBeInTheDocument();
    });

		it('should show the "current page" text', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Gallery newPage={newPage} />
				</BrowserRouter>
			);

			expect(await result.findByText(/Current Page:/i)).toBeInTheDocument();
		});


		it('should show the page number', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Gallery newPage={ newPage } />
				</BrowserRouter>
			);

			expect(
				await result.findByRole('paragraph', /1/i)
			).toBeInTheDocument();
		});
	});

	describe('on loading', () => {
		it('renders loading text', async () => {
			const result = renderWithClient(
				<BrowserRouter>
					<Gallery newPage={newPage} />
				</BrowserRouter>
			);
			await waitFor(() => {
				expect(result.getByText('Loading...')).toBeInTheDocument();
			});
		});
	});

	describe('on error', () => {
		it('shows an error message', async () => {
			mockServer.use(
				http.get('*', () => {
					return HttpResponse.error();
				})
			);

			const result = renderWithClient(<Gallery newPage={newPage} />);

			expect(await result.findByText(/Error!/i)).toBeInTheDocument();
		});
	});
});
