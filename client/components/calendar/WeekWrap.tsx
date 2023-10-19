import {useRouter} from "next/router";

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

import {
    isTodayValue,
    SetDateType,
    ViewType
} from '../../utils/constants';

import {useChangeDayType} from "../../hooks/useChangeDate";

import {Num} from './Num';

interface WeekType {
    type: string
}

export const WeekWrapComponent = ({
    type
}: WeekType) => {
    const router = useRouter();

    const today = useRecoilValue(todayState);

    const [curr, setCurr] = useRecoilState(targetStateState);
    const setView = useSetRecoilState(viewState);

    const {
        fullYear,
        month,
        date,
        day,
        weekLastDay,
        monthLastNumber,
        monthPrevLastNumber,
    } = curr;

    const setDate = ({
        currMonth,
        currDate
    }: SetDateType) => {
        useChangeDayType({
            currMonth: currMonth ?? month,
            currYear: fullYear,
            currDate,
            setCurr,
            setView,
            router
        });
    };

    const setNumArr = () => {
        if (type === ViewType.Week && (weekLastDay < 6)) {
            return new Array(6 - weekLastDay);
        }

        if (type === ViewType.Three && (monthLastNumber - date < 2)) {
            return new Array((monthLastNumber - date === 0 ? 2 : monthLastNumber - date));
        }

        return [];
    }

    return (<StyledWeeks>
            {curr[type]().map((w: number, index: number) => <StyledWeek key={`week_${w}`}>
                <Num onClick={() => {
                    setDate({
                        currDate: w
                    });
                }} isToday={isTodayValue(today, fullYear, month, Number(w))}>{w}</Num>
            </StyledWeek>)}
            {setNumArr().length > 0 && setNumArr().fill(null).map((_, index) => <StyledWeek key={`next_${index}`}>
                <Num onClick={() => {
                    setDate({
                        currDate: index + 1,
                        currMonth: month + 1
                    });
                }} isToday={isTodayValue(today, fullYear, month, Number(index) + 1)}>{index + 1}</Num>
            </StyledWeek>)}
    </StyledWeeks>
    );
};

const StyledWeeks = styled.ul`
  flex: 1;
  position: relative;
  display: grid;
  align-items: stretch;
  
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -150px;
    width: 100vw;
    height: 1px;
    background-color: var(--light-gray-color);
  }
`;

const StyledWeek = styled.li`
  text-align: center;
  padding: 5px;
  border-right: 1px solid var(--light-gray-color);

  &:nth-child(7) {
    border-right: none;
  }
  
  button {
    font-size: var(--big-font);
    width: 40px;
    height: 40px;
  }
`;
