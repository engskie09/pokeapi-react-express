import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { trainerAPI } from '../utilities/store';

const swal = withReactContent(Swal);

export const useLogin = () => {
    const form = useForm<any>({
        defaultValues: {},
    });

    const [login] = trainerAPI.useLoginMutation();

    const handleOnSubmit = async (event: FormEvent) => {
        event.preventDefault();

        login(form.getValues()).then((response) => {
            if ('data' in response) {
                swal.fire('Succesfully Login', '', 'success');
            } else if ('error' in response && 'status' in response.error) {
                swal.fire('Try Again', '', 'error');
            }
        });
    };

    return { form, handleOnSubmit };
};
