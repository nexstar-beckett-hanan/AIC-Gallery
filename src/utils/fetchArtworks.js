import axios from 'axios';
import transformArtworkData from './transformArtworkData';
import { BASE_URL, ART_LIMIT_PER_PAGE, SEARCH_TERM, IS_PUBLIC_DOMAIN, FIELDS } from '../constants/constants';
console.log(BASE_URL, ART_LIMIT_PER_PAGE)

const fetchArtworks = async ({ queryKey }) => {
	// page is passed automatically by Tanstack Query via queryKey
	const [_, page] = queryKey;
	// todo: add timeout so we get an error if it takes too long
	// todo: finalize the filter here to ensure only the fields we need are included in the fetch
	// optional todo: turn fields into an object and encode it to make editing fields easier
	// Note here: prev_url, next_url props are not available despite being listed as pagination props in API
	// the query should handle only getting artwork with images available, so that we always see the same amount
	const response = await axios.get(
		// `https://api.artic.edu/api/v1/artworks/search?q=children&page=${page}&limit=${ART_LIMIT_PER_PAGE}&fields=id,title,artist_title,thumbnail,has_not_been_viewed_much,place_of_origin,provenance_text,updated_at,style_titles,theme_titles,artist_display,date_display,medium_display,image_id,next_url,pagination.page,pagination.total_pages`,
		// `https://api.artic.edu/api/v1/artworks/search?q=monet&query[term][is_public_domain]=true&page=${page}&limit=${ART_LIMIT_PER_PAGE}&fields=id,title,artist_title,thumbnail,has_not_been_viewed_much,place_of_origin,provenance_text,updated_at,style_titles,theme_titles,artist_display,date_display,medium_display,image_id,next_url,pagination.page,pagination.total_pages`,
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
