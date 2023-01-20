import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { trainerAPI } from '../utilities/store';

export const useLogin = () => {
    const form = useForm<any>({
        defaultValues: {},
    });

    const [login] = trainerAPI.useLoginMutation();

    const handleOnSubmit = async (event: FormEvent) => {
        event.preventDefault();

        login(form.getValues()).then((response) => {
            if ('data' in response) {
                alert('success');
            } else if ('error' in response && 'status' in response.error) {
                alert('try again');
            }
        });
    };

    return { form, handleOnSubmit };
};
