import transformArtworkData from '../utils/transformArtworkData';

export default function (data) {
	const artworkDetailsById = {};

	data.data.forEach(
		(artwork) =>
			(artworkDetailsById[artwork.id] = transformArtworkData(
				artwork,
				data.config.iiif_url
			))
	);

	return {
		data,
		configUrl: data.config.iiif_url,
		totalPages: data.pagination.total_pages,
		artworksData: artworkDetailsById,
	};
}
