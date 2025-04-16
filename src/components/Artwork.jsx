import { Link } from 'react-router';
import { preload } from 'react-dom';
import { IMAGE_SIZE } from '../constants/constants';

// Todo: Currently using props from artwork sent in - decide whether to consistently use Tanstack Query or not.
export default function Artwork({ artwork, configUrl, page }) {
  // Note: This url should always be built correctly but may not render an image unless API results are filtered.
	const imgSrc = `${configUrl}/${artwork.image_id}/full/${IMAGE_SIZE},/0/default.jpg`;
	const hasImage = !!artwork.image_id;
	const altText = artwork.thumbnail?.alt_text || `artwork titled ${artwork.title}`;
  preload(imgSrc, {as: 'image'});

	if (artwork.id) {
		return (
			<article>
				{<h2>{artwork.title || 'Untitled'}</h2>}
				{<h3>{`by ${artwork.artist_title || 'Unknown'}`}</h3>}

        {(hasImage && (
          <Link
            to={{ pathname: `/details/${artwork.id}` }}
            state={{ page }}
          >
            <div className='frame'>
              <img
                src={imgSrc}
                alt={altText}
              />
            </div>
          </Link>
        )) || <p>No image available.</p>}
			</article>
		);
	}
}

