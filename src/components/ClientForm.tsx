  import React, { useEffect } from 'react';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import * as z from 'zod';
  import styled from 'styled-components';
  import { FaUserAstronaut, FaEnvelope  } from "react-icons/fa";



  const schema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("Email inválido"),
  });

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

  const Input = styled.input`
    padding: 0.5rem;
    font-size: 0.75rem;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    height: 52px;
  `;

  const Error = styled.span`
    padding:0;
    font-size: 0.75rem;
    color:red;
  `;

  const Button = styled.button`
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #2c58fd;
    color: white;
    border: none;
    cursor: pointer;
  `;


  const InputGroup = styled.div`
    position: relative;
    width: 100%;

    svg {
      position: absolute;
      top: 17px;
      left: 8px;
    }
  `;

  const ClientRegister = styled.section`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 20px;
    width: 50%;
    box-sizing: border-box;

    @media (max-width:600px) {
      width: 100%;
      margin-bottom: 20px;
    }

    h2 {
      background: #000;
      color: #fff;
      padding: 10px;
      font-size: 20px;
      margin-top: 0;
    }
  `;


  const ClientForm = ({ onSubmit, defaultValues, isEditing, onCancelEdit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: zodResolver(schema),
      defaultValues,
    });

    useEffect(() => {
      reset(defaultValues);
    }, [defaultValues, reset]);

    return (
      <ClientRegister>
      <h2>Cadastrar Novos Clientes</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
        <FaUserAstronaut />
        <Input {...register("name")} placeholder="Nome" />
        {errors.name && <Error>{errors.name.message}</Error>}
        </InputGroup>
        <InputGroup>
        <FaEnvelope />
        <Input {...register("email")} placeholder="Email" />
        {errors.email && <Error>{errors.email.message}</Error>}
        </InputGroup>
        <Button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</Button>
        {isEditing && <Button type="button" onClick={onCancelEdit}>Cancelar</Button>}
      </Form>
      </ClientRegister>
    );
  };

  export default ClientForm;
