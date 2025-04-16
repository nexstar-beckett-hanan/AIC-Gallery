# AIC-Gallery

React project displaying art from the Art Institute of Chicago using their incredible API: https://api.artic.edu/docs/#introduction

This is a fun way to see different types of art including paintings, drawings, statues, and more. Personally, I like getting to see how lots of artists throughout time and cultures portray the same topic, or how an art form like watercolor has evolved over the years.

## More about the API requests

Currently, search queries are hard-coded to show public domain images matching the search term displayed on the homepage, which can be edited in the constants.js file. You can search for an artist like "monet", an art style like "watercolor", or a topic like "children" by changing this constant.

Other things can be changed in constants.js as well, like how many pieces of art to show per page. I recommend using a number that divides by both 2 and 3 to provide a better layout on different screen sizes.

API calls are also limited to 60 requests a user per minute by the API owner, and you can't exceed 1,000 pieces of artwork by search, so try refining the search more using the docs, the constants file, and the fetch function in fetchArtworks.js if you want to see more of a specific type of artwork.

# Tech Stack

- React as the frontend framework
- Tanstack (AKA React) Query for making API query easy to access throughout the app and to handle client-side caching
- Vite for building, with Babel for transpiling
- Vitest for testing, plus some other goodies like msw (mock service worker), and React Testing Library
- React Router for routing
- ESLint for linting, with Airbnb as the base
- axios for simplifying API interactions

React, axios, ESLint, and React Router were familiar for me in this project.

Tanstack/React Query, Vite, Vitest, React Testing Library, msw, and the Art Institute of Chicago API were all brand new to me before starting this project.

# Instructions

- To run in dev mode: `npm install && npm run dev`
- To run in Vite Preview mod: `npm install && npm run build && npm run preview`
- To run Vitest in the CLI: `npm run test`
- To run Vitest in the CLI plus a handy browser UI: `npm run test-ui`

You can also run Vitest alongside dev mode if you like, if you open two terminal windows.

# Other Things You Can Change

1. Feel free to enable/disable `StrictMode` while running dev mode in App.jsx. I've commented it out in committed code just to speed things up and get rid of the annoying source map error warning in the console for anyone running for the first time.
2. To see more info about what Tanstack/React Query is doing behind the scenes, uncomment the `<ReactQueryDevTools>` component in App.jsx. It will open automatically in dev mode.
3. To update sampleData.json, uncomment the ReactQueryDevTools in App.jsx, copy the data from the dev tool UI by clicking a request and then using the copy icon next to the Data object, and paste it into the json file. Then remove the json object wrapper before saving - this makes referencing data properties simpler in testing.
4. To choose a different search term or number of artworks to show per page, edit them in the constants.js file.

# Cool features

- Changing number of artworks or the current search term in constants.js will not only update the Gallery display, it will also update the navigation buttons and Current Search Term in the Gallery.
- If you use Firefox, try switching to light mode in the devtools to see the light mode version of the app!
- You can use the address bar to skip to a different page, for example to get to page 5, use: http://localhost:5173/5
  - Don't worry, if you go too high, you'll get an error letting you know to go lower.
- No automatically detected issues by axe DevTools.

# To Do List

- See if there's a way to prevent the brief flash of images loading when the page changes
- Add a search bar to let users change the search term
- Add a light/dark mode toggle
- Add route testing
- Add Artwork Details testing
- Improve accessibility, specifically starting with:
  - Announcing to screen readers when new art populates on the page
  - Reviewing all page sections with a screen reader
- Review all tests including which pieces are mocked and which aren't to assess testing strategy as a whole since this is my first time really implementing unit tests.
- Going to a too-high page number originally showed the total page number in case it had been accessed by typing a page number into the address bar, but that was lost with other optimizations. Add it back.
