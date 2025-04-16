import axios from 'axios';
import { BASE_URL, ART_LIMIT_PER_PAGE, SEARCH_TERM, IS_PUBLIC_DOMAIN, FIELDSSTRING } from '../constants/constants';

const fetchArtworks = async ({ queryKey }) => {
	// page is passed automatically by Tanstack Query via queryKey
	const [_, page] = queryKey;
	// todo: add timeout to axios request so we get an error if it takes too long
	// consider whether to disable Tanstack Query's retry option and only attempt fetching once per request
	const response = await axios.get(
		`${BASE_URL}?q=${SEARCH_TERM}${IS_PUBLIC_DOMAIN}&page=${page}&limit=${ART_LIMIT_PER_PAGE}&${FIELDSSTRING}`,
		{
			// allows API owner to contact developer in a situation where resource demand is high
			headers: { 'AIC-User-Agent': 'aic-bash (beckett.hanan@gmail.com)' },
		}
	);

	return response.data;
};

export default fetchArtworks;
