import { useState, useEffect } from 'react';
import axios from 'axios';

export default function List() {
    const [response, setResponse] = useState(null);
    const [configUrl, setConfigUrl] = useState('');
    const [artworks, setArtworks] = useState([]);
    const [error, setError] = useState(false);

    const fetchArtworks = async () => {
      try {
        // wrap this in a timeout so we get an error if it takes too long
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks?limit=10&page=1",
          {
            headers: { 'AIC-User-Agent': 'aic-bash (beckett.hanan@gmail.com)' }
          }
        );
        setResponse(response?.data?.data);
        console.log(response.data.data);
        setConfigUrl(response.data.config.iiif_url);
      } catch (err) {
        // create an error view to show something to users
        setError(true);
        // Axios will pass any non-200 errors here.
        if (err.response) {
          console.log(err.response.data); // check API docs to confirm what kind of issue we get here
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.error(`GET error: ${err.message}`);
        }
      }
    };

    useEffect(() => {
      console.log('Loading...');
      fetchArtworks();
    }, []);

    useEffect(() => {
      if (response) {
        const artWithImages = [];
        response.forEach((artwork) => {
          const imgSrc = `${configUrl}/${artwork.image_id}/full/200,/0/default.jpg`;
          const newArtwork = {
            id: artwork.id,
            title: artwork.title,
            artist: artwork.artist_title,
            isPopular: !artwork.has_not_been_viewed_much,
            shortDescription: artwork.medium_display,
            place: artwork.place_of_origin,
            obtained: artwork.provenance_text,
            lastUpdated: artwork.updated_at,
            styleTags: artwork.style_titles,
            themes: artwork.theme_titles,
            imgSrc };
          artWithImages.push(newArtwork);
        });
        setArtworks(artWithImages);
        console.log(artworks);
      }
    }, [response]);

    return (
      <ul>
        {artworks && artworks.map((artwork) => {
          return (
            <li key={artwork.id}>
              <h2>{`${artwork.title} by ${artwork.artist}`}</h2>
              <h3>{artwork.shortDescription}</h3>
              <p>{artwork.obtaine}</p>
              <p>{artwork.place}</p>
              <img src={artwork.imgSrc} alt={`artwork titled ${artwork.title}`} />
            </li>
          )})}
      </ul>
    )
};
