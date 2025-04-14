import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useArtworksQuery from '../hooks/useArtworksQuery';
import fetchArtworks from '../js/fetchArtworks';
import Navigation from './Navigation';
import Artwork from './Artwork';

export default function Gallery() {
	const [page, setPage] = useState(1);
	const { data, isFetching, isError, error, isPlaceholderData } =
		useArtworksQuery(page);
	let configUrl, totalPages, artworksArray;
	if (data) {
		artworksArray = data.data.data;
		({ configUrl, totalPages } = data);
	}

	// prefetch next page so it loads faster
	const queryClient = useQueryClient();
	useEffect(() => {
		if (page < totalPages) {
			const nextPage = page + 1;
			queryClient.prefetchQuery({
				queryKey: ['artworksData', nextPage],
				queryFn: fetchArtworks,
			});
		}
	}, [page, totalPages, queryClient]);

	// todo: Compare isLoading and isPending to isFetching to determine the best one to use.
	if (isFetching) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error! {error.message}</p>;
	}

	// add error boundary: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
	return (
		<main>
			{
				// todo: finish accessibility attributes and test
			}
			<h1>Art Institute of Chicago Gallery</h1>
			<p aria-current='page'>Current page: {page}</p>
			<Navigation
				page={page}
				isPlaceholderData={isPlaceholderData}
				totalPages={totalPages}
				setPage={setPage}
			/>
			<section>
				<ul>
					{artworksArray &&
						artworksArray.map((artwork) => (
							<Artwork
								key={artwork.id}
								artwork={artwork}
								configUrl={configUrl}
								page={page}
							/>
						))}
				</ul>
			</section>
		</main>
	);
}
