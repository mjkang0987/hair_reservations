import {DAYS} from '../../utils/constants';

export const DaysComponent = ()  => {
    return (
        <div>
            <ul>
                {Object.keys(DAYS).map((day =>
                    <li key={DAYS[day].id}>
                        {DAYS[day].ko}
                    </li>))}
            </ul>
        </div>
    );
};
