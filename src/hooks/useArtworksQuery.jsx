import { useQuery, keepPreviousData } from '@tanstack/react-query';
import fetchArtworks from '../utils/fetchArtworks';
import transformArtworkData from '../utils/transformArtworkData';
import { ART_LIMIT_PER_PAGE, MAX_RESULTS } from '../constants/constants';
const defaultSelector = (data) => {
  const artworkDetailsById = {};

  data.data.forEach(
    (artwork) =>
      (artworkDetailsById[artwork.id] = transformArtworkData(artwork, data.config.iiif_url))
  );

  const maxPages = (Math.ceil(MAX_RESULTS / ART_LIMIT_PER_PAGE));
  const totalPages = Math.min(data.pagination.total_pages, maxPages);

  return {
    data,
    configUrl: data.config.iiif_url,
    totalPages,
    artworksData: artworkDetailsById,
  };
}

const useArtworksQuery = (page, select = defaultSelector) => {
	return useQuery({
		queryKey: ['artworksData', page],
		queryFn: fetchArtworks,
		// todo: go deeper on this feature to make best use of it
		placeholderData: keepPreviousData,
    select,
	});
};

export default useArtworksQuery;
