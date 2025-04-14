import { useParams, useLocation, Link } from 'react-router';
import useArtworksQuery from '../hooks/useArtworksQuery';

// import mirador here for accessible image viewer if it would be valuable?
export default function ArtDetails() {
	const params = useParams();
	const location = useLocation();
	const id = params.id;
	const page = location.state.page;
	// todo: use selector to only grab the one artwork
	const { data, isFetching, isError, error } = useArtworksQuery(page);

	// todo: Compare isLoading and isPending to isFetching to determine the best one to use.
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
			isPopular,
			shortDescription,
			place,
			obtained,
			lastUpdated,
			styleTags,
			theme,
			hasImage,
			imgSrc,
		} = artworkDetails;

		return (
			<section id={id}>
        <Link to={{ pathname: `/` }}>
          <button>Back</button>
        </Link>
				{shortDescription && <h4>Description: {shortDescription}</h4>}
				{<p>Date/Date Range: {date || 'Unknown'}</p>}
				{display && <p>{display}</p>}
				{isPopular && <p>*This artwork has been viewed many times.*</p>}
				{obtained && <p>Obtained: {obtained}</p>}
				{place && <p>Place of Origin: {place}</p>}
			</section>
		);
	}

	// fallback
	<p>Missing art data.</p>;
}
