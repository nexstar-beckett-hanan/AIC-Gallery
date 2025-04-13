import { useState, useEffect } from 'react';
import {
	useQueryClient,
} from '@tanstack/react-query';
import useArtworksQuery from '../hooks/useArtworksQuery';
import fetchArtworks from '../js/fetchArtworks';
import transformArtworksData from '../js/transformArtworksData';

export default function Gallery() {
	const [artworks, setArtworks] = useState([]);
	const [page, setPage] = useState(1);
	const { data, isFetching, isError, error } = useArtworksQuery(page);
	let configUrl, totalPages, artworksData;
	if (data) {
		({ configUrl, totalPages, artworksData } = data);
	}
  
	// prefetch next page so it loads faster
	const queryClient = useQueryClient();
	useEffect(() => {
		if (page < totalPages) {
			const nextPage = page + 1;
			queryClient.prefetchQuery({
				queryKey: ['artworksData', nextPage],
				queryFn: fetchArtworks,
			});
		}
	}, [page, totalPages, queryClient]);

	// turn data into the format we need with clear names for display
	useEffect(() => {
		if (artworksData?.length === 10) {
			const artWithImages = transformArtworksData(artworksData, configUrl);
			setArtworks(artWithImages);
		}
	}, [artworksData, configUrl, page]);

	// todo: Compare isLoading and isPending to isFetching to determine the best one to use.
	if (isFetching) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error! {error.message}</p>;
	}

	// add error boundary: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
	return (
		<div>
			{
				// todo: finish accessibility attributes and test
				// if the id is null/no image, we won't see 10 unless we're okay with one's without images
			}
			<p aria-current='page'>Current page: {page}</p>
			<nav aria-label='Pagination'>
				<button
					onClick={() => {
						console.log(page);
						if (!useArtworksQuery.isPlaceholderData && page > 1) {
							setPage(page - 1);
						}
					}}
					// todo: check why React Query docs don't suggest disabling on isPlaceholderData here like in next - is it because React Query handles cacheing previous page automatically?
					disabled={page === 1}
				>
					Previous 10 Artworks
				</button>
				<button
					onClick={() => {
						if (!useArtworksQuery.isPlaceholderData && page < totalPages) {
							setPage(page + 1);
						}
					}}
					// disable button if placeholderData is active or if we don't have any more pages to navigate to
					// todo: disable during fetching with clear signal that it will be renabled vs have reached end of pages
					disabled={useArtworksQuery.isPlaceholderData || page === totalPages}
				>
					Next 10 Artworks
				</button>
			</nav>
			<ul>
				{artworks &&
					artworks.map((artwork) => {
						console.log(artwork);
						return (
							<li key={artwork.id}>
								{artwork.title && <h2>{artwork.title}</h2>}
								{artwork.artist && <h3>{`by ${artwork.artist}`}</h3>}
								{artwork.shortDescription && (
									<h4>Description: {artwork.shortDescription}</h4>
								)}
								{artwork.date && <p>Date/Date Range: {artwork.date}</p>}
								{artwork.display && <p>{artwork.display}</p>}
								{artwork.isPopular && (
									<p>*This artwork has been viewed many times.*</p>
								)}
								{artwork.obtained && <p>Obtained: {artwork.obtained}</p>}
								{artwork.place && <p>Place of Origin: {artwork.place}</p>}
								{/* this url should always be built correctly but may not render an image unless API results are filtered */}
								{(artwork.hasImage && (
									<img
										src={artwork.imgSrc}
										alt={artwork.altText}
									/>
								)) || <p>No image available.</p>}
							</li>
						);
					})}
			</ul>
		</div>
	);
}
