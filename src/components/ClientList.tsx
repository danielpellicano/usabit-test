import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import Loading from './Loading';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  width: 50%;
  box-sizing: border-box;

  @media (max-width:600px) {
    width: 100%;
  }

  h2 {
    background: #000;
    color: #fff;
    padding: 10px;
    font-size: 20px;
    margin-top: 0;
  }
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin:0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.75rem;
  background: #f9f9f9;
  margin-bottom: 16px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem;
  font-size: 0.9rem;
  background-color: #FF5733;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;




const fetchClients = async () => {
  const response = await fetch('/clients');
  if (!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }
  return response.json();
};

const addClientApi = async (client) => {
  const response = await axios.post('/clients', client);
  return response.data;
};

const updateClientApi = async (client) => {
  const response = await axios.put(`/clients/${client.id}`, client);
  return response.data;
};

const deleteClientApi = async (id) => {
  await axios.delete(`/clients/${id}`);
};

const ClientList: React.FC<{ onEdit: (client: any) => void }> = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const { data: clients, isLoading, isError, error } = useQuery('clients', fetchClients, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const deleteClient = useMutation(deleteClientApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
    },
  });

  if (isLoading) return <Loading/>;

  if (isError) {
    return <p>Erro ao carregar os clientes: {error.message}</p>;
  }

  if (!clients || !Array.isArray(clients)) {
    return <p>Erro ao carregar os clientes: Dados inválidos</p>;
  }

  return (
    <ListBox>
    <h2>Lista de Clients</h2>
    <List>
      {clients.map((client: any) => (
        <ListItem key={client.id}>
          <span>{client.name} - {client.email}</span>
          <div>
            <Button style={{background:'#2c58fd' }} onClick={() => onEdit(client)}> <FaEdit />
            </Button>
            <Button onClick={() => deleteClient.mutate(client.id)}><MdDeleteForever/></Button>
          </div>
        </ListItem>
      ))}
    </List>
    </ListBox>
  );
};

export default ClientList;
