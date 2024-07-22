import React, { useState } from 'react';
import ClientList from './ClientList';
import ClientForm from './ClientForm';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const addClientApi = async (client) => {
  const response = await axios.post('/clients', client);
  return response.data;
};

const updateClientApi = async (client) => {
  const response = await axios.put(`/clients/${client.id}`, client);
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
    <div>
      <ClientForm
        onSubmit={handleFormSubmit}
        defaultValues={editingClient || { name: '', email: '' }}
        isEditing={Boolean(editingClient)}
        onCancelEdit={handleCancelEdit}
      />
      <ClientList onEdit={setEditingClient} />
    </div>
  );
};

export default MainComponent;
