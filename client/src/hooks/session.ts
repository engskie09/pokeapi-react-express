import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch, sessionComponent, trainerAPI } from '../utilities/store';

interface UseSessionProps {
    interval: number;
}

export const useSession = (props: UseSessionProps) => {
    const { interval } = props;

    const dispatch = useAppDispatch();
    const { token, isAuthenticated } = useAppSelector((state) => state.sessionComponent);

    const navigate = useNavigate();

    const [verify] = trainerAPI.useVerifyTokenMutation();

    useEffect(() => {
        let mounted = true;

        const verifyToken = async () => {
            dispatch(sessionComponent.actions.checkToken());

            // check if token is valid and isAuthenticated is set to true, it could happen when token is manually deleted
            if (token || isAuthenticated) {
                verify({ token });
            }
        };

        const checkToken = setInterval(async () => {
            verifyToken();
        }, interval);

        if (mounted) {
            // run instantly then wait for several seconds based on interval given
            verifyToken();
        }

        return () => {
            mounted = false;
            clearInterval(checkToken);
        };
    }, [token, isAuthenticated]);

    useEffect(() => {
        let mounted = true;

        if (mounted)
            if (isAuthenticated) {
                navigate('/pokemons');
            } else {
                navigate('/login');
            }

        return () => {
            mounted = false;
        };
    }, [isAuthenticated]);
};
