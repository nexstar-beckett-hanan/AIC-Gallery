import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
// import { createMemoryHistory } from "history";

import * as data from '../src/mocks/data/sampleData.json';

// Basic QueryClient creater with retry explicitly turned off to speed up tests, in case it gets enabled at the App level.
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

// Creates a new QueryClient wrapped in QueryClientProvider for each test.
export const createWrapper = () => {
	const testQueryClient = createTestQueryClient();
	return ({ children }) => (
		<QueryClientProvider client={testQueryClient}>
			{children}
		</QueryClientProvider>
	);
};

// Creates new QueryClient and wraps component with it.
export function renderWithClient(ui) {
	const testQueryClient = createTestQueryClient();
	const { rerender, ...result } = render(
		<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
	);
	return {
		...result,
		rerender: (rerenderUi) =>
			rerender(
				<QueryClientProvider client={testQueryClient}>
					{rerenderUi}
				</QueryClientProvider>
			),
	};
}

// Creates Router wrapper that tracks Route history - currently unused as it's not completed yet.
// export const renderWithRouter = (component, route) => {
//   const history = createMemoryHistory();

//   if (route) {
//     history.push(route);
//   }

//   return {
//     ...render(<Router history={ history }>{component}</Router>),
//     history,
//   }
// };

// Mock server interceptor.
export const handlers = [
	http.get('https://api.artic.edu/api/v1/artworks/*', () => {
		return HttpResponse.json({
			preference: data.preference,
			pagination: data.pagination,
			data: data.data,
			info: data.info,
			config: data.config,
		});
	}),
];
