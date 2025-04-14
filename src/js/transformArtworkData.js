// turns API fields into data shape desired for display
const transformArtworkData = (artwork, configUrl) => {
	const imgSrc = `${configUrl}/${artwork.image_id}/full/200,/0/default.jpg`;
	const artWithImage = {
		id: artwork.id,
		title: artwork.title,
		artist: artwork.artist_title,
		// if there's an image, alt text will either be an image description or will use medium_display text roughly in this format: 'A work made of _medium_display_'
		altText: artwork.thumbnail?.alt_text || `artwork titled ${artwork.title}`,
		date: artwork.date_display,
		display: artwork.artist_display,
		isPopular: !artwork.has_not_been_viewed_much,
		// keep in mind for UI, this can be super long
		shortDescription: artwork.medium_display,
		place: artwork.place_of_origin,
		obtained: artwork.provenance_text,
		lastUpdated: artwork.updated_at,
		styleTags: artwork.style_titles,
		themes: artwork.theme_titles,
		// will be null or a string, converted to true or false
		hasImage: !!artwork.image_id,
		// API specifies that hotlinking images is okay
		imgSrc,
	};
	return artWithImage;
};

export default transformArtworkData;
