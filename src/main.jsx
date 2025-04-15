import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// async function enableMocking() {
//   // if (import.meta.env.NODE_ENV !== 'development') {
//   //   return
//   // }
 
//   const { worker } = await import('./mocks/browser')
 
//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start()
// }
 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* {enableMocking().then(() => { */}
      return <App />
    {/* })} */}
  </StrictMode>
)
