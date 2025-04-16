import React from "react";
import { BrowserRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom/vitest';

import { renderWithClient } from "../testUtils";
import { ART_LIMIT_PER_PAGE } from "../../src/constants/constants";
import Navigation from "../../src/components/Navigation";

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
	...vi.requireActual('react-router-dom'),
	useNavigate: () => mockUsedNavigate,
}));

describe('Navigation', () => {
  let page = 1;
	const totalPages = 40;
  // todo: mock this better later if needed
	const setPage = (newPage) => page = newPage;
  const result = renderWithClient(
    <BrowserRouter>
      <Navigation page={ page } totalPages={ totalPages } setPage={ setPage }/>
    </BrowserRouter>
  );

  it('should show two buttons', () => {
    const prevButtonMatch = new RegExp(`Previous ${ART_LIMIT_PER_PAGE}`, 'i');
    const nextButtonMatch = new RegExp(`Next ${ART_LIMIT_PER_PAGE}`, 'i');
    expect(result.getByRole('button', { name: prevButtonMatch })).toBeInTheDocument();
    expect(result.getByRole('button', { name: nextButtonMatch })).toBeInTheDocument();
  });

  it('should show two buttons', () => {
    // expect(result.getByRole('button', { name: /Previous/i })).toBeInTheDocument();
    // expect(result.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });
})
