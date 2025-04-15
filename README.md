# AIC-Gallery
React project displaying art from the Art Institute of Chicago using their incredible API: https://api.artic.edu/docs/#introduction

Currently, search queries are hard-coded to show public domain images matching the search term displayed on the homepage, which can be edited in the constants.js file.

Other things can be changed in constants.js as well, like how many pieces of art to show per page. I recommend using a number that divides by 2 and 3 to get a nice layout on different screen sizes.

API calls are also limited to 60 requests a user per minute.


# Tech Stack
- React as frontend framework
- Axios for simplifying API interaction
- Tanstack (AKA React) Query for API queries and client-side caching
- Vite for building, with Babel for transpiling
- React Router for routing
- ESLint for linting
- Vitest for testing
