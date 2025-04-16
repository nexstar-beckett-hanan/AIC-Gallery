import { BrowserRouter, Routes, Route } from 'react-router';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { renderWithClient } from '../testUtils';
import Home from '../../src/components/Home';

// todo: Test other routing including /:page-number and /details/:artwork-id
// const mockUsedNavigate = vi.fn();
// vi.mock('react-router-dom', () => ({
//    ...vi.requireActual('react-router-dom'),
//   useNavigate: () => mockUsedNavigate,
// }));

describe('App component', () => {
	it('successfully routes without page number', async () => {
		const result = renderWithClient(
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
				</Routes>
			</BrowserRouter>
		);

		expect(
			await result.findByText(/Art Institute of Chicago Gallery/i)
		).toBeInTheDocument();
	});
});
