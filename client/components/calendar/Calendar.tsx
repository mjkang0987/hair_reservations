import {Days} from './Days';

interface Props {
    prevDates?: [];
    nextDates?: [];
}

export const Calendar = ({prevDates, nextDates}: Props)  => {
    return (
        <>
            <Days/>
        </>
    );
};
