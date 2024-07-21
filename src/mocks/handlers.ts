import {http, HttpResponse } from 'msw';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const clients = [
  { id: 1, name: 'Cliente 1', email: 'cliente1@example.com' },
  { id: 2, name: 'Cliente 2', email: 'cliente2@example.com' },
];

// Função para gerar IDs numéricos únicos
export const generateUniqueId = () => {
  let id: number;
  do {
    id = Math.floor(Math.random() * 1000000); // Gerando um ID numérico aleatório
  } while (clients.some(client => client.id === id)); // Verifica 
  return id;
};


export const handlers = [
  http.get('/clients', async () => {
   
    console.log(HttpResponse.json(clients));

    return HttpResponse.json(clients)
  }),
  http.post('/clients', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const {name, email} = await request.json();

    // Verifica se já existe um cliente com o mesmo email
    const existingClientByEmail = clients.find(client => client.email === email);
    if (existingClientByEmail) {
      alert('ja existe');
      return HttpResponse.json({ error: 'Client with this email already exists' });
    }

    const newClient = {
      id: generateUniqueId(), // Gerando um ID único
      name,
      email,
    };
 
    console.log(newClient);
    clients.push(newClient);
    
 
    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(newClient, { status: 201 })


  }),

  http.put('/clients/:id', async ({ params, request }) => {
    const id = Number(params.id);
    const { name, email } = await request.json();
    
    const clientIndex = clients.findIndex(client => client.id === id);
    if (clientIndex === -1) {
      return HttpResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    clients[clientIndex] = { id, name, email };

    return HttpResponse.json(clients[clientIndex]);
  }),

  http.delete('/clients/:id', ({ params }) => {
    const id = Number(params.id);
    const index = clients.findIndex(client => client.id === id);
    
    if (index === -1) {
      return HttpResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    clients.splice(index, 1);
    return HttpResponse.json({ message: 'Client deleted successfully' });
  }),
];
