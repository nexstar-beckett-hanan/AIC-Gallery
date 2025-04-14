import { ART_LIMIT_PER_PAGE } from '../constants/constants';

export default function Navigation({
	page,
	isPlaceholderData,
	totalPages,
	setPage,
}) {
	return (
		<nav aria-label='Pagination'>
			<button
				type='button'
				onClick={() => {
					console.log(page);
					if (!isPlaceholderData && page > 1) {
						setPage(page - 1);
					}
				}}
				// todo: check why Tanstack Query docs don't suggest disabling on isPlaceholderData here like in next - is it because Tanstack Query handles cacheing previous page automatically?
				disabled={page === 1}
			>
				<strong>Previous { ART_LIMIT_PER_PAGE } Artworks</strong>
			</button>
			<button
				onClick={() => {
					if (!isPlaceholderData && page < totalPages) {
						setPage(page + 1);
					}
				}}
				// disable button if placeholderData is active or if we don't have any more pages to navigate to
				// todo: disable during fetching with clear signal that it will be renabled vs have reached end of pages
        // todo: check that next button is disabled on last page
				disabled={isPlaceholderData || page === totalPages}
			>
				<strong>Next { ART_LIMIT_PER_PAGE } Artworks</strong>
			</button>
		</nav>
	);
}
