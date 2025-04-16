import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useArtworksQuery from '../hooks/useArtworksQuery';
import fetchArtworks from '../utils/fetchArtworks';
import Navigation from './Navigation';
import Artwork from './Artwork';
import { ART_LIMIT_PER_PAGE, SEARCH_TERM } from '../constants/constants';

export default function Gallery({ newPage }) {
  const [page, setPage] = useState('1');
  const [cachedTotalPages, setCachedTotalPages] = useState(null);
  
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

  useEffect(() => {
    if (cachedTotalPages === null && totalPages) {
      setCachedTotalPages(totalPages);
    }
  }, [totalPages, cachedTotalPages]);

	// Prefetch next page so it loads faster.
	const queryClient = useQueryClient();
	useEffect(() => {
    if (cachedTotalPages !== null) {
      if (Number(page) < Number(cachedTotalPages)) {
        const nextPage = (Number(page) + 1).toString();
        queryClient.prefetchQuery({
          queryKey: ['artworksData', nextPage],
          queryFn: fetchArtworks,
        });
      } else if (Number(page) >= Number(cachedTotalPages)) {
        // Todo: May be able to get rid of this if it never triggers, just a backup for now.
        return <p>`Error! Page number too high. Try a lower page number than ${cachedTotalPages}`</p>;
      }
    }
	}, [page, cachedTotalPages, queryClient]);

	if (isFetching) {
		return <p>Loading...</p>;
	}

	if (isError) {
    if (Number(page) >= Number(cachedTotalPages)) {
      error.message = (`Page number too high. Try a lower page number${cachedTotalPages ? 'than ${cachedTotalPages}' : ''}.`);
    }
		return <p>Error! {error.message}</p>;
	}

	return (
		<main>
      <aside>
        <p><strong>Current Search Term:</strong> { SEARCH_TERM }</p>
        <p aria-current='page'><strong>Current page:</strong> {page}</p>
      </aside>
			<Navigation
				page={page}
				isPlaceholderData={isPlaceholderData}
				totalPages={totalPages}
				setPage={setPage}
        location={'Page Top'}
			/>
      <section aria-label='Art Gallery' className='gallery'>
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
