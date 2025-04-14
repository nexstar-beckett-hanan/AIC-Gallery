import { Link } from 'react-router';

export default function Artwork({ artwork, configUrl, page }) {
	const imgSrc = `${configUrl}/${artwork.image_id}/full/400,/0/default.jpg`;
	const hasImage = !!artwork.image_id;
	const altText =
		artwork.thumbnail?.alt_text || `artwork titled ${artwork.title}`;

	if (artwork.id) {
		return (
			<li>
				{<h2>{artwork.title || 'Untitled'}</h2>}
				{<h3>{`by ${artwork.artist || 'Unknown'}`}</h3>}

				{/* this url should always be built correctly but may not render an image unless API results are filtered */}
				<Link
					to={{ pathname: `/details/${artwork.id}` }}
					state={{ page }}
				>
					{(hasImage && (
						<img
							src={imgSrc}
							alt={altText}
						/>
					)) || <p>No image available.</p>}
				</Link>
			</li>
		);
	}
}

//  title, artist, shortDescription, date, display, isPopular, obtained, place, hasImage, imgSrc, altText
