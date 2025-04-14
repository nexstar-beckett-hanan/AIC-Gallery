import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Gallery from './components/Gallery';
import ArtDetails from './components/ArtDetails';
import './App.css';

// Access new React Query client, and mark data as stale after 24 hrs
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

function App() {
	return (
		<ErrorBoundary fallback={<div>Oops! Sorry, something went wrong.</div>}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						{/* todo: add page routes here later to allow people to link to a specific page */}
            {/* todo: see if it's possible to set up access to details pages with going to them via Gallery the first time to hydrate data, seems like HashBrowser instead of BrowserRouter might be the right way to fix, and/or configuring a basename for vite and using it during the build command */}
						<Route
							path='/'
							element={<Gallery />}
						/>
						<Route
							path='details/:id'
							element={<ArtDetails />}
						/>
						<Route
							path='*'
							element={<p>Oops! We don't have that page.</p>}
						/>
					</Routes>
				</BrowserRouter>
				{/* <ReactQueryDevtools
					initialIsOpen={true}
					buttonPosition={'top-right'}
				/> */}
			</QueryClientProvider>
		</ErrorBoundary>
	);
}

export default App;
