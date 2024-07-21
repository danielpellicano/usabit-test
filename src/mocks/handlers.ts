import { http, HttpResponse } from 'msw';

// eslint-disable-next-line @typescript-eslint/no-unused-vars


export const handlers = [
  http.get('/clients', () => {
    const clients = [
      { id: 1, name: 'Cliente 1', email: 'cliente1@example.com' },
      { id: 2, name: 'Cliente 2', email: 'cliente2@example.com' },
    ];
    return HttpResponse.json(clients)
  }),
  // http.post('/', (req, res, ctx) => {
  //   const newClient = {
  //     id: clients.length + 1, // Gera um ID simples, pode ser substituído por lógica mais complexa
  //     ...req.body
  //   };
  //   clients.push(newClient);
  //   return res(ctx.json(newClient));
  // }),
];
