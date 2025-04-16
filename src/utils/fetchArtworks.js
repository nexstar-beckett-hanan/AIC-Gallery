import axios from 'axios';
import {
	BASE_URL,
	ART_LIMIT_PER_PAGE,
	SEARCH_TERM,
	IS_PUBLIC_DOMAIN,
	FIELDSSTRING,
} from '../constants/constants';

const fetchArtworks = async ({ queryKey }) => {
	// Page is passed automatically by Tanstack Query through the queryKey object.
	const [_, page] = queryKey;
	// Todo: Consider adding a timeout to axios request so we get an error if it takes too long.
	const response = await axios.get(
		`${BASE_URL}?q=${SEARCH_TERM}${IS_PUBLIC_DOMAIN}&page=${page}&limit=${ART_LIMIT_PER_PAGE}&${FIELDSSTRING}`
	);

	return response.data;
};

export default fetchArtworks;
