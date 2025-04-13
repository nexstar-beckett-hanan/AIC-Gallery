import { useParams } from "react-router";

export default function ArtFullSize() {
  let { artworkId } = useParams();
  console.log(artworkId);
}