import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const filePath = resolve('/', '../clients.json');

const readClients = () => {
  const data = readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeClients = (clients) => {
  writeFileSync(filePath, JSON.stringify(clients, null, 2), 'utf-8');
};

export {
  readClients,
  writeClients,
};
