import { useSession } from '../hooks/session';

export const Session = () => {
    useSession({ interval: 3000 });

    return null;
};
