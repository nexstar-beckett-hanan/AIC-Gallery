import React from 'react';
import { MemoryRouter, BrowserRouter, Route, Routes } from 'react-router';
import { http, HttpResponse } from 'msw';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import { mockServer } from '../../vitest-setup';
import { renderWithClient } from '../testUtils';
import ArtworkDetails from '../../src/components/ArtworkDetails';
import * as data from '../../src/mocks/data/sampleData.json';

const mockUseLocationValue = {
  pathname: '',
  state: { page: 1 },
}

vi.mock('react-router', async () => {
  const mod = await vi.importActual('react-router');
  return {
    ...mod,
    useLocation: vi.fn().mockImplementation(() => {
      return mockUseLocationValue;
    }),
  };
});

describe('Artwork Details Component', () => {

  // todo: either adjust how page and artwork id are passed, or focus on route testing first to get data to load
  // Currently, this test is just stuck on "Loading..."" forever
  // describe('on success', () => {
  //   it('shows a success message', async () => {
  //     mockServer.use(
  //       http.get('*', () => data)
  //     );

  //     const result = renderWithClient(
  //       <MemoryRouter initialEntries={['/details/4']}>
  //         <Routes>
  //           <Route path='/details/:id' element={<ArtworkDetails />} />
  //         </Routes>
  //       </MemoryRouter>
  //     );
      
  //     expect(await result.findByText(/by/i)).toBeInTheDocument();
  //   });
  // });

  describe('on loading', () => {
		it('shows a loading message', async () => {
      // note: this may be ideal to use later, but at the moment it seems to cause an issue with the interceptor when mockServer is used more than once.
      // mockServer.use(
      //   http.get('*', () => data)
      // );

      const result = renderWithClient(
        <MemoryRouter initialEntries={['/details/4']}>
          <Routes>
            <Route path='/details/:id' element={<ArtworkDetails />} />
          </Routes>
        </MemoryRouter>
      );

      expect(await result.findByText(/Loading\.\.\./i)).toBeInTheDocument();
    });
  });

  describe('on error', () => {
		it('shows an error message', async () => {
      mockServer.use(
        http.get('*', () => {
          return HttpResponse.error();
        })
      );
      
      const result = renderWithClient(
        <MemoryRouter initialEntries={['/details/4']}>
          <Routes>
            <Route path='/details/:id' element={<ArtworkDetails />} />
          </Routes>
        </MemoryRouter>
      );
      
      expect(await result.findByText(/Error!/i)).toBeInTheDocument();
    });
  });
});
