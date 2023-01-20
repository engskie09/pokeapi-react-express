import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { trainerAPI } from '../utilities/store';

const swal = withReactContent(Swal);

export const useRegister = () => {
    const form = useForm<any>({
        defaultValues: {},
    });

    const [register] = trainerAPI.useRegisterMutation();

    const handleOnSubmit = async (event: FormEvent) => {
        event.preventDefault();

        register(form.getValues()).then((response) => {
            if ('data' in response) {
                swal.fire('Succesfully Registered', '', 'success');
            } else if ('error' in response && 'status' in response.error) {
                swal.fire('Try Again', '', 'error');
            }
        });
    };

    return { form, handleOnSubmit };
};
