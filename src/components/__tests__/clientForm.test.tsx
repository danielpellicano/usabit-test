import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ClientForm from '../ClientForm';

describe('ClientForm', () => {
  const onSubmit = jest.fn();
  const onCancelEdit = jest.fn();
  const defaultValues = { name: '', email: '' };

  beforeEach(() => {
    onSubmit.mockClear();
    onCancelEdit.mockClear();
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<ClientForm onSubmit={onSubmit} defaultValues={defaultValues} />);

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando o campo nome está vazio', async () => {
    render(<ClientForm onSubmit={onSubmit} defaultValues={defaultValues} />);

    fireEvent.click(screen.getByText('Salvar'));

    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando o campo email é inválido', async () => {
    render(<ClientForm onSubmit={onSubmit} defaultValues={defaultValues} />);

    userEvent.type(screen.getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.click(screen.getByText('Salvar'));

    expect(await screen.findByText('Email inválido')).toBeInTheDocument();
  });

  it('deve chamar onSubmit com dados corretos', async () => {
    render(<ClientForm onSubmit={onSubmit} defaultValues={defaultValues} />);

    userEvent.type(screen.getByPlaceholderText('Nome'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
    });
  });

  it('deve chamar onCancelEdit quando o botão cancelar é clicado', () => {
    render(<ClientForm onSubmit={onSubmit} defaultValues={defaultValues} isEditing={true} onCancelEdit={onCancelEdit} />);

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onCancelEdit).toHaveBeenCalled();
  });
});
