import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  useQuery,
  // useMutation,
  // useQueryClient,
  // QueryClient,
  // QueryClientProvider,
} from '@tanstack/react-query';

export default function Gallery() {
  const [configUrl, setConfigUrl] = useState("");
  const [artworksData, setArtworksData] = useState([]);
  // const [totalPages, setTotalPages] = useState(0);
  // const [page, setPage] = useState(1);
  const [artworks, setArtworks] = useState([]);
  // const [prevPage, setPrevPage] = useState(null);
  // const [nextPage, setNextPage] = useState(null);

  // Compare isLoading and isPending to isFetching to determine the best one to use.
  const fetchArtworks = useQuery({
    queryKey: ['artworksData'],
    queryFn: async () => {
      // todo: add timeout so we get an error if it takes too long
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks/search?q=children&page=1&limit=10&fields=id,title,artist_title,thumbnail,has_not_been_viewed_much,place_of_origin,provenance_text,updated_at,style_titles,theme_titles,artist_display,date_display,medium_display,image_id,next_url,pagination.page,pagination.totalPages`,
        // `https://api.artic.edu/api/v1/artworks/search?q=monet&query[term][is_public_domain]=true&page=1&limit=10`,
        {
          headers: { 'AIC-User-Agent': 'aic-bash (beckett.hanan@gmail.com)' } // allows API owner to contact developer in a situation where resource demand is high
        }
      )
      setConfigUrl(response.data.config.iiif_url);
      // setTotalPages(response.data.pagination.total_pages);
      // setPrevPage(response.data.pagination.prev_url || null);
      // setNextPage(response.data.pagination.next_url || null);
      console.log(response.data.data);

      // transform data here to build array with image ids

      // then decide where to make a second call to get alt text where possible
      setArtworksData(response.data.data);
      return response.data;
    },
    // todo: add selector so we can see if anything changed
    // select: (data) => {
    //   data.find((artwork) => artwork.id === id)
    // }
  })

  useEffect(() => {
    if (artworksData?.length === 10) {
      const artWithImages = [];
      artworksData.forEach((artwork) => {
        const imgSrc = `${configUrl}/${artwork.image_id}/full/400,/0/default.jpg`;
        const newArtwork = {
          id: artwork.id,
          title: artwork.title,
          artist: artwork.artist_title,
          altText: artwork.thumbnail?.alt_text || `artwork titled ${artwork.title}`, // if there's an image, the alt text will either be an actual image description or will reuse the medium_display with a simple string before it like 'A work made of _medium_display_'
          date: artwork.date_display,
          display: artwork.artist_display,
          isPopular: !artwork.has_not_been_viewed_much,
          shortDescription: artwork.medium_display,
          place: artwork.place_of_origin,
          obtained: artwork.provenance_text,
          lastUpdated: artwork.updated_at,
          styleTags: artwork.style_titles,
          themes: artwork.theme_titles,
          hasImage: !!artwork.image_id, // will be null or a string, converted to true or false
          imgSrc // API specifies that hotlinking images is okay
        };
        console.log(newArtwork);
        artWithImages.push(newArtwork);

        // const altText = await fetchAltText(artwork.image_id);
        // console.log({altText});
      });
      setArtworks(artWithImages);
    }
  }, [artworksData, configUrl]);

  console.log(fetchArtworks.error, fetchArtworks.isFetching);
  if (fetchArtworks.isFetching)  {
    return <p>Loading...</p>;
  }

  if (fetchArtworks.error) {
    return <p>Error! {fetchArtworks.error.message}</p>;
  }

  // add error boundary: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
  return (
    <div>
      <ul>
        {artworks && artworks.map((artwork) => {
          console.log(artwork);
          return (
            <li key={artwork.id}>
              {artwork.title && <h2>{artwork.title}</h2>}
              {artwork.artist && <h3>{`by ${artwork.artist}`}</h3>}
              {artwork.shortDescription && <h4>Description: {artwork.shortDescription}</h4>}
              {artwork.date && <p>Date/Date Range: {artwork.date}</p>}
              {artwork.display && <p>{artwork.display}</p>}
              {artwork.isPopular && <p>*This artwork has been viewed many times.*</p>}
              {artwork.obtained && <p>Obtained: {artwork.obtained}</p>}
              {artwork.place && <p>Place of Origin: {artwork.place}</p>}
              {/* this url should always be built correctly but may not render an image */}
              {(artwork.hasImage && <img src={artwork.imgSrc} alt={artwork.altText} />) || <p>No image available.</p>}
            </li>
          )
        })}
      </ul>
      { // example for using mutations/pagination
      // if the id is null/no image, we won't see 10 unless we're okay with one's without images
      }
      {/* {prevPage
      && <button
        onClick={() => {
          fetchArtworks()
        }}
      >
        Previous 10 Artworks
      </button>}
      {nextPage
      && <button
        onClick={() => {
          mutation.mutate({
            page: page + 1
          })
        }}
      >
        Previous 10 Artworks
      </button>} */}
    </div>
  )

//   // const [artworks, setArtworks] = useState([]);

//   // const fetchArtworks = async () => {
//   //   try {
//   //     // wrap this in a timeout so we get an error if it takes too long
//   //     const response = await axios.get(
//   //       "https://api.artic.edu/api/v1/artworks?limit=10&page=1",
//   //       {
//   //         headers: { 'AIC-User-Agent': 'aic-bash (beckett.hanan@gmail.com)' }
//   //       }
//   //     );
//   //     setResponse(response?.data?.data);
//   //     console.log(response.data.data);
//   //     setConfigUrl(response.data.config.iiif_url);
//   //   } catch (err) {
//   //     // create an error view to show something to users
//   //     setError(true);
//   //     // Axios will pass any non-200 errors here.
//   //     if (err.response) {
//   //       console.log(err.response.data); // check API docs to confirm what kind of issue we get here
//   //       console.log(err.response.status);
//   //       console.log(err.response.headers);
//   //     } else {
//   //       console.error(`GET error: ${err.message}`);
//   //     }
//   //   }
//   // };
}
