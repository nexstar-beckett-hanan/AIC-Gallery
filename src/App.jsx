import {
//   useQuery,
//   // useMutation,
//   // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Gallery from './components/Gallery';
import reactLogo from './assets/react.svg';
import './App.css';

// Access new React Query client, and mark data as stale after 24 hrs
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

function App() {
  // async function fetchArtworks() {
  //   return useQuery({
  //     queryKey: "artworks",
  //     queryFn: () => {
  //       axios
  //         .get("https://api.artic.edu/api/v1/artworks?limit=10&page=1", {
  //           headers: { "AIC-User-Agent": "aic-bash (beckett.hanan@gmail.com)" },
  //         })
  //         .then((res) => console.log({ res }));
  //     },
  //   });
  // }
    
    // return (
    //   <>
    //     <ul>
    //       {data.map((artwork) => {
    //         <li key={artwork.id}>{artwork.title}</li>
    //       })}
    //     </ul>
    //     { isFetching && <p>Refreshing data...</p> }
    //   </>
    // )

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Art Institute of Chicago Gallery</h1>
      </div>
      <Gallery />
      <ReactQueryDevtools initialIsOpen={true} buttonPosition={'top-right'}/>
    </QueryClientProvider>
  )
}

// function Artworks() {
//   // Get artwork data, aliased as 'artworks'
//   // const { data: artworks, status, isFetching } = useQuery({
//   //   queryFn: fetchArtworks,
//   //   queryKey: ['artworks'],
//   // });

//   // const query = useQuery({
//   //   queryFn: getArtworks,
//   //   queryKey: ['artworks'],
//   // });

//   const { isArtworksPending, artworksError, data: artworks, isArtworksFetching } = useQuery({
//     queryKey: ['artworks'],
//     queryFn: async () => {
//       const response = await fetch(
//         'https://api.artic.edu/api/v1/artworks?limit=10&page=1',
//       )
//       return await response.json()
//     },
//   })

//   if (isArtworksPending) return 'Loading...'

//   if (artworksError) return 'An error has occurred: ' + artworksError.message

//   // Then get alt text for artwork, where available
//   // const { isAltTextPending, altTextError, data: altText, isAltTextFetching } = useQuery({
//   //     queryKey: ['altText'],
//   //     queryFn: async () => {
//   //       const response = await fetch(
//   //         `https://api.artic.edu/api/v1/images/${imageId}`,
//   //       )
//   //       return await response.json()
//   //     },
//   //   })
//   //   ['altText', artworks],
//   //   getAltTextForArtwork,
//   //   {
//   //     // This query will not execute until the artwork exists
//   //     enabled: !!artwork,
//   //   }
//   // )
  
//   // const mutation = useMutation({
//   //   mutationFn: ***putHere***,
//   //   onSuccess: () => {
//   //     // Invalidate and refetch
//   //     queryClient.invalidateQueries({ queryKey: ['artworks'] });
//   //   }
//   // })

//   if (isArtworksFetching)  {
//     return <p>Loading...</p>;
//   }

//   if (artworksError) {
//     return <p>Error!</p>;
//   }

//   // if (status === 'success') {
//     return (
//       <div>
//         <ul>
//           {artworks?.data?.map((artwork) => {
//             return <li key={artwork.id}>{artwork.title}</li>
//           })}
//         </ul>
//         {isArtworksFetching ? 'Updating...' : ''}
//         {/* <button
//         onClick={() => {
//           mutation.mutate({
//             id: Date.now(),
//             title: 'Do Laundry',
//           })
//         }}
//       >
//         Add Todo
//       </button> */}
//       </div>
//     )
//   // }
// }

export default App;
