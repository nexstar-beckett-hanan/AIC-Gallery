import { delay, http, HttpResponse } from 'msw';
import * as data from './data/sampleData.json';

export const handlers = [
  // intercept 'GET http://localhost:5174' requests
  http.get('http://localhost:5173', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(data)
  }),
]


// function getSessionData() {
//   return JSON.parse(sessionStorage.getItem('users') ?? '');
// }

// function setSessionData(data) {
//   if (data) {
//     sessionStorage.setItem('users', JSON.stringify(data));
//   } else {
//     sessionStorage.setItem('users', JSON.stringify(users));
//   }
// }

// if (!sessionStorage.getItem('users')) {
//   setSessionData();
// }

// export const handlers = [
//   http.get('/api/users', () => {
//     return HttpResponse.json(getSessionData());
//   }),
//   http.get('/api/users/:id', ({ params }) => {
//     const data = getSessionData().results.find((user) => user.id === Number(params.id));

//     return HttpResponse.json(data);
//   }),
//   http.post<object, Omit<UserType, 'id'>, ResponseBody, '/api/users'>('/api/users', async({ request }) => {
//     const requestBody = await request.json();
//     const data = getSessionData();
//     const response = {
//       ...requestBody,
//       id: data.results.length + 1,
//     };

//     data.results.push(response);

//     setSessionData(data);

//     return HttpResponse.json({
//       createdAt: (new Date()).toLocaleDateString(),
//       response,
//       success: true,
//     }, {
//       status: 201,
//     });
//   }),
//   http.delete<RequestType, '/api/users/:id'>('/api/users/:id', async(request) => {
//     const { id } = request.params;
//     const data = getSessionData();
//     const isUserFound = data.results.some((entry) => entry.id === Number(id));

//     if (isUserFound) {
//       const res = data.results.filter((entry) => entry.id !== Number(id));

//       data.results = res;

//       setSessionData(data);

//       await delay(2500);

//       return HttpResponse.json({ id });
//     } else {
//       await delay();

//       return (new HttpResponse('Can\'t find the user', { status: 404 }));
//     }
//   }),
// ];
