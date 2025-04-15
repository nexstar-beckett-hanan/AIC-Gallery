import { useNavigate } from 'react-router';
import { ART_LIMIT_PER_PAGE } from '../constants/constants';

export default function Navigation({
	page,
	totalPages,
  setPage,
  location,
}) {
  const navigate = useNavigate();

  const handleNavigation = (newPage) => {
    setPage(Number(newPage).toString());
    navigate(`/${newPage}`);
  }

  const pageNum = Number(page);
	return (
		<nav aria-label={`${location} Pagination`}>
			<button
				type='button'
				onClick={() => {
          if (pageNum > 1) {
            handleNavigation(pageNum - 1);
					}
        }}
				// todo: check why Tanstack Query docs don't suggest disabling on isPlaceholderData here like in next - is it because Tanstack Query handles cacheing previous page automatically?
				disabled={pageNum === 1}
			>
				<strong>Previous { ART_LIMIT_PER_PAGE } Artworks</strong>
			</button>
			<button
        type='button'
        onClick={() => {
          if (pageNum < totalPages) {
            handleNavigation(pageNum + 1);
					}
        }}
				// disable button if placeholderData is active or if we don't have any more pages to navigate to
				// todo: disable during fetching with clear signal that it will be renabled vs have reached end of pages
        // todo: check that next button is disabled on last page
				disabled={ pageNum === totalPages }
			>
				<strong>Next { ART_LIMIT_PER_PAGE } Artworks</strong>
			</button>
		</nav>
	);
}
