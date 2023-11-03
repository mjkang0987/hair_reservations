import {useRouter} from 'next/router';

import styled from 'styled-components';
import {
    isTodayValue,
    SetDateType,
    ViewType
} from '../../utils/constants';

import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil';

import {useChangeDay} from '../../hooks/useChangeDate';

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
        fullYear,
        month
    } = currValue;

    const setView = useSetRecoilState(viewState);

    return (<StyledYear>
            {today && new Array(12).fill(null).map((_, index) =>
                <StyledMonth key={`${fullYear}_${month + index}`}>
                    <Num onClick={() => {
                        useChangeDay({
                            currMonth: index,
                            currYear : fullYear,
                            currDate: 1,
                            setCurr,
                            setView,
                            router
                        });
                    }} isToday={isTodayValue(today, +fullYear, index, today.getDate())}>{index + 1}</Num>
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
