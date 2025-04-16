// import { renderWithRouter } from "../setupTests";
// import { Route } from "react-router";
// import { describe, it, expect, beforeEach } from "vitest";
// import { useArtworksQuery } from '../../src/hooks/useArtworksQuery';

// // vi.mock('./', () => {
// //   useArtworksQuery: vi.fn();
// // })

// describe('Gallery Component', () => {
//   beforeEach(() => {
//     useArtworksQuery.mockImplementation(() => ({}))
//   })

//   it.todo('fetches data', () => {
//     renderWithRouter(() => {
//       <Route path='/' element={ <Home /> } />
//     }, '/test-home');
//     expect(useArtworksQuery).toHaveBeenCalledWith('test-home')
//   })

//   describe('while data loading', () => {

//   })

//   describe('when error happens', () => {

//   })

//   describe('when data retrieved successfully', () => {
    
//     describe('on page change', () => {

//     })
//   })
// })

// Sample from React Router docs: https://v5.reactrouter.com/web/guides/testing

// it("clicking filter links updates product query params", () => {
//   let testHistory, testLocation;
//   render(
//     <MemoryRouter initialEntries={["/my/initial/route"]}>
//       <App />
//       <Route
//         path="*"
//         render={({ history, location }) => {
//           testHistory = history;
//           testLocation = location;
//           return null;
//         }}
//       />
//     </MemoryRouter>,
//     node
//   );

//   act(() => {
//     // example: click a <Link> to /products?id=1234
//   });

//   // assert about url
//   expect(testLocation.pathname).toBe("/products");
//   const searchParams = new URLSearchParams(testLocation.search);
//   expect(searchParams.has("id")).toBe(true);
//   expect(searchParams.get("id")).toEqual("1234");
// });

// Alternatives

//     You can also use BrowserRouter if your test environment has the browser globals window.location and window.history (which is the default in Jest through JSDOM, but you cannot reset the history between tests).
//     Instead of passing a custom route to MemoryRouter, you can use the base Router with a history prop from the history package:

// // app.test.js
// import { createMemoryHistory } from "history";
// import { Router } from "react-router";

// test("redirects to login page", () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <App signedInUser={null} />
//     </Router>,
//     node
//   );
//   expect(history.location.pathname).toBe("/login");
// });

// Another option:
// import userEvent from '@testing-library/user-event'

// it('changes to the next page when Next button is clicked', async () => {
//   const user = userEvent.setup()
//   render(<MyComponent />)
//   await user.click(screen.getByRole('button', {name: /click me!/i}))
//   // expect()
// })