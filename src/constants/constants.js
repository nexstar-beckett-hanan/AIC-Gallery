// Art Institute of Chicago API Query params
export const BASE_URL = 'https://api.artic.edu/api/v1/artworks/search';
export const ART_LIMIT_PER_PAGE = 12;
export const SEARCH_TERM = 'watercolor';
export const IS_PUBLIC_DOMAIN = '&query[term][is_public_domain]=true';
// note: prev_url, next_url props are not available despite being listed as pagination props in API
export const FIELDS = [
	'id',
	'title',
	'artist_title',
	'thumbnail',
	'place_of_origin',
	'updated_at',
	'style_titles',
	'theme_titles',
	'date_display',
	'medium_display',
	'image_id',
];
export const FIELDSSTRING = `fields=${FIELDS}`;

// default request image size from hotlinked artwork images
export const IMAGE_SIZE = '200';
// Max artworks available as defined by API is 10000, but seems like it may have been adjusted to 1000 as any higher gives an error
export const MAX_RESULTS = 1000;
