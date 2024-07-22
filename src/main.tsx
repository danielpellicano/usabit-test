import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import { GlobalStyle } from './styles';

const queryClient = new QueryClient();
const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle/>
      <Header />
      <App />
      <Footer />
    </QueryClientProvider>
  </React.StrictMode>
);
