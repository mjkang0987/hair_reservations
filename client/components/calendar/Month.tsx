import {useRouter} from 'next/router';

import styled from 'styled-components';

import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil';
import {
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {useChangeDate} from '../../hooks/useChangeDate';

import {
    isTodayValue
} from '../../utils/constants';

import {Num} from './Num';

interface MonthType {
    monthDates: number[];
    currMonth: number;
    type: string;
}

export const MonthComponent = ({
    monthDates,
    currMonth,
    type
}: MonthType) => {
    const router = useRouter();

    const today = useRecoilValue(todayState);
    const [curr, setCurr] = useRecoilState(targetStateState);

    const {
        fullYear
    } = curr;

    const setView = useSetRecoilState(viewState);

    return (<>
        {monthDates.map((val, index) => <StyledDate key={`month_${val + index}`}
                                                    type={type}>
            <Num onClick={() => {
                useChangeDate({
                    currMonth: currMonth,
                    currYear : fullYear,
                    currDate : val,
                    setCurr,
                    setView,
                    router
                });
            }}
                 isToday={isTodayValue(today, fullYear, currMonth, +val)}>{val}</Num>
        </StyledDate>)}
    </>);
};

const StyledDate = styled.li<{ type: string }>`
  padding: 5px;
  text-align: center;
  border-right: 1px solid var(--light-gray-color);
  border-top: 1px solid var(--light-gray-color);

  &:nth-child(7n) {
    border-right: none;
  }

  &:nth-child(-n+7) {
    border-top: none;
  }

  ${props => (props.type === 'prev' || props.type === 'next') && `button {
    color: var(--gray-color);
  }
  `}
`;
