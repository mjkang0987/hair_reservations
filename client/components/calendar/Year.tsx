import {useRouter} from 'next/router';

import styled from 'styled-components';
import {
    isTodayValue
} from '../../utils/constants';

import {
    useRecoilValue,
    useSetRecoilState
} from 'recoil';

import {useChangeDate} from '../../hooks/useChangeDate';

import {
    targetState,
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {Num} from './Num';

export const YearComponents = () => {
    const router = useRouter();
    const today = useRecoilValue(todayState);
    const currValue = useRecoilValue(targetState);
    const setCurr = useSetRecoilState(targetStateState);

    const {
        fullYear
    } = currValue;

    const setView = useSetRecoilState(viewState);
    const months = Array.from({length: 12}, (_, index) => index);

    return (<StyledYear>
            {today && months.map((m) =>
                <StyledMonth key={`${fullYear}_${m}`}>
                    <Num onClick={() => {
                        useChangeDate({
                            currMonth: m,
                            currYear : fullYear,
                            currDate: 1,
                            setCurr,
                            setView,
                            router
                        });
                    }} isToday={isTodayValue(today, +fullYear, m, today.getDate())}>{m + 1}</Num>
                </StyledMonth>
            )}
        </StyledYear>
    );
};

const StyledYear = styled.ul `
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

const StyledMonth = styled.li`
  width: ${100 / 3}%;
  height: ${100 / 4}%;
`;
