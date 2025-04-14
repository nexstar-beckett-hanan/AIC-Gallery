import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useArtworksQuery from '../hooks/useArtworksQuery';
import fetchArtworks from '../utils/fetchArtworks';
import Navigation from './Navigation';
import Artwork from './Artwork';
import { ART_LIMIT_PER_PAGE } from '../constants/constants';

export default function Gallery() {
	const [page, setPage] = useState(1);
	const { data, isFetching, isPending, isError, error, isPlaceholderData } =
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
	if (isPending) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error! {error.message}</p>;
	}

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
      <section className='gallery'>
        {artworksArray.length === ART_LIMIT_PER_PAGE &&
          artworksArray.map((artwork) => (
              <Artwork
                key={artwork.id}
                artwork={artwork}
                configUrl={configUrl}
                page={page}
              />
            ))
          }
      </section>
      {/* <Navigation
				page={page}
				isPlaceholderData={isPlaceholderData}
				totalPages={totalPages}
				setPage={setPage}
			/> */}
		</main>
	);
}
