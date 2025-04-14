import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Gallery from './components/Gallery';
import ArtDetails from './components/ArtDetails';
// import reactLogo from './assets/react.svg';
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
		<ErrorBoundary fallback={<div>Something went wrong.</div>}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						{/* todo: could add page routes here later to allow people to link to a specific page*/}
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
							element={<p>Path not resolved</p>}
						/>
					</Routes>
				</BrowserRouter>
				<ReactQueryDevtools
					initialIsOpen={true}
					buttonPosition={'top-right'}
				/>
			</QueryClientProvider>
		</ErrorBoundary>
	);
}

export default App;
