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
			themes,
			hasImage,
			imgSrc,
		} = artworkDetails;

		return (
			<main id={id} className='art-details'>
        <section className='top-row'>
          <section className='left-column'>
            <Link to={{ pathname: `/` }}>
              <button><b>{'Back'}</b></button>
            </Link>
          </section>
          <section className='right-column'>
            {<h1>{title || 'Untitled'}</h1>}
            {<h2>{`by ${artist || 'Unknown'}`}</h2>}
          </section>
        </section>
        <section className='bottom-row'>
          <section className='column left-column'>
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
            {shortDescription && <p><strong>Description:</strong> {shortDescription}</p>}
            {/* {typeof isPopular === 'boolean' && <p><strong>Popular?</strong></p> && (isPopular && <p>This artwork has been viewed many times!</p> || !isPopular && <p>This artwork has not been viewed often.</p>)} */}
            {display && <p><strong>Additional Info:</strong> {display}</p>}
            {<p><strong>Date or Date Range:</strong> {date || 'Unknown'}</p>}
            {/* {obtained && <p>Obtained: {obtained}</p>} */}
            {place && <p><strong>Place of Origin:</strong> {place}</p>}
            {themes && <p><strong>Themes:</strong> {themes.join(', ')}</p>}
            {styleTags.length > 0 && <p><strong>Styles:</strong> {styleTags.join(', ')}</p>}
            {lastUpdated && <p><strong>Last Updated:</strong> {lastUpdated}</p>}
          </section>
        </section>
			</main>
		);
	}

	// fallback
	<p>Missing art data.</p>;
}
