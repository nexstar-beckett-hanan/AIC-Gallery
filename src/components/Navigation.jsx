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
				// Todo: Check why Tanstack Query docs don't suggest disabling on isPlaceholderData here like in next - is it because Tanstack Query handles caching previous page automatically?
				disabled={pageNum === 1}
			>
				<strong>Previous { ART_LIMIT_PER_PAGE } Artworks</strong>
			</button>
			<button
        type='button'
        onClick={() => {
          if (pageNum < totalPages - 1) {
            handleNavigation(pageNum + 1);
					}
        }}
				disabled={ pageNum === totalPages - 1 }
			>
				<strong>Next { ART_LIMIT_PER_PAGE } Artworks</strong>
			</button>
		</nav>
	);
}
