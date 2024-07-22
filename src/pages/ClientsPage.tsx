import React, { useState } from 'react';
import ClientList from './../components/ClientList';
import ClientForm from './../components/ClientForm';
import { useMutation, useQueryClient } from 'react-query';
import api from '../services/api';
import styled from 'styled-components';

const ClientContainer = styled.div`
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
    box-sizing: border-box;

    @media (max-width:600px) {
      display: block;
      padding: 0 10px;
    }
`;

const addClientApi = async (client) => {
  const response = await api.post('/clients', client);
  return response.data;
};

const updateClientApi = async (client) => {
  const response = await api.put(`/clients/${client.id}`, client);
  return response.data;
};

const MainComponent = () => {
  const queryClient = useQueryClient();
  const [editingClient, setEditingClient] = useState(null);

  const addClient = useMutation(addClientApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
    },
  });

  const updateClient = useMutation(updateClientApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
    },
  });

  const handleFormSubmit = (data) => {
    if (editingClient) {
      updateClient.mutate({ ...data, id: editingClient.id });
    } else {
      addClient.mutate(data);
    }
    setEditingClient(null);
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
  };

  return (
    <ClientContainer>
      <ClientForm
        onSubmit={handleFormSubmit}
        defaultValues={editingClient || { name: '', email: '' }}
        isEditing={Boolean(editingClient)}
        onCancelEdit={handleCancelEdit}
      />
      <ClientList onEdit={setEditingClient} />
    </ClientContainer>
  );
};

export default MainComponent;
