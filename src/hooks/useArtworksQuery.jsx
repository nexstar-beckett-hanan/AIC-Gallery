import { useQuery, keepPreviousData } from '@tanstack/react-query';
import fetchArtworks from '../utils/fetchArtworks';

const useArtworksQuery = (page) => {
	return useQuery({
		queryKey: ['artworksData', page],
		queryFn: fetchArtworks,
		// placeholder data from previous fetch so the page isn't empty during loading (splitting this into a new file stopped this part from working, fix if there's time)
		// also, it is clearer for the user that it shows "Loading", so not the worst UX for now
		placeholderData: keepPreviousData,
		// todo: selectos to filter data
	});
};

export default useArtworksQuery;
