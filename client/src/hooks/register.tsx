import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { trainerAPI } from '../utilities/store';

export const useRegister = () => {
    const form = useForm<any>({
        defaultValues: {},
    });

    const [register] = trainerAPI.useRegisterMutation();

    const handleOnSubmit = async (event: FormEvent) => {
        event.preventDefault();

        register(form.getValues()).then((response) => {
            if ('data' in response) {
                alert('success');
            } else if ('error' in response && 'status' in response.error) {
                alert('try again');
            }
        });
    };

    return { form, handleOnSubmit };
};
