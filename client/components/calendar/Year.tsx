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
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {Num} from './Num';

export const YearComponents = () => {
    const router = useRouter();
    const today = useRecoilValue(todayState);
    const [curr, setCurr] = useRecoilState(targetStateState);

    const {
        fullYear,
        month
    } = curr;

    const setView = useSetRecoilState(viewState);

    const setDate = ({
        currMonth,
        currDate,
    }: SetDateType) => {
        useChangeDay({
            type: ViewType.Year,
            currMonth: currMonth ?? month,
            currYear : fullYear,
            currDate,
            setCurr,
            setView,
            router
        });
    };
    return (
        <StyledYear>
            {new Array(12).fill(null).map((value, index) =>
                <StyledMonth key={`${value}${index}`}>
                    <Num onClick={() => {
                        setDate({
                            currMonth: index,
                            currDate : 1
                        });
                    }} isToday={isTodayValue(today, fullYear, index, today.getDate())}>{index + 1}</Num>
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
