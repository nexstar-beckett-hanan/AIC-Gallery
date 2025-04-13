import useArtworksQuery from "./useArtworksQuery";

export const useArtworkDetails = (id) => {
  return useArtworksQuery(
    (data) => {
      return data.find((artwork) => artwork.id === id);
    }
  )
};
