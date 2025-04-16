import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import useArtworksQuery from '../../src/hooks/useArtworksQuery';
import { createWrapper } from '../testUtils';
import { mockServer } from '../../vitest-setup';

// Using 2 to match mock data.
const page = 2;

describe('useArtworksQuery hook', () => {
	it('to run successfully', async () => {
		const { result } = renderHook(() => useArtworksQuery(page), {
			wrapper: createWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});
		expect(result.current.data).toBeDefined();
	});

	it('to contain the correct config url', async () => {
		const { result } = renderHook(() => useArtworksQuery(page), {
			wrapper: createWrapper(),
		});
		await waitFor(() => {
			expect(result.current.data.configUrl).toEqual(
				'https://www.artic.edu/iiif/2'
			);
		});
	});

	it('to have current_page value matching the page used in the query', async () => {
		const { result } = renderHook(() => useArtworksQuery(page), {
			wrapper: createWrapper(),
		});
		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data.data.pagination.current_page).toBe(page);
	});

	it('to have a data array', async () => {
		const { result } = renderHook(() => useArtworksQuery(page), {
			wrapper: createWrapper(),
		});
		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data.data).toBeTypeOf('object');
	});

	it('to send error when the request errors', async () => {
		mockServer.use(
			http.get('*', () => {
				return HttpResponse.error();
			})
		);

		const { result } = renderHook(() => useArtworksQuery(page), {
			wrapper: createWrapper(),
		});
		await waitFor(() => expect(result.current.isError).toBe(true));
		expect(result.current.error).toBeDefined();
	});
});
