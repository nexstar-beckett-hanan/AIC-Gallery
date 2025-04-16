export function mockUseQueryError(error, overrides = {}) {
  // use the error argument as the reported error object and make sure to
  // set flags like `isSuccess`, `isError`, `isLoading` and the rest...
}

export function  mockUseQuerySuccess(data, overrides = {}) {
  // use the data argument as you'd expect and, obviously, set the flags
}

export function mockUseQueryLoading(overrides = {}) {
  // same note about setting the flags correctly
}