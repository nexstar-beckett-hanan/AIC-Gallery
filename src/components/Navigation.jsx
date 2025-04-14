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
				// todo: check why React Query docs don't suggest disabling on isPlaceholderData here like in next - is it because React Query handles cacheing previous page automatically?
				disabled={page === 1}
			>
				Previous 10 Artworks
			</button>
			<button
				onClick={() => {
					if (!isPlaceholderData && page < totalPages) {
						setPage(page + 1);
					}
				}}
				// disable button if placeholderData is active or if we don't have any more pages to navigate to
				// todo: disable during fetching with clear signal that it will be renabled vs have reached end of pages
				disabled={isPlaceholderData || page === totalPages}
			>
				Next 10 Artworks
			</button>
		</nav>
	);
}
