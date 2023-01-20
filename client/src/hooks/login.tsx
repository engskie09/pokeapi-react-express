import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const useLogin = () => {
    const form = useForm<any>({
        defaultValues: {},
    });

    const handleOnSubmit = async (event: FormEvent) => {
        event.preventDefault();

        alert('login');
    };

    return { form, handleOnSubmit };
};
