import { useState, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
const ART_LIMIT_PER_PAGE = 10;

export default function Gallery() {
  const [configUrl, setConfigUrl] = useState("");
  const [artworksData, setArtworksData] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  // Note here: prev_url, next_url props are not available despite being listed as pagination props in API

  const fetchArtworks = async () => {
    // todo: add timeout so we get an error if it takes too long
    // todo: finalize the filter here to ensure only the fields we need are included in the fetch
    // optional todo: turn fields into an object and encode it to make editing fields easier
    const response = await axios.get(
      `https://api.artic.edu/api/v1/artworks/search?q=children&page=${page}&limit=${ART_LIMIT_PER_PAGE}&fields=id,title,artist_title,thumbnail,has_not_been_viewed_much,place_of_origin,provenance_text,updated_at,style_titles,theme_titles,artist_display,date_display,medium_display,image_id,next_url,pagination.page,pagination.total_pages`,
      // `https://api.artic.edu/api/v1/artworks/search?q=monet&query[term][is_public_domain]=true&page=1&limit=10`,
      {
        // allows API owner to contact developer in a situation where resource demand is high
        headers: { "AIC-User-Agent": "aic-bash (beckett.hanan@gmail.com)" },
      }
    );
    setConfigUrl(response.data.config.iiif_url);
    setTotalPages(response.data.pagination.total_pages);

    // then decide where to make a second call to get alt text where possible
    setArtworksData(response.data.data);
    return response.data;
  };
  // turns API fields into data shape desired for display
  const transformArtworksData = (artworksData) => {
    const artWithImages = [];
    artworksData.forEach((artwork) => {
      const imgSrc = `${configUrl}/${artwork.image_id}/full/400,/0/default.jpg`;
      const newArtwork = {
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
      artWithImages.push(newArtwork);
    });
    return artWithImages;
  };

  const useArtworksQuery = () => {
    useQuery({
      queryKey: ["artworksData", page],
      queryFn: fetchArtworks,
      placeholderData: keepPreviousData,
      // todo: optionally add selector so we can see if anything changed
      // select: (data) => {
      //   data.find((artwork) => artwork.id === id)
      // }
    });
  };

  const queryClient = useQueryClient();

  // prefetch next page
  useEffect(() => {
    if (page < totalPages) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ['artworksData', nextPage],
        queryFn: fetchArtworks(nextPage),
      })
    }
  }, [page, queryClient]);

  useEffect(() => {
    if (artworksData?.length === 10) {
      const artWithImages = transformArtworksData(artworksData);
      setArtworks(artWithImages);
    }
  }, [artworksData, configUrl, page]);

  useArtworksQuery();
  // todo: Compare isLoading and isPending to isFetching to determine the best one to use.
  if (useArtworksQuery.isFetching) {
    return <p>Loading...</p>;
  }

  if (useArtworksQuery.error) {
    return <p>Error! {useArtworksQuery.error.message}</p>;
  }

  // add error boundary: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
  return (
    <div>
      {
        // todo: finish accessibility attributes and test
        // if the id is null/no image, we won't see 10 unless we're okay with one's without images
      }
      <p aria-current='page'>Current page: {page}</p>
      <nav aria-label="Pagination">
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
                  <img src={artwork.imgSrc} alt={artwork.altText} />
                )) || <p>No image available.</p>}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
