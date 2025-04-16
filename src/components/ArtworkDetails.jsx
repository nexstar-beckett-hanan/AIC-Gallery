import { useParams, useLocation, Link } from 'react-router';
import useArtworksQuery from '../hooks/useArtworksQuery';

// idea: import mirador here for accessible image viewer if it would be valuable?
export default function ArtworkDetails() {
	const params = useParams();
	const location = useLocation();
	const id = params?.id;
	const page = location?.state?.page;

	// todo: use selector to only grab one artwork
	const { data, isFetching, isError, error } = useArtworksQuery(page);

	if (isFetching) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error! {error.message}</p>;
	}

	if (data) {
		const artworkDetails = data.artworksData[id];

		const {
			title,
			artist,
			altText,
			date,
			display,
			shortDescription,
			place,
			lastUpdated,
			styleTags,
			themes,
			hasImage,
			imgSrc,
		} = artworkDetails;

		return (
			<main
				id={id}
				className='art-details'
			>
				<section className='column left-column'>
					<Link to={{ pathname: `/` }}>
						<button>
							<b>{'Back'}</b>
						</button>
					</Link>
					{(hasImage && (
						<div className='frame'>
							<img
								src={imgSrc}
								alt={altText}
							/>
						</div>
					)) || <p>No image available.</p>}
				</section>
				<section className='column right-column'>
					{<h1>{title || 'Untitled'}</h1>}
					{<h2>{`by ${artist || 'Unknown'}`}</h2>}
					{shortDescription && (
						<p>
							<strong>Description:</strong> {shortDescription}
						</p>
					)}
					{display && (
						<p>
							<strong>Additional Info:</strong> {display}
						</p>
					)}
					{
						<p>
							<strong>Date or Date Range:</strong> {date || 'Unknown'}
						</p>
					}
					{place && (
						<p>
							<strong>Place of Origin:</strong> {place}
						</p>
					)}
					{themes.length > 0 && (
						<p>
							<strong>Themes:</strong> {themes.join(', ')}
						</p>
					)}
					{styleTags.length > 0 && (
						<p>
							<strong>Styles:</strong> {styleTags.join(', ')}
						</p>
					)}
					{lastUpdated && (
						<p>
							<strong>Last Updated:</strong> {lastUpdated}
						</p>
					)}
				</section>
			</main>
		);
	}

	// fallback
	<p>Missing art data.</p>;
}
