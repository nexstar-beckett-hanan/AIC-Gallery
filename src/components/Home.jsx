import { useParams } from "react-router";
import Gallery from "./Gallery";

export default function Home() {
  const params = useParams();
	let newPage = params?.page || '1';

  return (
    <div>
      {/* todo: use to announce to screen readers that the artwork has changed. 
      <div role="status"
        aria-live="polite"
        aria-atomic="true">
        New Artwork has Loaded.
      </div> */}
      <header>
        <h1>Art Institute of Chicago Gallery</h1>
        <em>Click any piece of art for more details.</em>
      </header>
      <Gallery newPage={ newPage } />
    </div>
  );
}
