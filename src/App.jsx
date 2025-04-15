import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { worker } from './mocks/browser'; // todo: make this conditional on ENV variable later
// import { server } from './mocks/server';
import Home from './components/Home';
import ArtDetails from './components/ArtDetails';
import './styles/App.css';
import * as data from './mocks/data/sampleData.json';

console.log(data.json.data.data)


// Access new Tanstack Query client, and mark data as stale after 24 hrs
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
            {/* todo: see if it's possible to set up access to details pages with going to them via Gallery the first time to hydrate data, seems like HashBrowser instead of BrowserRouter might be the right way, and/or configuring a basename for vite and using it during the build command */}
						<Route path='/'>
              <Route index element={<Home />} />
              <Route path=':page' element={<Home />} />
            </Route>
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
				<ReactQueryDevtools
					initialIsOpen={true}
					buttonPosition={'top-right'}
				/>
			</QueryClientProvider>
		</ErrorBoundary>
	);
}

export default App;
