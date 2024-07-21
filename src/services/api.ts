import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173', // Ajuste a URL base conforme necessário
});

// Inicializa o MSW apenas no ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .catch(err => console.error('Failed to initialize MSW', err));
}

export default api;
