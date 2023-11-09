import {useEffect} from 'react';

import {
    useRecoilValue,
    useSetRecoilState
} from 'recoil';

import {
    currReservationsState,
    reservationsState
} from '../recoil/atoms';

interface UseCurrentReservations {
    fullYear: number;
    month: number;
    date?: number;
    dependencies: Array<string | number>;
}

export const useCurrentReservations = ({
    fullYear,
    month,
    date = 0,
    dependencies
}: UseCurrentReservations) => {
    const reservations = useRecoilValue(reservationsState);
    const setCurrReservations = useSetRecoilState(currReservationsState);
    const arrayFilter = [fullYear, month, date].slice(0, date === 0 ? 2 : 3);

    useEffect(() => {
        const arrayResult = reservations.filter((r) => {
            return r.year === arrayFilter[0] && r.month === arrayFilter[1]
        });

        setCurrReservations([...arrayResult]);
    }, [reservations, ...dependencies]);
    return null;
};
