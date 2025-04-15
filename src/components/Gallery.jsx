import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useArtworksQuery from '../hooks/useArtworksQuery';
import fetchArtworks from '../utils/fetchArtworks';
import Navigation from './Navigation';
import Artwork from './Artwork';
import { ART_LIMIT_PER_PAGE, SEARCH_TERM } from '../constants/constants';

export default function Gallery({ newPage }) {
  const [page, setPage] = useState('1');
  const [manualError, setManualError] = useState(null);
  
  useEffect(() => {
    if (newPage) {
      setPage(newPage);
    }
  }, [newPage]);

	const { data, isFetching, isError, error, isPlaceholderData } = useArtworksQuery(newPage || page);

	let configUrl, totalPages, artworksArray;
	if (data) {
		artworksArray = data.data.data;
		({ configUrl, totalPages } = data);
	}

	// prefetch next page so it loads faster
	const queryClient = useQueryClient();
	useEffect(() => {
    console.log(Number(page), totalPages)
		if (Number(page) < totalPages) {
			const nextPage = (Number(page) + 1).toString();
			queryClient.prefetchQuery({
				queryKey: ['artworksData', nextPage],
				queryFn: fetchArtworks,
			});
		} else if (totalPages >= page) {
      setManualError(`Page number too high. Try a lower page number than ${totalPages}`);
    }
	}, [page, totalPages, queryClient]);

	if (isFetching) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error! {error.message}</p>;
	}

  if (manualError) {
    return <h3>{manualError}</h3>;
  }

	return (
		<main>
			<p aria-current='page'><strong>Current page:</strong> {page}</p>
			<Navigation
				page={page}
				isPlaceholderData={isPlaceholderData}
				totalPages={totalPages}
				setPage={setPage}
        location={'Page Top'}
			/>
      <section className='gallery'>
        {/* <div role="status"
          aria-live="polite"
          aria-atomic="true">
          New Artwork has Loaded.
        </div> */}
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
      <Navigation
				page={page}
				isPlaceholderData={isPlaceholderData}
				totalPages={totalPages}
				setPage={setPage}
        location={'Page Bottom'}
			/>
    </main>
	);
}
