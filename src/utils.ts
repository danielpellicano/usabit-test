// Função para gerar IDs únicos
export const generateUniqueId = () => {
    let id: number;

      id = Math.floor(Math.random() * 1000000); // Gerando um ID numérico 
    return id;
  };