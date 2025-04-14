import axios from 'axios';
import transformArtworkData from './transformArtworkData';
import { BASE_URL, ART_LIMIT_PER_PAGE, SEARCH_TERM, IS_PUBLIC_DOMAIN, FIELDS } from '../constants/constants';

const fetchArtworks = async ({ queryKey }) => {
	// page is passed automatically by Tanstack Query via queryKey
	const [_, page] = queryKey;
	// todo: add timeout to axios request so we get an error if it takes too long
	// consider whether to disable Tanstack Query's retry option and only attempt fetching once per request
	// optional todo: turn fields into an object and encode it to make editing fields easier
	// Note here: prev_url, next_url props are not available despite being listed as pagination props in API
	// the query should handle only getting artwork with images available, so that we always see the same amount
	const response = await axios.get(
		`${BASE_URL}?q=${SEARCH_TERM}${IS_PUBLIC_DOMAIN}&page=${page}&limit=${ART_LIMIT_PER_PAGE}&${FIELDS}`,
		{
			// allows API owner to contact developer in a situation where resource demand is high
			headers: { 'AIC-User-Agent': 'aic-bash (beckett.hanan@gmail.com)' },
		}
	);

	// todo: move this data transformation elsewhere, since this is defined as a fetch function
	const artworkDetailsById = {};

	response.data.data.forEach(
		(artwork) =>
			(artworkDetailsById[artwork.id] = transformArtworkData(artwork, response.data.config.iiif_url))
	);

	const info = {
		data: response.data,
		configUrl: response.data.config.iiif_url,
		totalPages: response.data.pagination.total_pages,
		artworksData: artworkDetailsById,
	};

	return info;
};

export default fetchArtworks;
